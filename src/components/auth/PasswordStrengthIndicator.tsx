import { usePasswordStrength } from '@/hooks/usePasswordStrength'
import { cn } from '@/lib/utils/cn'
import { Check, X } from 'lucide-react'

interface PasswordStrengthIndicatorProps {
  password: string
  showLabel?: boolean
  showRequirements?: boolean
}

export function PasswordStrengthIndicator({
  password,
  showLabel = true,
  showRequirements = true,
}: PasswordStrengthIndicatorProps) {
  const { score, label, percentage, criteria } = usePasswordStrength(password)

  const getColorClass = () => {
    switch (score) {
      case 1:
        return 'bg-warning'
      case 2:
        return 'bg-fat'
      case 3:
        return 'bg-secondary'
      case 4:
        return 'bg-primary'
      default:
        return 'bg-text-secondary/30'
    }
  }

  return (
    <div className="space-y-1.5">
      <div className="h-1.5 w-full bg-surface rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300',
            getColorClass()
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && label && (
        <p
          className={cn('text-xs font-medium', {
            'text-warning': score === 1,
            'text-fat': score === 2,
            'text-secondary': score === 3,
            'text-primary': score === 4,
          })}
        >
          {label}
        </p>
      )}
      {showRequirements && (
        <ul className="space-y-1 pt-1">
          {criteria.map((criterion) => (
            <li
              key={criterion.label}
              className="flex items-center gap-1.5 text-xs"
            >
              {criterion.met ? (
                <Check className="h-3.5 w-3.5 text-primary" />
              ) : (
                <X className="h-3.5 w-3.5 text-text-secondary/50" />
              )}
              <span
                className={cn(
                  criterion.met ? 'text-primary' : 'text-text-secondary/50'
                )}
              >
                {criterion.label}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
