import { API_URL } from './constants';
import type {
  ApiResponse,
  Product,
  Category,
  Brand,
  Order,
  Cart,
  User,
  Coupon,
  Banner,
  PricingRule,
  AutomationJob,
  BuilderSuggestion,
  MarketplaceIntegration,
  Analytics,
  Affiliate,
  AffiliateLink,
} from '@/types';

async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_URL}${endpoint}`;
  const { headers: optHeaders, ...restOptions } = options;
  const response = await fetch(url, {
    ...restOptions,
    headers: {
      'Content-Type': 'application/json',
      ...optHeaders,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

// Products
export const productsApi = {
  list: (params?: Record<string, string | number>) => {
    const query = params ? '?' + new URLSearchParams(params as Record<string, string>).toString() : '';
    return fetchAPI<Product[]>(`/products${query}`);
  },
  get: (slug: string) => fetchAPI<Product>(`/products/${slug}`),
  search: (query: string, params?: Record<string, string>) =>
    fetchAPI<Product[]>(`/products/search?q=${encodeURIComponent(query)}&${new URLSearchParams(params).toString()}`),
  create: (data: Partial<Product>) =>
    fetchAPI<Product>('/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Product>) =>
    fetchAPI<Product>(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetchAPI<void>(`/products/${id}`, { method: 'DELETE' }),
  import: (marketplace: string, data: unknown) =>
    fetchAPI<Product[]>(`/products/import/${marketplace}`, { method: 'POST', body: JSON.stringify(data) }),
};

// Categories
export const categoriesApi = {
  list: () => fetchAPI<Category[]>('/categories'),
  get: (slug: string) => fetchAPI<Category>(`/categories/${slug}`),
  create: (data: Partial<Category>) =>
    fetchAPI<Category>('/categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Category>) =>
    fetchAPI<Category>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetchAPI<void>(`/categories/${id}`, { method: 'DELETE' }),
};

// Brands
export const brandsApi = {
  list: () => fetchAPI<Brand[]>('/brands'),
  get: (slug: string) => fetchAPI<Brand>(`/brands/${slug}`),
  create: (data: Partial<Brand>) =>
    fetchAPI<Brand>('/brands', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Brand>) =>
    fetchAPI<Brand>(`/brands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) =>
    fetchAPI<void>(`/brands/${id}`, { method: 'DELETE' }),
};

// Orders
export const ordersApi = {
  list: (params?: Record<string, string>) =>
    fetchAPI<Order[]>(`/orders${params ? '?' + new URLSearchParams(params).toString() : ''}`),
  get: (id: string) => fetchAPI<Order>(`/orders/${id}`),
  create: (data: Partial<Order>) =>
    fetchAPI<Order>('/orders', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Order>) =>
    fetchAPI<Order>(`/orders/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  cancel: (id: string) =>
    fetchAPI<Order>(`/orders/${id}/cancel`, { method: 'POST' }),
  track: (id: string) => fetchAPI<Order>(`/orders/${id}/track`),
};

// Cart
export const cartApi = {
  get: () => fetchAPI<Cart>('/cart'),
  addItem: (productId: string, quantity: number, variantId?: string) =>
    fetchAPI<Cart>('/cart/items', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, variantId }),
    }),
  updateItem: (itemId: string, quantity: number) =>
    fetchAPI<Cart>(`/cart/items/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),
  removeItem: (itemId: string) =>
    fetchAPI<Cart>(`/cart/items/${itemId}`, { method: 'DELETE' }),
  clear: () => fetchAPI<Cart>('/cart/clear', { method: 'POST' }),
  applyCoupon: (code: string) =>
    fetchAPI<Cart>('/cart/coupon', { method: 'POST', body: JSON.stringify({ code }) }),
};

// Auth
// BackendUser: the user shape returned by the NestJS auth endpoints.
// The role field arrives as an uppercase enum string (e.g. 'CUSTOMER', 'ADMIN').
type BackendUser = Omit<User, 'role'> & { role: string };

