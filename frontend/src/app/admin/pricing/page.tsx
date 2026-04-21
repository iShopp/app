'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const rules = [
  { id: 1, marketplace: 'Temu', type: 'percent', value: 35, category: 'All', active: true },
  { id: 2, marketplace: 'AliExpress', type: 'percent', value: 30, category: 'Electronics', active: true },
  { id: 3, marketplace: 'Amazon', type: 'fixed', value: 15, category: 'All', active: false },
  { id: 4, marketplace: 'eBay', type: 'percent', value: 25, category: 'Accessories', active: true },
];

const mpOverview = [
  { name: 'Temu', icon: '🛒', avgMargin: 35, products: 3241, revenue: '$12,450', color: '#ff6900' },
  { name: 'AliExpress', icon: '🔴', avgMargin: 30, products: 2867, revenue: '$9,870', color: '#ff4747' },
  { name: 'Amazon', icon: '📦', avgMargin: 22, products: 1942, revenue: '$18,920', color: '#ff9900' },
  { name: 'eBay', icon: '🔵', avgMargin: 25, products: 884, revenue: '$6,990', color: '#0064d2' },
];

export default function PricingPage() {
  const [pricingRules, setPricingRules] = useState(rules);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ marketplace: 'Temu', type: 'percent', value: '', category: 'All' });

  const toggleRule = (id: number) =>
    setPricingRules((prev) => prev.map((r) => r.id === id ? { ...r, active: !r.active } : r));

  const deleteRule = (id: number) =>
    setPricingRules((prev) => prev.filter((r) => r.id !== id));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setPricingRules((prev) => [...prev, { id: Date.now(), marketplace: form.marketplace, type: form.type, value: Number(form.value), category: form.category, active: true }]);
    setForm({ marketplace: 'Temu', type: 'percent', value: '', category: 'All' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Pricing & Margins</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Rule'}
        </Button>
      </div>

      {/* Margin Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {mpOverview.map((mp) => (
          <Card key={mp.name} className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">{mp.icon}</span>
              <span className="text-white font-medium text-sm">{mp.name}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: mp.color }}>+{mp.avgMargin}%</p>
            <p className="text-gray-400 text-xs">Avg. margin</p>
            <div className="mt-2 pt-2 border-t border-[rgba(255,255,255,0.06)] space-y-1">
              <p className="text-xs text-gray-500">{mp.products.toLocaleString()} products</p>
              <p className="text-xs text-[#39ff14]">{mp.revenue} revenue</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Rule Form */}
      {showForm && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Pricing Rule</h2>
          <form onSubmit={handleAdd} className="grid sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Marketplace</label>
              <select value={form.marketplace} onChange={(e) => setForm((p) => ({ ...p, marketplace: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]">
                {['Temu', 'AliExpress', 'Amazon', 'eBay', 'All'].map((m) => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Type</label>
              <select value={form.type} onChange={(e) => setForm((p) => ({ ...p, type: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]">
                <option value="percent">% Markup</option>
                <option value="fixed">Fixed ($)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Value</label>
              <input required type="number" value={form.value} onChange={(e) => setForm((p) => ({ ...p, value: e.target.value }))} min="0"
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Category</label>
              <input value={form.category} onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))} placeholder="All"
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#00f5ff]" />
            </div>
            <div className="sm:col-span-4">
              <Button type="submit" className="w-full">Add Rule</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Rules Table */}
      <Card className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[rgba(0,245,255,0.1)]">
          <h2 className="text-lg font-semibold text-white">Active Rules</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Marketplace', 'Type', 'Value', 'Category', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingRules.map((rule) => (
                <tr key={rule.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{rule.marketplace}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm capitalize">{rule.type === 'percent' ? '% Markup' : 'Fixed'}</td>
                  <td className="px-4 py-3 text-[#00f5ff] font-bold">{rule.type === 'percent' ? `+${rule.value}%` : `+$${rule.value}`}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{rule.category}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleRule(rule.id)} className={`text-xs px-2 py-1 rounded-full transition-colors ${rule.active ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                      {rule.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteRule(rule.id)} className="text-xs text-red-400 hover:underline">Delete</button>
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
