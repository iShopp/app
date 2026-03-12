import { Search, SlidersHorizontal, Grid3X3, List } from 'lucide-react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { SAMPLE_CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

const SAMPLE_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: String(i + 1),
  slug: `product-${i + 1}`,
  name: `Product ${i + 1} — Premium Quality Item`,
  price: Number((((i * 17 + 13) % 80) + 10).toFixed(2)),
  originalPrice: Number((((i * 23 + 50) % 100) + 50).toFixed(2)),
  rating: Number((((i * 3 + 35) % 15) / 10 + 3.5).toFixed(1)),
  reviewCount: ((i * 137 + 50) % 2000) + 50,
  marketplace: ['temu', 'aliexpress', 'amazon', 'ebay'][i % 4],
  image: `https://placehold.co/400x400/111118/00f5ff?text=P${i + 1}`,
}));

const MARKETPLACES = ['Temu', 'AliExpress', 'Amazon', 'eBay'];
const PRICE_RANGES = ['Under $10', '$10–$25', '$25–$50', '$50–$100', 'Over $100'];
const RATINGS = ['4★ & above', '3★ & above', '2★ & above'];

export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">
          All <span className="text-[#00f5ff]">Products</span>
        </h1>
        <p className="text-gray-500 mt-1">Discover millions of products across all marketplaces</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Filters */}
        <aside className="lg:w-56 shrink-0">
          <NeonCard className="p-4 space-y-6">
            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Categories</h3>
              <div className="space-y-1">
                {SAMPLE_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    href={`/shop/${cat.slug}`}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg hover:bg-[rgba(0,245,255,0.06)] group transition-colors"
                  >
                    <span className="text-gray-400 group-hover:text-[#00f5ff] text-sm flex items-center gap-2">
                      {cat.icon} {cat.name}
                    </span>
                    <span className="text-gray-600 text-xs">{cat.productCount.toLocaleString()}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Marketplace</h3>
              <div className="space-y-2">
                {MARKETPLACES.map((mp) => (
                  <label key={mp} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" className="accent-[#00f5ff]" />
                    <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{mp}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Price Range</h3>
              <div className="space-y-2">
                {PRICE_RANGES.map((range) => (
                  <label key={range} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="price" className="accent-[#00f5ff]" />
                    <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{range}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-sm mb-3">Rating</h3>
              <div className="space-y-2">
                {RATINGS.map((r) => (
                  <label key={r} className="flex items-center gap-2 cursor-pointer group">
                    <input type="radio" name="rating" className="accent-[#00f5ff]" />
                    <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <NeonButton variant="outline" size="sm" className="w-full">
              Apply Filters
            </NeonButton>
          </NeonCard>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4 gap-3">
            <div className="flex items-center flex-1 bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-lg px-3 gap-2">
              <Search className="h-4 w-4 text-gray-500 shrink-0" />
              <input
                type="text"
                placeholder="Search in shop..."
                className="bg-transparent text-white text-sm py-2.5 outline-none flex-1 placeholder-gray-600"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-lg text-[#00f5ff]">
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button className="p-2 bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-lg text-gray-500 hover:text-white">
                <List className="h-4 w-4" />
              </button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-lg text-gray-400 hover:text-white text-sm">
                <SlidersHorizontal className="h-4 w-4" />
                Sort
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-sm mb-4">Showing {SAMPLE_PRODUCTS.length} products</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
            {SAMPLE_PRODUCTS.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
              const mpColors: Record<string, string> = { temu: '#ff6900', aliexpress: '#ff4747', amazon: '#ff9900', ebay: '#0064d2' };
              return (
                <NeonCard key={product.id} className="overflow-hidden group">
                  <Link href={`/product/${product.slug}`} className="block">
                    <div className="relative aspect-square overflow-hidden bg-[#0d0d15]">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute top-2 left-2">
                        <span className="bg-[#ff00ff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">-{discount}%</span>
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className="text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase" style={{ backgroundColor: (mpColors[product.marketplace] || '#00f5ff') + 'cc' }}>
                          {product.marketplace}
                        </span>
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-white text-xs font-medium line-clamp-2 group-hover:text-[#00f5ff] transition-colors mb-1">{product.name}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-yellow-400 text-xs">{'★'.repeat(Math.floor(product.rating))}</span>
                        <span className="text-gray-600 text-[10px]">({product.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#00f5ff] font-bold text-sm">{formatPrice(product.price)}</span>
                        <span className="text-gray-600 text-xs line-through">{formatPrice(product.originalPrice)}</span>
                      </div>
                    </div>
                  </Link>
                </NeonCard>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${p === 1 ? 'bg-[#00f5ff] text-black' : 'bg-[#111118] border border-[rgba(0,245,255,0.15)] text-gray-400 hover:text-[#00f5ff] hover:border-[rgba(0,245,255,0.3)]'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
