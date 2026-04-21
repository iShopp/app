import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

const kpis = [
  { label: 'Total Earned', value: '$1,420.50', icon: '💰', color: '#39ff14' },
  { label: 'This Month', value: '$287.30', icon: '📅', color: '#00f5ff' },
  { label: 'Pending', value: '$134.20', icon: '⏳', color: '#ff00ff' },
  { label: 'Total Clicks', value: '8,432', icon: '🖱️', color: '#9d4edd' },
];

const chartBars = [45, 78, 62, 95, 83, 110, 98, 134, 120, 156, 142, 180, 165, 210];
const maxBar = Math.max(...chartBars);

const conversions = [
  { date: '2024-01-25', order: 'ORD-1247', product: 'Wireless Headphones', amount: 89.99, commission: 13.50, status: 'paid' },
  { date: '2024-01-24', order: 'ORD-1245', product: 'Smart Watch X Pro', amount: 179.99, commission: 27.00, status: 'paid' },
  { date: '2024-01-22', order: 'ORD-1240', product: 'Bluetooth Speaker', amount: 34.99, commission: 5.25, status: 'pending' },
  { date: '2024-01-20', order: 'ORD-1236', product: 'RGB Keyboard', amount: 79.99, commission: 12.00, status: 'paid' },
  { date: '2024-01-18', order: 'ORD-1229', product: 'Phone Case', amount: 12.99, commission: 1.95, status: 'pending' },
];

const statusColors: Record<string, string> = {
  paid: 'text-green-400 bg-green-400/10',
  pending: 'text-yellow-400 bg-yellow-400/10',
};

export default function AffiliateDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Affiliate Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Your referral code: <span className="text-[#00f5ff] font-mono font-bold">JOHN20</span></p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <Card key={k.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{k.icon}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: k.color }}>{k.value}</p>
            <p className="text-gray-400 text-xs mt-1">{k.label}</p>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Earnings Trend (Last 14 days)</h2>
        <div className="flex items-end gap-1.5 h-28">
          {chartBars.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm transition-all"
                style={{
                  height: `${(val / maxBar) * 100}%`,
                  background: `linear-gradient(to top, #00f5ff, #ff00ff)`,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </Card>

      {/* Recent Conversions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Conversions</h2>
          <a href="/affiliate/conversions" className="text-[#00f5ff] text-sm hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Date', 'Order', 'Product', 'Sale', 'Commission', 'Status'].map((h) => (
                  <th key={h} className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conversions.map((c) => (
                <tr key={c.order} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-3 py-3 text-gray-400 text-sm">{formatDate(c.date)}</td>
                  <td className="px-3 py-3 text-[#00f5ff] font-mono text-sm">{c.order}</td>
                  <td className="px-3 py-3 text-gray-300 text-sm">{c.product}</td>
                  <td className="px-3 py-3 text-white">${c.amount.toFixed(2)}</td>
                  <td className="px-3 py-3 text-[#39ff14] font-bold">+${c.commission.toFixed(2)}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[c.status]}`}>
                      {c.status}
                    </span>
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
