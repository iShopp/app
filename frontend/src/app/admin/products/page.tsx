'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatPrice, formatDate } from '@/lib/utils';

const products = [
  { id: 1, img: '🎧', name: 'Wireless Headphones Pro', category: 'Electronics', price: 89.99, stock: 142, marketplace: 'temu', status: 'active' },
  { id: 2, img: '⌚', name: 'Smart Watch X Pro', category: 'Wearables', price: 179.99, stock: 67, marketplace: 'aliexpress', status: 'active' },
  { id: 3, img: '🔊', name: 'Bluetooth Speaker Mini', category: 'Audio', price: 34.99, stock: 0, marketplace: 'amazon', status: 'out_of_stock' },
  { id: 4, img: '⌨️', name: 'RGB Mechanical Keyboard', category: 'Accessories', price: 79.99, stock: 23, marketplace: 'temu', status: 'active' },
  { id: 5, img: '💡', name: 'Smart LED Desk Lamp', category: 'Home', price: 29.99, stock: 89, marketplace: 'ebay', status: 'active' },
  { id: 6, img: '📱', name: 'Phone Case MagSafe', category: 'Accessories', price: 12.99, stock: 5, marketplace: 'aliexpress', status: 'low_stock' },
];

const mpColors: Record<string, string> = { temu: 'text-orange-400', aliexpress: 'text-red-400', amazon: 'text-yellow-400', ebay: 'text-blue-400' };

const statusStyles: Record<string, string> = {
  active: 'text-green-400 bg-green-400/10',
  out_of_stock: 'text-red-400 bg-red-400/10',
  low_stock: 'text-yellow-400 bg-yellow-400/10',
  inactive: 'text-gray-400 bg-gray-400/10',
};

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.marketplace === filter || p.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <div className="flex gap-2">
          <a href="/admin/products/import"><NeonButton>📥 Import</NeonButton></a>
          <NeonButton variant="outline">+ Add Product</NeonButton>
        </div>
      </div>

      {/* Search & Filters */}
      <NeonCard className="p-4">
        <div className="flex flex-wrap gap-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 min-w-48 bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]"
          >
            <option value="all">All Sources</option>
            <option value="temu">Temu</option>
            <option value="aliexpress">AliExpress</option>
            <option value="amazon">Amazon</option>
            <option value="ebay">eBay</option>
          </select>
          <select
            className="bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="wearables">Wearables</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>
      </NeonCard>

      {/* Products Table */}
      <NeonCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Product', 'Category', 'Price', 'Stock', 'Source', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#0d0d15] flex items-center justify-center text-xl shrink-0">{p.img}</div>
                      <span className="text-white text-sm font-medium">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{p.category}</td>
                  <td className="px-4 py-3 text-[#00f5ff] font-medium">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{p.stock}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-medium capitalize ${mpColors[p.marketplace]}`}>{p.marketplace}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusStyles[p.status]}`}>
                      {p.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#00f5ff] hover:underline">Edit</button>
                      <button className="text-xs text-red-400 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  );
}
