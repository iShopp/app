'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import Button from './Button';

interface WriteReviewProps {
  productId: string;
  onSubmit?: (data: { rating: number; title: string; comment: string }) => Promise<void>;
}

export default function WriteReview({ productId, onSubmit }: WriteReviewProps) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating || !comment.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit?.({ rating, title, comment });
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-4 text-center">
        <p className="text-green-400 font-medium">✓ Review submitted! Thank you.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-4 space-y-4">
      <h3 className="text-base font-semibold text-white">Write a Review</h3>

      {/* Star rating */}
      <div className="flex gap-1">
        {[1,2,3,4,5].map((star) => (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            className="transition-transform hover:scale-110"
            aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
          >
            <Star className={cn(
              'h-6 w-6 transition-colors',
              (hover || rating) >= star ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
            )} />
          </button>
        ))}
        {rating > 0 && <span className="ml-2 text-sm text-slate-400 self-center">{['','Poor','Fair','Good','Great','Excellent'][rating]}</span>}
      </div>

      <input
        type="text"
        placeholder="Review title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        maxLength={100}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none"
      />

      <textarea
        placeholder="Share your experience with this product..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
        rows={4}
        maxLength={1000}
        className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-500 focus:border-orange-500 focus:outline-none resize-none"
      />

      <Button
        type="submit"
        disabled={!rating || !comment.trim() || submitting}
        variant="primary"
        size="sm"
      >
        {submitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  );
}
