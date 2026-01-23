import { cn } from '@/lib/utils/cn'
import { Dumbbell, Sofa } from 'lucide-react'

type DayType = 'training' | 'rest'

interface DayTypeToggleProps {
  value: DayType
  onChange: (value: DayType) => void
}

export function DayTypeToggle({ value, onChange }: DayTypeToggleProps) {
  return (
    <div className="inline-flex rounded-button bg-surface p-1">
      <button
        onClick={() => onChange('training')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-button transition-all duration-200',
          value === 'training'
            ? 'bg-primary text-background'
            : 'text-text-secondary hover:text-text-primary'
        )}
      >
        <Dumbbell className="w-4 h-4" />
        Training Day
      </button>
      <button
        onClick={() => onChange('rest')}
        className={cn(
          'flex items-center gap-2 px-4 py-2 rounded-button transition-all duration-200',
          value === 'rest'
            ? 'bg-secondary text-white'
            : 'text-text-secondary hover:text-text-primary'
        )}
      >
        <Sofa className="w-4 h-4" />
        Rest Day
      </button>
    </div>
  )
}
