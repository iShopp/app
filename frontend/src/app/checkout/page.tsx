'use client';

import { useState } from 'react';
import { CheckCircle2, Lock } from 'lucide-react';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { enterpriseLog, logRpcRetry, operatorAlert } from '@/lib/enterprise';
import { isValidEmail } from '@/lib/validation';

const ORDER_ITEMS = [
  { name: 'Wireless Earbuds Pro X', price: 29.99, qty: 1 },
  { name: 'Smart LED Strip 5m', price: 15.99, qty: 2 },
];

const subtotal = ORDER_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const shipping = 0;
const total = subtotal + shipping;

export default function CheckoutPage() {
  const [done, setDone] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleOrder = async (values: Record<string, string>) => {
    setSubmitError('');
    enterpriseLog({ type: 'session_key_usage', message: `Checkout by ${values.email}` });
    logRpcRetry('checkout.submit', 0);

    await new Promise((r) => setTimeout(r, 600));

    if (!isValidEmail(values.email)) {
      operatorAlert('CHK-VAL-001', 'Checkout validation failed');
      setSubmitError('Please enter a valid email address.');
      return;
    }

    enterpriseLog({ type: 'profitability_snapshot', profitability: total * 0.21, message: 'Checkout profitability snapshot' });
    setDone(true);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center">
        <CheckCircle2 className="mx-auto mb-4 h-16 w-16 text-green-600" />
        <h1 className="mb-2 text-2xl font-semibold text-slate-100">Order placed successfully</h1>
        <p className="mb-6 text-slate-400">Your confirmation email is on the way.</p>
        <Button onClick={() => { window.location.href = '/users/orders'; }}>Track order</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 py-8 lg:grid-cols-3 lg:px-8">
      <div className="lg:col-span-2">
        <div className="mb-4 flex items-center gap-2 text-slate-300"><Lock className="h-4 w-4" /> Secure checkout</div>
        <Card className="p-5">
          {submitError ? <p className="mb-3 text-sm text-red-500">{submitError}</p> : null}
          <CheckoutForm onSubmit={handleOrder} />
        </Card>
      </div>
      <Card className="h-fit p-5">
        <h2 className="mb-4 text-lg font-semibold text-slate-100">Order summary</h2>
        <div className="space-y-2 text-sm">
          {ORDER_ITEMS.map((item, i) => (
            <div key={i} className="flex justify-between text-slate-400">
              <span>{item.name} ×{item.qty}</span>
              <span>{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 space-y-2 border-t border-slate-700 pt-3 text-sm">
          <div className="flex justify-between"><span className="text-slate-500">Shipping</span><span className="text-green-600">FREE</span></div>
          <div className="flex justify-between font-semibold text-slate-100"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </Card>
    </div>
  );
}
