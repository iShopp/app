'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { cn, formatPrice, getMarketplaceColor } from '@/lib/utils';
import type { Product } from '@/types';
import Badge from './Badge';
import NeonButton from './NeonButton';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

export default function ProductCard({ product, onAddToCart, className }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const marketplaceColor = getMarketplaceColor(product.marketplace);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        'group bg-[#111118] border border-[rgba(0,245,255,0.1)] rounded-xl overflow-hidden transition-all duration-300',
        'hover:border-[rgba(0,245,255,0.35)] hover:shadow-[0_0_20px_rgba(0,245,255,0.12)]',
        className
      )}
    >
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative overflow-hidden aspect-square bg-[#0d0d15]">
        {!imgError ? (
          <Image
            src={product.images[0] || 'https://placehold.co/400x400/111118/00f5ff?text=Product'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImgError(true)}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[#00f5ff] text-4xl">🛍️</div>
        )}
        {discount > 0 && (
          <div className="absolute top-2 left-2">
            <span className="bg-[#ff00ff] text-white text-xs font-bold px-2 py-1 rounded-full shadow-[0_0_10px_rgba(255,0,255,0.4)]">
              -{discount}%
            </span>
          </div>
        )}
        <button
          onClick={(e) => { e.preventDefault(); setIsWishlisted((v) => !v); }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 backdrop-blur-sm transition-colors hover:bg-black/70"
        >
          <Heart
            className={cn('h-4 w-4 transition-colors', isWishlisted ? 'fill-[#ff00ff] text-[#ff00ff]' : 'text-gray-400')}
          />
        </button>
        {/* Marketplace badge */}
        <div className="absolute bottom-2 left-2">
          <span
            className="text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase"
            style={{ backgroundColor: marketplaceColor + 'cc' }}
          >
            {product.marketplace}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="p-3">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-sm text-white font-medium line-clamp-2 hover:text-[#00f5ff] transition-colors mb-1">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  'h-3 w-3',
                  i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                )}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#00f5ff] font-bold text-base">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-gray-500 text-sm line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        <NeonButton
          variant="outline"
          size="sm"
          className="w-full"
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Add to Cart
        </NeonButton>
      </div>
    </div>
  );
}
