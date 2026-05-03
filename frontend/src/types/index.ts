export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  images: string[];
  category: string;
  categorySlug: string;
  brand?: string;
  brandSlug?: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount?: number;
  marketplace: 'temu' | 'aliexpress' | 'amazon' | 'ebay' | 'lazada' | 'manual';
  marketplaceUrl?: string;
  variants?: ProductVariant[];
  tags?: string[];
  sku?: string;
  weight?: number;
  dimensions?: { width: number; height: number; depth: number };
  faqs?: FAQ[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  price?: number;
  stock?: number;
  image?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  rating: number;
  title?: string;
  comment: string;
  verified: boolean;
  helpful: number;
  user: { id: string; name: string; avatar?: string };
  createdAt: string;
}

export interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  icon?: string;
  productCount: number;
  parentId?: string;
  children?: Category[];
}

export interface Brand {
  id: string;
  slug: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  productCount: number;
  featured: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'customer' | 'admin' | 'affiliate';
  phone?: string;
  createdAt: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  label: string;
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  trackingNumber?: string;
  trackingUrl?: string;
  notes?: string;
  couponCode?: string;
  createdAt: string;
  updatedAt: string;
  timeline: OrderTimelineEvent[];
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note?: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  variant?: string;
  marketplace: string;
  supplierOrderId?: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  variant?: ProductVariant;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
}

export interface Affiliate {
  id: string;
  userId: string;
  code: string;
  name: string;
  email: string;
  status: 'pending' | 'active' | 'suspended';
  commissionRate: number;
  totalEarnings: number;
  pendingEarnings: number;
  paidEarnings: number;
  conversions: number;
  clicks: number;
  createdAt: string;
}

export interface AffiliateLink {
  id: string;
  affiliateId: string;
  url: string;
  campaign?: string;
  clicks: number;
  conversions: number;
  earnings: number;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  validFrom: string;
  validUntil: string;
  isActive: boolean;
  appliesTo?: 'all' | 'category' | 'product';
  targetId?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
  position: 'hero' | 'sidebar' | 'banner' | 'popup';
  isActive: boolean;
  startDate?: string;
  endDate?: string;
  order: number;
}

export interface PricingRule {
  id: string;
  name: string;
  marketplace: string;
  type: 'percentage_markup' | 'fixed_markup' | 'fixed_price';
  value: number;
  minPrice?: number;
  maxPrice?: number;
  appliesTo: 'all' | 'category' | 'brand';
  targetId?: string;
  isActive: boolean;
}

export interface AutomationJob {
  id: string;
  name: string;
  type: 'price_sync' | 'stock_sync' | 'order_fulfillment' | 'product_import' | 'image_optimization';
  status: 'idle' | 'running' | 'completed' | 'failed';
  schedule?: string;
  lastRun?: string;
  nextRun?: string;
  successCount: number;
  failureCount: number;
  logs?: string[];
}

export interface BuilderSuggestion {
  id: string;
  type: 'feature' | 'product' | 'pricing' | 'marketing' | 'seo';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'new' | 'in_review' | 'accepted' | 'rejected' | 'implemented';
  aiGenerated: boolean;
  createdAt: string;
}

export interface MarketplaceIntegration {
  id: string;
  name: string;
  slug: string;
  logo: string;
  isConnected: boolean;
  apiKey?: string;
  lastSync?: string;
  productCount: number;
  settings: Record<string, string | number | boolean>;
}

export interface Analytics {
  revenue: number;
  orders: number;
  customers: number;
  products: number;
  conversionRate: number;
  avgOrderValue: number;
  period: 'today' | '7d' | '30d' | '90d' | '1y';
  revenueChart: ChartDataPoint[];
  ordersChart: ChartDataPoint[];
  topProducts: { product: Product; sales: number; revenue: number }[];
  topCategories: { category: Category; sales: number }[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'bank';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
