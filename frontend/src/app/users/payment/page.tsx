'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const savedCards = [
  { id: 1, brand: 'Visa', last4: '4242', expiry: '12/26', name: 'Alex Johnson', isDefault: true },
  { id: 2, brand: 'Mastercard', last4: '8888', expiry: '08/25', name: 'Alex Johnson', isDefault: false },
];

const brandIcons: Record<string, string> = { Visa: '💙', Mastercard: '🔴', Amex: '💚', PayPal: '🅿️' };
const brandColors: Record<string, string> = { Visa: '#1a1aff', Mastercard: '#eb001b', Amex: '#007b5e' };

export default function PaymentPage() {
  const [cards, setCards] = useState(savedCards);
  const [showForm, setShowForm] = useState(false);
  const [paypalLinked, setPaypalLinked] = useState(false);

  const setDefault = (id: number) =>
    setCards((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));

  const removeCard = (id: number) => setCards((prev) => prev.filter((c) => c.id !== id));

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Payment Methods</h1>

      {/* Saved Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Credit & Debit Cards</h2>
        {cards.map((card) => (
          <NeonCard key={card.id} className="p-5">
            <div
              className="rounded-xl p-4 mb-4 relative overflow-hidden"
              style={{ background: `linear-gradient(135deg, ${brandColors[card.brand] || '#1a1aff'}33, #111118)`, border: '1px solid rgba(0,245,255,0.2)' }}
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-2xl">{brandIcons[card.brand] || '💳'}</span>
                <span className="text-white font-bold text-lg">{card.brand}</span>
              </div>
              <p className="text-white font-mono text-xl tracking-widest mb-2">
                •••• •••• •••• {card.last4}
              </p>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{card.name}</span>
                <span>Expires {card.expiry}</span>
              </div>
              {card.isDefault && (
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-[rgba(0,245,255,0.15)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)]">
                  Default
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {!card.isDefault && (
                <button onClick={() => setDefault(card.id)} className="text-xs text-[#00f5ff] hover:underline">
                  Set as Default
                </button>
              )}
              <button onClick={() => removeCard(card.id)} className="text-xs text-red-400 hover:underline ml-auto">
                Remove
              </button>
            </div>
          </NeonCard>
        ))}

        <NeonButton variant="outline" className="w-full" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Card'}
        </NeonButton>

        {showForm && (
          <NeonCard className="p-5">
            <h3 className="font-semibold text-white mb-4">Add New Card</h3>
            {/* TODO: Replace this placeholder form with Stripe Elements (CardElement / CardNumberElement).
                Card details (number, expiry, CVV) must NEVER be collected in plain DOM inputs.
                Use Stripe's hosted fields so sensitive data is handled in a PCI-compliant iframe
                and never touches your application server. See: https://stripe.com/docs/stripe-js */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Card Number</label>
                <input
                  placeholder="1234 5678 9012 3456"
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Expiry</label>
                  <input
                    placeholder="MM/YY"
                    className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">CVV</label>
                  <input
                    placeholder="•••"
                    className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1 uppercase tracking-wide">Cardholder Name</label>
                <input
                  placeholder="Name on card"
                  className="w-full bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] text-sm"
                />
              </div>
              <NeonButton className="w-full">Save Card</NeonButton>
            </div>
          </NeonCard>
        )}
      </div>

      {/* PayPal */}
      <NeonCard className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🅿️</span>
            <div>
              <p className="text-white font-medium">PayPal</p>
              <p className="text-gray-400 text-sm">{paypalLinked ? 'alex@example.com — Connected' : 'Not connected'}</p>
            </div>
          </div>
          <NeonButton
            size="sm"
            variant={paypalLinked ? 'outline' : 'primary'}
            onClick={() => setPaypalLinked(!paypalLinked)}
          >
            {paypalLinked ? 'Disconnect' : 'Connect'}
          </NeonButton>
        </div>
      </NeonCard>
    </div>
  );
}
