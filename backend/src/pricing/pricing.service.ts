import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePricingRuleDto } from './dto/create-pricing-rule.dto';
import { UpdatePricingRuleDto } from './dto/update-pricing-rule.dto';
import { Marketplace, PricingRuleAppliesTo, PricingRuleType } from '@prisma/client';

@Injectable()
export class PricingService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.pricingRule.findMany({
      include: { category: true, brand: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const rule = await this.prisma.pricingRule.findUnique({
      where: { id },
      include: { category: true, brand: true },
    });
    if (!rule) throw new NotFoundException(`Pricing rule ${id} not found`);
    return rule;
  }

  async create(dto: CreatePricingRuleDto) {
    return this.prisma.pricingRule.create({
      data: dto,
      include: { category: true, brand: true },
    });
  }

  async update(id: string, dto: UpdatePricingRuleDto) {
    await this.findOne(id);
    return this.prisma.pricingRule.update({
      where: { id },
      data: dto,
      include: { category: true, brand: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.pricingRule.delete({ where: { id } });
    return { message: 'Pricing rule deleted' };
  }

  async calculateFinalPrice(
    basePrice: number,
    marketplace: Marketplace,
    categoryId?: string,
    brandId?: string,
  ): Promise<number> {
    const rules = await this.prisma.pricingRule.findMany({
      where: {
        isActive: true,
        OR: [
          { appliesTo: PricingRuleAppliesTo.ALL },
          { appliesTo: PricingRuleAppliesTo.CATEGORY, categoryId },
          { appliesTo: PricingRuleAppliesTo.BRAND, brandId },
        ],
        marketplace: marketplace,
      },
      orderBy: { createdAt: 'asc' },
    });

    let price = basePrice;
    for (const rule of rules) {
      if (rule.type === PricingRuleType.PERCENTAGE_MARKUP) {
        price = price * (1 + rule.value / 100);
      } else if (rule.type === PricingRuleType.FIXED_MARKUP) {
        price = price + rule.value;
      } else if (rule.type === PricingRuleType.FIXED_PRICE) {
        price = rule.value;
      }
    }

    return Math.round(price * 100) / 100;
  }
}
