'use client';

import { useState } from 'react';
import NeonCard from '@/components/ui/NeonCard';
import NeonButton from '@/components/ui/NeonButton';

const mockTracking = {
  trackingNumber: 'TRK9281736450',
  carrier: 'FedEx',
  estimatedDelivery: 'Jan 30, 2024',
  steps: [
    { label: 'Order Placed', detail: 'Your order has been confirmed', date: 'Jan 25, 2024 09:00 AM', done: true, icon: '📋' },
    { label: 'Processing', detail: 'Order is being prepared for shipment', date: 'Jan 25, 2024 02:00 PM', done: true, icon: '⚙️' },
    { label: 'Shipped', detail: 'Package picked up by carrier', date: 'Jan 26, 2024 10:30 AM', done: true, icon: '📦' },
    { label: 'Out for Delivery', detail: 'Package is on its way to you', date: 'Jan 29, 2024 08:00 AM', done: false, icon: '🚚' },
    { label: 'Delivered', detail: 'Package delivered to your address', date: null, done: false, icon: '🏠' },
  ],
};

export default function TrackPage() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<typeof mockTracking | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setResult(mockTracking);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-white">Track Shipment</h1>

      {/* Input */}
      <NeonCard className="p-6">
        <p className="text-gray-400 text-sm mb-4">Enter your tracking number to get real-time updates on your shipment.</p>
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            placeholder="e.g. TRK9281736450"
            className="flex-1 bg-[#0d0d15] border border-[rgba(0,245,255,0.2)] rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00f5ff] transition-colors"
          />
          <NeonButton onClick={handleTrack} disabled={loading}>
            {loading ? 'Tracking...' : 'Track'}
          </NeonButton>
        </div>
      </NeonCard>

      {/* Result */}
      {result && (
        <NeonCard className="p-6">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Tracking Number</p>
              <p className="text-[#00f5ff] font-mono font-bold text-lg">{result.trackingNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Carrier</p>
              <p className="text-white font-medium">{result.carrier}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Est. Delivery</p>
              <p className="text-[#39ff14] font-medium">{result.estimatedDelivery}</p>
            </div>
          </div>

          {/* Steps */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[rgba(0,245,255,0.15)]" />
            <div className="space-y-6">
              {result.steps.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 z-10 border-2 transition-all ${
                    step.done
                      ? 'border-[#00f5ff] bg-[rgba(0,245,255,0.1)]'
                      : 'border-gray-700 bg-[#0d0d15]'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 pt-2">
                    <p className={`font-semibold ${step.done ? 'text-white' : 'text-gray-500'}`}>{step.label}</p>
                    <p className={`text-sm ${step.done ? 'text-gray-300' : 'text-gray-600'}`}>{step.detail}</p>
                    {step.date && <p className="text-xs text-gray-500 mt-1">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </NeonCard>
      )}
    </div>
  );
}
