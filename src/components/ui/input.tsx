import { cn } from '@/lib/utils/cn'
import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            className={cn(
              'text-sm font-medium',
              error ? 'text-warning' : 'text-text-secondary'
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full bg-surface text-text-primary rounded-input px-4 py-3',
              'border outline-none transition-all duration-200',
              'placeholder:text-text-secondary/50',
              icon && 'pl-12',
              error
                ? 'border-warning focus:border-warning focus:ring-1 focus:ring-warning'
                : 'border-text-secondary/30 focus:border-primary focus:ring-1 focus:ring-primary',
              className
            )}
            {...props}
          />
        </div>
        {error && <span className="text-sm text-warning">{error}</span>}
      </div>
    )
  }
)

Input.displayName = 'Input'
