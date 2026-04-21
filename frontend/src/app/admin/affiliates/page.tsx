'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatDate } from '@/lib/utils';

const affiliates = [
  { id: 1, name: 'John Smith', email: 'john@affiliate.com', code: 'JOHN20', commission: 15, conversions: 234, earnings: 1420.50, status: 'active' },
  { id: 2, name: 'Maria Garcia', email: 'maria@blogger.com', code: 'MARIA15', commission: 12, conversions: 189, earnings: 980.25, status: 'active' },
  { id: 3, name: 'TechReview Blog', email: 'contact@techblog.com', code: 'TECH10', commission: 10, conversions: 456, earnings: 2340.00, status: 'active' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@influencer.com', code: 'SARAH25', commission: 20, conversions: 78, earnings: 567.90, status: 'pending' },
  { id: 5, name: 'Mike Chen', email: 'mike@deals.com', code: 'MIKE12', commission: 12, conversions: 12, earnings: 89.40, status: 'suspended' },
];

const statusColors: Record<string, string> = {
  active: 'text-green-400 bg-green-400/10',
  pending: 'text-yellow-400 bg-yellow-400/10',
  suspended: 'text-red-400 bg-red-400/10',
};

export default function AffiliatesAdminPage() {
  const [search, setSearch] = useState('');

  const filtered = affiliates.filter(
    (a) => a.name.toLowerCase().includes(search.toLowerCase()) || a.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Affiliates</h1>
        <Button>+ Invite Affiliate</Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Affiliates', value: affiliates.length, color: '#00f5ff' },
          { label: 'Active', value: affiliates.filter((a) => a.status === 'active').length, color: '#39ff14' },
          { label: 'Total Conversions', value: affiliates.reduce((s, a) => s + a.conversions, 0), color: '#ff00ff' },
          { label: 'Total Paid Out', value: `$${affiliates.reduce((s, a) => s + a.earnings, 0).toLocaleString('en', { minimumFractionDigits: 2 })}`, color: '#9d4edd' },
        ].map((s) => (
          <Card key={s.label} className="p-4">
            <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </Card>
        ))}
      </div>

      <Card className="p-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search affiliates by name or code..."
          className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
        />
      </Card>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Name', 'Email', 'Code', 'Commission', 'Conversions', 'Earnings', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{a.name}</td>
                  <td className="px-4 py-3 text-gray-400 text-sm">{a.email}</td>
                  <td className="px-4 py-3 text-[#00f5ff] font-mono font-bold">{a.code}</td>
                  <td className="px-4 py-3 text-[#ff00ff] font-medium">{a.commission}%</td>
                  <td className="px-4 py-3 text-gray-300">{a.conversions}</td>
                  <td className="px-4 py-3 text-[#39ff14] font-medium">${a.earnings.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${statusColors[a.status]}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button className="text-xs text-[#00f5ff] hover:underline">View</button>
                      <button className="text-xs text-gray-400 hover:underline">Edit</button>
                    </div>
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
