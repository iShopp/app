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
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[rgba(10,10,15,0.97)] backdrop-blur-md border-t border-[rgba(0,245,255,0.1)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-0.5 px-4 py-2 relative"
            >
              <div className="relative">
                <Icon
                  className={cn(
                    'h-5 w-5 transition-colors',
                    isActive ? 'text-[#00f5ff]' : 'text-gray-500'
                  )}
                  style={isActive ? { filter: 'drop-shadow(0 0 6px #00f5ff)' } : undefined}
                />
                {href === '/cart' && cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#ff00ff] text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </div>
              <span className={cn('text-[10px] font-medium', isActive ? 'text-[#00f5ff]' : 'text-gray-600')}>
                {label}
              </span>
              {isActive && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-[#00f5ff] rounded-full shadow-[0_0_6px_#00f5ff]" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
