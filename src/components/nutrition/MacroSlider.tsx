import { cn } from '@/lib/utils/cn'

interface MacroSliderProps {
  label: string
  value: number // percentage 0-100
  grams: number
  color: 'protein' | 'carbs' | 'fat'
  onChange: (value: number) => void
  min?: number
  max?: number
}

export function MacroSlider({
  label,
  value,
  grams,
  color,
  onChange,
  min = 0,
  max = 100,
}: MacroSliderProps) {
  const colorClasses = {
    protein: { track: 'bg-protein', thumb: 'border-protein' },
    carbs: { track: 'bg-carbs', thumb: 'border-carbs' },
    fat: { track: 'bg-fat', thumb: 'border-fat' },
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <div className="text-right">
          <span className="font-mono text-lg font-bold text-text-primary">
            {value}%
          </span>
          <span className="text-text-secondary text-sm ml-2">({grams}g)</span>
        </div>
      </div>

      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={cn(
            'w-full h-2 rounded-full appearance-none cursor-pointer',
            'bg-surface',
            '[&::-webkit-slider-thumb]:appearance-none',
            '[&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background',
            '[&::-webkit-slider-thumb]:border-4',
            '[&::-webkit-slider-thumb]:cursor-pointer',
            '[&::-webkit-slider-thumb]:transition-transform',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            colorClasses[color].thumb.replace(
              'border-',
              '[&::-webkit-slider-thumb]:border-'
            )
          )}
          style={{
            background: `linear-gradient(to right, var(--color-${color}) ${value}%, #1E1E1E ${value}%)`,
          }}
        />
      </div>
    </div>
  )
}
