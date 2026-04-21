'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const initialBanners = [
  { id: 1, title: 'Summer Sale 2024', position: 'Hero', active: true, bg: 'from-[#ff00ff]/20 to-[#00f5ff]/20' },
  { id: 2, title: 'New Arrivals - Electronics', position: 'Home Middle', active: true, bg: 'from-[#9d4edd]/20 to-[#00f5ff]/20' },
  { id: 3, title: 'Free Shipping Banner', position: 'Header Bar', active: false, bg: 'from-[#39ff14]/20 to-[#00f5ff]/20' },
  { id: 4, title: 'Flash Deals Weekend', position: 'Sidebar', active: true, bg: 'from-[#ff6900]/20 to-[#ff00ff]/20' },
];

const positions = ['Hero', 'Home Middle', 'Header Bar', 'Sidebar', 'Footer', 'Category Page'];

export default function BannersPage() {
  const [banners, setBanners] = useState(initialBanners);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', position: 'Hero', active: true });

  const toggleActive = (id: number) =>
    setBanners((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b));

  const deleteBanner = (id: number) =>
    setBanners((prev) => prev.filter((b) => b.id !== id));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setBanners((prev) => [...prev, { id: Date.now(), title: form.title, position: form.position, active: form.active, bg: 'from-[#00f5ff]/20 to-[#ff00ff]/20' }]);
    setForm({ title: '', position: 'Hero', active: true });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Banners</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Banner'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Banner</h2>
          <form onSubmit={handleAdd} className="grid sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Banner Title</label>
              <input required value={form.title} onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="e.g. Summer Sale 2024"
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Position</label>
              <select value={form.position} onChange={(e) => setForm((p) => ({ ...p, position: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]">
                {positions.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="bannerActive" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} className="w-4 h-4" />
              <label htmlFor="bannerActive" className="text-sm text-gray-300">Active</label>
            </div>
            <div className="sm:col-span-3">
              <Button type="submit" className="w-full">Create Banner</Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <Card key={banner.id} className="p-0 overflow-hidden">
            {/* Image Preview */}
            <div className={`h-32 bg-gradient-to-r ${banner.bg} flex items-center justify-center border-b border-[rgba(0,245,255,0.1)]`}>
              <div className="text-center">
                <p className="text-4xl mb-1">🖼️</p>
                <p className="text-gray-400 text-xs">Banner Preview</p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-white font-medium">{banner.title}</p>
                  <p className="text-gray-400 text-xs">Position: {banner.position}</p>
                </div>
                <button
                  onClick={() => toggleActive(banner.id)}
                  className={`w-10 h-5 rounded-full transition-all duration-200 relative shrink-0 ${banner.active ? 'bg-[#00f5ff]' : 'bg-gray-700'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${banner.active ? 'left-5' : 'left-0.5'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className={`text-xs ${banner.active ? 'text-green-400' : 'text-gray-500'}`}>
                  {banner.active ? 'Active' : 'Inactive'}
                </span>
                <div className="flex gap-3">
                  <button className="text-xs text-[#00f5ff] hover:underline">Edit</button>
                  <button onClick={() => deleteBanner(banner.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
