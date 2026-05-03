import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, CreditCard, Zap } from 'lucide-react';
import CategoryNav from '@/components/layout/CategoryNav';
import ProductCard from '@/components/ui/ProductCard';
import TrustBadge from '@/components/ui/TrustBadge';
import { SAMPLE_CATEGORIES } from '@/lib/constants';
import type { Product } from '@/types';

const TRENDING_PRODUCTS: Product[] = [
  { id: '1', slug: 'wireless-earbuds-pro', name: 'Wireless Earbuds Pro X', description: '', price: 29.99, originalPrice: 79.99, images: ['https://placehold.co/400x400/0f172a/f97316?text=Earbuds'], category: 'Electronics', categorySlug: 'electronics', rating: 4.7, reviewCount: 1243, inStock: true, marketplace: 'temu', createdAt: '', updatedAt: '' },
  { id: '2', slug: 'smart-led-strip', name: 'Smart LED Strip 5m', description: '', price: 15.99, originalPrice: 35.99, images: ['https://placehold.co/400x400/0f172a/22d3ee?text=LED+Strip'], category: 'Electronics', categorySlug: 'electronics', rating: 4.5, reviewCount: 892, inStock: true, marketplace: 'aliexpress', createdAt: '', updatedAt: '' },
  { id: '3', slug: 'portable-charger', name: '20000mAh Power Bank', description: '', price: 24.99, originalPrice: 49.99, images: ['https://placehold.co/400x400/0f172a/3b82f6?text=Power+Bank'], category: 'Electronics', categorySlug: 'electronics', rating: 4.8, reviewCount: 2341, inStock: true, marketplace: 'amazon', createdAt: '', updatedAt: '' },
  { id: '4', slug: 'smart-watch-fit', name: 'FitPro Smart Watch', description: '', price: 39.99, originalPrice: 99.99, images: ['https://placehold.co/400x400/0f172a/a855f7?text=Smart+Watch'], category: 'Electronics', categorySlug: 'electronics', rating: 4.4, reviewCount: 567, inStock: true, marketplace: 'lazada', createdAt: '', updatedAt: '' },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-[#0d1526] to-slate-900">
        {/* Background glow orbs */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-sm font-medium text-orange-400 mb-6 animate-pulse-glow">
            <Zap className="h-3.5 w-3.5" />
            Deals refreshed every hour
          </div>
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="text-white">Shop Global.</span>{' '}
            <span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent text-glow-orange">Pay Less.</span>
          </h1>
          <p className="mb-8 max-w-2xl text-slate-400 text-lg">
            Curated products from Temu, AliExpress, Amazon, eBay &amp; Lazada — verified reviews, secure checkout, and real-time delivery tracking.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 hover:bg-orange-400 animate-flash-glow"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/deals"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-base font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
            >
              Today&apos;s Deals
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <TrustBadge type="secure" label="Encrypted checkout" />
            <TrustBadge type="shipping" label="Fast shipping" />
            <TrustBadge type="verified" label="Verified reviews" />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <CategoryNav categories={SAMPLE_CATEGORIES.map(({ id, slug, name }) => ({ id, slug, name }))} />
      </section>

      {/* Trending Products */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Trending Now</h2>
            <p className="text-sm text-slate-400 mt-1">Top picks across all marketplaces</p>
          </div>
          <Link href="/shop" className="text-sm font-medium text-orange-400 hover:text-orange-300 transition-colors">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {TRENDING_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust Features */}
      <section className="border-t border-slate-800 bg-slate-900/50">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            { icon: ShieldCheck, title: 'Buyer Protection', desc: 'Full refund support for eligible orders.', color: 'text-green-400' },
            { icon: Truck, title: 'Live Tracking', desc: 'Track every package in one dashboard.', color: 'text-blue-400' },
            { icon: CreditCard, title: 'Secure Payments', desc: 'Stripe-encrypted checkout on all devices.', color: 'text-orange-400' },
          ].map(({ icon: Icon, title, desc, color }) => (
            <div key={title} className="rounded-xl border border-slate-800 bg-slate-900 p-5 hover:border-slate-700 transition-colors">
              <Icon className={`mb-3 h-6 w-6 ${color}`} />
              <p className="font-semibold text-white">{title}</p>
              <p className="mt-1 text-sm text-slate-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

