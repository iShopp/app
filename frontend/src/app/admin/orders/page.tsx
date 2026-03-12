'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatPrice, formatDate } from '@/lib/utils';

const allOrders = [
  { id: 'ORD-1247', customer: 'Sarah K.', email: 'sarah@example.com', items: 3, total: 124.99, status: 'shipped', date: '2024-01-25' },
  { id: 'ORD-1246', customer: 'Mike R.', email: 'mike@example.com', items: 1, total: 89.50, status: 'processing', date: '2024-01-25' },
  { id: 'ORD-1245', customer: 'Lisa T.', email: 'lisa@example.com', items: 5, total: 234.00, status: 'delivered', date: '2024-01-24' },
  { id: 'ORD-1244', customer: 'James W.', email: 'james@example.com', items: 2, total: 45.99, status: 'pending', date: '2024-01-24' },
  { id: 'ORD-1243', customer: 'Emma L.', email: 'emma@example.com', items: 1, total: 178.25, status: 'cancelled', date: '2024-01-23' },
  { id: 'ORD-1242', customer: 'David B.', email: 'david@example.com', items: 4, total: 312.00, status: 'delivered', date: '2024-01-22' },
];

const tabs = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  processing: 'text-purple-400 bg-purple-400/10',
  shipped: 'text-cyan-400 bg-cyan-400/10',
  delivered: 'text-green-400 bg-green-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all');
  const filtered = activeTab === 'all' ? allOrders : allOrders.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Customer Orders</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all border ${activeTab === tab ? 'bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff]' : 'text-gray-400 border-[rgba(0,245,255,0.2)] hover:border-[rgba(0,245,255,0.5)] hover:text-[#00f5ff]'}`}>
            {tab}
          </button>
        ))}
      </div>

      <NeonCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Order#', 'Customer', 'Email', 'Items', 'Total', 'Status', 'Date', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order) => (
                <tr key={order.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00f5ff] font-mono text-sm">{order.id}</td>
                  <td className="px-4 py-3 text-white text-sm font-medium">{order.customer}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{order.email}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{order.items}</td>
                  <td className="px-4 py-3 text-white font-medium">{formatPrice(order.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(order.date)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#00f5ff] hover:underline">View</button>
                      <button className="text-xs text-gray-400 hover:underline">Edit</button>
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
