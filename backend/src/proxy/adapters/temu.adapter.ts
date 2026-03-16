import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BaseMarketplaceAdapter,
  MarketplaceProduct,
  MarketplaceSearchOptions,
} from './base-marketplace.adapter';

@Injectable()
export class TemuAdapter extends BaseMarketplaceAdapter {
  private readonly logger = new Logger(TemuAdapter.name);

  constructor(private config: ConfigService) {
    super();
  }

  async search(
    query: string,
    options?: MarketplaceSearchOptions,
  ): Promise<MarketplaceProduct[]> {
    // TODO: Temu does not have a public API. Implement scraping or partner API when available.
    this.logger.warn(`Temu search called for "${query}" - no public API available`);
    return [];
  }

  async getProduct(externalId: string): Promise<MarketplaceProduct | null> {
    this.logger.warn(`Temu getProduct called for ${externalId} - no public API available`);
    return null;
  }

  async placeOrder(orderData: Record<string, any>) {
    this.logger.warn(`Temu placeOrder called - no public API available`);
    return {
      success: false,
      message: 'Temu automated ordering is not available via public API',
    };
  }
}
