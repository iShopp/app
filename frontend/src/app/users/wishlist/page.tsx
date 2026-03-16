'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatPrice } from '@/lib/utils';

const initialWishlist = [
  { id: 1, name: 'Wireless Noise-Cancelling Headphones', price: 89.99, originalPrice: 149.99, img: '🎧', category: 'Electronics', inStock: true },
  { id: 2, name: 'Smart Fitness Band Pro', price: 49.99, originalPrice: 79.99, img: '⌚', category: 'Wearables', inStock: true },
  { id: 3, name: 'Portable Bluetooth Speaker', price: 34.99, originalPrice: 59.99, img: '🔊', category: 'Audio', inStock: false },
  { id: 4, name: 'Mechanical Keyboard RGB', price: 79.99, originalPrice: 129.99, img: '⌨️', category: 'Accessories', inStock: true },
  { id: 5, name: 'LED Desk Lamp Smart', price: 29.99, originalPrice: 49.99, img: '💡', category: 'Home', inStock: true },
  { id: 6, name: 'Fast Wireless Charger Pad', price: 19.99, originalPrice: 39.99, img: '🔌', category: 'Accessories', inStock: true },
];

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState(initialWishlist);
  const [added, setAdded] = useState<number[]>([]);

  const removeItem = (id: number) => setWishlist((prev) => prev.filter((p) => p.id !== id));
  const addToCart = (id: number) => setAdded((prev) => [...prev, id]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">
          My Wishlist <span className="text-gray-500 text-lg">({wishlist.length})</span>
        </h1>
      </div>

      {wishlist.length === 0 ? (
        <NeonCard className="p-12 text-center">
          <p className="text-4xl mb-3">❤️</p>
          <p className="text-gray-400">Your wishlist is empty.</p>
          <div className="mt-4">
            <a href="/shop"><NeonButton>Browse Products</NeonButton></a>
          </div>
        </NeonCard>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => {
            const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
            const isAdded = added.includes(product.id);
            return (
              <NeonCard key={product.id} className="p-4 flex flex-col">
                <div className="relative mb-3">
                  <div className="w-full h-36 rounded-lg bg-[#0d0d15] border border-[rgba(0,245,255,0.08)] flex items-center justify-center text-5xl">
                    {product.img}
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 hover:bg-red-500/40 transition-colors text-xs"
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                  <span className="absolute top-2 left-2 bg-[#ff00ff] text-white text-xs px-1.5 py-0.5 rounded font-bold">
                    -{discount}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</p>
                <p className="text-white font-medium flex-1 mb-2">{product.name}</p>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[#00f5ff] font-bold">{formatPrice(product.price)}</span>
                  <span className="text-gray-500 line-through text-sm">{formatPrice(product.originalPrice)}</span>
                </div>
                <div className="space-y-2">
                  {!product.inStock ? (
                    <p className="text-red-400 text-sm text-center py-1">Out of Stock</p>
                  ) : (
                    <NeonButton
                      className="w-full"
                      onClick={() => addToCart(product.id)}
                      disabled={isAdded}
                    >
                      {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
                    </NeonButton>
                  )}
                </div>
              </NeonCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
