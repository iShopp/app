import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { SuggestionFilterDto, UpdateSuggestionDto } from './dto/suggestion.dto';
import { SuggestionPriority, SuggestionStatus, SuggestionType } from '@prisma/client';

@Injectable()
export class BuilderService {
  private readonly logger = new Logger(BuilderService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getSuggestions(filters: SuggestionFilterDto) {
    const where: Record<string, any> = {};
    if (filters.type) where.type = filters.type;
    if (filters.status) where.status = filters.status;

    return this.prisma.builderSuggestion.findMany({
      where,
      orderBy: [
        { priority: 'desc' },
        { createdAt: 'desc' },
      ],
    });
  }

  async updateSuggestionStatus(id: string, dto: UpdateSuggestionDto) {
    const suggestion = await this.prisma.builderSuggestion.findUnique({
      where: { id },
    });
    if (!suggestion) throw new NotFoundException(`Suggestion ${id} not found`);

    return this.prisma.builderSuggestion.update({
      where: { id },
      data: { status: dto.status },
    });
  }

  async generateSuggestions() {
    this.logger.log('Generating AI builder suggestions...');

    const [
      totalProducts,
      totalOrders,
      lowStockProducts,
      pendingOrders,
    ] = await Promise.all([
      this.prisma.product.count(),
      this.prisma.order.count(),
      this.prisma.product.count({ where: { stockCount: { lt: 10 }, inStock: true } }),
      this.prisma.order.count({ where: { status: 'PENDING' } }),
    ]);

    const storeContext = `
Store has ${totalProducts} products, ${totalOrders} total orders.
${lowStockProducts} products have low stock (< 10 units).
${pendingOrders} orders are pending fulfillment.
    `.trim();

    const prompt = `Analyze this e-commerce store and suggest 5 improvements.
Context: ${storeContext}

Return a JSON array where each item has:
- type: one of FEATURE, PRODUCT, PRICING, MARKETING, SEO
- title: short title (max 60 chars)
- description: actionable description (1-2 sentences)
- priority: one of LOW, MEDIUM, HIGH

Only return valid JSON array, no markdown.`;

    let suggestions: Array<{
      type: SuggestionType;
      title: string;
      description: string;
      priority: SuggestionPriority;
    }> = [];

    try {
      const raw = await this.aiService.generateRaw(prompt);
      suggestions = JSON.parse(raw.trim());
    } catch (err) {
      this.logger.warn('AI generation failed, using default suggestions');
      suggestions = this.getDefaultSuggestions(
        lowStockProducts,
        pendingOrders,
      );
    }

    const created = await Promise.all(
      suggestions.map((s) =>
        this.prisma.builderSuggestion.create({
          data: {
            type: s.type,
            title: s.title,
            description: s.description,
            priority: s.priority,
            status: SuggestionStatus.PENDING,
            aiGenerated: true,
          },
        }),
      ),
    );

    return { generated: created.length, suggestions: created };
  }

  private getDefaultSuggestions(
    lowStockCount: number,
    pendingOrdersCount: number,
  ) {
    const suggestions = [];

    if (lowStockCount > 0) {
      suggestions.push({
        type: SuggestionType.PRODUCT,
        title: `Restock ${lowStockCount} low-inventory products`,
        description: `${lowStockCount} products have fewer than 10 units. Consider restocking to prevent lost sales.`,
        priority: SuggestionPriority.HIGH,
      });
    }

    if (pendingOrdersCount > 0) {
      suggestions.push({
        type: SuggestionType.FEATURE,
        title: 'Process pending orders',
        description: `${pendingOrdersCount} orders are awaiting fulfillment. Enable auto-fulfillment to speed up processing.`,
        priority: SuggestionPriority.HIGH,
      });
    }

    suggestions.push({
      type: SuggestionType.SEO,
      title: 'Add meta descriptions to top products',
      description: 'Products without meta descriptions miss organic search traffic. Use the AI generator to create them in bulk.',
      priority: SuggestionPriority.MEDIUM,
    });

    suggestions.push({
      type: SuggestionType.MARKETING,
      title: 'Create a seasonal discount campaign',
      description: 'Set up time-limited coupon codes to boost conversion rates during peak shopping periods.',
      priority: SuggestionPriority.MEDIUM,
    });

    suggestions.push({
      type: SuggestionType.PRICING,
      title: 'Review pricing rules for marketplace products',
      description: 'Ensure your markup rules are optimized to remain competitive while maintaining margins.',
      priority: SuggestionPriority.LOW,
    });

    return suggestions;
  }
}
