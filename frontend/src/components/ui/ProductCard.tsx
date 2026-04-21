'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart } from 'lucide-react';
import { cn, formatPrice, getMarketplaceColor } from '@/lib/utils';
import type { Product } from '@/types';
import RatingStars from './RatingStars';
import TrustBadge from './TrustBadge';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
  view?: 'grid' | 'list';
}

export default function ProductCard({ product, onAddToCart, className, view = 'grid' }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const marketplaceColor = getMarketplaceColor(product.marketplace);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const isList = view === 'list';

  return (
    <div className={cn('group overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:shadow-md', isList && 'flex gap-4 p-3', className)}>
      <div className={cn('relative overflow-hidden bg-slate-100', isList ? 'h-28 w-28 shrink-0 rounded-lg' : 'aspect-square')}>
        <Link href={`/product/${product.slug}`} className="block h-full w-full" aria-label={`View ${product.name}`}>
          {!imgError ? (
            <Image
              src={product.images[0] || 'https://placehold.co/400x400/f8fafc/64748b?text=Product'}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-4xl">🛍️</div>
          )}
          {discount > 0 && (
            <div className="absolute top-2 left-2">
              <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">-{discount}%</span>
            </div>
          )}
        </Link>
        <button
          type="button"
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setIsWishlisted((v) => !v)}
          className="absolute top-2 right-2 rounded-full bg-white/80 p-1.5 transition-colors hover:bg-white"
        >
          <Heart className={cn('h-4 w-4 transition-colors', isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-500')} />
        </button>
      </div>

      <div className={cn('p-3', isList && 'flex flex-1 flex-col p-0')}>
        <div className="mb-2 flex items-center justify-between">
          <span className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase text-white" style={{ backgroundColor: marketplaceColor }}>
            {product.marketplace}
          </span>
          <TrustBadge type="shipping" label="Fast shipping" />
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="mb-1 line-clamp-2 text-sm font-medium text-slate-900 transition-colors hover:text-blue-700">{product.name}</h3>
        </Link>

        <div className="mb-2 flex items-center gap-1">
          <RatingStars rating={product.rating} />
          <span className="text-xs text-slate-500">({product.reviewCount})</span>
        </div>

        <div className="mb-3 flex items-center gap-2">
          <span className="text-base font-bold text-slate-900">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="text-sm text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>}
        </div>

        <div className="mt-auto flex items-center gap-2">
          <Button variant="outline" size="sm" className="w-full" onClick={() => onAddToCart?.(product)}>
            <ShoppingCart className="h-3.5 w-3.5" />
            Add to Cart
          </Button>
          <TrustBadge type="secure" label="Secure" />
        </div>
      </div>
    </div>
  );
}
