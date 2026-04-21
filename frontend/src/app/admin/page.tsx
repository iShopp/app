import KPICard from '@/components/admin/KPICard';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import { cn, formatPrice, formatDate } from '@/lib/utils';

import { DollarSign, ShoppingBag, Package, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const kpis: { title: string; value: string; change: string; icon: LucideIcon; color: 'cyan' | 'magenta' | 'purple' | 'green' }[] = [
  { title: 'Total Revenue', value: '$48,230', change: '+12.5%', icon: DollarSign, color: 'cyan' },
  { title: 'Total Orders', value: '1,247', change: '+8.3%', icon: ShoppingBag, color: 'magenta' },
  { title: 'Active Products', value: '8,934', change: '+23.1%', icon: Package, color: 'purple' },
  { title: 'Total Customers', value: '3,421', change: '+5.7%', icon: Users, color: 'green' },
];

const recentOrders = [
  { id: 'ORD-1247', customer: 'Sarah K.', total: 124.99, status: 'shipped', date: '2024-01-25' },
  { id: 'ORD-1246', customer: 'Mike R.', total: 89.50, status: 'processing', date: '2024-01-25' },
  { id: 'ORD-1245', customer: 'Lisa T.', total: 234.00, status: 'delivered', date: '2024-01-24' },
  { id: 'ORD-1244', customer: 'James W.', total: 45.99, status: 'pending', date: '2024-01-24' },
  { id: 'ORD-1243', customer: 'Emma L.', total: 178.25, status: 'cancelled', date: '2024-01-23' },
];

const marketplaces = [
  { name: 'Temu', icon: '🛒', status: 'connected', products: 3241, lastSync: '5 min ago', color: '#ff6900' },
  { name: 'AliExpress', icon: '🔴', status: 'connected', products: 2867, lastSync: '12 min ago', color: '#ff4747' },
  { name: 'Amazon', icon: '📦', status: 'connected', products: 1942, lastSync: '1 hour ago', color: '#ff9900' },
  { name: 'eBay', icon: '🔵', status: 'syncing', products: 884, lastSync: 'Syncing...', color: '#0064d2' },
];

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  processing: 'text-purple-400 bg-purple-400/10',
  shipped: 'text-cyan-400 bg-cyan-400/10',
  delivered: 'text-green-400 bg-green-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

const quickActionBaseClass = 'inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400/30';
const quickActionPrimaryClass = cn(quickActionBaseClass, 'bg-orange-500 text-white hover:bg-orange-600');
const quickActionOutlineClass = cn(quickActionBaseClass, 'border border-slate-600 bg-slate-900 text-slate-100 hover:bg-slate-800');

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm">{formatDate(new Date().toISOString())}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <KPICard key={kpi.title} title={kpi.title} value={kpi.value} change={kpi.change} icon={kpi.icon} color={kpi.color} />
        ))}
      </div>

      {/* Recent Orders & Marketplace Sync */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Orders Table */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
            <a href="/admin/orders" className="text-[#00f5ff] text-sm hover:underline">View all →</a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                  {['Order#', 'Customer', 'Total', 'Status', 'Date'].map((h) => (
                    <th key={h} className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                    <td className="px-3 py-3 text-[#00f5ff] font-mono text-sm">{order.id}</td>
                    <td className="px-3 py-3 text-gray-300 text-sm">{order.customer}</td>
                    <td className="px-3 py-3 text-white font-medium">{formatPrice(order.total)}</td>
                    <td className="px-3 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-gray-400 text-sm">{formatDate(order.date)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Marketplace Sync */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Marketplace Sync</h2>
          <div className="space-y-3">
            {marketplaces.map((mp) => (
              <div key={mp.name} className="p-3 rounded-lg bg-[#0d0d15] border border-[rgba(255,255,255,0.05)]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{mp.icon}</span>
                    <span className="text-white font-medium text-sm">{mp.name}</span>
                  </div>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${mp.status === 'connected' ? 'text-green-400 bg-green-400/10' : 'text-yellow-400 bg-yellow-400/10'}`}>
                    {mp.status}
                  </span>
                </div>
                <p className="text-gray-500 text-xs">{mp.products.toLocaleString()} products · {mp.lastSync}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/products/import" className={quickActionPrimaryClass}>📥 Import Products</Link>
          <Link href="/admin/pricing" className={quickActionOutlineClass}>💲 Sync Prices</Link>
          <Link href="/admin/analytics" className={quickActionOutlineClass}>📊 View Analytics</Link>
          <Link href="/admin/automation" className={quickActionOutlineClass}>⚙️ Automation</Link>
        </div>
      </Card>
    </div>
  );
}
