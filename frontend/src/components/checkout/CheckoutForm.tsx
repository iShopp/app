'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';
import { isValidEmail } from '@/lib/validation';

interface CheckoutFormProps {
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', zip: '' });
  const [paymentConsent, setPaymentConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => ({
    email: !isValidEmail(values.email) ? 'Enter a valid email' : '',
    paymentConsent: !paymentConsent ? 'Confirm test payment to continue' : '',
  }), [values, paymentConsent]);

  const hasError = Object.values(errors).some(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (hasError) return;
    setLoading(true);
    try {
      await onSubmit(values);
    } finally {
      setLoading(false);
    }
  };

  const input = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-blue-400';

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-3">
        <input id="firstName" name="firstName" aria-label="First Name" className={input} placeholder="First Name" value={values.firstName} onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))} />
        <input id="lastName" name="lastName" aria-label="Last Name" className={input} placeholder="Last Name" value={values.lastName} onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))} />
      </div>
      <input id="email" name="email" aria-label="Email" className={input} placeholder="Email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
      {submitted && errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
      <input id="address" name="address" aria-label="Address" className={input} placeholder="Address" value={values.address} onChange={(e) => setValues((v) => ({ ...v, address: e.target.value }))} />
      <div className="grid grid-cols-2 gap-3">
        <input id="city" name="city" aria-label="City" className={input} placeholder="City" value={values.city} onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))} />
        <input id="zip" name="zip" aria-label="ZIP" className={input} placeholder="ZIP" value={values.zip} onChange={(e) => setValues((v) => ({ ...v, zip: e.target.value }))} />
      </div>
      <div className="rounded-lg border border-amber-300 bg-amber-50 p-3 text-xs text-amber-800">
        Payment card fields are intentionally omitted in this demo build. Use provider-hosted fields (for example, Stripe Elements) before production.
      </div>
      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={paymentConsent}
          onChange={(e) => setPaymentConsent(e.target.checked)}
          className="mt-0.5"
        />
        I confirm this is a test checkout flow and no real payment data is collected.
      </label>
      {submitted && errors.paymentConsent && <p className="text-xs text-red-600">{errors.paymentConsent}</p>}
      <Button type="submit" loading={loading} className="w-full">Place order</Button>
    </form>
  );
}
