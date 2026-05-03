import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import * as crypto from 'crypto';
import {
  BaseMarketplaceAdapter,
  MarketplaceProduct,
  MarketplaceSearchOptions,
} from './base-marketplace.adapter';

@Injectable()
export class LazadaAdapter extends BaseMarketplaceAdapter {
  private readonly logger = new Logger(LazadaAdapter.name);
  private readonly appKey: string;
  private readonly appSecret: string;
  private readonly baseUrl = 'https://api.lazada.com/rest';

  constructor(private config: ConfigService) {
    super();
    this.appKey = config.get<string>('LAZADA_APP_KEY', '');
    this.appSecret = config.get<string>('LAZADA_APP_SECRET', '');
  }

  private sign(params: Record<string, string>, apiPath: string): string {
    const sorted = Object.keys(params)
      .sort()
      .map((k) => `${k}${params[k]}`)
      .join('');
    const message = `${apiPath}${sorted}`;
    return crypto
      .createHmac('sha256', this.appSecret)
      .update(message)
      .digest('hex')
      .toUpperCase();
  }

  private buildParams(
    apiPath: string,
    extra: Record<string, string>,
  ): Record<string, string> {
    const params: Record<string, string> = {
      app_key: this.appKey,
      timestamp: String(Date.now()),
      sign_method: 'sha256',
      ...extra,
    };
    params['sign'] = this.sign(params, apiPath);
    return params;
  }

  async search(
    query: string,
    options: MarketplaceSearchOptions = {},
  ): Promise<MarketplaceProduct[]> {
    if (!this.appKey) {
      this.logger.warn('Lazada app key not configured');
      return [];
    }

    const apiPath = '/products/get';
    try {
      const params = this.buildParams(apiPath, {
        filter: 'all',
        offset: String(((options.page ?? 1) - 1) * (options.limit ?? 20)),
        limit: String(options.limit ?? 20),
        search: query,
      });

      const response = await axios.get(`${this.baseUrl}${apiPath}`, { params });
      const products: any[] =
        response.data?.data?.products ?? [];

      return products.map((item: any) => ({
        externalId: String(item.item_id),
        name: item.attributes?.name ?? '',
        description: item.attributes?.description,
        price: parseFloat(item.skus?.[0]?.price ?? '0'),
        originalPrice: parseFloat(item.skus?.[0]?.special_price ?? item.skus?.[0]?.price ?? '0'),
        images: (item.images ?? []).map((img: any) => img.url ?? img),
        inStock: (item.skus?.[0]?.quantity ?? 0) > 0,
        stockCount: item.skus?.[0]?.quantity ?? 0,
        url: item.attributes?.url_details,
      }));
    } catch (err) {
      this.logger.error(`Lazada search error: ${(err as Error).message}`);
      return [];
    }
  }

  async getProduct(externalId: string): Promise<MarketplaceProduct | null> {
    if (!this.appKey) return null;

    const apiPath = '/product/item/get';
    try {
      const params = this.buildParams(apiPath, { item_id: externalId });
      const response = await axios.get(`${this.baseUrl}${apiPath}`, { params });
      const item = response.data?.data ?? null;

      if (!item) return null;

      return {
        externalId: String(item.item_id),
        name: item.attributes?.name ?? '',
        description: item.attributes?.description,
        price: parseFloat(item.skus?.[0]?.price ?? '0'),
        originalPrice: parseFloat(item.skus?.[0]?.special_price ?? item.skus?.[0]?.price ?? '0'),
        images: (item.images ?? []).map((img: any) => img.url ?? img),
        inStock: (item.skus?.[0]?.quantity ?? 0) > 0,
        stockCount: item.skus?.[0]?.quantity ?? 0,
        url: item.attributes?.url_details,
      };
    } catch (err) {
      this.logger.error(`Lazada getProduct error: ${(err as Error).message}`);
      return null;
    }
  }

  async placeOrder(orderData: Record<string, any>) {
    this.logger.warn('Lazada placeOrder requires seller account integration');
    return {
      success: false,
      message: 'Lazada order placement requires seller account API access',
    };
  }
}
