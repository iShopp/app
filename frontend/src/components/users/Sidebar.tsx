'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Package, Truck, Heart, Tag, MapPin, CreditCard, Settings, Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard, Package, Truck, Heart, Tag, MapPin, CreditCard, Settings,
};

const NAV_ITEMS = [
  { href: '/users', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/users/orders', label: 'My Orders', icon: 'Package' },
  { href: '/users/track', label: 'Track Shipment', icon: 'Truck' },
  { href: '/users/wishlist', label: 'Wishlist', icon: 'Heart' },
  { href: '/users/coupons', label: 'Coupons & Rewards', icon: 'Tag' },
  { href: '/users/addresses', label: 'Addresses', icon: 'MapPin' },
  { href: '/users/payment', label: 'Payment Methods', icon: 'CreditCard' },
  { href: '/users/settings', label: 'Settings', icon: 'Settings' },
];

export default function UserSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/users' ? pathname === '/users' : pathname.startsWith(href);

  return (
    <aside className="w-60 bg-[#0d0d15] border-r border-[rgba(0,245,255,0.1)] flex flex-col">
      <div className="px-5 py-5 border-b border-[rgba(0,245,255,0.1)]">
        <Link href="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#00f5ff]" />
          <span className="font-black text-white">i<span className="text-[#00f5ff]">SHOP</span></span>
        </Link>
        <p className="text-xs text-gray-500 mt-1">My Account</p>
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
                  ? 'text-[#00f5ff] bg-[rgba(0,245,255,0.08)]'
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
