import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatPrice, formatDate } from '@/lib/utils';

const supplierOrders = [
  { id: 'SUP-0089', marketplace: 'Temu', mpIcon: '🛒', customer: 'ORD-1245', items: 2, cost: 34.50, sellPrice: 89.99, status: 'placed', date: '2024-01-24', tracking: 'TRK92817' },
  { id: 'SUP-0088', marketplace: 'AliExpress', mpIcon: '🔴', customer: 'ORD-1242', items: 1, cost: 12.30, sellPrice: 29.99, status: 'shipped', date: '2024-01-22', tracking: 'AE7712839' },
  { id: 'SUP-0087', marketplace: 'Amazon', mpIcon: '📦', customer: 'ORD-1240', items: 3, cost: 67.80, sellPrice: 178.25, status: 'delivered', date: '2024-01-20', tracking: 'AMZ001234' },
  { id: 'SUP-0086', marketplace: 'Temu', mpIcon: '🛒', customer: 'ORD-1238', items: 1, cost: 8.99, sellPrice: 19.99, status: 'failed', date: '2024-01-18', tracking: null },
  { id: 'SUP-0085', marketplace: 'eBay', mpIcon: '🔵', customer: 'ORD-1236', items: 2, cost: 45.00, sellPrice: 124.99, status: 'placed', date: '2024-01-17', tracking: 'EB88990011' },
];

const statusColors: Record<string, string> = {
  placed: 'text-yellow-400 bg-yellow-400/10',
  shipped: 'text-cyan-400 bg-cyan-400/10',
  delivered: 'text-green-400 bg-green-400/10',
  failed: 'text-red-400 bg-red-400/10',
  pending: 'text-gray-400 bg-gray-400/10',
};

export default function SupplierOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Supplier Orders</h1>
          <p className="text-gray-400 text-sm">Auto-placed orders on source marketplaces</p>
        </div>
        <NeonButton variant="outline">📥 Export CSV</NeonButton>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Supplier Orders', value: '89', color: '#00f5ff' },
          { label: 'Pending Placement', value: '4', color: '#ff00ff' },
          { label: 'Total Cost', value: '$1,234', color: '#9d4edd' },
          { label: 'Gross Margin', value: '62%', color: '#39ff14' },
        ].map((s) => (
          <NeonCard key={s.label} className="p-4">
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </NeonCard>
        ))}
      </div>

      {/* Table */}
      <NeonCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Supplier ID', 'Marketplace', 'For Order', 'Items', 'Cost', 'Sell Price', 'Margin', 'Status', 'Tracking', 'Date'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {supplierOrders.map((order) => {
                const margin = Math.round(((order.sellPrice - order.cost) / order.sellPrice) * 100);
                return (
                  <tr key={order.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-[#00f5ff] font-mono text-sm">{order.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span>{order.mpIcon}</span>
                        <span className="text-gray-300 text-sm">{order.marketplace}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-300 text-sm font-mono">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-300 text-sm">{order.items}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{formatPrice(order.cost)}</td>
                    <td className="px-4 py-3 text-white font-medium">{formatPrice(order.sellPrice)}</td>
                    <td className="px-4 py-3 text-[#39ff14] font-medium text-sm">+{margin}%</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-xs">{order.tracking || '—'}</td>
                    <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(order.date)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  );
}
