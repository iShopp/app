'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, User, Store } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAVIGATION_LINKS } from '@/lib/constants';

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav className={cn('fixed top-0 left-0 right-0 z-50 transition-all duration-300', isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'bg-white')}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <Store className="h-5 w-5 text-orange-500" />
            <span className="text-xl font-black tracking-wide text-slate-900">iSHOP</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {NAVIGATION_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className={cn('text-sm font-medium transition-colors hover:text-blue-700', pathname === link.href ? 'text-blue-700' : 'text-slate-600')}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 gap-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                placeholder="Search products"
                className="bg-transparent text-slate-800 text-sm outline-none placeholder-slate-400"
              />
            </div>

            <Link href="/cart" className="relative p-2 text-slate-500 hover:text-blue-700 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 bg-orange-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">{cartCount > 99 ? '99+' : cartCount}</span>}
            </Link>
            <Link href="/auth/signin" className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
              <User className="h-4 w-4" /> Sign In
            </Link>
            <button className="md:hidden p-2 text-slate-500" onClick={() => setMobileOpen((v) => !v)}>{mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-2">
          {NAVIGATION_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className={cn('block px-3 py-2 rounded-lg text-sm font-medium transition-colors', pathname === link.href ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50')}>
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
