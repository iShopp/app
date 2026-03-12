import Link from 'next/link';
import { ArrowRight, Zap, TrendingUp, Shield, Truck } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import NeonCard from '@/components/ui/NeonCard';
import { SAMPLE_CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

const TRENDING_PRODUCTS = [
  { id: '1', slug: 'wireless-earbuds-pro', name: 'Wireless Earbuds Pro X', price: 29.99, originalPrice: 79.99, rating: 4.7, reviewCount: 1243, marketplace: 'temu', image: 'https://placehold.co/400x400/111118/00f5ff?text=Earbuds' },
  { id: '2', slug: 'smart-led-strip', name: 'Smart RGB LED Strip 5m', price: 15.99, originalPrice: 35.99, rating: 4.5, reviewCount: 892, marketplace: 'aliexpress', image: 'https://placehold.co/400x400/111118/ff00ff?text=LED+Strip' },
  { id: '3', slug: 'portable-charger', name: '20000mAh Power Bank', price: 24.99, originalPrice: 49.99, rating: 4.8, reviewCount: 2341, marketplace: 'amazon', image: 'https://placehold.co/400x400/111118/9d4edd?text=Power+Bank' },
  { id: '4', slug: 'smart-watch-fit', name: 'FitPro Smart Watch', price: 39.99, originalPrice: 99.99, rating: 4.4, reviewCount: 567, marketplace: 'ebay', image: 'https://placehold.co/400x400/111118/39ff14?text=Smart+Watch' },
];

const DEALS = [
  { code: 'NEON20', discount: '20% OFF', description: 'All Electronics', expires: '2024-12-31', color: '#00f5ff' },
  { code: 'FIRST15', discount: '15% OFF', description: 'First Order', expires: '2024-12-31', color: '#ff00ff' },
  { code: 'SHIP0', discount: 'Free Shipping', description: 'Orders over $30', expires: '2024-12-31', color: '#39ff14' },
];

const BRANDS = ['Samsung', 'Apple', 'Nike', 'Adidas', 'Sony', 'LG', 'Xiaomi', 'Huawei'];

const FEATURES = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Orders processed in minutes', color: '#00f5ff' },
  { icon: Shield, title: 'Buyer Protection', desc: '100% secure transactions', color: '#ff00ff' },
  { icon: Truck, title: 'Fast Shipping', desc: 'Worldwide delivery', color: '#9d4edd' },
  { icon: TrendingUp, title: 'Best Prices', desc: 'AI-powered price matching', color: '#39ff14' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.07)_0%,transparent_60%)]" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-[#00f5ff] rounded-full opacity-[0.03] blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-[#ff00ff] rounded-full opacity-[0.03] blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          <div className="inline-flex items-center gap-2 bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.2)] text-[#00f5ff] text-sm px-4 py-1.5 rounded-full mb-6">
            <Zap className="h-3.5 w-3.5" />
            NEON FX Marketplace is live!
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight mb-6">
            <span className="text-white">i</span>
            <span
              className="text-[#00f5ff]"
              style={{ textShadow: '0 0 20px #00f5ff, 0 0 40px #00f5ff60, 0 0 80px #00f5ff30' }}
            >
              SHOP
            </span>
          </h1>
          <p className="text-2xl sm:text-3xl font-light text-gray-300 mb-3">
            The Future of Shopping
          </p>
          <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg">
            Discover millions of products from Temu, AliExpress, Amazon & eBay — all in one neon-lit marketplace.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop">
              <NeonButton variant="primary" size="lg">
                Shop Now <ArrowRight className="h-5 w-5" />
              </NeonButton>
            </Link>
            <Link href="/deals">
              <NeonButton variant="outline" size="lg">
                View Deals
              </NeonButton>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-16">
            {[
              { value: '2M+', label: 'Products' },
              { value: '50K+', label: 'Happy Customers' },
              { value: '4', label: 'Marketplaces' },
              { value: '24/7', label: 'Support' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-bold text-[#00f5ff]">{value}</div>
                <div className="text-xs text-gray-500">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="bg-[#111118] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 flex items-start gap-4"
            >
              <div
                className="p-2.5 rounded-lg shrink-0"
                style={{ backgroundColor: color + '15' }}
              >
                <Icon className="h-5 w-5" style={{ color }} />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">{title}</p>
                <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Shop by <span className="text-[#00f5ff]">Category</span>
          </h2>
          <Link href="/shop" className="text-sm text-[#00f5ff] hover:underline flex items-center gap-1">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {SAMPLE_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/shop/${cat.slug}`}>
              <NeonCard className="p-4 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="text-white text-xs font-medium">{cat.name}</p>
                <p className="text-gray-600 text-[10px] mt-0.5">{cat.productCount.toLocaleString()}</p>
              </NeonCard>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-[#ff00ff]" />
            Trending <span className="text-[#00f5ff]">Now</span>
          </h2>
          <Link href="/shop" className="text-sm text-[#00f5ff] hover:underline flex items-center gap-1">
            See All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {TRENDING_PRODUCTS.map((product) => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            return (
              <NeonCard key={product.id} className="overflow-hidden group cursor-pointer">
                <Link href={`/product/${product.slug}`}>
                  <div className="relative aspect-square overflow-hidden bg-[#0d0d15]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="bg-[#ff00ff] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        -{discount}%
                      </span>
                    </div>
                    <div className="absolute bottom-2 left-2">
                      <span
                        className="text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
                        style={{ backgroundColor: product.marketplace === 'temu' ? '#ff6900cc' : product.marketplace === 'aliexpress' ? '#ff4747cc' : product.marketplace === 'amazon' ? '#ff9900cc' : '#0064d2cc' }}
                      >
                        {product.marketplace}
                      </span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#00f5ff] transition-colors mb-2">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-[#00f5ff] font-bold">{formatPrice(product.price)}</span>
                      <span className="text-gray-500 text-sm line-through">{formatPrice(product.originalPrice)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">⭐ {product.rating} ({product.reviewCount.toLocaleString()} reviews)</p>
                  </div>
                </Link>
              </NeonCard>
            );
          })}
        </div>
      </section>

      {/* Deals */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">
            Hot <span className="text-[#ff00ff]">Deals</span>
          </h2>
          <Link href="/deals" className="text-sm text-[#00f5ff] hover:underline flex items-center gap-1">
            All Deals <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {DEALS.map((deal) => (
            <div
              key={deal.code}
              className="bg-[#111118] border border-[rgba(255,255,255,0.06)] rounded-xl p-5 relative overflow-hidden"
              style={{ borderColor: deal.color + '30' }}
            >
              <div
                className="absolute inset-0 opacity-5"
                style={{ background: `radial-gradient(circle at top right, ${deal.color}, transparent 60%)` }}
              />
              <p className="text-3xl font-black mb-1" style={{ color: deal.color }}>{deal.discount}</p>
              <p className="text-gray-300 text-sm font-medium">{deal.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <code className="text-xs bg-black/30 border border-white/10 px-3 py-1 rounded-lg font-mono text-gray-300">
                  {deal.code}
                </code>
                <span className="text-xs text-gray-600">Expires {deal.expires}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-white text-center mb-8">
          Top <span className="text-[#9d4edd]">Brands</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {BRANDS.map((brand) => (
            <Link key={brand} href={`/brands/${brand.toLowerCase()}`}>
              <div className="bg-[#111118] border border-[rgba(0,245,255,0.1)] hover:border-[rgba(0,245,255,0.3)] rounded-xl px-6 py-3 text-gray-300 hover:text-[#00f5ff] font-medium text-sm transition-all hover:shadow-[0_0_15px_rgba(0,245,255,0.1)]">
                {brand}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-2xl p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,245,255,0.05)_0%,transparent_70%)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold text-white mb-2">
              Stay in the <span className="text-[#00f5ff]">Neon Loop</span>
            </h2>
            <p className="text-gray-500 mb-8">Get exclusive deals and early access to new drops.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-[#0a0a0f] border border-[rgba(0,245,255,0.2)] rounded-lg px-4 py-2.5 text-white placeholder-gray-600 outline-none focus:border-[#00f5ff] transition-colors"
              />
              <NeonButton variant="primary" type="submit">
                Subscribe
              </NeonButton>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
