'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const tabs = ['General', 'Email', 'Payments', 'Shipping', 'SEO'];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState('General');
  const [saved, setSaved] = useState(false);

  const [general, setGeneral] = useState({
    storeName: 'iSHOP NEON FX',
    storeUrl: 'https://ishopneonfx.com',
    currency: 'USD',
    timezone: 'America/New_York',
    logo: '',
  });

  const [email, setEmail] = useState({
    smtpHost: 'smtp.sendgrid.net',
    smtpPort: '587',
    smtpUser: 'apikey',
    smtpPass: '',
    fromName: 'iSHOP NEON FX',
    fromEmail: 'noreply@ishopneonfx.com',
  });

  const [payments, setPayments] = useState({
    stripePublic: '',
    stripeSecret: '',
    paypalClientId: '',
    paypalSecret: '',
  });

  const [shipping, setShipping] = useState({
    freeShippingThreshold: '50',
    defaultShippingRate: '5.99',
    expressRate: '14.99',
    internationalEnabled: false,
  });

  const [seo, setSeo] = useState({
    metaTitle: 'iSHOP NEON FX - Best Deals Online',
    metaDescription: 'Shop the latest electronics, accessories and more at amazing prices.',
    googleAnalyticsId: '',
    facebookPixelId: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputClass = 'w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm';

  const Field = ({ label, value, onChange, type = 'text', placeholder = '' }: { label: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string }) => (
    <div>
      <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={inputClass} />
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-white">Platform Settings</h1>

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-[rgba(0,245,255,0.1)] pb-0">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition-all border-b-2 -mb-px ${activeTab === tab ? 'text-[#00f5ff] border-[#00f5ff]' : 'text-gray-400 border-transparent hover:text-white'}`}>
            {tab}
          </button>
        ))}
      </div>

      <form onSubmit={handleSave}>
        <NeonCard className="p-6">
          {activeTab === 'General' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">General Settings</h2>
              <Field label="Store Name" value={general.storeName} onChange={(v) => setGeneral((p) => ({ ...p, storeName: v }))} />
              <Field label="Store URL" value={general.storeUrl} onChange={(v) => setGeneral((p) => ({ ...p, storeUrl: v }))} type="url" />
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Currency</label>
                <select value={general.currency} onChange={(e) => setGeneral((p) => ({ ...p, currency: e.target.value }))} className={inputClass}>
                  <option value="USD">USD — US Dollar</option>
                  <option value="EUR">EUR — Euro</option>
                  <option value="GBP">GBP — British Pound</option>
                  <option value="CAD">CAD — Canadian Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Timezone</label>
                <select value={general.timezone} onChange={(e) => setGeneral((p) => ({ ...p, timezone: e.target.value }))} className={inputClass}>
                  <option value="America/New_York">Eastern Time (ET)</option>
                  <option value="America/Chicago">Central Time (CT)</option>
                  <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  <option value="Europe/London">London (GMT)</option>
                  <option value="Europe/Paris">Paris (CET)</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === 'Email' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Email / SMTP Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="SMTP Host" value={email.smtpHost} onChange={(v) => setEmail((p) => ({ ...p, smtpHost: v }))} />
                <Field label="SMTP Port" value={email.smtpPort} onChange={(v) => setEmail((p) => ({ ...p, smtpPort: v }))} />
                <Field label="SMTP Username" value={email.smtpUser} onChange={(v) => setEmail((p) => ({ ...p, smtpUser: v }))} />
                <Field label="SMTP Password" value={email.smtpPass} onChange={(v) => setEmail((p) => ({ ...p, smtpPass: v }))} type="password" placeholder="••••••••" />
                <Field label="From Name" value={email.fromName} onChange={(v) => setEmail((p) => ({ ...p, fromName: v }))} />
                <Field label="From Email" value={email.fromEmail} onChange={(v) => setEmail((p) => ({ ...p, fromEmail: v }))} type="email" />
              </div>
              <NeonButton type="button" variant="outline" size="sm">Send Test Email</NeonButton>
            </div>
          )}

          {activeTab === 'Payments' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Payment Settings</h2>
              <div className="p-4 rounded-lg bg-[#0d0d15] border border-[rgba(0,245,255,0.1)] space-y-3">
                <p className="text-white font-medium text-sm flex items-center gap-2">💳 Stripe</p>
                <Field label="Publishable Key" value={payments.stripePublic} onChange={(v) => setPayments((p) => ({ ...p, stripePublic: v }))} placeholder="pk_live_..." />
                <Field label="Secret Key" value={payments.stripeSecret} onChange={(v) => setPayments((p) => ({ ...p, stripeSecret: v }))} type="password" placeholder="sk_live_..." />
              </div>
              <div className="p-4 rounded-lg bg-[#0d0d15] border border-[rgba(0,245,255,0.1)] space-y-3">
                <p className="text-white font-medium text-sm flex items-center gap-2">🅿️ PayPal</p>
                <Field label="Client ID" value={payments.paypalClientId} onChange={(v) => setPayments((p) => ({ ...p, paypalClientId: v }))} placeholder="AaBbCc..." />
                <Field label="Client Secret" value={payments.paypalSecret} onChange={(v) => setPayments((p) => ({ ...p, paypalSecret: v }))} type="password" placeholder="••••••••" />
              </div>
            </div>
          )}

          {activeTab === 'Shipping' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Shipping Settings</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Free Shipping Threshold ($)" value={shipping.freeShippingThreshold} onChange={(v) => setShipping((p) => ({ ...p, freeShippingThreshold: v }))} type="number" />
                <Field label="Standard Shipping Rate ($)" value={shipping.defaultShippingRate} onChange={(v) => setShipping((p) => ({ ...p, defaultShippingRate: v }))} type="number" />
                <Field label="Express Shipping Rate ($)" value={shipping.expressRate} onChange={(v) => setShipping((p) => ({ ...p, expressRate: v }))} type="number" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="intl" checked={shipping.internationalEnabled}
                  onChange={(e) => setShipping((p) => ({ ...p, internationalEnabled: e.target.checked }))} className="w-4 h-4" />
                <label htmlFor="intl" className="text-sm text-gray-300">Enable International Shipping</label>
              </div>
            </div>
          )}

          {activeTab === 'SEO' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">SEO Settings</h2>
              <Field label="Default Meta Title" value={seo.metaTitle} onChange={(v) => setSeo((p) => ({ ...p, metaTitle: v }))} />
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Default Meta Description</label>
                <textarea value={seo.metaDescription} onChange={(e) => setSeo((p) => ({ ...p, metaDescription: e.target.value }))} rows={3}
                  className={`${inputClass} resize-none`} />
              </div>
              <Field label="Google Analytics ID" value={seo.googleAnalyticsId} onChange={(v) => setSeo((p) => ({ ...p, googleAnalyticsId: v }))} placeholder="G-XXXXXXXXXX" />
              <Field label="Facebook Pixel ID" value={seo.facebookPixelId} onChange={(v) => setSeo((p) => ({ ...p, facebookPixelId: v }))} placeholder="123456789..." />
            </div>
          )}

          <div className="mt-6">
            <NeonButton type="submit" className="w-full">
              {saved ? '✓ Settings Saved!' : 'Save Settings'}
            </NeonButton>
          </div>
        </NeonCard>
      </form>
    </div>
  );
}
