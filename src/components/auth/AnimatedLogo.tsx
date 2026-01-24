import { Dumbbell } from 'lucide-react'

export function AnimatedLogo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="animate-pulse-slow">
        <Dumbbell className="size-16 text-primary" />
      </div>
      <h1 className="text-h1 font-bold">Fitness Coach</h1>
    </div>
  )
}
