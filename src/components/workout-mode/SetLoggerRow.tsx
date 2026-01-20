import { cn } from '@/lib/utils/cn';
import { Check } from 'lucide-react';

interface SetLoggerRowProps {
  setNumber: number;
  targetReps: string; // e.g., "8-12"
  weight: number;
  actualReps: number;
  isActive: boolean;
  isCompleted: boolean;
  onWeightChange: (weight: number) => void;
  onRepsChange: (reps: number) => void;
  onComplete: () => void;
}

export function SetLoggerRow({
  setNumber,
  targetReps,
  weight,
  actualReps,
  isActive,
  isCompleted,
  onWeightChange,
  onRepsChange,
  onComplete,
}: SetLoggerRowProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-4 p-3 rounded-card transition-all duration-200',
        isActive && 'bg-secondary/20 border border-secondary',
        isCompleted && 'opacity-50'
      )}
    >
      <span className="w-12 text-text-secondary font-medium">Set {setNumber}</span>

      <div className="flex-1 flex items-center gap-3">
        <div className="flex items-center gap-1">
          <input
            type="number"
            value={weight}
            onChange={(e) => onWeightChange(Number(e.target.value))}
            className="w-16 bg-surface text-center font-mono text-text-primary
                       rounded-input py-2 border border-transparent
                       focus:border-secondary outline-none"
            disabled={isCompleted}
          />
          <span className="text-text-secondary text-sm">kg</span>
        </div>

        <span className="text-text-secondary">×</span>

        <div className="flex items-center gap-1">
          <input
            type="number"
            value={actualReps}
            onChange={(e) => onRepsChange(Number(e.target.value))}
            placeholder={targetReps}
            className="w-16 bg-surface text-center font-mono text-text-primary
                       rounded-input py-2 border border-transparent
                       focus:border-secondary outline-none
                       placeholder:text-text-secondary/50"
            disabled={isCompleted}
          />
          <span className="text-text-secondary text-sm">reps</span>
        </div>
      </div>

      <button
        onClick={onComplete}
        disabled={isCompleted}
        className={cn(
          'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200',
          isCompleted
            ? 'bg-primary text-background'
            : 'bg-surface hover:bg-primary/20 text-text-secondary hover:text-primary'
        )}
      >
        <Check className="w-5 h-5" />
      </button>
    </div>
  );
}
