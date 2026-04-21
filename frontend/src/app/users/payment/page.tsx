'use client';

import { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

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
          <Card key={card.id} className="p-5">
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
          </Card>
        ))}

        <Button variant="outline" className="w-full" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add New Card'}
        </Button>

        {showForm && (
          <Card className="p-5">
            <h3 className="font-semibold text-white mb-4">Add New Card</h3>
            {/* Stripe Elements integration required — card details must NEVER be collected
                in plain DOM inputs. Replace this placeholder with Stripe's CardElement
                (or individual CardNumberElement / CardExpiryElement / CardCvcElement)
                so all sensitive data is handled inside a PCI-compliant Stripe iframe.
                See: https://stripe.com/docs/stripe-js */}
            <div className="rounded-lg border border-dashed border-[rgba(0,245,255,0.3)] bg-[rgba(0,245,255,0.04)] p-6 text-center">
              <p className="text-[#00f5ff] text-sm font-medium mb-1">Stripe Elements will be integrated here</p>
              <p className="text-gray-500 text-xs">
                Card fields (number, expiry, CVV) must be collected via Stripe{"'"}s hosted
                iframe — never via plain DOM inputs — to remain PCI-compliant.
              </p>
            </div>
            <Button className="w-full mt-4" disabled>Save Card</Button>
          </Card>
        )}
      </div>

      {/* PayPal */}
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🅿️</span>
            <div>
              <p className="text-white font-medium">PayPal</p>
              <p className="text-gray-400 text-sm">{paypalLinked ? 'alex@example.com — Connected' : 'Not connected'}</p>
            </div>
          </div>
          <Button
            size="sm"
            variant={paypalLinked ? 'outline' : 'primary'}
            onClick={() => setPaypalLinked(!paypalLinked)}
          >
            {paypalLinked ? 'Disconnect' : 'Connect'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
