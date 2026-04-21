'use client';

import { cn } from '@/lib/utils';
import { HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: boolean;
  glowColor?: 'cyan' | 'magenta' | 'purple';
}

const glowClasses = {
  cyan: 'hover:shadow-[0_8px_20px_rgba(56,189,248,0.12)] hover:border-sky-400/50',
  magenta: 'hover:shadow-[0_8px_20px_rgba(217,70,239,0.12)] hover:border-fuchsia-400/50',
  purple: 'hover:shadow-[0_8px_20px_rgba(168,85,247,0.12)] hover:border-violet-400/50',
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
