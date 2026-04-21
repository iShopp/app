import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { formatPrice, formatDate } from '@/lib/utils';

const order = {
  id: 'ORD-002',
  date: '2024-01-10',
  status: 'shipped',
  items: [
    { name: 'Smart Watch X Pro', img: '⌚', qty: 1, price: 179.99 },
    { name: 'Charging Cable USB-C', img: '🔋', qty: 2, price: 9.99 },
  ],
  shipping: {
    name: 'Alex Johnson',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zip: '10001',
    country: 'United States',
  },
  payment: { method: 'Visa', last4: '4242', brand: '💳' },
  subtotal: 199.97,
  shippingFee: 0,
  tax: 18.00,
  total: 217.97,
};

const timeline = [
  { label: 'Order Placed', date: '2024-01-10', done: true, icon: '📋' },
  { label: 'Payment Confirmed', date: '2024-01-10', done: true, icon: '✅' },
  { label: 'Processing', date: '2024-01-11', done: true, icon: '⚙️' },
  { label: 'Shipped', date: '2024-01-12', done: true, icon: '📦' },
  { label: 'Out for Delivery', date: null, done: false, icon: '🚚' },
  { label: 'Delivered', date: null, done: false, icon: '🏠' },
];

const statusColors: Record<string, string> = {
  shipped: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
  delivered: 'text-green-400 bg-green-400/10 border-green-400/30',
  processing: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
  pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  cancelled: 'text-red-400 bg-red-400/10 border-red-400/30',
};

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // id will be used to fetch order from API; static data shown until backend is wired
  const { id } = await params; // eslint-disable-line @typescript-eslint/no-unused-vars
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <a href="/users/orders" className="text-[#00f5ff] hover:underline text-sm">← Back to Orders</a>
      </div>

      {/* Header */}
      <Card className="p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-white font-mono">{order.id}</h1>
            <p className="text-gray-400 text-sm">Placed on {formatDate(order.date)}</p>
          </div>
          <span className={`text-sm px-3 py-1 rounded-full border font-medium capitalize ${statusColors[order.status]}`}>
            {order.status}
          </span>
        </div>
      </Card>

      {/* Timeline */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-white mb-5">Order Progress</h2>
        <div className="flex flex-wrap gap-2">
          {timeline.map((step, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg border transition-all ${
                step.done
                  ? 'border-[rgba(0,245,255,0.4)] bg-[rgba(0,245,255,0.05)] text-[#00f5ff]'
                  : 'border-[rgba(255,255,255,0.1)] bg-[#0d0d15] text-gray-500'
              }`}>
                <span className="text-lg">{step.icon}</span>
                <span className="text-xs font-medium whitespace-nowrap">{step.label}</span>
                {step.date && <span className="text-xs opacity-70">{formatDate(step.date)}</span>}
              </div>
              {i < timeline.length - 1 && (
                <div className={`w-4 h-0.5 ${step.done ? 'bg-[#00f5ff]' : 'bg-gray-700'}`} />
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Items */}
      <Card className="p-5">
        <h2 className="text-lg font-semibold text-white mb-4">Order Items</h2>
        <div className="space-y-3">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-[#0d0d15] border border-[rgba(0,245,255,0.08)]">
              <div className="w-12 h-12 rounded-lg bg-[#111118] flex items-center justify-center text-2xl shrink-0">
                {item.img}
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{item.name}</p>
                <p className="text-gray-400 text-sm">Qty: {item.qty}</p>
              </div>
              <p className="text-white font-medium">{formatPrice(item.price * item.qty)}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Shipping */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Shipping Address</h2>
          <div className="text-gray-300 text-sm space-y-1">
            <p className="font-medium text-white">{order.shipping.name}</p>
            <p>{order.shipping.address}</p>
            <p>{order.shipping.city}, {order.shipping.state} {order.shipping.zip}</p>
            <p>{order.shipping.country}</p>
          </div>
        </Card>

        {/* Payment */}
        <Card className="p-5">
          <h2 className="text-lg font-semibold text-white mb-3">Payment Info</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">{order.payment.brand}</span>
            <div>
              <p className="text-white font-medium">{order.payment.method}</p>
              <p className="text-gray-400 text-sm">ending in {order.payment.last4}</p>
            </div>
          </div>
          <div className="space-y-2 border-t border-[rgba(0,245,255,0.1)] pt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Subtotal</span>
              <span className="text-white">{formatPrice(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Shipping</span>
              <span className="text-green-400">{order.shippingFee === 0 ? 'FREE' : formatPrice(order.shippingFee)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Tax</span>
              <span className="text-white">{formatPrice(order.tax)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-[rgba(0,245,255,0.1)] pt-2">
              <span className="text-white">Total</span>
              <span className="text-[#00f5ff]">{formatPrice(order.total)}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex gap-3">
        <a href="/users/track">
          <Button>Track Shipment</Button>
        </a>
        <Button variant="outline">Download Invoice</Button>
      </div>
    </div>
  );
}
