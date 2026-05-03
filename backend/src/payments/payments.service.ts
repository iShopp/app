import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaymentsService {
  private readonly logger = new Logger(PaymentsService.name);
  private stripe: any = null;

  constructor(
    private config: ConfigService,
    private prisma: PrismaService,
  ) {
    const secretKey = config.get<string>('STRIPE_SECRET_KEY');
    if (secretKey) {
      // Dynamically import to avoid errors if stripe package isn't installed
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const Stripe = require('stripe');
        this.stripe = new Stripe(secretKey, { apiVersion: '2024-06-20' });
      } catch {
        this.logger.warn('stripe package not installed — payment features unavailable');
      }
    } else {
      this.logger.warn('STRIPE_SECRET_KEY not set — payment features disabled');
    }
  }

  async createPaymentIntent(orderId: string, currency = 'usd') {
    if (!this.stripe) {
      throw new BadRequestException('Payment service not configured');
    }

    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) throw new NotFoundException(`Order ${orderId} not found`);

    const amountInCents = Math.round(order.total * 100);

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      metadata: { orderId, orderNumber: order.orderNumber },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: order.total,
      currency,
    };
  }

  async confirmPayment(paymentIntentId: string) {
    if (!this.stripe) {
      throw new BadRequestException('Payment service not configured');
    }

    const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
    const orderId = paymentIntent.metadata?.orderId;

    if (!orderId) throw new BadRequestException('No order associated with this payment');

    if (paymentIntent.status === 'succeeded') {
      await this.prisma.order.update({
        where: { id: orderId },
        data: {
          paymentStatus: 'PAID',
          status: 'CONFIRMED',
          timeline: {
            create: {
              status: 'CONFIRMED',
              description: `Payment confirmed via Stripe (${paymentIntentId})`,
            },
          },
        },
      });
      return { success: true, orderId };
    }

    return { success: false, status: paymentIntent.status };
  }

  async handleWebhook(rawBody: Buffer, signature: string) {
    const webhookSecret = this.config.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!webhookSecret || !this.stripe) {
      this.logger.warn('Stripe webhook not configured');
      return { received: false };
    }

    let event: any;
    try {
      event = this.stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
    } catch (err) {
      throw new BadRequestException(`Webhook signature verification failed: ${(err as Error).message}`);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object;
        await this.confirmPayment(pi.id).catch((e) =>
          this.logger.error(`Failed to confirm payment ${pi.id}: ${e.message}`),
        );
        break;
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object;
        const orderId = pi.metadata?.orderId;
        if (orderId) {
          await this.prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus: 'FAILED' },
          }).catch(() => {});
        }
        break;
      }
    }

    return { received: true };
  }
}
