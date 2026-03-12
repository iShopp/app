import { Search, SlidersHorizontal } from 'lucide-react';
import NeonCard from '@/components/ui/NeonCard';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

interface SearchPageProps {
  searchParams: { q?: string };
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  const results = Array.from({ length: query ? 8 : 0 }, (_, i) => ({
    id: String(i + 1),
    slug: `search-result-${i + 1}`,
    name: `${query} – Product ${i + 1}`,
    price: Number((((i * 17 + 13) % 70) + 10).toFixed(2)),
    originalPrice: Number((((i * 23 + 50) % 100) + 50).toFixed(2)),
    marketplace: ['temu', 'aliexpress', 'amazon', 'ebay'][i % 4],
    image: `https://placehold.co/300x300/111118/00f5ff?text=${encodeURIComponent(query || 'Result')}+${i + 1}`,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search bar */}
      <div className="flex items-center bg-[#111118] border border-[rgba(0,245,255,0.2)] rounded-xl px-4 gap-3 mb-6 focus-within:border-[#00f5ff] transition-colors">
        <Search className="h-5 w-5 text-[#00f5ff] shrink-0" />
        <input
          defaultValue={query}
          placeholder="Search products, brands, categories..."
          className="bg-transparent text-white py-4 outline-none flex-1 placeholder-gray-600 text-lg"
        />
        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white px-3 py-1.5 border border-[rgba(255,255,255,0.1)] rounded-lg">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      {query ? (
        <>
          <p className="text-gray-500 text-sm mb-6">
            {results.length > 0 ? `${results.length} results for ` : 'No results for '}
            <span className="text-white font-medium">&quot;{query}&quot;</span>
          </p>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {results.map((product) => {
                const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
                const mpColors: Record<string, string> = { temu: '#ff6900', aliexpress: '#ff4747', amazon: '#ff9900', ebay: '#0064d2' };
                return (
                  <NeonCard key={product.id} className="overflow-hidden group">
                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="relative aspect-square overflow-hidden bg-[#0d0d15]">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        <span className="absolute top-2 left-2 bg-[#ff00ff] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">-{discount}%</span>
                        <span className="absolute bottom-2 left-2 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase" style={{ backgroundColor: (mpColors[product.marketplace] || '#00f5ff') + 'cc' }}>
                          {product.marketplace}
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="text-white text-xs font-medium line-clamp-2 group-hover:text-[#00f5ff] transition-colors mb-2">{product.name}</p>
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
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-white text-xl font-semibold mb-2">No results found</p>
              <p className="text-gray-500">Try different keywords or check your spelling</p>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <Search className="h-16 w-16 text-[rgba(0,245,255,0.2)] mx-auto mb-4" />
          <p className="text-white text-xl font-semibold mb-2">Search iSHOP</p>
          <p className="text-gray-500">Find products across Temu, AliExpress, Amazon & eBay</p>
        </div>
      )}
    </div>
  );
}
