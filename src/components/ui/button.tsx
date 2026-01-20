import { cn } from '@/lib/utils/cn';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  className,
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex items-center justify-center gap-2 font-medium rounded-button transition-all duration-200',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        {
          // Variants
          'bg-primary text-background hover:bg-primary-hover': variant === 'primary',
          'bg-transparent text-primary border border-primary hover:bg-primary/10': variant === 'secondary',
          'bg-transparent text-text-secondary hover:text-text-primary hover:bg-surface': variant === 'ghost',
          'bg-warning text-white hover:bg-warning/90': variant === 'danger',
          // Sizes (default padding for all, only sm/lg differ)
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2 text-base': size === 'md',
          'px-5 py-2.5 text-lg': size === 'lg',
        },
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {children}
    </button>
  );
}
