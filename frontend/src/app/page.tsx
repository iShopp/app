import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import CategoryNav from '@/components/layout/CategoryNav';
import ProductCard from '@/components/ui/ProductCard';
import TrustBadge from '@/components/ui/TrustBadge';
import Button from '@/components/ui/Button';
import { SAMPLE_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types';

const TRENDING_PRODUCTS: Product[] = [
  { id: '1', slug: 'wireless-earbuds-pro', name: 'Wireless Earbuds Pro X', description: '', price: 29.99, originalPrice: 79.99, images: ['https://placehold.co/400x400/f8fafc/334155?text=Earbuds'], category: 'Electronics', categorySlug: 'electronics', rating: 4.7, reviewCount: 1243, inStock: true, marketplace: 'temu', createdAt: '', updatedAt: '' },
  { id: '2', slug: 'smart-led-strip', name: 'Smart LED Strip 5m', description: '', price: 15.99, originalPrice: 35.99, images: ['https://placehold.co/400x400/f8fafc/334155?text=LED+Strip'], category: 'Electronics', categorySlug: 'electronics', rating: 4.5, reviewCount: 892, inStock: true, marketplace: 'aliexpress', createdAt: '', updatedAt: '' },
  { id: '3', slug: 'portable-charger', name: '20000mAh Power Bank', description: '', price: 24.99, originalPrice: 49.99, images: ['https://placehold.co/400x400/f8fafc/334155?text=Power+Bank'], category: 'Electronics', categorySlug: 'electronics', rating: 4.8, reviewCount: 2341, inStock: true, marketplace: 'amazon', createdAt: '', updatedAt: '' },
  { id: '4', slug: 'smart-watch-fit', name: 'FitPro Smart Watch', description: '', price: 39.99, originalPrice: 99.99, images: ['https://placehold.co/400x400/f8fafc/334155?text=Smart+Watch'], category: 'Electronics', categorySlug: 'electronics', rating: 4.4, reviewCount: 567, inStock: true, marketplace: 'ebay', createdAt: '', updatedAt: '' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <p className="mb-3 inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">Marketplace deals refreshed daily</p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Shop trusted global products in one place</h1>
          <p className="mb-6 max-w-2xl text-slate-600">Discover curated offers from Temu, AliExpress, Amazon and eBay with verified reviews, secure checkout and reliable delivery tracking.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/shop"><Button size="lg">Start shopping <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link href="/deals"><Button size="lg" variant="outline">Today&apos;s deals</Button></Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <TrustBadge type="secure" label="Secure checkout" />
            <TrustBadge type="shipping" label="Fast shipping" />
            <TrustBadge type="verified" label="Verified reviews" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <CategoryNav categories={SAMPLE_CATEGORIES.map(({ id, slug, name }) => ({ id, slug, name }))} />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Trending products</h2>
          <Link href="/shop" className="text-sm font-medium text-blue-700 hover:text-blue-800">See all</Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[{ icon: ShieldCheck, title: 'Buyer protection', desc: 'Refund support for eligible orders.' }, { icon: Truck, title: 'Shipping visibility', desc: 'Track every package in one dashboard.' }, { icon: CreditCard, title: 'Secure payments', desc: 'Encrypted checkout across all devices.' }].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <Icon className="mb-2 h-5 w-5 text-blue-700" />
              <p className="font-medium text-slate-900">{title}</p>
              <p className="text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
