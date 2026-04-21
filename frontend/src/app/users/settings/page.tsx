'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function UserSettingsPage() {
  const [profile, setProfile] = useState({ name: 'Alex Johnson', email: 'alex@example.com', phone: '+1 (555) 123-4567' });
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' });
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    sms: false,
    appPush: true,
  });
  const [saved, setSaved] = useState('');

  const saveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved('profile');
    setTimeout(() => setSaved(''), 2000);
  };

  const savePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved('password');
    setPasswords({ current: '', newPass: '', confirm: '' });
    setTimeout(() => setSaved(''), 2000);
  };

  const toggle = (key: keyof typeof notifications) =>
    setNotifications((p) => ({ ...p, [key]: !p[key] }));

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Account Settings</h1>

      {/* Profile */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
        <form onSubmit={saveProfile} className="space-y-4">
          {[
            { key: 'name', label: 'Full Name', type: 'text' },
            { key: 'email', label: 'Email Address', type: 'email' },
            { key: 'phone', label: 'Phone Number', type: 'tel' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
              <input
                type={type}
                value={(profile as Record<string, string>)[key]}
                onChange={(e) => setProfile((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm"
              />
            </div>
          ))}
          <Button type="submit" className="w-full">
            {saved === 'profile' ? '✓ Saved!' : 'Save Profile'}
          </Button>
        </form>
      </Card>

      {/* Password */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Change Password</h2>
        <form onSubmit={savePassword} className="space-y-4">
          {[
            { key: 'current', label: 'Current Password' },
            { key: 'newPass', label: 'New Password' },
            { key: 'confirm', label: 'Confirm New Password' },
          ].map(({ key, label }) => (
            <div key={key}>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
              <input
                type="password"
                value={(passwords as Record<string, string>)[key]}
                onChange={(e) => setPasswords((p) => ({ ...p, [key]: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm"
              />
            </div>
          ))}
          <Button type="submit" variant="outline" className="w-full">
            {saved === 'password' ? '✓ Password Updated!' : 'Update Password'}
          </Button>
        </form>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { key: 'orderUpdates', label: 'Order Updates', desc: 'Shipping and delivery notifications' },
            { key: 'promotions', label: 'Promotions & Deals', desc: 'Special offers and discount alerts' },
            { key: 'newsletter', label: 'Newsletter', desc: 'Weekly newsletter and product highlights' },
            { key: 'sms', label: 'SMS Notifications', desc: 'Text messages for order updates' },
            { key: 'appPush', label: 'Push Notifications', desc: 'Browser and app push notifications' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)] last:border-0">
              <div>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
              <button
                onClick={() => toggle(key as keyof typeof notifications)}
                className={`w-12 h-6 rounded-full transition-all duration-200 relative ${
                  notifications[key as keyof typeof notifications] ? 'bg-[#00f5ff]' : 'bg-gray-700'
                }`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-200 ${
                  notifications[key as keyof typeof notifications] ? 'left-6' : 'left-0.5'
                }`} />
              </button>
            </div>
          ))}
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-red-500/30">
        <h2 className="text-lg font-semibold text-red-400 mb-2">Danger Zone</h2>
        <p className="text-gray-400 text-sm mb-4">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <button className="px-4 py-2 rounded-lg border border-red-500/50 text-red-400 text-sm hover:bg-red-500/10 transition-colors">
          Delete My Account
        </button>
      </Card>
    </div>
  );
}
