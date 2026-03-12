'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import NeonCard from '@/components/ui/NeonCard';
import { formatPrice } from '@/lib/utils';

const MOCK_CART_ITEMS = [
  { id: '1', name: 'Wireless Earbuds Pro X', price: 29.99, originalPrice: 79.99, quantity: 1, image: 'https://placehold.co/100x100/111118/00f5ff?text=Earbuds', variant: 'Black', marketplace: 'temu' },
  { id: '2', name: 'Smart RGB LED Strip 5m', price: 15.99, originalPrice: 35.99, quantity: 2, image: 'https://placehold.co/100x100/111118/ff00ff?text=LED', variant: null, marketplace: 'aliexpress' },
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item).filter(Boolean));
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <ShoppingCart className="h-20 w-20 text-[rgba(0,245,255,0.15)] mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-white mb-3">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some neon-lit products to get started!</p>
        <Link href="/shop"><NeonButton variant="primary" size="lg">Start Shopping</NeonButton></Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
        <ShoppingCart className="h-7 w-7 text-[#00f5ff]" />
        Shopping Cart <span className="text-gray-500 text-xl font-normal">({items.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <NeonCard key={item.id} className="p-4 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-[#0d0d15]" />
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-medium text-sm line-clamp-2 mb-1">{item.name}</h3>
                {item.variant && <p className="text-gray-500 text-xs mb-2">Variant: {item.variant}</p>}
                <span className="text-[10px] text-white font-bold px-2 py-0.5 rounded-full uppercase" style={{ backgroundColor: item.marketplace === 'temu' ? '#ff6900cc' : item.marketplace === 'aliexpress' ? '#ff4747cc' : '#ff9900cc' }}>
                  {item.marketplace}
                </span>
              </div>
              <div className="flex flex-col items-end gap-3 shrink-0">
                <div className="flex items-center border border-[rgba(0,245,255,0.2)] rounded-lg overflow-hidden">
                  <button onClick={() => updateQty(item.id, -1)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[rgba(0,245,255,0.08)] transition-colors">
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-3 text-white text-sm font-medium">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-1.5 text-gray-400 hover:text-white hover:bg-[rgba(0,245,255,0.08)] transition-colors">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-[#00f5ff] font-bold">{formatPrice(item.price * item.quantity)}</span>
                <button onClick={() => remove(item.id)} className="text-gray-600 hover:text-red-400 transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </NeonCard>
          ))}
        </div>

        {/* Summary */}
        <div>
          <NeonCard className="p-5 sticky top-20">
            <h2 className="text-lg font-bold text-white mb-5">Order Summary</h2>

            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="text-white">{formatPrice(subtotal)}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Discount (10%)</span>
                  <span className="text-[#39ff14]">-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className={shipping === 0 ? 'text-[#39ff14]' : 'text-white'}>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="border-t border-[rgba(0,245,255,0.1)] pt-3 flex justify-between">
                <span className="text-white font-semibold">Total</span>
                <span className="text-[#00f5ff] font-bold text-lg">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Coupon */}
            <div className="flex gap-2 mb-5">
              <div className="flex-1 flex items-center bg-[#0a0a0f] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 gap-2">
                <Tag className="h-4 w-4 text-gray-500 shrink-0" />
                <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code" className="bg-transparent text-white text-sm py-2 outline-none flex-1 placeholder-gray-600" />
              </div>
              <NeonButton variant="outline" size="sm" onClick={() => setCouponApplied(!!coupon)}>Apply</NeonButton>
            </div>
            {couponApplied && <p className="text-[#39ff14] text-xs mb-4">✓ Coupon applied! 10% off</p>}

            <Link href="/checkout">
              <NeonButton variant="primary" size="lg" className="w-full">
                Checkout <ArrowRight className="h-4 w-4" />
              </NeonButton>
            </Link>

            <Link href="/shop">
              <NeonButton variant="ghost" size="sm" className="w-full mt-2">Continue Shopping</NeonButton>
            </Link>
          </NeonCard>
        </div>
      </div>
    </div>
  );
}
