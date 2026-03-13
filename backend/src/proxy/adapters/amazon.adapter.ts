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
export class AmazonAdapter extends BaseMarketplaceAdapter {
  private readonly logger = new Logger(AmazonAdapter.name);
  private readonly accessKey: string;
  private readonly secretKey: string;
  private readonly partnerTag: string;
  private readonly region = 'us-east-1';
  private readonly host = 'webservices.amazon.com';

  constructor(private config: ConfigService) {
    super();
    this.accessKey = config.get<string>('AMAZON_ACCESS_KEY', '');
    this.secretKey = config.get<string>('AMAZON_SECRET_KEY', '');
    this.partnerTag = config.get<string>('AMAZON_PARTNER_TAG', '');
  }

  async search(
    query: string,
    options: MarketplaceSearchOptions = {},
  ): Promise<MarketplaceProduct[]> {
    if (!this.accessKey) {
      this.logger.warn('Amazon PAAPI credentials not configured');
      return [];
    }

    try {
      const payload = {
        Keywords: query,
        Resources: [
          'Images.Primary.Large',
          'ItemInfo.Title',
          'Offers.Listings.Price',
          'ItemInfo.Features',
        ],
        SearchIndex: 'All',
        ItemCount: options.limit ?? 10,
        PartnerTag: this.partnerTag,
        PartnerType: 'Associates',
        Marketplace: 'www.amazon.com',
      };

      const response = await this.signedRequest(
        '/paapi5/searchitems',
        payload,
      );

      const items = response?.SearchResult?.Items ?? [];
      return items.map((item: any) => ({
        externalId: item.ASIN,
        name: item.ItemInfo?.Title?.DisplayValue ?? 'Unknown',
        price:
          parseFloat(
            item.Offers?.Listings?.[0]?.Price?.Amount ?? '0',
          ),
        images: item.Images?.Primary?.Large?.URL
          ? [item.Images.Primary.Large.URL]
          : [],
        inStock:
          item.Offers?.Listings?.[0]?.Availability?.Type === 'Now',
        url: item.DetailPageURL,
      }));
    } catch (err) {
      this.logger.error(`Amazon search error: ${(err as Error).message}`);
      return [];
    }
  }

  async getProduct(externalId: string): Promise<MarketplaceProduct | null> {
    if (!this.accessKey) return null;

    try {
      const payload = {
        ItemIds: [externalId],
        Resources: [
          'Images.Primary.Large',
          'ItemInfo.Title',
          'Offers.Listings.Price',
          'ItemInfo.Features',
        ],
        PartnerTag: this.partnerTag,
        PartnerType: 'Associates',
        Marketplace: 'www.amazon.com',
      };

      const response = await this.signedRequest('/paapi5/getitems', payload);
      const item = response?.ItemsResult?.Items?.[0];
      if (!item) return null;

      return {
        externalId: item.ASIN,
        name: item.ItemInfo?.Title?.DisplayValue ?? 'Unknown',
        price: parseFloat(item.Offers?.Listings?.[0]?.Price?.Amount ?? '0'),
        images: item.Images?.Primary?.Large?.URL
          ? [item.Images.Primary.Large.URL]
          : [],
        inStock: item.Offers?.Listings?.[0]?.Availability?.Type === 'Now',
        url: item.DetailPageURL,
      };
    } catch (err) {
      this.logger.error(`Amazon getProduct error: ${(err as Error).message}`);
      return null;
    }
  }

  async placeOrder(orderData: Record<string, any>) {
    this.logger.warn('Amazon direct order placement is not supported via PAAPI');
    return {
      success: false,
      message: 'Amazon orders must be placed via the Amazon cart URL',
    };
  }

  private async signedRequest(path: string, payload: Record<string, any>) {
    const body = JSON.stringify(payload);
    const now = new Date();
    const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '');

    const headers = {
      'content-type': 'application/json; charset=UTF-8',
      host: this.host,
      'x-amz-date': amzDate,
      'x-amz-target': `com.amazon.paapi5.v1.ProductAdvertisingAPIv1.${path.split('/').pop()}`,
    };

    const signedHeaders = Object.keys(headers).sort().join(';');
    const canonicalHeaders = Object.entries(headers)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}\n`)
      .join('');

    const payloadHash = crypto
      .createHash('sha256')
      .update(body)
      .digest('hex');

    const canonicalRequest = [
      'POST',
      path,
      '',
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join('\n');

    const credentialScope = `${dateStamp}/${this.region}/ProductAdvertisingAPI/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    const signingKey = this.getSignatureKey(dateStamp);
    const signature = crypto
      .createHmac('sha256', signingKey)
      .update(stringToSign)
      .digest('hex');

    const authHeader = `AWS4-HMAC-SHA256 Credential=${this.accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

    const response = await axios.post(
      `https://${this.host}${path}`,
      body,
      { headers: { ...headers, Authorization: authHeader } },
    );
    return response.data;
  }

  private getSignatureKey(dateStamp: string): Buffer {
    const kDate = crypto
      .createHmac('sha256', `AWS4${this.secretKey}`)
      .update(dateStamp)
      .digest();
    const kRegion = crypto
      .createHmac('sha256', kDate)
      .update(this.region)
      .digest();
    const kService = crypto
      .createHmac('sha256', kRegion)
      .update('ProductAdvertisingAPI')
      .digest();
    return crypto
      .createHmac('sha256', kService)
      .update('aws4_request')
      .digest();
  }
}
