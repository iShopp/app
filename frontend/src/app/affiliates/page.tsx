import Link from 'next/link';
import { DollarSign, Users, TrendingUp, Share2, ArrowRight, Check } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import NeonCard from '@/components/ui/NeonCard';

const FEATURES = [
  { icon: DollarSign, title: 'Earn 10% Commission', desc: 'On every sale referred through your unique link', color: '#39ff14' },
  { icon: TrendingUp, title: 'Real-time Tracking', desc: 'Monitor clicks, conversions and earnings live', color: '#00f5ff' },
  { icon: Users, title: 'No Limits', desc: 'Refer as many customers as you like', color: '#ff00ff' },
  { icon: Share2, title: 'Share Anywhere', desc: 'Social media, blogs, YouTube — earn everywhere', color: '#9d4edd' },
];

const TIERS = [
  { name: 'Starter', rate: '5%', min: '$0', requirement: 'Just sign up' },
  { name: 'Pro', rate: '10%', min: '$500/mo', requirement: '50+ referrals' },
  { name: 'Elite', rate: '15%', min: '$2K+/mo', requirement: '200+ referrals' },
];

type GlowColor = 'cyan' | 'magenta' | 'purple';

function getTierGlow(index: number): GlowColor {
  if (index === 1) return 'magenta';
  if (index === 2) return 'cyan';
  return 'purple';
}

export default function AffiliatesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,0,255,0.06)_0%,transparent_60%)]" />
        <div className="relative max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[rgba(255,0,255,0.1)] border border-[rgba(255,0,255,0.2)] text-[#ff00ff] px-4 py-1.5 rounded-full text-sm mb-6">
            💰 Earn With iSHOP
          </div>
          <h1 className="text-5xl font-black text-white mb-4">
            Affiliate <span className="text-[#ff00ff]" style={{ textShadow: '0 0 20px rgba(255,0,255,0.5)' }}>Program</span>
          </h1>
          <p className="text-gray-400 text-xl mb-10">
            Join thousands of affiliates earning passive income by promoting iSHOP products.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/signup">
              <NeonButton variant="secondary" size="lg">Join Now — It&apos;s Free <ArrowRight className="h-5 w-5" /></NeonButton>
            </Link>
            <Link href="/affiliate">
              <NeonButton variant="outline" size="lg">Affiliate Dashboard</NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <NeonCard key={title} className="p-5">
              <div className="p-3 rounded-xl mb-4 w-fit" style={{ backgroundColor: color + '15' }}>
                <Icon className="h-6 w-6" style={{ color }} />
              </div>
              <h3 className="text-white font-semibold mb-1">{title}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </NeonCard>
          ))}
        </div>
      </section>

      {/* Tiers */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-10">Commission <span className="text-[#ff00ff]">Tiers</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {TIERS.map((tier, i) => (
            <NeonCard
              key={tier.name}
              glowColor={getTierGlow(i)}
              className={`p-6 text-center ${i === 1 ? 'border-[rgba(255,0,255,0.3)] relative' : ''}`}
            >
              {i === 1 && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#ff00ff] text-white text-xs font-bold px-3 py-0.5 rounded-full">Most Popular</div>}
              <p className="text-gray-400 text-sm font-medium mb-1">{tier.name}</p>
              <p className="text-4xl font-black mb-1" style={{ color: i === 0 ? '#9d4edd' : i === 1 ? '#ff00ff' : '#00f5ff' }}>{tier.rate}</p>
              <p className="text-gray-500 text-sm mb-3">commission</p>
              <p className="text-[#39ff14] font-semibold text-sm mb-4">Earn {tier.min}</p>
              <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
                <Check className="h-3 w-3" /> {tier.requirement}
              </p>
            </NeonCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <NeonCard glowColor="magenta" className="p-10">
          <h2 className="text-3xl font-bold text-white mb-3">Start Earning Today</h2>
          <p className="text-gray-500 mb-8">Sign up in 2 minutes. No experience required.</p>
          <Link href="/auth/signup">
            <NeonButton variant="secondary" size="lg">Create Affiliate Account</NeonButton>
          </Link>
        </NeonCard>
      </section>
    </div>
  );
}
