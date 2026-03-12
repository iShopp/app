'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const initialAddresses = [
  {
    id: 1,
    label: 'Home',
    name: 'Alex Johnson',
    line1: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
    phone: '+1 (555) 123-4567',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'Alex Johnson',
    line1: '456 Business Ave, Suite 200',
    city: 'New York',
    state: 'NY',
    zip: '10002',
    country: 'United States',
    phone: '+1 (555) 987-6543',
    isDefault: false,
  },
];

const emptyForm = { label: '', name: '', line1: '', city: '', state: '', zip: '', country: 'United States', phone: '' };

export default function AddressesPage() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const setDefault = (id: number) =>
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  const deleteAddress = (id: number) =>
    setAddresses((prev) => prev.filter((a) => a.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAddr = { ...form, id: Date.now(), isDefault: false };
    setAddresses((prev) => [...prev, newAddr]);
    setForm(emptyForm);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Saved Addresses</h1>
        <NeonButton onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Address'}
        </NeonButton>
      </div>

      {/* Add Form */}
      {showForm && (
        <NeonCard className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">New Address</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { key: 'label', label: 'Label (e.g. Home)', full: false },
              { key: 'name', label: 'Full Name', full: false },
              { key: 'line1', label: 'Street Address', full: true },
              { key: 'city', label: 'City', full: false },
              { key: 'state', label: 'State', full: false },
              { key: 'zip', label: 'ZIP Code', full: false },
              { key: 'country', label: 'Country', full: false },
              { key: 'phone', label: 'Phone Number', full: false },
            ].map(({ key, label, full }) => (
              <div key={key} className={full ? 'sm:col-span-2' : ''}>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">{label}</label>
                <input
                  required
                  value={(form as Record<string, string>)[key]}
                  onChange={(e) => setForm((p) => ({ ...p, [key]: e.target.value }))}
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <NeonButton type="submit" className="w-full">Save Address</NeonButton>
            </div>
          </form>
        </NeonCard>
      )}

      {/* Address Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((addr) => (
          <NeonCard key={addr.id} className="p-5 relative">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{addr.label === 'Home' ? '🏠' : '🏢'}</span>
                <span className="font-semibold text-white">{addr.label}</span>
                {addr.isDefault && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[rgba(0,245,255,0.1)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)]">
                    Default
                  </span>
                )}
              </div>
            </div>
            <div className="text-gray-300 text-sm space-y-0.5 mb-4">
              <p className="font-medium text-white">{addr.name}</p>
              <p>{addr.line1}</p>
              <p>{addr.city}, {addr.state} {addr.zip}</p>
              <p>{addr.country}</p>
              <p className="text-gray-400">{addr.phone}</p>
            </div>
            <div className="flex gap-2">
              {!addr.isDefault && (
                <button
                  onClick={() => setDefault(addr.id)}
                  className="text-xs text-[#00f5ff] hover:underline"
                >
                  Set as Default
                </button>
              )}
              <button
                onClick={() => deleteAddress(addr.id)}
                className="text-xs text-red-400 hover:underline ml-auto"
              >
                Delete
              </button>
            </div>
          </NeonCard>
        ))}
      </div>
    </div>
  );
}
