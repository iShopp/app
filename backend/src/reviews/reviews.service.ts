import {
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async createReview(userId: string, dto: CreateReviewDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!product) throw new NotFoundException('Product not found');

    const existing = await this.prisma.review.findUnique({
      where: { productId_userId: { productId: dto.productId, userId } },
    });
    if (existing) throw new ConflictException('You have already reviewed this product');

    const review = await this.prisma.review.create({
      data: {
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
        productId: dto.productId,
        userId,
      },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });

    await this.recalculateProductRating(dto.productId);
    return review;
  }

  async findByProduct(
    productId: string,
    page = 1,
    limit = 20,
  ) {
    const skip = (page - 1) * limit;
    const [reviews, total] = await Promise.all([
      this.prisma.review.findMany({
        where: { productId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { id: true, name: true, avatar: true } } },
      }),
      this.prisma.review.count({ where: { productId } }),
    ]);

    return { reviews, total, page, limit, pages: Math.ceil(total / limit) };
  }

  async findByUser(userId: string) {
    return this.prisma.review.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { product: { select: { id: true, name: true, slug: true, images: true } } },
    });
  }

  async updateHelpful(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');

    return this.prisma.review.update({
      where: { id },
      data: { helpful: { increment: 1 } },
    });
  }

  async deleteReview(id: string, userId: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    if (review.userId !== userId) throw new ForbiddenException('Not your review');

    await this.prisma.review.delete({ where: { id } });
    await this.recalculateProductRating(review.productId);
    return { message: 'Review deleted' };
  }

  private async recalculateProductRating(productId: string) {
    const agg = await this.prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { id: true },
    });

    await this.prisma.product.update({
      where: { id: productId },
      data: {
        rating: agg._avg.rating ?? 0,
        reviewCount: agg._count.id,
      },
    });
  }
}
