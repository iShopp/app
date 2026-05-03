import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  private async getOrCreateWishlist(userId: string) {
    return this.prisma.wishlist.upsert({
      where: { userId },
      create: { userId },
      update: {},
      include: {
        items: {
          include: {
            product: {
              select: {
                id: true,
                slug: true,
                name: true,
                price: true,
                originalPrice: true,
                images: true,
                inStock: true,
                rating: true,
                reviewCount: true,
              },
            },
          },
          orderBy: { addedAt: 'desc' },
        },
      },
    });
  }

  async getWishlist(userId: string) {
    return this.getOrCreateWishlist(userId);
  }

  async addItem(userId: string, productId: string) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) throw new NotFoundException('Product not found');

    const wishlist = await this.prisma.wishlist.upsert({
      where: { userId },
      create: { userId },
      update: {},
    });

    await this.prisma.wishlistItem.upsert({
      where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
      create: { wishlistId: wishlist.id, productId },
      update: {},
    });

    return this.getOrCreateWishlist(userId);
  }

  async removeItem(userId: string, productId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist) return { message: 'Wishlist not found' };

    await this.prisma.wishlistItem.deleteMany({
      where: { wishlistId: wishlist.id, productId },
    });

    return this.getOrCreateWishlist(userId);
  }

  async clearWishlist(userId: string) {
    const wishlist = await this.prisma.wishlist.findUnique({ where: { userId } });
    if (wishlist) {
      await this.prisma.wishlistItem.deleteMany({ where: { wishlistId: wishlist.id } });
    }
    return { message: 'Wishlist cleared' };
  }

  async isWishlisted(userId: string, productId: string): Promise<boolean> {
    const wishlist = await this.prisma.wishlist.findUnique({ where: { userId } });
    if (!wishlist) return false;

    const item = await this.prisma.wishlistItem.findUnique({
      where: { wishlistId_productId: { wishlistId: wishlist.id, productId } },
    });
    return !!item;
  }
}
