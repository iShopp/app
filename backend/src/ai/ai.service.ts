import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface FAQ {
  question: string;
  answer: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
}

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private openai: OpenAI | null = null;

  constructor(private config: ConfigService) {
    const apiKey = config.get<string>('OPENAI_API_KEY');
    if (apiKey) {
      this.openai = new OpenAI({ apiKey });
    } else {
      this.logger.warn('OPENAI_API_KEY not set — AI features will return placeholders');
    }
  }

  async generateRaw(prompt: string): Promise<string> {
    return this.chat(prompt);
  }

  private async chat(prompt: string): Promise<string> {
    if (!this.openai) {
      return '[AI service not configured — set OPENAI_API_KEY]';
    }

    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful e-commerce copywriting assistant. Be concise, engaging, and SEO-friendly.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    });

    return response.choices[0]?.message?.content ?? '';
  }

  async generateProductDescription(
    name: string,
    category: string,
    features: string[] = [],
  ): Promise<string> {
    const prompt = `Write a compelling product description for an e-commerce listing.
Product: ${name}
Category: ${category}
Key features: ${features.join(', ') || 'Not specified'}

Write 2-3 paragraphs that highlight benefits, use persuasive language, and appeal to buyers.`;

    return this.chat(prompt);
  }

  async generateSEOTags(product: {
    productName: string;
    category: string;
    description?: string;
  }): Promise<SEOData> {
    const prompt = `Generate SEO metadata for this product listing.
Product: ${product.productName}
Category: ${product.category}
Description: ${product.description ?? 'N/A'}

Return a JSON object with:
- title: SEO page title (max 60 chars)
- description: meta description (max 160 chars)
- keywords: array of 8-10 relevant keywords

Only return valid JSON, no markdown.`;

    const raw = await this.chat(prompt);
    try {
      return JSON.parse(raw.trim()) as SEOData;
    } catch {
      return {
        title: product.productName,
        description: product.description ?? '',
        keywords: [product.category, product.productName],
      };
    }
  }

  async generateProductFAQs(
    product: { productName: string; description?: string },
    count = 5,
  ): Promise<FAQ[]> {
    const prompt = `Generate ${count} realistic customer FAQs for this product.
Product: ${product.productName}
Description: ${product.description ?? 'N/A'}

Return a JSON array of objects with "question" and "answer" keys.
Only return valid JSON, no markdown.`;

    const raw = await this.chat(prompt);
    try {
      return JSON.parse(raw.trim()) as FAQ[];
    } catch {
      return [
        {
          question: 'What is the return policy?',
          answer: 'We offer a 30-day hassle-free return policy.',
        },
        {
          question: 'How long does shipping take?',
          answer: 'Standard shipping takes 5-7 business days.',
        },
      ];
    }
  }

  async suggestPricingStrategy(
    product: { name: string; price: number; category: string },
    competitors: Array<{ name: string; price: number }> = [],
  ): Promise<string> {
    const competitorInfo =
      competitors.length > 0
        ? competitors.map((c) => `${c.name}: $${c.price}`).join(', ')
        : 'No competitor data';

    const prompt = `Suggest a pricing strategy for this product.
Product: ${product.name}
Current price: $${product.price}
Category: ${product.category}
Competitor prices: ${competitorInfo}

Provide a brief 2-3 sentence recommendation.`;

    return this.chat(prompt);
  }
}
