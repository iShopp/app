import RatingStars from './RatingStars';

interface ReviewItem {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

interface ReviewListProps {
  reviews: ReviewItem[];
}

export default function ReviewList({ reviews }: ReviewListProps) {
  return (
    <ul className="space-y-3">
      {reviews.map((review) => (
        <li key={review.id} className="rounded-xl border border-slate-200 bg-white p-3">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-800">{review.author}</p>
            <RatingStars rating={review.rating} />
          </div>
          <p className="text-sm text-slate-600">{review.comment}</p>
        </li>
      ))}
    </ul>
  );
}
