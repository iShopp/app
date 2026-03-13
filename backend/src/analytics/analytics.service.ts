import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, PaymentStatus } from '@prisma/client';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview(period: string) {
    const days = this.parsePeriod(period);
    const since = new Date();
    since.setDate(since.getDate() - days);

    const [
      totalOrders,
      revenueData,
      totalProducts,
      totalUsers,
      pendingOrders,
    ] = await Promise.all([
      this.prisma.order.count({ where: { createdAt: { gte: since } } }),
      this.prisma.order.aggregate({
        where: {
          createdAt: { gte: since },
          paymentStatus: PaymentStatus.PAID,
        },
        _sum: { total: true },
      }),
      this.prisma.product.count(),
      this.prisma.user.count(),
      this.prisma.order.count({
        where: { status: OrderStatus.PENDING },
      }),
    ]);

    const revenue = revenueData._sum.total ?? 0;

    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true, total: true },
      orderBy: { _sum: { total: 'desc' } },
      take: 5,
    });

    const productIds = topProducts.map((p) => p.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, price: true, images: true },
    });

    const topProductsWithDetails = topProducts.map((tp) => ({
      ...tp,
      product: products.find((p) => p.id === tp.productId),
    }));

    const ordersByStatus = await this.prisma.order.groupBy({
      by: ['status'],
      _count: { status: true },
    });

    return {
      period,
      totalOrders,
      revenue,
      totalProducts,
      totalUsers,
      pendingOrders,
      topProducts: topProductsWithDetails,
      ordersByStatus,
    };
  }

  private parsePeriod(period: string): number {
    const match = period.match(/^(\d+)d$/);
    if (match) return parseInt(match[1], 10);
    return 30;
  }
}
