'use client';

import { useMemo, useState } from 'react';
import Button from '@/components/ui/Button';

interface CheckoutFormProps {
  onSubmit: (values: Record<string, string>) => Promise<void> | void;
}

export default function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [values, setValues] = useState({ firstName: '', lastName: '', email: '', address: '', city: '', zip: '', cardNumber: '', expiry: '', cvv: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const errors = useMemo(() => ({
    email: !values.email.includes('@') ? 'Enter a valid email' : '',
    cardNumber: values.cardNumber.replace(/\s/g, '').length < 12 ? 'Card number is too short' : '',
    cvv: values.cvv.length < 3 ? 'CVV is required' : '',
  }), [values]);

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
        <input className={input} placeholder="First Name" value={values.firstName} onChange={(e) => setValues((v) => ({ ...v, firstName: e.target.value }))} />
        <input className={input} placeholder="Last Name" value={values.lastName} onChange={(e) => setValues((v) => ({ ...v, lastName: e.target.value }))} />
      </div>
      <input className={input} placeholder="Email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} />
      {submitted && errors.email && <p className="text-xs text-red-600">{errors.email}</p>}
      <input className={input} placeholder="Address" value={values.address} onChange={(e) => setValues((v) => ({ ...v, address: e.target.value }))} />
      <div className="grid grid-cols-2 gap-3">
        <input className={input} placeholder="City" value={values.city} onChange={(e) => setValues((v) => ({ ...v, city: e.target.value }))} />
        <input className={input} placeholder="ZIP" value={values.zip} onChange={(e) => setValues((v) => ({ ...v, zip: e.target.value }))} />
      </div>
      <input className={input} placeholder="Card Number" value={values.cardNumber} onChange={(e) => setValues((v) => ({ ...v, cardNumber: e.target.value }))} />
      {submitted && errors.cardNumber && <p className="text-xs text-red-600">{errors.cardNumber}</p>}
      <div className="grid grid-cols-2 gap-3">
        <input className={input} placeholder="MM/YY" value={values.expiry} onChange={(e) => setValues((v) => ({ ...v, expiry: e.target.value }))} />
        <input className={input} placeholder="CVV" value={values.cvv} onChange={(e) => setValues((v) => ({ ...v, cvv: e.target.value }))} />
      </div>
      {submitted && errors.cvv && <p className="text-xs text-red-600">{errors.cvv}</p>}
      <Button type="submit" loading={loading} className="w-full">Place order</Button>
    </form>
  );
}
