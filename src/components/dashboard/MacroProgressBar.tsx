import { cn } from '@/lib/utils/cn';

interface MacroProgressBarProps {
  label: string;
  current: number;
  target: number;
  color: 'protein' | 'carbs' | 'fat';
  unit?: string;
}

export function MacroProgressBar({
  label,
  current,
  target,
  color,
  unit = 'g',
}: MacroProgressBarProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isOver = current > target;

  const colorClasses = {
    protein: 'bg-protein',
    carbs: 'bg-carbs',
    fat: 'bg-fat',
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <span className={cn(
          'font-mono text-sm',
          isOver ? 'text-warning' : 'text-text-secondary'
        )}>
          {current}{unit} / {target}{unit}
        </span>
      </div>
      <div className="h-2 bg-surface rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            isOver ? 'bg-warning' : colorClasses[color]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
