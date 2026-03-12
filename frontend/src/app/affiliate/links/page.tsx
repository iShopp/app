'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const existingLinks = [
  { id: 1, url: 'https://ishopneonfx.com/?ref=JOHN20', campaign: 'General', clicks: 1234, conversions: 89, earnings: 134.50 },
  { id: 2, url: 'https://ishopneonfx.com/shop/electronics?ref=JOHN20', campaign: 'Electronics Push', clicks: 456, conversions: 34, earnings: 89.25 },
  { id: 3, url: 'https://ishopneonfx.com/deals?ref=JOHN20', campaign: 'Deals Page', clicks: 789, conversions: 56, earnings: 76.80 },
];

export default function AffiliateLinksPage() {
  const [links, setLinks] = useState(existingLinks);
  const [form, setForm] = useState({ url: '', campaign: '' });
  const [copied, setCopied] = useState<number | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newLink = {
      id: Date.now(),
      url: `${form.url}?ref=JOHN20`,
      campaign: form.campaign,
      clicks: 0,
      conversions: 0,
      earnings: 0,
    };
    setLinks((prev) => [...prev, newLink]);
    setForm({ url: '', campaign: '' });
  };

  const copyLink = (id: number, url: string) => {
    navigator.clipboard?.writeText(url);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Links & Campaigns</h1>

      {/* Create Form */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Create New Link</h2>
        <form onSubmit={handleCreate} className="grid sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Target URL</label>
            <input
              required
              type="url"
              value={form.url}
              onChange={(e) => setForm((p) => ({ ...p, url: e.target.value }))}
              placeholder="https://ishopneonfx.com/shop/..."
              className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Campaign Name</label>
            <input
              required
              value={form.campaign}
              onChange={(e) => setForm((p) => ({ ...p, campaign: e.target.value }))}
              placeholder="e.g. Blog Post"
              className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
            />
          </div>
          <div className="sm:col-span-3">
            <NeonButton type="submit" className="w-full">Generate Link</NeonButton>
          </div>
        </form>
      </NeonCard>

      {/* Links Table */}
      <NeonCard className="p-0 overflow-hidden">
        <div className="p-4 border-b border-[rgba(0,245,255,0.1)]">
          <h2 className="text-lg font-semibold text-white">Your Links ({links.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['URL', 'Campaign', 'Clicks', 'Conversions', 'Earnings', 'Action'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {links.map((link) => (
                <tr key={link.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <p className="text-[#00f5ff] text-sm font-mono truncate max-w-48">{link.url}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-300 text-sm">{link.campaign}</td>
                  <td className="px-4 py-3 text-gray-300">{link.clicks.toLocaleString()}</td>
                  <td className="px-4 py-3 text-[#ff00ff] font-medium">{link.conversions}</td>
                  <td className="px-4 py-3 text-[#39ff14] font-bold">${link.earnings.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => copyLink(link.id, link.url)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${copied === link.id ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-[#00f5ff] border-[rgba(0,245,255,0.3)] hover:bg-[rgba(0,245,255,0.1)]'}`}
                    >
                      {copied === link.id ? '✓ Copied!' : 'Copy'}
                    </button>
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
