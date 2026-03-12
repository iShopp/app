'use client';

import { useState } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Star, ChevronDown, ChevronUp, Shield, Truck, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import NeonButton from '@/components/ui/NeonButton';
import NeonCard from '@/components/ui/NeonCard';
import Badge from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';

interface ProductPageProps {
  params: { slug: string };
}

const MOCK_PRODUCT = {
  id: '1',
  name: 'Premium Wireless Earbuds Pro X — Active Noise Cancellation',
  price: 29.99,
  originalPrice: 79.99,
  rating: 4.7,
  reviewCount: 1243,
  marketplace: 'temu',
  inStock: true,
  stockCount: 47,
  description: 'Experience next-level audio with the Pro X earbuds. Featuring active noise cancellation, 30-hour battery life, and premium sound quality in a sleek, lightweight design.',
  images: [
    'https://placehold.co/600x600/111118/00f5ff?text=Earbuds+Main',
    'https://placehold.co/600x600/111118/ff00ff?text=Earbuds+Side',
    'https://placehold.co/600x600/111118/9d4edd?text=Earbuds+Case',
    'https://placehold.co/600x600/111118/39ff14?text=Earbuds+Worn',
  ],
  variants: [
    { id: 'black', name: 'Color', value: 'Black', price: 29.99 },
    { id: 'white', name: 'Color', value: 'White', price: 29.99 },
    { id: 'cyan', name: 'Color', value: 'Neon Cyan', price: 34.99 },
  ],
  faqs: [
    { q: 'Are these waterproof?', a: 'Yes, they have IPX5 water resistance rating.' },
    { q: 'What is the battery life?', a: 'Up to 8 hours on earbuds, 30 hours total with charging case.' },
    { q: 'Do they support fast charging?', a: 'Yes, 15 minutes charge gives 2 hours of playback.' },
  ],
};

const RELATED = Array.from({ length: 4 }, (_, i) => ({
  id: String(i + 10),
  slug: `related-product-${i + 1}`,
  name: `Related Product ${i + 1}`,
  price: Number((((i * 17 + 10) % 40) + 10).toFixed(2)),
  image: `https://placehold.co/300x300/111118/00f5ff?text=Related+${i + 1}`,
}));

