'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, User, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAVIGATION_LINKS } from '@/lib/constants';

interface NavbarProps {
  cartCount?: number;
}

export default function Navbar({ cartCount = 0 }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
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
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-[rgba(10,10,15,0.95)] backdrop-blur-md border-b border-[rgba(0,245,255,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Zap className="h-6 w-6 text-[#00f5ff] group-hover:animate-pulse" />
              <span className="text-xl font-black tracking-wider text-white group-hover:text-[#00f5ff] transition-colors">
                i<span className="text-[#00f5ff]" style={{ textShadow: '0 0 10px #00f5ff' }}>SHOP</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {NAVIGATION_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-[#00f5ff]',
                    pathname === link.href ? 'text-[#00f5ff]' : 'text-gray-300'
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Search + Icons */}
            <div className="flex items-center gap-2">
              {/* Search Bar (desktop) */}
              <div className={cn('hidden md:flex items-center transition-all duration-300', searchOpen ? 'w-64' : 'w-auto')}>
                {searchOpen ? (
                  <div className="flex items-center bg-[#1a1a24] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-1.5 gap-2 w-full">
                    <Search className="h-4 w-4 text-gray-400 shrink-0" />
                    <input
                      autoFocus
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && searchQuery.trim()) {
                          window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                        }
                        if (e.key === 'Escape') setSearchOpen(false);
                      }}
                      placeholder="Search products..."
                      className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
                    />
                    <button onClick={() => setSearchOpen(false)}>
                      <X className="h-4 w-4 text-gray-400 hover:text-white" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-gray-400 hover:text-[#00f5ff] transition-colors"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-400 hover:text-[#00f5ff] transition-colors"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#ff00ff] text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-[0_0_8px_rgba(255,0,255,0.6)]">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                href="/auth/signin"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[rgba(0,245,255,0.2)] text-sm text-[#00f5ff] hover:bg-[rgba(0,245,255,0.1)] transition-colors"
              >
                <User className="h-4 w-4" />
                Sign In
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[rgba(10,10,15,0.98)] border-b border-[rgba(0,245,255,0.1)] px-4 py-4 space-y-2">
            {/* Mobile search */}
            <div className="flex items-center bg-[#1a1a24] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 gap-2 mb-4">
              <Search className="h-4 w-4 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                  }
                }}
                placeholder="Search products..."
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder-gray-500"
              />
            </div>
            {NAVIGATION_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'block px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[rgba(0,245,255,0.1)] text-[#00f5ff]'
                    : 'text-gray-300 hover:text-[#00f5ff] hover:bg-[rgba(0,245,255,0.05)]'
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/signin"
              className="block px-3 py-2 rounded-lg text-sm font-medium text-[#00f5ff] border border-[rgba(0,245,255,0.2)] text-center mt-4"
            >
              Sign In
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
