'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const initialBrands = [
  { id: 1, name: 'Sony', slug: 'sony', logo: '🎵', products: 342, active: true },
  { id: 2, name: 'Samsung', slug: 'samsung', logo: '📱', products: 678, active: true },
  { id: 3, name: 'Apple', slug: 'apple', logo: '🍎', products: 234, active: true },
  { id: 4, name: 'Anker', slug: 'anker', logo: '🔋', products: 189, active: true },
  { id: 5, name: 'Logitech', slug: 'logitech', logo: '🖱️', products: 145, active: false },
  { id: 6, name: 'JBL', slug: 'jbl', logo: '🔊', products: 98, active: true },
];

export default function BrandsPage() {
  const [brands, setBrands] = useState(initialBrands);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', slug: '', logo: '', active: true });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setBrands((prev) => prev.map((b) => b.id === editId ? { ...b, ...form } : b));
      setEditId(null);
    } else {
      setBrands((prev) => [...prev, { id: Date.now(), ...form, products: 0 }]);
    }
    setForm({ name: '', slug: '', logo: '', active: true });
    setShowForm(false);
  };

  const startEdit = (b: typeof initialBrands[0]) => {
    setForm({ name: b.name, slug: b.slug, logo: b.logo, active: b.active });
    setEditId(b.id);
    setShowForm(true);
  };

  const deleteBrand = (id: number) => setBrands((prev) => prev.filter((b) => b.id !== id));
  const toggleActive = (id: number) => setBrands((prev) => prev.map((b) => b.id === id ? { ...b, active: !b.active } : b));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Brands</h1>
        <NeonButton onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ name: '', slug: '', logo: '', active: true }); }}>
          {showForm && !editId ? 'Cancel' : '+ Add Brand'}
        </NeonButton>
      </div>

      {showForm && (
        <NeonCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">{editId ? 'Edit Brand' : 'New Brand'}</h2>
          <form onSubmit={submit} className="grid sm:grid-cols-2 gap-4">
            {[
              { key: 'name', label: 'Brand Name', placeholder: 'e.g. Sony' },
              { key: 'slug', label: 'Slug', placeholder: 'e.g. sony' },
              { key: 'logo', label: 'Logo (emoji)', placeholder: '🎵' },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
                <input
                  required={key !== 'logo'}
                  value={(form as Record<string, string | boolean>)[key] as string}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  placeholder={placeholder}
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
                />
              </div>
            ))}
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" id="brandActive" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} className="w-4 h-4" />
              <label htmlFor="brandActive" className="text-sm text-gray-300">Active</label>
            </div>
            <div className="sm:col-span-2">
              <NeonButton type="submit" className="w-full">{editId ? 'Update Brand' : 'Create Brand'}</NeonButton>
            </div>
          </form>
        </NeonCard>
      )}

      <NeonCard className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Brand', 'Slug', 'Products', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {brands.map((brand) => (
                <tr key={brand.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{brand.logo}</span>
                      <span className="text-white font-medium">{brand.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-sm">{brand.slug}</td>
                  <td className="px-4 py-3 text-[#00f5ff]">{brand.products}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(brand.id)} className={`text-xs px-2 py-1 rounded-full transition-colors ${brand.active ? 'text-green-400 bg-green-400/10 hover:bg-green-400/20' : 'text-gray-400 bg-gray-400/10 hover:bg-gray-400/20'}`}>
                      {brand.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(brand)} className="text-xs text-[#00f5ff] hover:underline">Edit</button>
                      <button onClick={() => deleteBrand(brand.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </NeonCard>
    </div>
  );
}
