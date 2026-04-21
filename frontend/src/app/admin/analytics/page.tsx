'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';

const periods = ['7d', '30d', '90d'];

const barData: Record<string, number[]> = {
  '7d': [1200, 1800, 1400, 2100, 1700, 2400, 1900],
  '30d': [4200, 5100, 3900, 6200, 5400, 7100, 6800, 5200, 4900, 7400],
  '90d': [12000, 14500, 11000, 16000, 13500, 18000, 15000, 14000, 17000, 16500, 19000, 21000],
};

const kpis: Record<string, Array<{ label: string; value: string; change: string; color: string }>> = {
  '7d': [
    { label: 'Revenue', value: '$12,450', change: '+8.2%', color: '#00f5ff' },
    { label: 'Orders', value: '287', change: '+12.1%', color: '#ff00ff' },
    { label: 'New Customers', value: '143', change: '+5.3%', color: '#9d4edd' },
    { label: 'Conversion Rate', value: '3.2%', change: '+0.4%', color: '#39ff14' },
  ],
  '30d': [
    { label: 'Revenue', value: '$48,230', change: '+15.4%', color: '#00f5ff' },
    { label: 'Orders', value: '1,247', change: '+9.7%', color: '#ff00ff' },
    { label: 'New Customers', value: '589', change: '+18.2%', color: '#9d4edd' },
    { label: 'Conversion Rate', value: '3.8%', change: '+0.6%', color: '#39ff14' },
  ],
  '90d': [
    { label: 'Revenue', value: '$134,800', change: '+22.1%', color: '#00f5ff' },
    { label: 'Orders', value: '3,891', change: '+19.3%', color: '#ff00ff' },
    { label: 'New Customers', value: '1,734', change: '+24.5%', color: '#9d4edd' },
    { label: 'Conversion Rate', value: '4.1%', change: '+0.9%', color: '#39ff14' },
  ],
};

const topProducts = [
  { name: 'Wireless Headphones Pro', sales: 234, revenue: '$21,067', img: '🎧' },
  { name: 'Smart Watch X Pro', sales: 187, revenue: '$33,633', img: '⌚' },
  { name: 'RGB Mechanical Keyboard', sales: 156, revenue: '$12,479', img: '⌨️' },
  { name: 'Bluetooth Speaker Mini', sales: 143, revenue: '$5,004', img: '🔊' },
  { name: 'Smart LED Desk Lamp', sales: 98, revenue: '$2,939', img: '💡' },
];

const trafficSources = [
  { name: 'Temu', pct: 38, color: '#ff6900' },
  { name: 'AliExpress', pct: 28, color: '#ff4747' },
  { name: 'Amazon', pct: 20, color: '#ff9900' },
  { name: 'eBay', pct: 9, color: '#0064d2' },
  { name: 'Direct', pct: 5, color: '#00f5ff' },
];

export default function AnalyticsPage() {
  const [period, setPeriod] = useState('30d');
  const bars = barData[period];
  const maxBar = Math.max(...bars);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <div className="flex gap-2">
          {periods.map((p) => (
            <button key={p} onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${period === p ? 'bg-[#00f5ff] text-[#0a0a0f] border-[#00f5ff]' : 'text-gray-400 border-[rgba(0,245,255,0.2)] hover:border-[rgba(0,245,255,0.5)]'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis[period].map((k) => (
          <Card key={k.label} className="p-4">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{k.label}</p>
            <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
            <p className="text-green-400 text-xs mt-1">↑ {k.change}</p>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Revenue Trend</h2>
        <div className="flex items-end gap-1.5 h-36">
          {bars.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm transition-all"
                style={{
                  height: `${(val / maxBar) * 100}%`,
                  background: `linear-gradient(to top, #00f5ff, #ff00ff)`,
                  opacity: 0.7 + (val / maxBar) * 0.3,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>Start</span>
          <span>Mid</span>
          <span>End</span>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Top Products</h2>
          <div className="space-y-3">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-gray-500 text-sm w-4">{i + 1}</span>
                <span className="text-xl">{p.img}</span>
                <div className="flex-1">
                  <p className="text-white text-sm">{p.name}</p>
                  <p className="text-gray-500 text-xs">{p.sales} sales</p>
                </div>
                <p className="text-[#00f5ff] font-medium text-sm">{p.revenue}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Traffic Sources</h2>
          <div className="space-y-3">
            {trafficSources.map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-300">{s.name}</span>
                  <span className="font-medium" style={{ color: s.color }}>{s.pct}%</span>
                </div>
                <div className="h-2 bg-[#0d0d15] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
