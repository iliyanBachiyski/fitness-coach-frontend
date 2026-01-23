import { cn } from '@/lib/utils/cn'

interface SkeletonCardProps {
  className?: string
  lines?: number
}

export function SkeletonCard({ className, lines = 3 }: SkeletonCardProps) {
  return (
    <div className={cn('rounded-card bg-surface p-4 animate-pulse', className)}>
      <div className="h-4 bg-surface-hover rounded w-3/4 mb-3" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'h-3 bg-surface-hover rounded mb-2',
            i === lines - 1 ? 'w-1/2' : 'w-full'
          )}
        />
      ))}
    </div>
  )
}
