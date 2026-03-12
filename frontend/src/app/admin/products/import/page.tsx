'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const marketplaces = [
  { id: 'temu', name: 'Temu', icon: '🛒', color: '#ff6900', desc: 'Import trending products from Temu' },
  { id: 'aliexpress', name: 'AliExpress', icon: '🔴', color: '#ff4747', desc: 'Source products from AliExpress' },
  { id: 'amazon', name: 'Amazon', icon: '📦', color: '#ff9900', desc: 'Import Amazon listings' },
  { id: 'ebay', name: 'eBay', icon: '🔵', color: '#0064d2', desc: 'Import eBay products' },
];

export default function ImportProductsPage() {
  const [selected, setSelected] = useState('temu');
  const [input, setInput] = useState('');
  const [markup, setMarkup] = useState('30');
  const [category, setCategory] = useState('');
  const [importing, setImporting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  const handleImport = () => {
    if (!input.trim()) return;
    setImporting(true);
    setProgress(0);
    setDone(false);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setImporting(false);
          setDone(true);
          return 100;
        }
        return p + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <a href="/admin/products" className="text-[#00f5ff] hover:underline text-sm">← Products</a>
      </div>
      <h1 className="text-2xl font-bold text-white">Import Products</h1>

      {/* Marketplace Selector */}
      <div>
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide mb-3">Select Marketplace</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {marketplaces.map((mp) => (
            <button
              key={mp.id}
              onClick={() => setSelected(mp.id)}
              className={`p-4 rounded-xl border text-center transition-all ${
                selected === mp.id
                  ? 'border-[#00f5ff] bg-[rgba(0,245,255,0.08)]'
                  : 'border-[rgba(255,255,255,0.08)] bg-[#0d0d15] hover:border-[rgba(0,245,255,0.3)]'
              }`}
            >
              <div className="text-3xl mb-2">{mp.icon}</div>
              <p className="text-white font-medium text-sm">{mp.name}</p>
              <p className="text-gray-500 text-xs mt-1">{mp.desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Import Form */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Import by URL or Keyword</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">
              Product URL or Search Keyword
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={3}
              placeholder="Paste product URLs (one per line) or enter a search keyword..."
              className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm resize-none"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Markup Percentage (%)</label>
              <div className="relative">
                <input
                  type="number"
                  value={markup}
                  onChange={(e) => setMarkup(e.target.value)}
                  min="0"
                  max="500"
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Target Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm"
              >
                <option value="">Auto-detect</option>
                <option value="electronics">Electronics</option>
                <option value="wearables">Wearables</option>
                <option value="accessories">Accessories</option>
                <option value="home">Home & Living</option>
                <option value="fashion">Fashion</option>
              </select>
            </div>
          </div>

          <NeonButton className="w-full" onClick={handleImport} disabled={importing}>
            {importing ? 'Importing...' : '📥 Start Import'}
          </NeonButton>
        </div>
      </NeonCard>

      {/* Progress */}
      {(importing || done) && (
        <NeonCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">
            {done ? '✅ Import Complete' : '⚙️ Importing Products...'}
          </h2>
          <div className="w-full h-3 bg-[#0d0d15] rounded-full overflow-hidden border border-[rgba(0,245,255,0.1)] mb-3">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%`, background: done ? '#39ff14' : 'linear-gradient(90deg, #00f5ff, #ff00ff)' }}
            />
          </div>
          <p className="text-gray-400 text-sm">
            {done ? `Successfully imported products from ${marketplaces.find((m) => m.id === selected)?.name}.` : `Processing... ${progress}%`}
          </p>
        </NeonCard>
      )}
    </div>
  );
}
