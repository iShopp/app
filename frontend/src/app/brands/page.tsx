import Link from 'next/link';
import { Search } from 'lucide-react';
import NeonCard from '@/components/ui/NeonCard';
import Badge from '@/components/ui/Badge';

const BRANDS = [
  { slug: 'apple', name: 'Apple', productCount: 234, featured: true, letter: 'A' },
  { slug: 'adidas', name: 'Adidas', productCount: 189, featured: true, letter: 'A' },
  { slug: 'anker', name: 'Anker', productCount: 98, featured: false, letter: 'A' },
  { slug: 'baseus', name: 'Baseus', productCount: 145, featured: true, letter: 'B' },
  { slug: 'bose', name: 'Bose', productCount: 67, featured: false, letter: 'B' },
  { slug: 'canon', name: 'Canon', productCount: 88, featured: false, letter: 'C' },
  { slug: 'dyson', name: 'Dyson', productCount: 45, featured: true, letter: 'D' },
  { slug: 'garmin', name: 'Garmin', productCount: 112, featured: false, letter: 'G' },
  { slug: 'huawei', name: 'Huawei', productCount: 203, featured: true, letter: 'H' },
  { slug: 'jbl', name: 'JBL', productCount: 91, featured: false, letter: 'J' },
  { slug: 'lg', name: 'LG', productCount: 167, featured: true, letter: 'L' },
  { slug: 'nike', name: 'Nike', productCount: 312, featured: true, letter: 'N' },
  { slug: 'samsung', name: 'Samsung', productCount: 445, featured: true, letter: 'S' },
  { slug: 'sony', name: 'Sony', productCount: 278, featured: true, letter: 'S' },
  { slug: 'xiaomi', name: 'Xiaomi', productCount: 389, featured: true, letter: 'X' },
];

const LETTERS = [...new Set(BRANDS.map((b) => b.letter))].sort();

export default function BrandsPage() {
  const grouped = LETTERS.reduce((acc, letter) => {
    acc[letter] = BRANDS.filter((b) => b.letter === letter);
    return acc;
  }, {} as Record<string, typeof BRANDS>);

  const featured = BRANDS.filter((b) => b.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Brand <span className="text-[#9d4edd]">Directory</span></h1>
          <p className="text-gray-500 mt-1">{BRANDS.length} brands across all categories</p>
        </div>
        <div className="flex items-center bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-lg px-3 gap-2">
          <Search className="h-4 w-4 text-gray-500" />
          <input placeholder="Search brands..." className="bg-transparent text-white text-sm py-2.5 outline-none placeholder-gray-600 w-48" />
        </div>
      </div>

      {/* Featured */}
      <div className="mb-10">
        <h2 className="text-lg font-semibold text-gray-300 mb-4">Featured Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {featured.map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`}>
              <NeonCard className="p-4 text-center hover:scale-105 transition-transform">
                <div className="w-12 h-12 bg-[rgba(157,78,221,0.1)] rounded-xl flex items-center justify-center mx-auto mb-2 text-[#9d4edd] font-black text-xl">
                  {brand.name[0]}
                </div>
                <p className="text-white text-xs font-semibold">{brand.name}</p>
                <p className="text-gray-600 text-[10px]">{brand.productCount} items</p>
              </NeonCard>
            </Link>
          ))}
        </div>
      </div>

      {/* A-Z */}
      <div>
        <h2 className="text-lg font-semibold text-gray-300 mb-4">A–Z Directory</h2>
        <div className="space-y-6">
          {LETTERS.map((letter) => (
            <div key={letter}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl font-black text-[#9d4edd]">{letter}</span>
                <div className="flex-1 h-px bg-[rgba(157,78,221,0.2)]" />
              </div>
              <div className="flex flex-wrap gap-3">
                {grouped[letter].map((brand) => (
                  <Link key={brand.slug} href={`/brands/${brand.slug}`}>
                    <div className="flex items-center gap-2 bg-[#111118] border border-[rgba(0,245,255,0.1)] hover:border-[rgba(0,245,255,0.3)] rounded-lg px-4 py-2 transition-all hover:shadow-[0_0_10px_rgba(0,245,255,0.08)]">
                      <span className="text-white text-sm font-medium">{brand.name}</span>
                      <span className="text-gray-600 text-xs">{brand.productCount}</span>
                      {brand.featured && <Badge variant="cyan" className="text-[9px] px-1.5">Featured</Badge>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
