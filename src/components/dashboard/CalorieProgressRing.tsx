import { useMemo } from 'react'
import { cn } from '@/lib/utils/cn'

interface CalorieProgressRingProps {
  consumed: number
  target: number
}

export function CalorieProgressRing({
  consumed,
  target,
}: CalorieProgressRingProps) {
  const percentage = useMemo(
    () => Math.min((consumed / target) * 100, 100),
    [consumed, target]
  )
  const isOverTarget = consumed > target
  const remaining = target - consumed

  const circumference = 2 * Math.PI * 45 // radius = 45
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div className="relative flex items-center justify-center">
      <svg className="w-48 h-48 -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-surface"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={cn(
            'transition-all duration-500 ease-out',
            isOverTarget ? 'stroke-warning' : 'stroke-primary'
          )}
        />
      </svg>

      {/* Center content */}
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-4xl font-bold text-text-primary">
          {consumed.toLocaleString()}
        </span>
        <span className="text-caption text-text-secondary">
          / {target.toLocaleString()} kcal
        </span>
        <span
          className={cn(
            'mt-2 text-sm font-medium',
            isOverTarget ? 'text-warning' : 'text-primary'
          )}
        >
          {isOverTarget
            ? `Over by ${Math.abs(remaining)}`
            : `${remaining} remaining`}
        </span>
      </div>
    </div>
  )
}
