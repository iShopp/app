'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

const initialCoupons = [
  { id: 1, code: 'SAVE20', type: 'percent', value: 20, minOrder: 50, usage: 143, limit: 500, expiry: '2024-03-01', active: true },
  { id: 2, code: 'FREESHIP', type: 'shipping', value: 0, minOrder: 0, usage: 89, limit: 1000, expiry: '2024-02-15', active: true },
  { id: 3, code: 'NEON10', type: 'fixed', value: 10, minOrder: 30, usage: 67, limit: 200, expiry: '2024-02-28', active: true },
  { id: 4, code: 'VIP50', type: 'percent', value: 50, minOrder: 100, usage: 12, limit: 50, expiry: '2024-01-31', active: false },
  { id: 5, code: 'WELCOME5', type: 'percent', value: 5, minOrder: 0, usage: 334, limit: null, expiry: '2024-12-31', active: true },
];

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ code: '', type: 'percent', value: '', minOrder: '0', limit: '', expiry: '' });

  const toggleActive = (id: number) =>
    setCoupons((prev) => prev.map((c) => c.id === id ? { ...c, active: !c.active } : c));

  const deleteCoupon = (id: number) =>
    setCoupons((prev) => prev.filter((c) => c.id !== id));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setCoupons((prev) => [...prev, {
      id: Date.now(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: Number(form.value),
      minOrder: Number(form.minOrder),
      usage: 0,
      limit: form.limit ? Number(form.limit) : null,
      expiry: form.expiry,
      active: true,
    }]);
    setForm({ code: '', type: 'percent', value: '', minOrder: '0', limit: '', expiry: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Coupons</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Coupon'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Coupon</h2>
          <form onSubmit={handleAdd} className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Code</label>
              <input required value={form.code} onChange={(e) => setForm((p) => ({ ...p, code: e.target.value }))}
                placeholder="SAVE20"
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm font-mono uppercase" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Type</label>
              <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]">
                <option value="percent">% Discount</option>
                <option value="fixed">Fixed Amount</option>
                <option value="shipping">Free Shipping</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Value</label>
              <input type="number" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} min="0"
                disabled={form.type === 'shipping'}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm disabled:opacity-40" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Min Order ($)</label>
              <input type="number" value={form.minOrder} onChange={(e) => setForm((p) => ({ ...p, minOrder: e.target.value }))} min="0"
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Usage Limit</label>
              <input type="number" value={form.limit} onChange={(e) => setForm((p) => ({ ...p, limit: e.target.value }))} placeholder="Unlimited"
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Expiry Date</label>
              <input type="date" required value={form.expiry} onChange={(e) => setForm((p) => ({ ...p, expiry: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm" />
            </div>
            <div className="sm:col-span-3">
              <Button type="submit" className="w-full">Create Coupon</Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Code', 'Type', 'Value', 'Min Order', 'Usage', 'Expiry', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00f5ff] font-mono font-bold">{c.code}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm capitalize">{c.type}</td>
                  <td className="px-4 py-3 text-white font-medium">
                    {c.type === 'shipping' ? 'Free' : c.type === 'percent' ? `${c.value}%` : `$${c.value}`}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">${c.minOrder}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">
                    {c.usage}{c.limit ? `/${c.limit}` : ''}
                    {c.limit && (
                      <div className="w-16 h-1 bg-gray-700 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#00f5ff] rounded-full" style={{ width: `${Math.min(100, (c.usage / c.limit) * 100)}%` }} />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(c.expiry)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(c.id)} className={`text-xs px-2 py-1 rounded-full transition-colors ${c.active ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                      {c.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#00f5ff] hover:underline">Edit</button>
                      <button onClick={() => deleteCoupon(c.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
