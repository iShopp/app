'use client';

import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatDate } from '@/lib/utils';

const coupons = [
  { code: 'SAVE20', discount: '20% OFF', description: 'On orders over $50', expiry: '2024-03-01', type: 'percent', used: false },
  { code: 'FREESHIP', discount: 'Free Shipping', description: 'On any order', expiry: '2024-02-15', type: 'shipping', used: false },
  { code: 'NEON10', discount: '$10 OFF', description: 'On electronics', expiry: '2024-02-28', type: 'fixed', used: false },
  { code: 'WELCOME5', discount: '5% OFF', description: 'Welcome discount', expiry: '2024-01-01', type: 'percent', used: true },
];

const history = [
  { code: 'FLASH15', discount: '$15 OFF', usedOn: '2024-01-10', order: 'ORD-001', savings: 15 },
  { code: 'WELCOME5', discount: '5% OFF', usedOn: '2024-01-05', order: 'ORD-000', savings: 4.5 },
];

export default function CouponsPage() {
  const available = coupons.filter((c) => !c.used);
  const expired = coupons.filter((c) => c.used);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Coupons & Rewards</h1>

      {/* Reward Points */}
      <NeonCard className="p-6 bg-gradient-to-r from-[rgba(157,78,221,0.1)] to-[rgba(0,245,255,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#9d4edd]/20 border border-[#9d4edd]/40 flex items-center justify-center text-2xl">
              ⭐
            </div>
            <div>
              <p className="text-gray-400 text-sm uppercase tracking-wide">Reward Points Balance</p>
              <p className="text-3xl font-bold text-[#9d4edd]">1,250 <span className="text-lg font-normal text-gray-400">pts</span></p>
              <p className="text-gray-400 text-xs">≈ $12.50 value · 100 pts = $1</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Points expire</p>
            <p className="text-yellow-400 font-medium text-sm">Dec 31, 2024</p>
            <NeonButton size="sm" className="mt-2">Redeem Points</NeonButton>
          </div>
        </div>
      </NeonCard>

      {/* Available Coupons */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-3">Available Coupons ({available.length})</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {available.map((coupon) => (
            <NeonCard key={coupon.code} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono font-bold text-[#00f5ff] text-lg border border-dashed border-[rgba(0,245,255,0.4)] px-2 py-0.5 rounded">
                      {coupon.code}
                    </span>
                  </div>
                  <p className="text-white font-semibold">{coupon.discount}</p>
                  <p className="text-gray-400 text-sm">{coupon.description}</p>
                  <p className="text-gray-500 text-xs mt-1">Expires {formatDate(coupon.expiry)}</p>
                </div>
                <button
                  onClick={() => navigator.clipboard?.writeText(coupon.code)}
                  className="text-xs text-[#00f5ff] border border-[rgba(0,245,255,0.3)] px-2 py-1 rounded hover:bg-[rgba(0,245,255,0.1)] transition-colors shrink-0"
                >
                  Copy
                </button>
              </div>
            </NeonCard>
          ))}
        </div>
      </div>

      {/* History */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Coupon History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Code</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Discount</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Used On</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Order</th>
                <th className="text-left px-3 py-2 text-xs text-gray-400 uppercase tracking-wide">Savings</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.code} className="border-b border-[rgba(255,255,255,0.05)]">
                  <td className="px-3 py-3 text-[#00f5ff] font-mono text-sm">{h.code}</td>
                  <td className="px-3 py-3 text-gray-300 text-sm">{h.discount}</td>
                  <td className="px-3 py-3 text-gray-400 text-sm">{formatDate(h.usedOn)}</td>
                  <td className="px-3 py-3 text-gray-300 text-sm">{h.order}</td>
                  <td className="px-3 py-3 text-green-400 font-medium text-sm">-${h.savings.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  );
}
