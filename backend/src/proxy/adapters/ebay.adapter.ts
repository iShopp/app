import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import {
  BaseMarketplaceAdapter,
  MarketplaceProduct,
  MarketplaceSearchOptions,
} from './base-marketplace.adapter';

@Injectable()
export class EbayAdapter extends BaseMarketplaceAdapter {
  private readonly logger = new Logger(EbayAdapter.name);
  private readonly appId: string;

  constructor(private config: ConfigService) {
    super();
    this.appId = config.get<string>('EBAY_APP_ID', '');
  }

  async search(
    query: string,
    options: MarketplaceSearchOptions = {},
  ): Promise<MarketplaceProduct[]> {
    if (!this.appId) {
      this.logger.warn('eBay App ID not configured');
      return [];
    }

    try {
      const response = await axios.get(
        'https://svcs.ebay.com/services/search/FindingService/v1',
        {
          params: {
            'OPERATION-NAME': 'findItemsByKeywords',
            'SERVICE-VERSION': '1.0.0',
            'SECURITY-APPNAME': this.appId,
            'RESPONSE-DATA-FORMAT': 'JSON',
            keywords: query,
            'paginationInput.entriesPerPage': options.limit ?? 20,
            'paginationInput.pageNumber': options.page ?? 1,
          },
        },
      );

      const items =
        response.data?.findItemsByKeywordsResponse?.[0]?.searchResult?.[0]
          ?.item ?? [];

      return items.map((item: any) => ({
        externalId: item.itemId?.[0] ?? '',
        name: item.title?.[0] ?? 'Unknown',
        price: parseFloat(
          item.sellingStatus?.[0]?.currentPrice?.[0]?.['__value__'] ?? '0',
        ),
        images: item.galleryURL ? [item.galleryURL[0]] : [],
        inStock: item.sellingStatus?.[0]?.sellingState?.[0] === 'Active',
        url: item.viewItemURL?.[0],
        rating: parseFloat(item.topRatedListing?.[0] === 'true' ? '4.8' : '3.5'),
      }));
    } catch (err) {
      this.logger.error(`eBay search error: ${(err as Error).message}`);
      return [];
    }
  }

  async getProduct(externalId: string): Promise<MarketplaceProduct | null> {
    if (!this.appId) return null;

    try {
      const response = await axios.get(
        'https://svcs.ebay.com/services/search/FindingService/v1',
        {
          params: {
            'OPERATION-NAME': 'findItemsAdvanced',
            'SERVICE-VERSION': '1.0.0',
            'SECURITY-APPNAME': this.appId,
            'RESPONSE-DATA-FORMAT': 'JSON',
            'itemFilter(0).name': 'ItemId',
            'itemFilter(0).value': externalId,
          },
        },
      );

      const item =
        response.data?.findItemsAdvancedResponse?.[0]?.searchResult?.[0]
          ?.item?.[0];

      if (!item) return null;

      return {
        externalId: item.itemId?.[0] ?? externalId,
        name: item.title?.[0] ?? 'Unknown',
        price: parseFloat(
          item.sellingStatus?.[0]?.currentPrice?.[0]?.['__value__'] ?? '0',
        ),
        images: item.galleryURL ? [item.galleryURL[0]] : [],
        inStock: item.sellingStatus?.[0]?.sellingState?.[0] === 'Active',
        url: item.viewItemURL?.[0],
      };
    } catch (err) {
      this.logger.error(`eBay getProduct error: ${(err as Error).message}`);
      return null;
    }
  }

  async placeOrder(orderData: Record<string, any>) {
    this.logger.warn('eBay order placement requires eBay OAuth and Trading API setup');
    return {
      success: false,
      message: 'eBay order placement requires seller API configuration',
    };
  }
}
