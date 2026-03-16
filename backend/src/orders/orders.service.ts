import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  private generateOrderNumber(): string {
    return `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }

  async findAll(pagination: PaginationDto, userId?: string) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;
    const where = userId ? { userId } : {};

    const [orders, total] = await Promise.all([
      this.prisma.order.findMany({
        where,
        skip,
        take: limit,
        include: {
          items: { include: { product: true } },
          shippingAddress: true,
          timeline: true,
          user: { select: { id: true, name: true, email: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.order.count({ where }),
    ]);
    return { orders, total, page, limit };
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: { include: { product: true } },
        shippingAddress: true,
        timeline: true,
        user: { select: { id: true, name: true, email: true } },
      },
    });
    if (!order) throw new NotFoundException(`Order ${id} not found`);
    return order;
  }

  async create(userId: string, dto: CreateOrderDto) {
    // Look up authoritative prices from the database — never trust client-supplied prices
    const productIds = dto.items.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, price: true },
    });

    if (products.length !== productIds.length) {
      const foundIds = new Set(products.map((p) => p.id));
      const missing = productIds.filter((id) => !foundIds.has(id));
      throw new NotFoundException(`Products not found: ${missing.join(', ')}`);
    }

    const priceMap = new Map(products.map((p) => [p.id, p.price]));

    const subtotal = dto.items.reduce((sum, item) => {
      const price = priceMap.get(item.productId)!;
      return sum + price * item.quantity;
    }, 0);
    const tax = subtotal * 0.08;
    const shipping = subtotal > 50 ? 0 : 9.99;
    const total = subtotal + tax + shipping;

    const order = await this.prisma.order.create({
      data: {
        orderNumber: this.generateOrderNumber(),
        userId,
        subtotal,
        tax,
        shipping,
        total,
        paymentMethod: dto.paymentMethod,
        couponCode: dto.couponCode,
        notes: dto.notes,
        shippingAddressId: dto.shippingAddressId,
        items: {
          create: dto.items.map((item) => {
            const price = priceMap.get(item.productId)!;
            return {
              productId: item.productId,
              variantId: item.variantId,
              quantity: item.quantity,
              price,
              total: price * item.quantity,
            };
          }),
        },
        timeline: {
          create: {
            status: OrderStatus.PENDING,
            description: 'Order placed',
          },
        },
      },
      include: {
        items: { include: { product: true } },
        shippingAddress: true,
        timeline: true,
      },
    });
    return order;
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    await this.findOne(id);
    return this.prisma.order.update({
      where: { id },
      data: {
        status: dto.status,
        timeline: {
          create: {
            status: dto.status,
            description: `Status updated to ${dto.status}`,
          },
        },
      },
      include: { items: true, timeline: true },
    });
  }
}
