import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-slate-900 text-white shadow-card hover:bg-primary-600 active:scale-95',
      secondary: 'bg-primary-50 text-primary-700 hover:bg-primary-100 active:scale-95',
      outline: 'border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 active:scale-95',
      ghost: 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800',
      danger: 'bg-rose-500 text-white hover:bg-rose-600 active:scale-95',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-xs rounded-lg font-bold uppercase tracking-wider',
      md: 'px-5 py-2.5 rounded-xl font-bold text-sm',
      lg: 'px-8 py-3.5 rounded-2xl text-base font-bold',
      icon: 'p-2.5 rounded-xl',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none cursor-pointer',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
