'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const initialCategories = [
  { id: 1, name: 'Electronics', slug: 'electronics', parent: null, productCount: 3241, active: true },
  { id: 2, name: 'Smartphones', slug: 'smartphones', parent: 'Electronics', productCount: 867, active: true },
  { id: 3, name: 'Accessories', slug: 'accessories', parent: 'Electronics', productCount: 1204, active: true },
  { id: 4, name: 'Wearables', slug: 'wearables', parent: null, productCount: 542, active: true },
  { id: 5, name: 'Home & Living', slug: 'home-living', parent: null, productCount: 1893, active: true },
  { id: 6, name: 'Fashion', slug: 'fashion', parent: null, productCount: 2106, active: false },
];

const emptyForm = { name: '', slug: '', parent: '', active: true };

export default function CategoriesPage() {
  const [categories, setCategories] = useState(initialCategories);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setCategories((prev) => prev.map((c) => c.id === editId ? { ...c, name: form.name, slug: form.slug, parent: form.parent || null, active: form.active } : c));
      setEditId(null);
    } else {
      setCategories((prev) => [...prev, { id: Date.now(), name: form.name, slug: form.slug, parent: form.parent || null, productCount: 0, active: form.active }]);
    }
    setForm(emptyForm);
    setShowForm(false);
  };

  const startEdit = (cat: typeof initialCategories[0]) => {
    setForm({ name: cat.name, slug: cat.slug, parent: cat.parent || '', active: cat.active });
    setEditId(cat.id);
    setShowForm(true);
  };

  const deleteCategory = (id: number) => setCategories((prev) => prev.filter((c) => c.id !== id));

  const roots = categories.filter((c) => !c.parent);
  const getChildren = (name: string) => categories.filter((c) => c.parent === name);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Categories</h1>
        <Button onClick={() => { setShowForm(!showForm); setEditId(null); setForm(emptyForm); }}>
          {showForm && !editId ? 'Cancel' : '+ Add Category'}
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">{editId ? 'Edit Category' : 'New Category'}</h2>
          <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Name</label>
              <input required value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Slug</label>
              <input required value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm font-mono" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Parent Category</label>
              <select value={form.parent} onChange={(e) => setForm((p) => ({ ...p, parent: e.target.value }))}
                className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white focus:outline-none focus:border-[#00f5ff] text-sm">
                <option value="">None (Root Category)</option>
                {roots.map((c) => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3 pt-5">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm((p) => ({ ...p, active: e.target.checked }))} id="active" className="w-4 h-4" />
              <label htmlFor="active" className="text-sm text-gray-300">Active</label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit" className="w-full">{editId ? 'Update Category' : 'Create Category'}</Button>
            </div>
          </form>
        </Card>
      )}

      {/* Category Tree */}
      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0d0d15] border-b border-[rgba(0,245,255,0.1)]">
                {['Category', 'Slug', 'Parent', 'Products', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-gray-400 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roots.map((cat) => (
                <>
                  <tr key={cat.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white font-medium">{cat.name}</td>
                    <td className="px-4 py-3 text-gray-400 font-mono text-sm">{cat.slug}</td>
                    <td className="px-4 py-3 text-gray-500 text-sm">—</td>
                    <td className="px-4 py-3 text-[#00f5ff]">{cat.productCount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${cat.active ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                        {cat.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => startEdit(cat)} className="text-xs text-[#00f5ff] hover:underline">Edit</button>
                        <button onClick={() => deleteCategory(cat.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                  {getChildren(cat.name).map((child) => (
                    <tr key={child.id} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-white/5 transition-colors bg-[rgba(0,0,0,0.2)]">
                      <td className="px-4 py-3 text-gray-300">
                        <span className="text-gray-600 mr-2">└</span>{child.name}
                      </td>
                      <td className="px-4 py-3 text-gray-400 font-mono text-sm">{child.slug}</td>
                      <td className="px-4 py-3 text-gray-500 text-sm">{child.parent}</td>
                      <td className="px-4 py-3 text-[#00f5ff]">{child.productCount.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-1 rounded-full ${child.active ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                          {child.active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(child)} className="text-xs text-[#00f5ff] hover:underline">Edit</button>
                          <button onClick={() => deleteCategory(child.id)} className="text-xs text-red-400 hover:underline">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
