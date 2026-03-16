import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'up' | 'down' | 'neutral';
  icon: LucideIcon;
  color?: 'cyan' | 'magenta' | 'purple' | 'green';
  className?: string;
}

const colorClasses = {
  cyan: {
    icon: 'text-[#00f5ff]',
    bg: 'bg-[rgba(0,245,255,0.08)]',
    glow: 'shadow-[0_0_20px_rgba(0,245,255,0.1)]',
    border: 'border-[rgba(0,245,255,0.15)]',
  },
  magenta: {
    icon: 'text-[#ff00ff]',
    bg: 'bg-[rgba(255,0,255,0.08)]',
    glow: 'shadow-[0_0_20px_rgba(255,0,255,0.1)]',
    border: 'border-[rgba(255,0,255,0.15)]',
  },
  purple: {
    icon: 'text-[#9d4edd]',
    bg: 'bg-[rgba(157,78,221,0.08)]',
    glow: 'shadow-[0_0_20px_rgba(157,78,221,0.1)]',
    border: 'border-[rgba(157,78,221,0.15)]',
  },
  green: {
    icon: 'text-[#39ff14]',
    bg: 'bg-[rgba(57,255,20,0.08)]',
    glow: 'shadow-[0_0_20px_rgba(57,255,20,0.1)]',
    border: 'border-[rgba(57,255,20,0.15)]',
  },
};

export default function KPICard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color = 'cyan',
  className,
}: KPICardProps) {
  const colors = colorClasses[color];

  return (
    <div
      className={cn(
        'bg-[#111118] rounded-xl border p-5 transition-all duration-300 hover:scale-[1.02]',
        colors.border,
        colors.glow,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
          {change && (
            <p
              className={cn(
                'text-xs mt-1 font-medium',
                changeType === 'up' && 'text-[#39ff14]',
                changeType === 'down' && 'text-red-400',
                changeType === 'neutral' && 'text-gray-500'
              )}
            >
              {changeType === 'up' ? '↑' : changeType === 'down' ? '↓' : ''} {change}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', colors.bg)}>
          <Icon className={cn('h-6 w-6', colors.icon)} />
        </div>
      </div>
    </div>
  );
}
