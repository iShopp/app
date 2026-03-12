'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Link as LinkIcon, Image, TrendingUp, DollarSign, Settings, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Link: LinkIcon, Image, TrendingUp, DollarSign, Settings,
};

const NAV_ITEMS = [
  { href: '/affiliate', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/affiliate/links', label: 'Links & Campaigns', icon: 'Link' },
  { href: '/affiliate/banners', label: 'Banners', icon: 'Image' },
  { href: '/affiliate/conversions', label: 'Conversions', icon: 'TrendingUp' },
  { href: '/affiliate/earnings', label: 'Earnings', icon: 'DollarSign' },
  { href: '/affiliate/settings', label: 'Settings', icon: 'Settings' },
];

export default function AffiliateSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/affiliate' ? pathname === '/affiliate' : pathname.startsWith(href);

  return (
    <aside className="w-60 bg-[#0d0d15] border-r border-[rgba(0,245,255,0.1)] flex flex-col">
      <div className="px-5 py-5 border-b border-[rgba(0,245,255,0.1)]">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#ff00ff]" />
          <span className="font-black text-white">i<span className="text-[#00f5ff]">SHOP</span></span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">Affiliate Portal</p>
      </div>

      <nav className="flex-1 py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map(({ href, label, icon }) => {
          const Icon = iconMap[icon] || LayoutDashboard;
          const active = isActive(href);

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                active
                  ? 'text-[#ff00ff] bg-[rgba(255,0,255,0.08)]'
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-[rgba(0,245,255,0.1)]">
        <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}
