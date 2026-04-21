import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { SAMPLE_CATEGORIES } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return SAMPLE_CATEGORIES.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category: categorySlug } = await params;
  const category = SAMPLE_CATEGORIES.find((c) => c.slug === categorySlug) || {
    name: categorySlug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    icon: '🛍️',
    productCount: 0,
  };

  const products = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    slug: `${categorySlug}-product-${i + 1}`,
    name: `${category.name} Item ${i + 1}`,
    price: Number((((i * 17 + 13) % 70) + 10).toFixed(2)),
    originalPrice: Number((((i * 23 + 50) % 100) + 50).toFixed(2)),
    marketplace: ['temu', 'aliexpress', 'amazon', 'ebay'][i % 4],
    image: `https://placehold.co/400x400/111118/00f5ff?text=${encodeURIComponent(category.name)}`,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00f5ff] transition-colors mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="mb-8 flex items-center gap-4">
        <span className="text-5xl">{('icon' in category) ? category.icon : '🛍️'}</span>
        <div>
          <h1 className="text-3xl font-bold text-white">{category.name}</h1>
          <p className="text-gray-500 mt-1">{category.productCount.toLocaleString()} products</p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => {
          const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
          const mpColors: Record<string, string> = { temu: '#ff6900', aliexpress: '#ff4747', amazon: '#ff9900', ebay: '#0064d2' };
          return (
            <Card key={product.id} className="overflow-hidden group">
              <Link href={`/product/${product.slug}`} className="block">
                <div className="relative aspect-square overflow-hidden bg-[#0d0d15]">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
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
            </Card>
          );
        })}
      </div>
    </div>
  );
}
