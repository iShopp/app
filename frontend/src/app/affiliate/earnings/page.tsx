'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';
import { formatDate } from '@/lib/utils';

const payoutHistory = [
  { id: 'PAY-012', date: '2024-01-15', amount: 287.50, method: 'PayPal', status: 'completed' },
  { id: 'PAY-011', date: '2024-12-15', amount: 342.80, method: 'PayPal', status: 'completed' },
  { id: 'PAY-010', date: '2024-11-15', amount: 198.20, method: 'PayPal', status: 'completed' },
  { id: 'PAY-009', date: '2024-10-15', amount: 423.60, method: 'PayPal', status: 'completed' },
];

export default function EarningsPage() {
  const [showRequest, setShowRequest] = useState(false);
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState('PayPal');
  const [requested, setRequested] = useState(false);

  const balance = 421.70;
  const pending = 134.20;
  const threshold = 50;

  const handleRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setRequested(true);
    setShowRequest(false);
    setTimeout(() => setRequested(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-white">Earnings & Payouts</h1>

      {/* Balance Card */}
      <div className="p-6 rounded-xl border border-[rgba(0,245,255,0.2)] bg-gradient-to-br from-[rgba(0,245,255,0.05)] to-[rgba(57,255,20,0.05)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm uppercase tracking-wide mb-1">Available Balance</p>
            <p className="text-4xl font-bold text-[#39ff14]">${balance.toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-1">${pending.toFixed(2)} pending clearance</p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs mb-1">Min payout threshold: ${threshold}</p>
            {balance >= threshold ? (
              <NeonButton onClick={() => setShowRequest(!showRequest)}>
                {showRequest ? 'Cancel' : '💸 Request Payout'}
              </NeonButton>
            ) : (
              <p className="text-yellow-400 text-sm">Need ${(threshold - balance).toFixed(2)} more to withdraw</p>
            )}
          </div>
        </div>

        {requested && (
          <div className="mt-4 p-3 bg-green-400/10 border border-green-400/30 rounded-lg">
            <p className="text-green-400 text-sm">✓ Payout request submitted! You'll receive payment within 3-5 business days.</p>
          </div>
        )}
      </div>

      {/* Request Form */}
      {showRequest && (
        <NeonCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Request Payout</h2>
          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Amount ($)</label>
              <input
                required
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min={threshold}
                max={balance}
                step="0.01"
                placeholder={`Min $${threshold}`}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Payout Method</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]">
                <option>PayPal</option>
                <option>Bank Transfer</option>
                <option>Crypto (USDT)</option>
              </select>
            </div>
            <NeonButton type="submit" className="w-full">Submit Request</NeonButton>
          </form>
        </NeonCard>
      )}

      {/* Lifetime Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Lifetime Earnings', value: '$1,420.50', color: '#00f5ff' },
          { label: 'Total Paid Out', value: '$1,252.10', color: '#39ff14' },
          { label: 'Avg. Monthly', value: '$118.38', color: '#9d4edd' },
        ].map((s) => (
          <NeonCard key={s.label} className="p-4 text-center">
            <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </NeonCard>
        ))}
      </div>

      {/* Payout History */}
      <NeonCard className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[rgba(0,245,255,0.1)]">
          <h2 className="text-lg font-semibold text-white">Payout History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['ID', 'Date', 'Amount', 'Method', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {payoutHistory.map((p) => (
                <tr key={p.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-[#00f5ff] font-mono text-sm">{p.id}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(p.date)}</td>
                  <td className="px-4 py-3 text-[#39ff14] font-bold">${p.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{p.method}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs px-2 py-1 rounded-full font-medium text-green-400 bg-green-400/10 capitalize">{p.status}</span>
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
