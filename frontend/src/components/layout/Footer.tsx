import Link from 'next/link';
import { Store, Twitter, Instagram, Youtube, Github } from 'lucide-react';
import { FOOTER_LINKS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2"><Store className="h-5 w-5 text-orange-500" /><span className="text-lg font-black text-slate-900">iSHOP</span></Link>
            <p className="mb-4 text-sm leading-relaxed text-slate-600">A professional marketplace experience for global shopping, secure checkout and trusted fulfillment.</p>
            <div className="flex items-center gap-3">
              {[Twitter, Instagram, Youtube, Github].map((Icon, i) => <a key={i} href="#" className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:text-blue-700"><Icon className="h-4 w-4" /></a>)}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">Shop</h3>
            <ul className="space-y-2">{FOOTER_LINKS.shop.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-slate-600 hover:text-blue-700">{link.label}</Link></li>)}</ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">Account</h3>
            <ul className="space-y-2">{FOOTER_LINKS.account.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-slate-600 hover:text-blue-700">{link.label}</Link></li>)}</ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-900">Company</h3>
            <ul className="space-y-2">{FOOTER_LINKS.company.map((link) => <li key={link.href}><Link href={link.href} className="text-sm text-slate-600 hover:text-blue-700">{link.label}</Link></li>)}</ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">© {new Date().getFullYear()} iSHOP. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            <Link href="/terms" className="hover:text-slate-700">Terms</Link>
            <Link href="/cookies" className="hover:text-slate-700">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
