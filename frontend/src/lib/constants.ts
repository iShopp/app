export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const APP_NAME = 'iSHOP';
export const APP_TAGLINE = 'Professional Marketplace';
export const APP_DESCRIPTION = 'iSHOP marketplace for trusted cross-border shopping';

export const MARKETPLACES = [
  { id: 'temu', name: 'Temu', color: '#ff6900', slug: 'temu' },
  { id: 'aliexpress', name: 'AliExpress', color: '#ff4747', slug: 'aliexpress' },
  { id: 'amazon', name: 'Amazon', color: '#ff9900', slug: 'amazon' },
  { id: 'ebay', name: 'eBay', color: '#0064d2', slug: 'ebay' },
] as const;

export const MARKETPLACE_COLORS: Record<string, string> = {
  temu: '#ff6900',
  aliexpress: '#ff4747',
  amazon: '#ff9900',
  ebay: '#0064d2',
  manual: '#2563eb',
};

export const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'text-yellow-400' },
  { value: 'confirmed', label: 'Confirmed', color: 'text-blue-400' },
  { value: 'processing', label: 'Processing', color: 'text-purple-400' },
  { value: 'shipped', label: 'Shipped', color: 'text-cyan-400' },
  { value: 'delivered', label: 'Delivered', color: 'text-green-400' },
  { value: 'cancelled', label: 'Cancelled', color: 'text-red-400' },
  { value: 'refunded', label: 'Refunded', color: 'text-orange-400' },
] as const;

export const NAVIGATION_LINKS = [
  { href: '/shop', label: 'Shop' },
  { href: '/deals', label: 'Deals' },
  { href: '/brands', label: 'Brands' },
  { href: '/affiliates', label: 'Affiliates' },
];

export const FOOTER_LINKS = {
  shop: [
    { href: '/shop', label: 'All Products' },
    { href: '/deals', label: 'Deals & Coupons' },
    { href: '/brands', label: 'Brands' },
    { href: '/search', label: 'Search' },
  ],
  account: [
    { href: '/users', label: 'My Dashboard' },
    { href: '/users/orders', label: 'My Orders' },
    { href: '/users/wishlist', label: 'Wishlist' },
    { href: '/users/coupons', label: 'My Coupons' },
  ],
  company: [
    { href: '/affiliates', label: 'Affiliate Program' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' },
  ],
};

export const SAMPLE_CATEGORIES = [
  { id: '1', slug: 'electronics', name: 'Electronics', icon: '⚡', productCount: 1250 },
  { id: '2', slug: 'fashion', name: 'Fashion', icon: '👗', productCount: 3400 },
  { id: '3', slug: 'home-garden', name: 'Home & Garden', icon: '🏡', productCount: 890 },
  { id: '4', slug: 'sports', name: 'Sports', icon: '🏋️', productCount: 650 },
  { id: '5', slug: 'beauty', name: 'Beauty', icon: '💄', productCount: 1100 },
  { id: '6', slug: 'toys', name: 'Toys & Games', icon: '🎮', productCount: 430 },
  { id: '7', slug: 'automotive', name: 'Automotive', icon: '🚗', productCount: 320 },
  { id: '8', slug: 'health', name: 'Health', icon: '💊', productCount: 780 },
];

export const CURRENCY = 'USD';
export const CURRENCY_SYMBOL = '$';

export const ITEMS_PER_PAGE = 24;

export const USER_NAV_ITEMS = [
  { href: '/users', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/users/orders', label: 'My Orders', icon: 'Package' },
  { href: '/users/track', label: 'Track Shipment', icon: 'Truck' },
  { href: '/users/wishlist', label: 'Wishlist', icon: 'Heart' },
  { href: '/users/coupons', label: 'Coupons & Rewards', icon: 'Tag' },
  { href: '/users/addresses', label: 'Addresses', icon: 'MapPin' },
  { href: '/users/payment', label: 'Payment Methods', icon: 'CreditCard' },
  { href: '/users/settings', label: 'Settings', icon: 'Settings' },
];

export const ADMIN_NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  {
    label: 'Products', icon: 'Package', children: [
      { href: '/admin/products', label: 'Catalog' },
      { href: '/admin/products/import', label: 'Import' },
      { href: '/admin/products/categories', label: 'Categories' },
      { href: '/admin/products/brands', label: 'Brands' },
    ]
  },
  { href: '/admin/pricing', label: 'Pricing', icon: 'DollarSign' },
  { href: '/admin/marketplaces', label: 'Marketplaces', icon: 'Globe' },
  {
    label: 'Orders', icon: 'ShoppingBag', children: [
      { href: '/admin/orders', label: 'Customer Orders' },
      { href: '/admin/orders/supplier', label: 'Supplier Orders' },
    ]
  },
  { href: '/admin/automation', label: 'Automation', icon: 'Zap' },
  { href: '/admin/banners', label: 'Banners', icon: 'Image' },
  { href: '/admin/coupons', label: 'Coupons', icon: 'Tag' },
  { href: '/admin/affiliates', label: 'Affiliates', icon: 'Users' },
  {
    label: 'Analytics', icon: 'BarChart2', children: [
      { href: '/admin/analytics', label: 'Overview' },
      { href: '/admin/analytics/ai', label: 'AI Usage' },
    ]
  },
  { href: '/admin/builder', label: 'Builder', icon: 'Lightbulb' },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' },
];

export const AFFILIATE_NAV_ITEMS = [
  { href: '/affiliate', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/affiliate/links', label: 'Links & Campaigns', icon: 'Link' },
  { href: '/affiliate/banners', label: 'Banners', icon: 'Image' },
  { href: '/affiliate/conversions', label: 'Conversions', icon: 'TrendingUp' },
  { href: '/affiliate/earnings', label: 'Earnings', icon: 'DollarSign' },
  { href: '/affiliate/settings', label: 'Settings', icon: 'Settings' },
];
