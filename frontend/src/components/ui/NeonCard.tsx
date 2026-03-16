'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface NeonCardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  glowColor?: 'cyan' | 'magenta' | 'purple';
}

const glowClasses = {
  cyan: 'hover:shadow-[0_0_20px_rgba(0,245,255,0.2),0_0_40px_rgba(0,245,255,0.1)] hover:border-[rgba(0,245,255,0.4)]',
  magenta: 'hover:shadow-[0_0_20px_rgba(255,0,255,0.2),0_0_40px_rgba(255,0,255,0.1)] hover:border-[rgba(255,0,255,0.4)]',
  purple: 'hover:shadow-[0_0_20px_rgba(157,78,221,0.2)] hover:border-[rgba(157,78,221,0.4)]',
};

export default function NeonCard({
  className,
  glow = true,
  glowColor = 'cyan',
  children,
  ...props
}: NeonCardProps) {
  return (
    <div
      className={cn(
        'bg-[#111118] border border-[rgba(0,245,255,0.15)] rounded-xl transition-all duration-300',
        glow && glowClasses[glowColor],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
