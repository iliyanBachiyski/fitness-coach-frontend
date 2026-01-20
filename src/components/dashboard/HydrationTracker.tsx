import { Droplets, Plus, Minus } from 'lucide-react';

interface HydrationTrackerProps {
  current: number; // in ml
  target: number;  // in ml
  onIncrement: () => void;
  onDecrement: () => void;
}

export function HydrationTracker({
  current,
  target,
  onIncrement,
  onDecrement,
}: HydrationTrackerProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const glasses = Math.floor(current / 250);
  const targetGlasses = Math.floor(target / 250);

  return (
    <div className="glass-card p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="relative w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center"
            style={{
              background: `linear-gradient(to top, rgba(41, 121, 255, 0.4) ${percentage}%, transparent ${percentage}%)`,
            }}
          >
            <Droplets className="w-6 h-6 text-secondary" />
          </div>
          <div>
            <span className="font-mono text-xl font-bold text-text-primary">
              {(current / 1000).toFixed(1)}L
            </span>
            <span className="text-text-secondary text-sm block">
              {glasses} / {targetGlasses} glasses
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onDecrement}
            className="w-10 h-10 rounded-full bg-surface hover:bg-surface-hover
                       flex items-center justify-center transition-colors"
            disabled={current <= 0}
          >
            <Minus className="w-5 h-5 text-text-secondary" />
          </button>
          <button
            onClick={onIncrement}
            className="w-10 h-10 rounded-full bg-secondary/20 hover:bg-secondary/30
                       flex items-center justify-center transition-colors"
          >
            <Plus className="w-5 h-5 text-secondary" />
          </button>
        </div>
      </div>
    </div>
  );
}
