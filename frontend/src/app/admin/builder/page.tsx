'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const suggestions = [
  {
    id: 1,
    type: 'feature',
    title: 'Add Bundle Discount Feature',
    description: 'Implement bundle pricing where customers can get a discount when buying 3+ related items. This could increase average order value by 15-20%.',
    priority: 'high',
    status: 'pending',
  },
  {
    id: 2,
    type: 'seo',
    title: 'Optimize Product Titles for Search',
    description: '47 products have titles shorter than 40 characters. Adding keywords to titles could improve organic search visibility and click-through rates.',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 3,
    type: 'marketing',
    title: 'Launch Abandoned Cart Email Sequence',
    description: 'Cart abandonment rate is 68%. A 3-email recovery sequence (1hr, 24hr, 72hr) could recover an estimated $2,400/month in lost revenue.',
    priority: 'high',
    status: 'accepted',
  },
  {
    id: 4,
    type: 'product',
    title: 'Import Trending Smart Home Products',
    description: 'Smart home category is growing 34% YoY. Current catalog has limited options. Importing 50-100 smart home products from AliExpress recommended.',
    priority: 'medium',
    status: 'pending',
  },
  {
    id: 5,
    type: 'feature',
    title: 'Add Price Drop Alerts',
    description: 'Allow customers to subscribe to price drop notifications on wishlisted items. This drives repeat visits and conversion on previously abandoned products.',
    priority: 'low',
    status: 'rejected',
  },
];

const typeColors: Record<string, string> = {
  feature: 'text-[#00f5ff] bg-[rgba(0,245,255,0.1)] border-[rgba(0,245,255,0.3)]',
  seo: 'text-[#39ff14] bg-[rgba(57,255,20,0.1)] border-[rgba(57,255,20,0.3)]',
  marketing: 'text-[#ff00ff] bg-[rgba(255,0,255,0.1)] border-[rgba(255,0,255,0.3)]',
  product: 'text-[#9d4edd] bg-[rgba(157,78,221,0.1)] border-[rgba(157,78,221,0.3)]',
};

const priorityColors: Record<string, string> = {
  high: 'text-red-400 bg-red-400/10',
  medium: 'text-yellow-400 bg-yellow-400/10',
  low: 'text-gray-400 bg-gray-400/10',
};

const statusStyles: Record<string, string> = {
  pending: 'text-gray-400',
  accepted: 'text-green-400',
  rejected: 'text-red-400',
};

export default function BuilderPage() {
  const [items, setItems] = useState(suggestions);

  const accept = (id: number) =>
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, status: 'accepted' } : s));

  const reject = (id: number) =>
    setItems((prev) => prev.map((s) => s.id === id ? { ...s, status: 'rejected' } : s));

  const pending = items.filter((s) => s.status === 'pending');
  const reviewed = items.filter((s) => s.status !== 'pending');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Builder Suggestions</h1>
        <p className="text-gray-400 text-sm mt-1">AI-generated recommendations to grow your store</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending Review', value: pending.length, color: '#ff00ff' },
          { label: 'Accepted', value: items.filter((s) => s.status === 'accepted').length, color: '#39ff14' },
          { label: 'Rejected', value: items.filter((s) => s.status === 'rejected').length, color: '#ff4444' },
        ].map((s) => (
          <Card key={s.label} className="p-4 text-center">
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Pending */}
      {pending.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Pending Review ({pending.length})</h2>
          <div className="space-y-4">
            {pending.map((s) => (
              <Card key={s.id} className="p-5">
                <div className="flex flex-wrap items-start gap-3 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${typeColors[s.type]}`}>
                    {s.type}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${priorityColors[s.priority]}`}>
                    {s.priority} priority
                  </span>
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{s.description}</p>
                <div className="flex gap-3">
                  <Button size="sm" onClick={() => accept(s.id)}>✓ Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => reject(s.id)}>✕ Reject</Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reviewed */}
      {reviewed.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-3">Reviewed</h2>
          <div className="space-y-3">
            {reviewed.map((s) => (
              <Card key={s.id} className="p-4 opacity-70">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${typeColors[s.type]}`}>
                      {s.type}
                    </span>
                    <p className="text-gray-300 text-sm">{s.title}</p>
                  </div>
                  <span className={`text-xs font-medium capitalize ${statusStyles[s.status]}`}>
                    {s.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
