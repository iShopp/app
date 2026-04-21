import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileNav from '@/components/layout/MobileNav';

export const metadata: Metadata = {
  title: 'iSHOP Marketplace',
  description: 'Professional multi-marketplace shopping platform with trusted checkout and fast shipping.',
  keywords: ['shopping', 'marketplace', 'deals', 'temu', 'aliexpress', 'amazon'],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'iSHOP',
  },
  openGraph: {
    title: 'iSHOP Marketplace',
    description: 'The Future of Shopping',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#f97316',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="bg-slate-900 text-slate-100 min-h-screen">
        <Navbar />
        <main className="pt-16 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileNav />
      </body>
    </html>
  );
}
