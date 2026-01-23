import Button from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { cn } from '@/lib/utils/cn'
import { CheckCircle, Clock, Dumbbell, Play } from 'lucide-react'

type WorkoutStatus = 'pending' | 'in_progress' | 'completed'

interface WorkoutCardProps {
  name: string
  exerciseCount: number
  estimatedDuration: number // in minutes
  muscleGroups: string[]
  status: WorkoutStatus
  onStart: () => void
}

export function WorkoutCard({
  name,
  exerciseCount,
  estimatedDuration,
  muscleGroups,
  status,
  onStart,
}: WorkoutCardProps) {
  return (
    <GlassCard
      variant={status === 'completed' ? 'default' : 'default'}
      className={cn(
        'p-4',
        status === 'in_progress' && 'border-secondary animate-pulse',
        status === 'completed' && 'opacity-70'
      )}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">{name}</h3>
          <div className="flex items-center gap-4 mt-1 text-text-secondary text-sm">
            <span className="flex items-center gap-1">
              <Dumbbell className="w-4 h-4" />
              {exerciseCount} exercises
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {estimatedDuration} min
            </span>
          </div>
        </div>
        {status === 'completed' && (
          <CheckCircle className="w-6 h-6 text-primary" />
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {muscleGroups.map((group) => (
          <span
            key={group}
            className="px-2 py-1 text-xs rounded-full bg-surface text-text-secondary"
          >
            {group}
          </span>
        ))}
      </div>

      {status !== 'completed' && (
        <Button
          onClick={onStart}
          className="w-full"
          variant={status === 'in_progress' ? 'secondary' : 'default'}
        >
          <Play className="w-4 h-4 mr-2" />
          {status === 'in_progress' ? 'Continue Workout' : 'Start Workout'}
        </Button>
      )}
    </GlassCard>
  )
}
