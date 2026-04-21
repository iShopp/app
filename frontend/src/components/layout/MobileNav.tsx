'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  cartCount?: number;
}

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/shop', label: 'Shop', icon: ShoppingBag },
  { href: '/cart', label: 'Cart', icon: ShoppingCart },
  { href: '/users', label: 'Account', icon: User },
];

export default function MobileNav({ cartCount = 0 }: MobileNavProps) {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden border-t border-slate-200 bg-white">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className="flex flex-col items-center gap-0.5 px-4 py-2 relative">
              <div className="relative">
                <Icon className={cn('h-5 w-5 transition-colors', isActive ? 'text-blue-700' : 'text-slate-500')} />
                {href === '/cart' && cartCount > 0 && <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center">{cartCount > 99 ? '99+' : cartCount}</span>}
              </div>
              <span className={cn('text-[10px] font-medium', isActive ? 'text-blue-700' : 'text-slate-500')}>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
