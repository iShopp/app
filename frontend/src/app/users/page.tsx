import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import Badge from '@/components/ui/Badge';
import { formatPrice, formatDate } from '@/lib/utils';

const stats = [
  { label: 'Total Orders', value: '24', icon: '📦', color: '#00f5ff' },
  { label: 'Active Orders', value: '3', icon: '🚚', color: '#ff00ff' },
  { label: 'Saved Amount', value: '$142.50', icon: '💰', color: '#39ff14' },
  { label: 'Reward Points', value: '1,250', icon: '⭐', color: '#9d4edd' },
];

const recentOrders = [
  { id: 'ORD-001', date: '2024-01-15', items: 3, total: 89.99, status: 'delivered' },
  { id: 'ORD-002', date: '2024-01-20', items: 1, total: 34.99, status: 'shipped' },
  { id: 'ORD-003', date: '2024-01-25', items: 2, total: 59.99, status: 'processing' },
];

const quickLinks = [
  { label: 'Track Order', icon: '🗺️', href: '/users/track' },
  { label: 'My Wishlist', icon: '❤️', href: '/users/wishlist' },
  { label: 'Addresses', icon: '📍', href: '/users/addresses' },
  { label: 'Payment', icon: '💳', href: '/users/payment' },
  { label: 'Coupons', icon: '🎫', href: '/users/coupons' },
  { label: 'Settings', icon: '⚙️', href: '/users/settings' },
];

const statusColors: Record<string, string> = {
  pending: 'text-yellow-400 bg-yellow-400/10',
  processing: 'text-purple-400 bg-purple-400/10',
  shipped: 'text-cyan-400 bg-cyan-400/10',
  delivered: 'text-green-400 bg-green-400/10',
  cancelled: 'text-red-400 bg-red-400/10',
};

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00f5ff]/30 to-[#ff00ff]/30 border border-[rgba(0,245,255,0.3)] flex items-center justify-center text-2xl">
          👤
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back, <span className="text-[#00f5ff]">Alex</span>!</h1>
          <p className="text-gray-400 text-sm">Member since January 2024</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <NeonCard key={stat.label} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</p>
          </NeonCard>
        ))}
      </div>

      {/* Recent Orders */}
      <NeonCard className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <a href="/users/orders" className="text-[#00f5ff] text-sm hover:underline">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Order</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Date</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Items</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Total</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-3 py-3 text-[#00f5ff] font-mono text-sm">{order.id}</td>
                  <td className="px-3 py-3 text-gray-300 text-sm">{formatDate(order.date)}</td>
                  <td className="px-3 py-3 text-gray-300 text-sm">{order.items} items</td>
                  <td className="px-3 py-3 text-white font-medium">{formatPrice(order.total)}</td>
                  <td className="px-3 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>

      {/* Quick Links */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[rgba(0,245,255,0.1)] bg-[#0d0d15] hover:border-[rgba(0,245,255,0.4)] hover:bg-[rgba(0,245,255,0.05)] transition-all group"
            >
              <span className="text-2xl">{link.icon}</span>
              <span className="text-xs text-gray-400 group-hover:text-[#00f5ff] transition-colors text-center">{link.label}</span>
            </a>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
