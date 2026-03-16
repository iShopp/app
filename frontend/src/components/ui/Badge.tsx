import { cn } from '@/lib/utils';

type BadgeVariant = 'cyan' | 'magenta' | 'purple' | 'green' | 'yellow' | 'red' | 'gray';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  cyan: 'bg-[rgba(0,245,255,0.1)] text-[#00f5ff] border border-[rgba(0,245,255,0.3)]',
  magenta: 'bg-[rgba(255,0,255,0.1)] text-[#ff00ff] border border-[rgba(255,0,255,0.3)]',
  purple: 'bg-[rgba(157,78,221,0.1)] text-[#9d4edd] border border-[rgba(157,78,221,0.3)]',
  green: 'bg-[rgba(57,255,20,0.1)] text-[#39ff14] border border-[rgba(57,255,20,0.3)]',
  yellow: 'bg-yellow-900/20 text-yellow-400 border border-yellow-500/30',
  red: 'bg-red-900/20 text-red-400 border border-red-500/30',
  gray: 'bg-gray-800 text-gray-400 border border-gray-700',
};

export default function Badge({ children, variant = 'cyan', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium', variantClasses[variant], className)}>
      {children}
    </span>
  );
}
