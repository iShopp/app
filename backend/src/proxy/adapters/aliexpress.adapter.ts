import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  BaseMarketplaceAdapter,
  MarketplaceProduct,
  MarketplaceSearchOptions,
} from './base-marketplace.adapter';

@Injectable()
export class AliexpressAdapter extends BaseMarketplaceAdapter {
  private readonly logger = new Logger(AliexpressAdapter.name);
  private readonly appKey: string;
  private readonly appSecret: string;

  constructor(private config: ConfigService) {
    super();
    this.appKey = config.get<string>('ALIEXPRESS_APP_KEY', '');
    this.appSecret = config.get<string>('ALIEXPRESS_APP_SECRET', '');
  }

  async search(
    query: string,
    options: MarketplaceSearchOptions = {},
  ): Promise<MarketplaceProduct[]> {
    if (!this.appKey) {
      this.logger.warn('AliExpress app key not configured');
      return [];
    }

    try {
      // AliExpress Open Platform - affiliate product search
      const response = await axios.get(
        'https://api-sg.aliexpress.com/sync',
        {
          params: {
            app_key: this.appKey,
            method: 'aliexpress.affiliate.product.query',
            keywords: query,
            page_no: options.page ?? 1,
            page_size: options.limit ?? 20,
          },
        },
      );

      const items =
        response.data?.aliexpress_affiliate_product_query_response
          ?.resp_result?.result?.products?.product ?? [];

      return items.map((item: any) => ({
        externalId: String(item.product_id),
        name: item.product_title,
        price: parseFloat(item.target_sale_price ?? item.target_original_price ?? 0),
        originalPrice: parseFloat(item.target_original_price ?? 0),
        images: item.product_main_image_url ? [item.product_main_image_url] : [],
        inStock: true,
        rating: parseFloat(item.evaluate_rate ?? '0'),
        url: item.promotion_link,
      }));
    } catch (err) {
      this.logger.error(`AliExpress search error: ${(err as Error).message}`);
      return [];
    }
  }

  async getProduct(externalId: string): Promise<MarketplaceProduct | null> {
    if (!this.appKey) return null;

    try {
      const response = await axios.get('https://api-sg.aliexpress.com/sync', {
        params: {
          app_key: this.appKey,
          method: 'aliexpress.affiliate.product.detail.get',
          product_ids: externalId,
        },
      });

      const item =
        response.data?.aliexpress_affiliate_product_detail_get_response
          ?.resp_result?.result?.product ?? null;

      if (!item) return null;

      return {
        externalId: String(item.product_id),
        name: item.product_title,
        price: parseFloat(item.target_sale_price ?? 0),
        originalPrice: parseFloat(item.target_original_price ?? 0),
        images: (item.product_video?.thumbnail
          ? [item.product_video.thumbnail]
          : []
        ),
        inStock: true,
        url: item.promotion_link,
      };
    } catch (err) {
      this.logger.error(`AliExpress getProduct error: ${(err as Error).message}`);
      return null;
    }
  }

  async placeOrder(orderData: Record<string, any>) {
    // AliExpress dropshipping orders require a dedicated partner integration
    this.logger.warn('AliExpress placeOrder requires dropshipping partner setup');
    return {
      success: false,
      message: 'AliExpress order placement requires dropshipping partner API',
    };
  }
}
