'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, DollarSign, Globe, ShoppingBag, Zap, Image, Tag, Users,
  BarChart2, Lightbulb, Settings, ChevronDown, ChevronRight, X, Zap as ZapIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Package, DollarSign, Globe, ShoppingBag, Zap, Image, Tag, Users,
  BarChart2, Lightbulb, Settings, ChevronDown, ChevronRight,
};

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  icon: string;
  children?: NavChild[];
}

const NAV_ITEMS: NavItem[] = [
  { href: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
  {
    label: 'Products', icon: 'Package', children: [
      { href: '/admin/products', label: 'Catalog' },
      { href: '/admin/products/import', label: 'Import' },
      { href: '/admin/products/categories', label: 'Categories' },
      { href: '/admin/products/brands', label: 'Brands' },
    ],
  },
  { href: '/admin/pricing', label: 'Pricing', icon: 'DollarSign' },
  { href: '/admin/marketplaces', label: 'Marketplaces', icon: 'Globe' },
  {
    label: 'Orders', icon: 'ShoppingBag', children: [
      { href: '/admin/orders', label: 'Customer Orders' },
      { href: '/admin/orders/supplier', label: 'Supplier Orders' },
    ],
  },
  { href: '/admin/automation', label: 'Automation', icon: 'Zap' },
  { href: '/admin/banners', label: 'Banners', icon: 'Image' },
  { href: '/admin/coupons', label: 'Coupons', icon: 'Tag' },
  { href: '/admin/affiliates', label: 'Affiliates', icon: 'Users' },
  {
    label: 'Analytics', icon: 'BarChart2', children: [
      { href: '/admin/analytics', label: 'Overview' },
      { href: '/admin/analytics/ai', label: 'AI Usage' },
    ],
  },
  { href: '/admin/builder', label: 'Builder', icon: 'Lightbulb' },
  { href: '/admin/settings', label: 'Settings', icon: 'Settings' },
];

interface AdminSidebarProps {
  onClose?: () => void;
}

export default function AdminSidebar({ onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string[]>(['Products', 'Orders', 'Analytics']);

  const toggleSection = (label: string) => {
    setExpanded((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <aside className="w-64 bg-[#0d0d15] border-r border-[rgba(0,245,255,0.1)] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(0,245,255,0.1)]">
        <Link href="/admin" className="flex items-center gap-2">
          <ZapIcon className="h-5 w-5 text-[#00f5ff]" />
          <span className="font-black text-white">
            i<span className="text-[#00f5ff]">SHOP</span>
            <span className="text-gray-500 text-xs font-normal ml-1">Admin</span>
          </span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {NAV_ITEMS.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;

          if (item.children) {
            const isExpanded = expanded.includes(item.label);
            const hasActiveChild = item.children.some((c) => isActive(c.href));

            return (
              <div key={item.label}>
                <button
                  onClick={() => toggleSection(item.label)}
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors',
                    hasActiveChild
                      ? 'text-[#00f5ff] bg-[rgba(0,245,255,0.08)]'
                      : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                  )}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <ChevronDown
                    className={cn('h-3.5 w-3.5 transition-transform', isExpanded ? 'rotate-0' : '-rotate-90')}
                  />
                </button>
                {isExpanded && (
                  <div className="ml-9 mt-0.5 space-y-0.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          'block px-3 py-1.5 rounded-lg text-xs transition-colors',
                          isActive(child.href)
                            ? 'text-[#00f5ff] bg-[rgba(0,245,255,0.08)]'
                            : 'text-gray-500 hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                        )}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href!}
              className={cn(
                'flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors',
                isActive(item.href!)
                  ? 'text-[#00f5ff] bg-[rgba(0,245,255,0.08)] shadow-[0_0_10px_rgba(0,245,255,0.05)]'
                  : 'text-gray-400 hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-[rgba(0,245,255,0.1)]">
        <Link href="/" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
          ← Back to Store
        </Link>
      </div>
    </aside>
  );
}
