'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import { formatPrice, formatDate } from '@/lib/utils';
import Link from 'next/link';

const allOrders = [
  { id: 'ORD-001', date: '2024-01-05', items: [{ name: 'Wireless Headphones', img: '🎧' }], total: 89.99, status: 'delivered' },
  { id: 'ORD-002', date: '2024-01-10', items: [{ name: 'Smart Watch', img: '⌚' }], total: 199.99, status: 'shipped' },
  { id: 'ORD-003', date: '2024-01-15', items: [{ name: 'USB-C Hub', img: '🔌' }, { name: 'Cable', img: '🔋' }], total: 45.50, status: 'processing' },
  { id: 'ORD-004', date: '2024-01-20', items: [{ name: 'LED Desk Lamp', img: '💡' }], total: 34.99, status: 'pending' },
  { id: 'ORD-005', date: '2024-01-22', items: [{ name: 'Phone Case', img: '📱' }], total: 12.99, status: 'cancelled' },
];

const tabs = ['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'];

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  processing: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  shipped: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  delivered: 'text-green-400 bg-green-400/10 border-green-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all' ? allOrders : allOrders.filter((o) => o.status === activeTab);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">My Orders</h1>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all border ${
              activeTab === tab
                ? 'bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff]'
                : 'text-gray-400 border-[rgba(0,245,255,0.2)] hover:border-[rgba(0,245,255,0.5)] hover:text-[#00f5ff]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <Card className="p-8 text-center">
            <p className="text-gray-400">No orders found.</p>
          </Card>
        )}
        {filtered.map((order) => (
          <Card key={order.id} className="p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {order.items.slice(0, 3).map((item, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg bg-[#0d0d15] border border-[rgba(0,245,255,0.15)] flex items-center justify-center text-xl"
                    >
                      {item.img}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-[#00f5ff] font-mono font-medium">{order.id}</p>
                  <p className="text-gray-400 text-sm">{formatDate(order.date)} · {order.items.length} item{order.items.length > 1 ? 's' : ''}</p>
                  <p className="text-gray-300 text-sm">{order.items.map((i) => i.name).join(', ')}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-white font-bold text-lg">{formatPrice(order.total)}</p>
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                  <div className="flex flex-col gap-2">
                    <Link
                      href={`/users/orders/${order.id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-600 bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-100 transition-colors hover:bg-slate-800"
                    >
                      View
                    </Link>
                    {order.status === 'shipped' && (
                      <Link
                        href="/users/track"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-orange-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-orange-600"
                      >
                        Track
                      </Link>
                    )}
                  </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
