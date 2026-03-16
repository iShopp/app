import { Tag, Clock, Copy, Zap } from 'lucide-react';
import NeonCard from '@/components/ui/NeonCard';
import Badge from '@/components/ui/Badge';
import NeonButton from '@/components/ui/NeonButton';

const DEALS = [
  { id: '1', code: 'NEON20', discount: '20% OFF', description: 'All Electronics & Gadgets', expires: '2024-12-31', type: 'Electronics', color: '#00f5ff', minPurchase: 30 },
  { id: '2', code: 'FIRST15', discount: '15% OFF', description: 'First Order Discount', expires: '2024-12-31', type: 'New Users', color: '#ff00ff', minPurchase: 0 },
  { id: '3', code: 'SHIP0', discount: 'Free Shipping', description: 'Free Shipping on All Orders', expires: '2024-12-31', type: 'Shipping', color: '#39ff14', minPurchase: 30 },
  { id: '4', code: 'FASHION30', discount: '30% OFF', description: 'Fashion & Apparel', expires: '2024-11-30', type: 'Fashion', color: '#9d4edd', minPurchase: 50 },
  { id: '5', code: 'TEMU10', discount: '$10 OFF', description: 'Temu Products Only', expires: '2024-12-15', type: 'Marketplace', color: '#ff6900', minPurchase: 40 },
  { id: '6', code: 'CYBER50', discount: '50% OFF', description: 'Cyber Monday Sale', expires: '2024-12-02', type: 'Flash Sale', color: '#ff00ff', minPurchase: 100 },
];

const FLASH_DEALS = [
  { name: 'Smart Watch', originalPrice: 99.99, salePrice: 39.99, timeLeft: '02:45:12', sold: 78, total: 100 },
  { name: 'LED Strip 5m', originalPrice: 35.99, salePrice: 12.99, timeLeft: '05:12:44', sold: 45, total: 200 },
  { name: 'Wireless Earbuds', originalPrice: 79.99, salePrice: 24.99, timeLeft: '01:20:05', sold: 92, total: 150 },
];

type BadgeVariant = 'cyan' | 'magenta' | 'green' | 'purple';

function getDealBadgeVariant(color: string): BadgeVariant {
  if (color === '#00f5ff') return 'cyan';
  if (color === '#ff00ff') return 'magenta';
  if (color === '#39ff14') return 'green';
  return 'purple';
}

export default function DealsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[rgba(255,0,255,0.1)] border border-[rgba(255,0,255,0.2)] text-[#ff00ff] px-4 py-1.5 rounded-full text-sm mb-4">
          <Zap className="h-3.5 w-3.5" /> Limited Time Offers
        </div>
        <h1 className="text-4xl font-black text-white mb-3">
          Deals & <span className="text-[#ff00ff]" style={{ textShadow: '0 0 15px rgba(255,0,255,0.5)' }}>Coupons</span>
        </h1>
        <p className="text-gray-500">Save big with exclusive discount codes and flash deals</p>
      </div>

      {/* Flash Deals */}
      <div className="mb-12">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-5">
          <Zap className="h-5 w-5 text-[#ff00ff]" /> Flash Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {FLASH_DEALS.map((deal, i) => {
            const pct = Math.round(((deal.originalPrice - deal.salePrice) / deal.originalPrice) * 100);
            const progress = (deal.sold / deal.total) * 100;
            return (
              <NeonCard key={i} glowColor="magenta" className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="magenta">-{pct}%</Badge>
                  <div className="flex items-center gap-1 text-[#ff00ff] text-sm">
                    <Clock className="h-3.5 w-3.5" />
                    <span className="font-mono">{deal.timeLeft}</span>
                  </div>
                </div>
                <h3 className="text-white font-semibold mb-2">{deal.name}</h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-2xl font-black text-[#00f5ff]">${deal.salePrice}</span>
                  <span className="text-gray-500 line-through">${deal.originalPrice}</span>
                </div>
                <div className="mb-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{deal.sold} sold</span>
                    <span>{deal.total - deal.sold} left</span>
                  </div>
                  <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#ff00ff] to-[#00f5ff] rounded-full" style={{ width: `${progress}%` }} />
                  </div>
                </div>
                <NeonButton variant="secondary" size="sm" className="w-full mt-3">Grab Deal</NeonButton>
              </NeonCard>
            );
          })}
        </div>
      </div>

      {/* Coupons */}
      <div>
        <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-5">
          <Tag className="h-5 w-5 text-[#00f5ff]" /> Coupon Codes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEALS.map((deal) => (
            <div
              key={deal.id}
              className="bg-[#111118] rounded-xl border p-5 relative overflow-hidden"
              style={{ borderColor: deal.color + '25' }}
            >
              <div className="absolute inset-0 opacity-[0.04]" style={{ background: `radial-gradient(circle at top right, ${deal.color}, transparent 60%)` }} />
              <div className="relative">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge variant={getDealBadgeVariant(deal.color)}>
                      {deal.type}
                    </Badge>
                    <p className="text-3xl font-black mt-2" style={{ color: deal.color }}>{deal.discount}</p>
                    <p className="text-gray-400 text-sm mt-1">{deal.description}</p>
                  </div>
                </div>
                {deal.minPurchase > 0 && (
                  <p className="text-gray-600 text-xs mb-3">Min. purchase: ${deal.minPurchase}</p>
                )}
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-black/30 border border-white/10 px-3 py-1.5 rounded-lg font-mono text-gray-200">{deal.code}</code>
                  <button className="flex items-center gap-1.5 text-xs text-[#00f5ff] hover:text-white transition-colors">
                    <Copy className="h-3.5 w-3.5" /> Copy
                  </button>
                </div>
                <div className="flex items-center gap-1 mt-3 text-xs text-gray-600">
                  <Clock className="h-3 w-3" /> Expires {deal.expires}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
