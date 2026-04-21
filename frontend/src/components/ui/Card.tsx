'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  glowColor?: 'cyan' | 'magenta' | 'purple';
}

const glowClasses = {
  cyan: 'hover:shadow-sm hover:border-slate-500',
  magenta: 'hover:shadow-sm hover:border-slate-500',
  purple: 'hover:shadow-sm hover:border-slate-500',
};

export default function Card({ className, glow = true, glowColor = 'cyan', children, ...props }: CardProps) {
  return (
    <div
      className={cn('bg-slate-900 border border-slate-700 rounded-xl transition-all duration-300', glow && glowClasses[glowColor], className)}
      {...props}
    >
      {children}
    </div>
  );
}
