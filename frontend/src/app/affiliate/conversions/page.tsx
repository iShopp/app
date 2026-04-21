import Card from '@/components/ui/Card';
import { formatDate } from '@/lib/utils';

const conversions = [
  { date: '2024-01-25', order: 'ORD-1247', product: 'Wireless Headphones Pro', amount: 89.99, commission: 13.50, status: 'paid' },
  { date: '2024-01-24', order: 'ORD-1245', product: 'Smart Watch X Pro', amount: 179.99, commission: 27.00, status: 'paid' },
  { date: '2024-01-22', order: 'ORD-1240', product: 'Bluetooth Speaker Mini', amount: 34.99, commission: 5.25, status: 'pending' },
  { date: '2024-01-20', order: 'ORD-1236', product: 'RGB Mechanical Keyboard', amount: 79.99, commission: 12.00, status: 'paid' },
  { date: '2024-01-18', order: 'ORD-1229', product: 'Phone Case MagSafe', amount: 12.99, commission: 1.95, status: 'pending' },
  { date: '2024-01-15', order: 'ORD-1220', product: 'Smart LED Desk Lamp', amount: 29.99, commission: 4.50, status: 'paid' },
  { date: '2024-01-12', order: 'ORD-1210', product: 'Fast Wireless Charger', amount: 19.99, commission: 3.00, status: 'paid' },
  { date: '2024-01-10', order: 'ORD-1198', product: 'USB-C Hub 7-Port', amount: 45.99, commission: 6.90, status: 'paid' },
];

const statusColors: Record<string, string> = {
  paid: 'text-green-400 bg-green-400/10',
  pending: 'text-yellow-400 bg-yellow-400/10',
  rejected: 'text-red-400 bg-red-400/10',
};

export default function ConversionsPage() {
  const total = conversions.reduce((s, c) => s + c.commission, 0);
  const pending = conversions.filter((c) => c.status === 'pending').reduce((s, c) => s + c.commission, 0);
  const paid = conversions.filter((c) => c.status === 'paid').reduce((s, c) => s + c.commission, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Conversions</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total Commissions</p>
          <p className="text-2xl font-bold text-[#00f5ff]">${total.toFixed(2)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Paid Out</p>
          <p className="text-2xl font-bold text-[#39ff14]">${paid.toFixed(2)}</p>
        </Card>
        <Card className="p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Pending</p>
          <p className="text-2xl font-bold text-yellow-400">${pending.toFixed(2)}</p>
        </Card>
      </div>

      {/* Conversions Table */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Date', 'Order#', 'Product', 'Sale Amount', 'Commission', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {conversions.map((c) => (
                <tr key={c.order} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(c.date)}</td>
                  <td className="px-4 py-3 text-[#00f5ff] font-mono text-sm">{c.order}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{c.product}</td>
                  <td className="px-4 py-3 text-white font-medium">${c.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-[#39ff14] font-bold">+${c.commission.toFixed(2)}</td>
                  <td className="px-4 py-3">
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
