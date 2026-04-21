'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const mpData: Record<string, {
  name: string; icon: string; color: string;
  apiKeyLabel: string; apiSecretLabel: string;
  features: string[];
}> = {
  temu: { name: 'Temu', icon: '🛒', color: '#ff6900', apiKeyLabel: 'Affiliate ID', apiSecretLabel: 'Secret Token', features: ['Product Import', 'Price Sync', 'Inventory Tracking'] },
  aliexpress: { name: 'AliExpress', icon: '🔴', color: '#ff4747', apiKeyLabel: 'App Key', apiSecretLabel: 'App Secret', features: ['Product Import', 'Order Placement', 'Tracking Sync'] },
  amazon: { name: 'Amazon', icon: '📦', color: '#ff9900', apiKeyLabel: 'Access Key ID', apiSecretLabel: 'Secret Access Key', features: ['Product Import', 'Price Sync', 'FBA Orders'] },
  ebay: { name: 'eBay', icon: '🔵', color: '#0064d2', apiKeyLabel: 'App ID', apiSecretLabel: 'Cert ID', features: ['Product Import', 'Price Sync', 'Order Sync'] },
};

export default function MarketplaceConfigPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const mp = mpData[name] || mpData['temu'];
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [autoSync, setAutoSync] = useState(true);
  const [syncInterval, setSyncInterval] = useState('60');
  const [markupPct, setMarkupPct] = useState('30');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-3">
        <Link href="/admin/marketplaces" className="text-[#00f5ff] hover:underline text-sm">← Marketplaces</Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border"
          style={{ borderColor: `${mp.color}33`, background: `${mp.color}11` }}>
          {mp.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">{mp.name} Configuration</h1>
          <p className="text-gray-400 text-sm">API credentials and sync settings</p>
        </div>
      </div>

      {/* Connection Settings */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Connection Settings</h2>
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{mp.apiKeyLabel}</label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your API key..."
              className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm font-mono"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{mp.apiSecretLabel}</label>
            <input
              type="password"
              value={apiSecret}
              onChange={(e) => setApiSecret(e.target.value)}
              placeholder="Enter your API secret..."
              className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm font-mono"
            />
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" size="sm">Test Connection</Button>
          </div>

          {/* Sync Settings */}
          <div className="border-t border-[rgba(0,245,255,0.1)] pt-4 space-y-4">
            <h3 className="text-white font-medium">Sync Settings</h3>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-sm">Auto Sync</p>
                <p className="text-gray-500 text-xs">Automatically sync products and prices</p>
              </div>
              <button
                type="button"
                onClick={() => setAutoSync(!autoSync)}
                className={`w-12 h-6 rounded-full transition-all duration-200 relative ${autoSync ? 'bg-[#00f5ff]' : 'bg-gray-700'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${autoSync ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Sync Interval (min)</label>
                <select value={syncInterval} onChange={(e) => setSyncInterval(e.target.value)}
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]">
                  <option value="15">Every 15 min</option>
                  <option value="30">Every 30 min</option>
                  <option value="60">Every hour</option>
                  <option value="360">Every 6 hours</option>
                  <option value="1440">Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Default Markup (%)</label>
                <input
                  type="number"
                  value={markupPct}
                  onChange={(e) => setMarkupPct(e.target.value)}
                  min="0"
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-[rgba(0,245,255,0.1)] pt-4">
            <h3 className="text-white font-medium mb-3">Enabled Features</h3>
            <div className="space-y-2">
              {mp.features.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="text-[#39ff14] text-sm">✓</span>
                  <span className="text-gray-300 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            {saved ? '✓ Settings Saved!' : 'Save Configuration'}
          </Button>
        </form>
      </Card>

      {/* Status */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-white mb-3">Status</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'API Status', value: apiKey ? 'Configured' : 'Not configured', ok: !!apiKey },
            { label: 'Last Sync', value: '5 minutes ago', ok: true },
            { label: 'Products Synced', value: '3,241', ok: true },
            { label: 'Sync Errors', value: '2', ok: false },
          ].map(({ label, value, ok }) => (
            <div key={label} className="bg-[#0d0d15] rounded-lg p-3">
              <p className="text-gray-400 text-xs mb-1">{label}</p>
              <p className={`font-medium text-sm ${ok ? 'text-green-400' : 'text-yellow-400'}`}>{value}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
