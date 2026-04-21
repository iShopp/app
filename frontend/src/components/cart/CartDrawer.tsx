'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import type { Product } from '@/types';
import { formatPrice } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: Array<{ id: string; product: Pick<Product, 'name'>; quantity: number; price: number }>;
}

export default function CartDrawer({ open, onClose, items }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className={`fixed inset-0 z-50 transition ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      <button aria-label="Close cart drawer" className={`absolute inset-0 bg-slate-900/40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} onClick={onClose} />
      <aside className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-xl transition-transform ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h3 className="text-lg font-semibold text-slate-900">Your Cart</h3>
          <button onClick={onClose} className="rounded p-1 text-slate-500 hover:bg-slate-100"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {items.map((item) => (
            <div key={item.id} className="rounded-lg border border-slate-200 p-3">
              <p className="text-sm font-medium text-slate-900">{item.product.name}</p>
              <p className="text-xs text-slate-500">Qty {item.quantity}</p>
              <p className="text-sm font-semibold text-slate-800">{formatPrice(item.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-auto border-t border-slate-200 p-4">
          <div className="mb-3 flex justify-between text-sm"><span className="text-slate-500">Total</span><span className="font-semibold text-slate-900">{formatPrice(total)}</span></div>
          <Link href="/checkout" onClick={onClose}><Button className="w-full">Checkout</Button></Link>
        </div>
      </aside>
    </div>
  );
}
