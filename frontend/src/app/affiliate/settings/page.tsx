'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

export default function AffiliateSettingsPage() {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    email: 'john@affiliate.com',
    website: 'https://johnsreviews.com',
    bio: 'Tech reviewer and deal hunter with 50k+ monthly readers.',
  });

  const [payout, setPayout] = useState({
    paypalEmail: 'john.payments@gmail.com',
    threshold: '50',
    preferredMethod: 'PayPal',
  });

  const [notifications, setNotifications] = useState({
    conversionEmail: true,
    payoutEmail: true,
    newsletterEmail: false,
  });

  const [saved, setSaved] = useState('');

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved('profile');
    setTimeout(() => setSaved(''), 2000);
  };

  const savePayout = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved('payout');
    setTimeout(() => setSaved(''), 2000);
  };

  const toggleNotif = (key: keyof typeof notifications) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  const inputClass = 'w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Affiliate Settings</h1>
        <p className="text-gray-400 text-sm mt-1">Your affiliate code: <span className="text-[#00f5ff] font-mono font-bold">JOHN20</span> · 15% commission rate</p>
      </div>

      {/* Profile */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Full Name</label>
            <input value={profile.name} onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Email Address</label>
            <input type="email" value={profile.email} onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Website / Social Profile</label>
            <input type="url" value={profile.website} onChange={(e) => setProfile((p) => ({ ...p, website: e.target.value }))} placeholder="https://" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Bio</label>
            <textarea rows={3} value={profile.bio} onChange={(e) => setProfile((p) => ({ ...p, bio: e.target.value }))} className={`${inputClass} resize-none`} />
          </div>
          <NeonButton type="submit" className="w-full">
            {saved === 'profile' ? '✓ Saved!' : 'Save Profile'}
          </NeonButton>
        </form>
      </NeonCard>

      {/* Payout Settings */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Payout Settings</h2>
        <form onSubmit={savePayout} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Preferred Payout Method</label>
            <select value={payout.preferredMethod} onChange={(e) => setPayout((p) => ({ ...p, preferredMethod: e.target.value }))}
              className={inputClass}>
              <option>PayPal</option>
              <option>Bank Transfer</option>
              <option>Crypto (USDT)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">PayPal Email</label>
            <input type="email" value={payout.paypalEmail} onChange={(e) => setPayout((p) => ({ ...p, paypalEmail: e.target.value }))}
              placeholder="your-paypal@email.com" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Payout Threshold ($)</label>
            <input type="number" min="20" max="500" value={payout.threshold} onChange={(e) => setPayout((p) => ({ ...p, threshold: e.target.value }))} className={inputClass} />
            <p className="text-gray-500 text-xs mt-1">Minimum $20. You'll be paid automatically when balance exceeds this amount.</p>
          </div>
          <NeonButton type="submit" className="w-full">
            {saved === 'payout' ? '✓ Saved!' : 'Save Payout Settings'}
          </NeonButton>
        </form>
      </NeonCard>

      {/* Notifications */}
      <NeonCard className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Email Notifications</h2>
        <div className="space-y-4">
          {[
            { key: 'conversionEmail', label: 'Conversion Alerts', desc: 'Email when you earn a new commission' },
            { key: 'payoutEmail', label: 'Payout Notifications', desc: 'Email when payout is processed' },
            { key: 'newsletterEmail', label: 'Affiliate Newsletter', desc: 'Monthly tips and performance insights' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotif(key as keyof typeof notifications)}
                className={`w-12 h-6 rounded-full transition-all duration-200 relative ${notifications[key as keyof typeof notifications] ? 'bg-[#00f5ff]' : 'bg-gray-700'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${notifications[key as keyof typeof notifications] ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          ))}
        </div>
      </NeonCard>
    </div>
  );
}
