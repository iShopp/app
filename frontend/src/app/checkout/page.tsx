'use client';

import { useState } from 'react';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import NeonCard from '@/components/ui/NeonCard';
import { formatPrice } from '@/lib/utils';

const ORDER_ITEMS = [
  { name: 'Wireless Earbuds Pro X', price: 29.99, qty: 1 },
  { name: 'Smart RGB LED Strip 5m', price: 31.98, qty: 2 },
];

const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price, 0);
const shipping = 0;
const total = subtotal + shipping;

export default function CheckoutPage() {
  const [step, setStep] = useState<'shipping' | 'payment' | 'done'>('shipping');
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', street: '', city: '', state: '', zip: '', country: 'US', cardNumber: '', expiry: '', cvv: '', cardName: '' });
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setStep('done');
  };

  if (step === 'done') {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <CheckCircle className="h-20 w-20 text-[#39ff14] mx-auto mb-6" style={{ filter: 'drop-shadow(0 0 15px rgba(57,255,20,0.5))' }} />
        <h1 className="text-3xl font-black text-white mb-3">Order Placed! 🎉</h1>
        <p className="text-gray-400 mb-2">Thank you for your order.</p>
        <p className="text-gray-500 text-sm mb-8">You&apos;ll receive a confirmation email shortly.</p>
        <div className="bg-[#111118] border border-[rgba(57,255,20,0.2)] rounded-xl p-4 mb-8 text-left space-y-2">
          <div className="flex justify-between text-sm"><span className="text-gray-400">Order #</span><span className="text-white font-mono">ISH-{Math.floor(Math.random() * 90000000 + 10000000)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Total</span><span className="text-[#39ff14] font-bold">{formatPrice(total)}</span></div>
          <div className="flex justify-between text-sm"><span className="text-gray-400">Status</span><span className="text-yellow-400">Processing</span></div>
        </div>
        <NeonButton variant="primary" size="lg" onClick={() => { window.location.href = '/users/orders'; }}>Track Order</NeonButton>
      </div>
    );
  }

  const inputCls = 'w-full bg-[#0a0a0f] border border-[rgba(0,245,255,0.2)] rounded-lg px-3 py-2.5 text-white text-sm placeholder-gray-600 outline-none focus:border-[#00f5ff] transition-colors';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <Lock className="h-5 w-5 text-[#39ff14]" />
        <h1 className="text-2xl font-bold text-white">Secure Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Steps */}
          <div className="flex items-center gap-4 mb-2">
            {(['shipping', 'payment'] as const).map((s, i) => (
              <button
                key={s}
                onClick={() => s === 'shipping' ? setStep(s) : undefined}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${step === s ? 'text-[#00f5ff]' : s === 'shipping' && step === 'payment' ? 'text-[#39ff14]' : 'text-gray-600'}`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === s ? 'bg-[#00f5ff] text-black' : 'bg-[#1a1a24] text-gray-500'}`}>{i + 1}</span>
                {s === 'shipping' ? 'Shipping' : 'Payment'}
              </button>
            ))}
          </div>

          {step === 'shipping' && (
            <NeonCard className="p-5">
              <h2 className="text-white font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-3">
                <input className={inputCls} placeholder="First Name" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} />
                <input className={inputCls} placeholder="Last Name" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} />
                <input className={`${inputCls} col-span-2`} placeholder="Email" type="email" value={form.email} onChange={(e) => update('email', e.target.value)} />
                <input className={`${inputCls} col-span-2`} placeholder="Phone" type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                <input className={`${inputCls} col-span-2`} placeholder="Street Address" value={form.street} onChange={(e) => update('street', e.target.value)} />
                <input className={inputCls} placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} />
                <input className={inputCls} placeholder="State" value={form.state} onChange={(e) => update('state', e.target.value)} />
                <input className={inputCls} placeholder="ZIP Code" value={form.zip} onChange={(e) => update('zip', e.target.value)} />
                <select className={inputCls} value={form.country} onChange={(e) => update('country', e.target.value)}>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
              </div>
              <NeonButton variant="primary" size="md" className="mt-5 w-full" onClick={() => setStep('payment')}>Continue to Payment</NeonButton>
            </NeonCard>
          )}

          {step === 'payment' && (
            <NeonCard className="p-5">
              <h2 className="text-white font-semibold mb-1 flex items-center gap-2"><CreditCard className="h-5 w-5 text-[#00f5ff]" /> Payment Details</h2>
              <p className="text-gray-600 text-xs mb-4 flex items-center gap-1"><Lock className="h-3 w-3" /> Secured by Stripe</p>
              <div className="space-y-3">
                <input className={inputCls} placeholder="Card Number" maxLength={19} value={form.cardNumber} onChange={(e) => update('cardNumber', e.target.value)} />
                <input className={inputCls} placeholder="Cardholder Name" value={form.cardName} onChange={(e) => update('cardName', e.target.value)} />
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="MM/YY" maxLength={5} value={form.expiry} onChange={(e) => update('expiry', e.target.value)} />
                  <input className={inputCls} placeholder="CVV" maxLength={4} value={form.cvv} onChange={(e) => update('cvv', e.target.value)} />
                </div>
              </div>
              <NeonButton variant="primary" size="md" className="mt-5 w-full" onClick={handleOrder} loading={loading}>
                <Lock className="h-4 w-4" /> Place Order · {formatPrice(total)}
              </NeonButton>
            </NeonCard>
          )}
        </div>

        {/* Summary */}
        <NeonCard className="p-5 h-fit">
          <h2 className="text-white font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4">
            {ORDER_ITEMS.map((item, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400 line-clamp-1 flex-1 mr-2">{item.name} ×{item.qty}</span>
                <span className="text-white shrink-0">{formatPrice(item.price)}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-[rgba(0,245,255,0.1)] pt-3 space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-400">Shipping</span><span className="text-[#39ff14]">FREE</span></div>
            <div className="flex justify-between"><span className="text-white font-semibold">Total</span><span className="text-[#00f5ff] font-bold text-lg">{formatPrice(total)}</span></div>
          </div>
        </NeonCard>
      </div>
    </div>
  );
}
