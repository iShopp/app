import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class AffiliatesService {
  constructor(private prisma: PrismaService) {}

  async findAll(pagination: PaginationDto) {
    const { page = 1, limit = 20 } = pagination;
    const skip = (page - 1) * limit;

    const [affiliates, total] = await Promise.all([
      this.prisma.affiliate.findMany({
        skip,
        take: limit,
        include: { user: { select: { id: true, name: true, email: true } } },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.affiliate.count(),
    ]);
    return { affiliates, total, page, limit };
  }

  async findOne(id: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true } },
        links: true,
      },
    });
    if (!affiliate) throw new NotFoundException(`Affiliate ${id} not found`);
    return affiliate;
  }

  async findByUserId(userId: string) {
    const affiliate = await this.prisma.affiliate.findUnique({
      where: { userId },
      include: { links: true },
    });
    if (!affiliate) throw new NotFoundException('Affiliate account not found');
    return affiliate;
  }

  async createForUser(userId: string) {
    const existing = await this.prisma.affiliate.findUnique({ where: { userId } });
    if (existing) throw new ConflictException('Affiliate account already exists');

    const code = `AFF-${userId.slice(0, 8).toUpperCase()}-${Date.now()}`;
    return this.prisma.affiliate.create({
      data: { userId, code },
    });
  }

  async update(id: string, dto: UpdateAffiliateDto) {
    await this.findOne(id);
    return this.prisma.affiliate.update({ where: { id }, data: dto });
  }
}
