'use client';

import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#00f5ff] text-black font-semibold hover:bg-[#00e5ef] hover:shadow-[0_0_20px_rgba(0,245,255,0.6)] active:scale-95',
  secondary:
    'bg-[#ff00ff] text-white font-semibold hover:bg-[#e000e0] hover:shadow-[0_0_20px_rgba(255,0,255,0.6)] active:scale-95',
  outline:
    'border border-[#00f5ff] text-[#00f5ff] bg-transparent hover:bg-[rgba(0,245,255,0.1)] hover:shadow-[0_0_15px_rgba(0,245,255,0.3)] active:scale-95',
  ghost:
    'text-gray-300 bg-transparent hover:text-[#00f5ff] hover:bg-[rgba(0,245,255,0.05)] active:scale-95',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-md',
  md: 'px-5 py-2.5 text-sm rounded-lg',
  lg: 'px-7 py-3.5 text-base rounded-xl',
};

const NeonButton = forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#00f5ff]/30 disabled:opacity-50 disabled:cursor-not-allowed select-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

NeonButton.displayName = 'NeonButton';
export default NeonButton;
