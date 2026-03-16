import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Processor('order-fulfillment')
export class OrderFulfillmentProcessor {
  private readonly logger = new Logger(OrderFulfillmentProcessor.name);

  constructor(private prisma: PrismaService) {}

  @Process()
  async handleOrderFulfillment(job: Job<{ orderId: string }>) {
    this.logger.log(`Processing order fulfillment for order ${job.data?.orderId}`);

    if (job.data?.orderId) {
      const order = await this.prisma.order.findUnique({
        where: { id: job.data.orderId },
        include: { items: { include: { product: true } } },
      });

      if (order) {
        // TODO: Submit order to marketplace APIs
        this.logger.debug(`Would fulfill order ${order.orderNumber} via marketplace`);

        await this.prisma.order.update({
          where: { id: order.id },
          data: {
            status: OrderStatus.PROCESSING,
            timeline: {
              create: {
                status: OrderStatus.PROCESSING,
                description: 'Order submitted for fulfillment',
              },
            },
          },
        });
      }
    }

    await this.prisma.automationJob.updateMany({
      where: { type: 'ORDER_FULFILLMENT' },
      data: { lastRun: new Date(), status: 'COMPLETED' },
    });

    return { processed: true };
  }
}
