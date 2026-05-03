import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: any = null;
  private fromEmail: string;

  constructor(private config: ConfigService) {
    const apiKey = config.get<string>('RESEND_API_KEY');
    this.fromEmail = config.get<string>('RESEND_FROM_EMAIL', 'noreply@ishop.app');
    if (apiKey) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { Resend } = require('resend');
        this.resend = new Resend(apiKey);
      } catch {
        this.logger.warn('resend package not installed — email features unavailable');
      }
    } else {
      this.logger.warn('RESEND_API_KEY not set — emails will be logged only');
    }
  }

  async send(payload: EmailPayload): Promise<boolean> {
    if (!this.resend) {
      this.logger.log(`[EMAIL MOCK] To: ${payload.to} | Subject: ${payload.subject}`);
      return true;
    }
    try {
      await this.resend.emails.send({
        from: payload.from ?? this.fromEmail,
        to: payload.to,
        subject: payload.subject,
        html: payload.html,
      });
      return true;
    } catch (err) {
      this.logger.error(`Failed to send email to ${payload.to}: ${(err as Error).message}`);
      return false;
    }
  }

  async sendOrderConfirmation(to: string, order: { orderNumber: string; total: number; items: Array<{ name: string; quantity: number; price: number }> }) {
    const itemsHtml = order.items.map(i => `<tr><td style="padding:8px;border-bottom:1px solid #eee">${i.name}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:center">${i.quantity}</td><td style="padding:8px;border-bottom:1px solid #eee;text-align:right">$${(i.price * i.quantity).toFixed(2)}</td></tr>`).join('');
    return this.send({
      to,
      subject: `Order Confirmed - ${order.orderNumber} | iSHOP`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#020617;color:#f8fafc;padding:32px;border-radius:12px">
          <div style="text-align:center;margin-bottom:24px">
            <h1 style="color:#f97316;font-size:28px;margin:0">iSHOP</h1>
            <p style="color:#94a3b8;margin:8px 0 0">Order Confirmation</p>
          </div>
          <div style="background:#0f172a;border-radius:8px;padding:20px;margin-bottom:20px">
            <h2 style="color:#f8fafc;margin:0 0 8px">Order #${order.orderNumber}</h2>
            <p style="color:#94a3b8;margin:0">Thank you for your order! We're processing it now.</p>
          </div>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px">
            <thead><tr style="background:#0f172a"><th style="padding:8px;text-align:left;color:#94a3b8">Item</th><th style="padding:8px;text-align:center;color:#94a3b8">Qty</th><th style="padding:8px;text-align:right;color:#94a3b8">Price</th></tr></thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="text-align:right;font-size:18px;font-weight:bold;color:#f97316">Total: $${order.total.toFixed(2)}</div>
          <div style="margin-top:24px;text-align:center;color:#94a3b8;font-size:12px">
            <p>Questions? Reply to this email or visit <a href="https://ishop.app" style="color:#f97316">ishop.app</a></p>
          </div>
        </div>
      `,
    });
  }

  async sendShippingUpdate(to: string, data: { orderNumber: string; trackingNumber: string; status: string }) {
    return this.send({
      to,
      subject: `Your order ${data.orderNumber} has been ${data.status} | iSHOP`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#020617;color:#f8fafc;padding:32px;border-radius:12px">
          <div style="text-align:center;margin-bottom:24px">
            <h1 style="color:#f97316;font-size:28px;margin:0">iSHOP</h1>
          </div>
          <div style="background:#0f172a;border-radius:8px;padding:20px;margin-bottom:20px">
            <h2 style="color:#f8fafc;margin:0 0 8px">Order ${data.orderNumber} Update</h2>
            <p style="color:#94a3b8;margin:0">Your order status: <strong style="color:#22d3ee">${data.status}</strong></p>
            ${data.trackingNumber ? `<p style="color:#94a3b8;margin:8px 0 0">Tracking: <strong style="color:#f8fafc">${data.trackingNumber}</strong></p>` : ''}
          </div>
          <div style="text-align:center;margin-top:24px">
            <a href="https://ishop.app/users/orders" style="background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Track Your Order</a>
          </div>
        </div>
      `,
    });
  }

  async sendPasswordReset(to: string, resetUrl: string) {
    return this.send({
      to,
      subject: 'Reset Your Password | iSHOP',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#020617;color:#f8fafc;padding:32px;border-radius:12px">
          <div style="text-align:center;margin-bottom:24px">
            <h1 style="color:#f97316;font-size:28px;margin:0">iSHOP</h1>
          </div>
          <div style="background:#0f172a;border-radius:8px;padding:20px;margin-bottom:20px">
            <h2 style="color:#f8fafc;margin:0 0 8px">Password Reset Request</h2>
            <p style="color:#94a3b8;margin:0">We received a request to reset your password. Click the button below to proceed.</p>
          </div>
          <div style="text-align:center;margin:24px 0">
            <a href="${resetUrl}" style="background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Reset Password</a>
          </div>
          <p style="color:#475569;font-size:12px;text-align:center">This link expires in 24 hours. If you did not request a password reset, ignore this email.</p>
        </div>
      `,
    });
  }

  async sendWelcome(to: string, name: string) {
    return this.send({
      to,
      subject: 'Welcome to iSHOP! 🛍️',
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#020617;color:#f8fafc;padding:32px;border-radius:12px">
          <div style="text-align:center;margin-bottom:24px">
            <h1 style="color:#f97316;font-size:28px;margin:0">iSHOP</h1>
          </div>
          <div style="background:#0f172a;border-radius:8px;padding:20px;margin-bottom:20px">
            <h2 style="color:#f8fafc;margin:0 0 8px">Welcome, ${name}! 🎉</h2>
            <p style="color:#94a3b8;margin:0">Your account has been created. Start exploring thousands of products from global suppliers.</p>
          </div>
          <div style="text-align:center;margin:24px 0">
            <a href="https://ishop.app/shop" style="background:#f97316;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Start Shopping</a>
          </div>
        </div>
      `,
    });
  }
}
