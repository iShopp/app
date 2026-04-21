import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RatingStarsProps {
  rating: number;
  className?: string;
}

export default function RatingStars({ rating, className }: RatingStarsProps) {
  return (
    <div className={cn('flex items-center', className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={cn('h-3.5 w-3.5', i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-300')} />
      ))}
    </div>
  );
}
