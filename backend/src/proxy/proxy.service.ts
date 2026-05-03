import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import { TemuAdapter } from './adapters/temu.adapter';
import { AliexpressAdapter } from './adapters/aliexpress.adapter';
import { AmazonAdapter } from './adapters/amazon.adapter';
import { EbayAdapter } from './adapters/ebay.adapter';
import { LazadaAdapter } from './adapters/lazada.adapter';
import {
  BaseMarketplaceAdapter,
  MarketplaceSearchOptions,
} from './adapters/base-marketplace.adapter';

@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  private readonly adapters: Record<string, BaseMarketplaceAdapter>;

  constructor(
    private temuAdapter: TemuAdapter,
    private aliexpressAdapter: AliexpressAdapter,
    private amazonAdapter: AmazonAdapter,
    private ebayAdapter: EbayAdapter,
    private lazadaAdapter: LazadaAdapter,
  ) {
    this.adapters = {
      temu: temuAdapter,
      aliexpress: aliexpressAdapter,
      amazon: amazonAdapter,
      ebay: ebayAdapter,
      lazada: lazadaAdapter,
    };
  }

  private getAdapter(marketplace: string): BaseMarketplaceAdapter {
    const adapter = this.adapters[marketplace.toLowerCase()];
    if (!adapter) {
      throw new BadRequestException(
        `Unsupported marketplace: ${marketplace}. Available: ${Object.keys(this.adapters).join(', ')}`,
      );
    }
    return adapter;
  }

  async searchProducts(
    marketplace: string,
    query: string,
    options?: MarketplaceSearchOptions,
  ) {
    const adapter = this.getAdapter(marketplace);
    return adapter.search(query, options);
  }

  async getProduct(marketplace: string, externalId: string) {
    const adapter = this.getAdapter(marketplace);
    return adapter.getProduct(externalId);
  }

  async placeOrder(marketplace: string, orderData: Record<string, any>) {
    const adapter = this.getAdapter(marketplace);
    return adapter.placeOrder(orderData);
  }
}


@Injectable()
export class ProxyService {
  private readonly logger = new Logger(ProxyService.name);

  private readonly adapters: Record<string, BaseMarketplaceAdapter>;

  constructor(
    private temuAdapter: TemuAdapter,
    private aliexpressAdapter: AliexpressAdapter,
    private amazonAdapter: AmazonAdapter,
    private ebayAdapter: EbayAdapter,
  ) {
    this.adapters = {
      temu: temuAdapter,
      aliexpress: aliexpressAdapter,
      amazon: amazonAdapter,
      ebay: ebayAdapter,
    };
  }

  private getAdapter(marketplace: string): BaseMarketplaceAdapter {
    const adapter = this.adapters[marketplace.toLowerCase()];
    if (!adapter) {
      throw new BadRequestException(
        `Unsupported marketplace: ${marketplace}. Available: ${Object.keys(this.adapters).join(', ')}`,
      );
    }
    return adapter;
  }

  async searchProducts(
    marketplace: string,
    query: string,
    options?: MarketplaceSearchOptions,
  ) {
    const adapter = this.getAdapter(marketplace);
    return adapter.search(query, options);
  }

  async getProduct(marketplace: string, externalId: string) {
    const adapter = this.getAdapter(marketplace);
    return adapter.getProduct(externalId);
  }

  async placeOrder(marketplace: string, orderData: Record<string, any>) {
    const adapter = this.getAdapter(marketplace);
    return adapter.placeOrder(orderData);
  }
}
