export interface MarketplaceSearchOptions {
  page?: number;
  limit?: number;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
}

export interface MarketplaceProduct {
  externalId: string;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  images: string[];
  inStock: boolean;
  stockCount?: number;
  rating?: number;
  reviewCount?: number;
  url?: string;
  sku?: string;
}

export abstract class BaseMarketplaceAdapter {
  abstract search(
    query: string,
    options?: MarketplaceSearchOptions,
  ): Promise<MarketplaceProduct[]>;

  abstract getProduct(externalId: string): Promise<MarketplaceProduct | null>;

  abstract placeOrder(orderData: Record<string, any>): Promise<{
    success: boolean;
    externalOrderId?: string;
    message?: string;
  }>;
}