export default function ProductPage({ params: _params }: ProductPageProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState(MOCK_PRODUCT.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const product = MOCK_PRODUCT;
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/shop" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00f5ff] transition-colors mb-6 text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
        {/* Images */}
        <div>
          <div className="relative aspect-square rounded-xl overflow-hidden bg-[#0d0d15] border border-[rgba(0,245,255,0.15)] mb-3">
            <img src={product.images[selectedImage]} alt={product.name} className="w-full h-full object-cover" />
            <div className="absolute top-3 left-3">
              <span className="bg-[#ff00ff] text-white text-sm font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(255,0,255,0.5)]">-{discount}%</span>
            </div>
          </div>
          <div className="flex gap-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`aspect-square w-16 rounded-lg overflow-hidden border-2 transition-all ${selectedImage === idx ? 'border-[#00f5ff] shadow-[0_0_8px_rgba(0,245,255,0.5)]' : 'border-[rgba(0,245,255,0.1)] opacity-60 hover:opacity-100'}`}
              >
                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-start justify-between gap-4 mb-3">
            <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight">{product.name}</h1>
            <button onClick={() => setWishlisted((v) => !v)} className="p-2 shrink-0">
              <Heart className={`h-5 w-5 transition-colors ${wishlisted ? 'fill-[#ff00ff] text-[#ff00ff]' : 'text-gray-500 hover:text-[#ff00ff]'}`} />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'}`} />
              ))}
            </div>
            <span className="text-[#00f5ff] text-sm font-medium">{product.rating}</span>
            <span className="text-gray-500 text-sm">({product.reviewCount.toLocaleString()} reviews)</span>
            <Badge variant="cyan">{product.marketplace}</Badge>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-black text-[#00f5ff]" style={{ textShadow: '0 0 15px rgba(0,245,255,0.4)' }}>
              {formatPrice(selectedVariant.price ?? product.price)}
            </span>
            <span className="text-xl text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            <span className="text-[#39ff14] font-semibold text-sm">Save {discount}%</span>
          </div>

          {/* Variants */}
          <div className="mb-5">
            <p className="text-gray-400 text-sm mb-2">Color</p>
            <div className="flex gap-2">
              {product.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${selectedVariant.id === v.id ? 'border-[#00f5ff] text-[#00f5ff] bg-[rgba(0,245,255,0.1)] shadow-[0_0_8px_rgba(0,245,255,0.3)]' : 'border-[rgba(255,255,255,0.1)] text-gray-400 hover:border-[rgba(0,245,255,0.3)]'}`}
                >
                  {v.value}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4 mb-6">
            <p className="text-gray-400 text-sm">Qty:</p>
            <div className="flex items-center border border-[rgba(0,245,255,0.2)] rounded-lg overflow-hidden">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[rgba(0,245,255,0.08)] transition-colors">−</button>
              <span className="px-4 py-2 text-white font-medium border-x border-[rgba(0,245,255,0.15)]">{quantity}</span>
              <button onClick={() => setQuantity((q) => Math.min(99, q + 1))} className="px-3 py-2 text-gray-400 hover:text-white hover:bg-[rgba(0,245,255,0.08)] transition-colors">+</button>
            </div>
            <span className="text-green-400 text-sm">{product.stockCount} in stock</span>
          </div>

          {/* CTA */}
          <div className="flex gap-3 mb-6">
            <NeonButton variant="primary" size="lg" className="flex-1" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              {addedToCart ? 'Added! ✓' : 'Add to Cart'}
            </NeonButton>
            <Link href="/checkout" className="flex-1">
              <NeonButton variant="secondary" size="lg" className="w-full">
                Buy Now
              </NeonButton>
            </Link>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Shield, text: 'Buyer Protection' },
              { icon: Truck, text: 'Free Shipping' },
              { icon: RefreshCw, text: '30-day Returns' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex flex-col items-center gap-1 p-3 bg-[#111118] rounded-lg border border-[rgba(0,245,255,0.08)]">
                <Icon className="h-4 w-4 text-[#00f5ff]" />
                <span className="text-gray-500 text-[10px] text-center">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Description */}
      <NeonCard className="p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-3">Product Description</h2>
        <p className="text-gray-400 leading-relaxed">{product.description}</p>
      </NeonCard>

      {/* FAQ */}
      <NeonCard className="p-6 mb-12">
        <h2 className="text-lg font-bold text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {product.faqs.map((faq, idx) => (
            <div key={idx} className="border border-[rgba(0,245,255,0.1)] rounded-lg overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-[rgba(0,245,255,0.04)] transition-colors"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="text-white font-medium text-sm">{faq.q}</span>
                {openFaq === idx ? <ChevronUp className="h-4 w-4 text-[#00f5ff] shrink-0" /> : <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />}
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-gray-400 text-sm border-t border-[rgba(0,245,255,0.08)] pt-3">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </NeonCard>

      {/* Related */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Related <span className="text-[#00f5ff]">Products</span></h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {RELATED.map((rel) => (
            <NeonCard key={rel.id} className="overflow-hidden group">
              <Link href={`/product/${rel.slug}`} className="block">
                <div className="aspect-square overflow-hidden bg-[#0d0d15]">
                  <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-3">
                  <p className="text-white text-sm font-medium line-clamp-2 group-hover:text-[#00f5ff] transition-colors mb-1">{rel.name}</p>
                  <span className="text-[#00f5ff] font-bold">{formatPrice(rel.price)}</span>
                </div>
              </Link>
            </NeonCard>
          ))}
        </div>
      </div>
    </div>
  );
}
