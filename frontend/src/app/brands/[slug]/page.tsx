import { ArrowLeft, Globe, Package } from 'lucide-react';
import Link from 'next/link';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatPrice } from '@/lib/utils';

interface BrandPageProps {
  params: { slug: string };
}

export default function BrandPage({ params }: BrandPageProps) {
  const brandName = params.slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  const products = Array.from({ length: 8 }, (_, i) => ({
    id: String(i + 1),
    slug: `${params.slug}-product-${i + 1}`,
    name: `${brandName} Product ${i + 1}`,
    price: Number((((i * 19 + 20) % 80) + 20).toFixed(2)),
    image: `https://placehold.co/300x300/111118/9d4edd?text=${encodeURIComponent(brandName)}`,
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/brands" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00f5ff] transition-colors mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Brands
      </Link>

      {/* Brand Header */}
      <NeonCard glowColor="purple" className="p-8 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="w-24 h-24 bg-[rgba(157,78,221,0.1)] rounded-2xl flex items-center justify-center text-[#9d4edd] font-black text-4xl border border-[rgba(157,78,221,0.3)]">
          {brandName[0]}
        </div>
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-black text-white mb-1">{brandName}</h1>
          <p className="text-gray-500 mb-4">Premium quality products from {brandName}. Trusted by millions worldwide.</p>
          <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm">
            <span className="flex items-center gap-1.5 text-gray-400"><Package className="h-4 w-4 text-[#9d4edd]" /> {products.length}+ Products</span>
            <a href="#" className="flex items-center gap-1.5 text-[#00f5ff] hover:underline"><Globe className="h-4 w-4" /> Visit Website</a>
          </div>
        </div>
        <div className="sm:ml-auto">
          <NeonButton variant="outline">Follow Brand</NeonButton>
        </div>
      </NeonCard>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {products.map((product) => (
          <NeonCard key={product.id} className="overflow-hidden group">
            <Link href={`/product/${product.slug}`}>
              <div className="aspect-square overflow-hidden bg-[#0d0d15]">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-3">
                <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#00f5ff] transition-colors mb-1">{product.name}</p>
                <span className="text-[#00f5ff] font-bold">{formatPrice(product.price)}</span>
              </div>
            </Link>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}
