import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-12 w-12' };

export default function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
  return (
    <div className={cn('relative', sizes[size], className)}>
      <div className={cn('absolute inset-0 rounded-full border-2 border-[rgba(0,245,255,0.15)]')} />
      <div
        className={cn(
          'absolute inset-0 rounded-full border-2 border-transparent border-t-[#00f5ff] animate-spin',
          'shadow-[0_0_10px_rgba(0,245,255,0.5)]'
        )}
      />
    </div>
  );
}