export const authApi = {
  signIn: (email: string, password: string) =>
    fetchAPI<{ user: BackendUser; access_token: string }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  signUp: (data: { name: string; email: string; password: string }) =>
    fetchAPI<{ user: BackendUser; access_token: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  me: (token: string) =>
    fetchAPI<BackendUser>('/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Coupons
export const couponsApi = {
  list: () => fetchAPI<Coupon[]>('/coupons'),
  get: (id: string) => fetchAPI<Coupon>(`/coupons/${id}`),
  validate: (code: string) => fetchAPI<Coupon>(`/coupons/validate/${code}`),
  create: (data: Partial<Coupon>) =>
    fetchAPI<Coupon>('/coupons', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Coupon>) =>
    fetchAPI<Coupon>(`/coupons/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI<void>(`/coupons/${id}`, { method: 'DELETE' }),
};

// Banners
export const bannersApi = {
  list: () => fetchAPI<Banner[]>('/banners'),
  create: (data: Partial<Banner>) =>
    fetchAPI<Banner>('/banners', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Banner>) =>
    fetchAPI<Banner>(`/banners/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI<void>(`/banners/${id}`, { method: 'DELETE' }),
};

// Pricing
export const pricingApi = {
  list: () => fetchAPI<PricingRule[]>('/pricing'),
  create: (data: Partial<PricingRule>) =>
    fetchAPI<PricingRule>('/pricing', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: string, data: Partial<PricingRule>) =>
    fetchAPI<PricingRule>(`/pricing/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: string) => fetchAPI<void>(`/pricing/${id}`, { method: 'DELETE' }),
};

// Automation
export const automationApi = {
  list: () => fetchAPI<AutomationJob[]>('/automation'),
  run: (id: string) => fetchAPI<AutomationJob>(`/automation/${id}/run`, { method: 'POST' }),
  stop: (id: string) => fetchAPI<AutomationJob>(`/automation/${id}/stop`, { method: 'POST' }),
  getLogs: (id: string) => fetchAPI<string[]>(`/automation/${id}/logs`),
};

// Marketplaces
export const marketplacesApi = {
  list: () => fetchAPI<MarketplaceIntegration[]>('/marketplaces'),
  get: (slug: string) => fetchAPI<MarketplaceIntegration>(`/marketplaces/${slug}`),
  update: (slug: string, data: Partial<MarketplaceIntegration>) =>
    fetchAPI<MarketplaceIntegration>(`/marketplaces/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
  sync: (slug: string) =>
    fetchAPI<void>(`/marketplaces/${slug}/sync`, { method: 'POST' }),
};

// Analytics
export const analyticsApi = {
  overview: (period = '30d') => fetchAPI<Analytics>(`/analytics?period=${period}`),
  aiUsage: () => fetchAPI<unknown>('/analytics/ai'),
};

// Affiliates
export const affiliatesApi = {
  list: () => fetchAPI<Affiliate[]>('/affiliates'),
  get: (id: string) => fetchAPI<Affiliate>(`/affiliates/${id}`),
  me: () => fetchAPI<Affiliate>('/affiliates/me'),
  links: () => fetchAPI<AffiliateLink[]>('/affiliates/links'),
  createLink: (data: Partial<AffiliateLink>) =>
    fetchAPI<AffiliateLink>('/affiliates/links', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};

// Builder
export const builderApi = {
  suggestions: () => fetchAPI<BuilderSuggestion[]>('/builder/suggestions'),
  updateSuggestion: (id: string, data: Partial<BuilderSuggestion>) =>
    fetchAPI<BuilderSuggestion>(`/builder/suggestions/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};

// Wishlist
export const wishlistApi = {
  get: (token: string) =>
    fetchAPI<{ items: Array<{ id: string; productId: string; product: unknown }> }>('/wishlist', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  add: (productId: string, token: string) =>
    fetchAPI<void>('/wishlist/items', {
      method: 'POST',
      body: JSON.stringify({ productId }),
      headers: { Authorization: `Bearer ${token}` },
    }),
  remove: (productId: string, token: string) =>
    fetchAPI<void>(`/wishlist/items/${productId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    }),
  check: (productId: string, token: string) =>
    fetchAPI<{ wishlisted: boolean }>(`/wishlist/check/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};

// Reviews
export const reviewsApi = {
  forProduct: (productId: string, params?: Record<string, string>) =>
    fetchAPI<Array<{ id: string; rating: number; title?: string; comment: string; user: { name: string }; createdAt: string; helpful: number }>>(
      `/reviews/product/${productId}${params ? '?' + new URLSearchParams(params).toString() : ''}`
    ),
  create: (data: { productId: string; rating: number; title?: string; comment: string }, token: string) =>
    fetchAPI<unknown>('/reviews', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { Authorization: `Bearer ${token}` },
    }),
  helpful: (reviewId: string) =>
    fetchAPI<void>(`/reviews/${reviewId}/helpful`, { method: 'POST' }),
};

// Notifications
export const notificationsApi = {
  list: (token: string) =>
    fetchAPI<Array<{ id: string; type: string; title: string; message: string; read: boolean; createdAt: string }>>('/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    }),
  markRead: (id: string, token: string) =>
    fetchAPI<void>(`/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),
  markAllRead: (token: string) =>
    fetchAPI<void>('/notifications/read-all', {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}` },
    }),
};
