'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const banners = [
  {
    id: 1,
    size: '728×90',
    label: 'Leaderboard',
    bg: 'from-[#00f5ff]/20 to-[#ff00ff]/20',
    aspectClass: 'aspect-[728/90]',
    code: `<a href="https://ishopneonfx.com?ref=JOHN20"><img src="https://ishopneonfx.com/banners/728x90.jpg" width="728" height="90" alt="iSHOP NEON FX" /></a>`,
  },
  {
    id: 2,
    size: '300×250',
    label: 'Medium Rectangle',
    bg: 'from-[#9d4edd]/20 to-[#00f5ff]/20',
    aspectClass: 'aspect-[300/250]',
    code: `<a href="https://ishopneonfx.com?ref=JOHN20"><img src="https://ishopneonfx.com/banners/300x250.jpg" width="300" height="250" alt="iSHOP NEON FX" /></a>`,
  },
  {
    id: 3,
    size: '160×600',
    label: 'Wide Skyscraper',
    bg: 'from-[#ff00ff]/20 to-[#9d4edd]/20',
    aspectClass: 'aspect-[160/600]',
    code: `<a href="https://ishopneonfx.com?ref=JOHN20"><img src="https://ishopneonfx.com/banners/160x600.jpg" width="160" height="600" alt="iSHOP NEON FX" /></a>`,
  },
  {
    id: 4,
    size: '468×60',
    label: 'Full Banner',
    bg: 'from-[#39ff14]/20 to-[#00f5ff]/20',
    aspectClass: 'aspect-[468/60]',
    code: `<a href="https://ishopneonfx.com?ref=JOHN20"><img src="https://ishopneonfx.com/banners/468x60.jpg" width="468" height="60" alt="iSHOP NEON FX" /></a>`,
  },
  {
    id: 5,
    size: '300×600',
    label: 'Half Page',
    bg: 'from-[#ff6900]/20 to-[#ff00ff]/20',
    aspectClass: 'aspect-[300/600]',
    code: `<a href="https://ishopneonfx.com?ref=JOHN20"><img src="https://ishopneonfx.com/banners/300x600.jpg" width="300" height="600" alt="iSHOP NEON FX" /></a>`,
  },
  {
    id: 6,
    size: '320×50',
    label: 'Mobile Banner',
    bg: 'from-[#00f5ff]/20 to-[#39ff14]/20',
    aspectClass: 'aspect-[320/50]',
    code: `<a href="https://ishopneonfx.com?ref=JOHN20"><img src="https://ishopneonfx.com/banners/320x50.jpg" width="320" height="50" alt="iSHOP NEON FX" /></a>`,
  },
];

export default function AffiliateBannersPage() {
  const [copied, setCopied] = useState<number | null>(null);

  const copyCode = (id: number, code: string) => {
    navigator.clipboard?.writeText(code);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Banners & Creatives</h1>
        <p className="text-gray-400 text-sm mt-1">Copy the embed code and place it on your website or blog</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {banners.map((banner) => (
          <Card key={banner.id} className="p-4 space-y-3">
            {/* Preview */}
            <div className={`w-full bg-gradient-to-r ${banner.bg} rounded-lg flex items-center justify-center border border-[rgba(0,245,255,0.1)] overflow-hidden`}
              style={{ minHeight: 60, maxHeight: 120 }}>
              <div className="text-center py-4 px-2">
                <p className="text-white font-bold text-sm">iSHOP NEON FX</p>
                <p className="text-gray-300 text-xs">Best Deals Online</p>
              </div>
            </div>

            <div>
              <p className="text-white font-medium text-sm">{banner.label}</p>
              <p className="text-gray-500 text-xs">{banner.size} pixels</p>
            </div>

            {/* Embed code */}
            <div className="bg-[#0d0d15] rounded-lg p-2 border border-[rgba(0,245,255,0.08)]">
              <p className="text-gray-500 text-xs font-mono truncate">{banner.code.slice(0, 60)}...</p>
            </div>

            <button
              onClick={() => copyCode(banner.id, banner.code)}
              className={`w-full py-2 rounded-lg border text-sm font-medium transition-all ${
                copied === banner.id
                  ? 'text-green-400 border-green-400/40 bg-green-400/10'
                  : 'text-[#00f5ff] border-[rgba(0,245,255,0.3)] hover:bg-[rgba(0,245,255,0.08)]'
              }`}
            >
              {copied === banner.id ? '✓ Code Copied!' : '📋 Copy Embed Code'}
            </button>
          </Card>
        ))}
      </div>

      <Card className="p-5">
        <h2 className="text-lg font-semibold text-white mb-2">Text Link</h2>
        <p className="text-gray-400 text-sm mb-3">Use this simple text link anywhere</p>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-[#0d0d15] rounded-lg px-3 py-2 text-[#00f5ff] text-sm font-mono border border-[rgba(0,245,255,0.1)] truncate">
            {'<a href="https://ishopneonfx.com?ref=JOHN20">Shop iSHOP NEON FX</a>'}
          </code>
          <button
            onClick={() => copyCode(99, '<a href="https://ishopneonfx.com?ref=JOHN20">Shop iSHOP NEON FX</a>')}
            className={`shrink-0 text-xs px-3 py-2 rounded-lg border transition-colors ${copied === 99 ? 'text-green-400 border-green-400/30 bg-green-400/10' : 'text-[#00f5ff] border-[rgba(0,245,255,0.3)] hover:bg-[rgba(0,245,255,0.1)]'}`}
          >
            {copied === 99 ? '✓' : 'Copy'}
          </button>
        </div>
      </Card>
    </div>
  );
}
