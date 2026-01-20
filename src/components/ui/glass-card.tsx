import { cn } from '@/lib/utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'selected';
}

export function GlassCard({
  className,
  children,
  variant = 'default',
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-card bg-surface/80 backdrop-blur-glass',
        'border border-white/10',
        'shadow-card transition-all duration-200',
        {
          'hover:shadow-card-hover hover:bg-surface-hover': variant === 'default',
          'shadow-card-hover': variant === 'elevated',
          'border-primary shadow-glow': variant === 'selected',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
