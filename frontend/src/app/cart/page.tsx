'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import CartDrawer from '@/components/cart/CartDrawer';
import { usePermissionlessRepair } from '@/hooks/usePermissionlessRepair';
import { formatPrice } from '@/lib/utils';

const MOCK_CART_ITEMS = [
  { id: '1', name: 'Wireless Earbuds Pro X', price: 29.99, quantity: 1 },
  { id: '2', name: 'Smart LED Strip 5m', price: 15.99, quantity: 2 },
];

export default function CartPage() {
  const [items, setItems] = useState(MOCK_CART_ITEMS);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const repair = usePermissionlessRepair<(typeof MOCK_CART_ITEMS)[number]>();

  const updateQty = (id: string, delta: number) => {
    setItems((prev) => prev.map((item) => item.id === id ? repair(item, { quantity: Math.max(1, item.quantity + delta) }) : item));
  };

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const drawerItems = useMemo(
    () => items.map((item) => ({ id: item.id, product: { name: item.name }, quantity: item.quantity, price: item.price })),
    [items]
  );

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <ShoppingCart className="mx-auto mb-6 h-20 w-20 text-slate-300" />
        <h2 className="mb-3 text-2xl font-bold text-slate-100">Your cart is empty</h2>
        <p className="mb-8 text-slate-400">Add products to continue.</p>
        <Link
          href="/shop"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-100">Shopping Cart</h1>
        <Button variant="outline" size="sm" onClick={() => setDrawerOpen(true)}>Open cart drawer</Button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.map((item) => (
            <Card key={item.id} className="flex items-center gap-4 p-4">
              <div className="h-20 w-20 rounded-lg bg-slate-800" />
              <div className="flex-1">
                <h3 className="text-sm font-medium text-slate-100">{item.name}</h3>
              </div>
              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                  <button onClick={() => updateQty(item.id, -1)} className="p-1.5 text-slate-500 hover:bg-slate-800"><Minus className="h-3.5 w-3.5" /></button>
                  <span className="px-3 text-sm font-medium text-slate-100">{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="p-1.5 text-slate-500 hover:bg-slate-800"><Plus className="h-3.5 w-3.5" /></button>
                </div>
                <span className="font-bold text-slate-100">{formatPrice(item.price * item.quantity)}</span>
                <button onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))} className="text-slate-400 hover:text-red-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="sticky top-20 h-fit p-5">
          <h2 className="mb-4 text-lg font-bold text-slate-100">Order Summary</h2>
          <div className="mb-4 flex justify-between border-b border-slate-700 pb-3 text-sm">
            <span className="text-slate-500">Subtotal</span>
            <span className="text-slate-100">{formatPrice(subtotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
          >
            Checkout
          </Link>
        </Card>
      </div>

      <CartDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        items={drawerItems}
      />
    </div>
  );
}
