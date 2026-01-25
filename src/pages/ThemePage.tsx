import {
  ArrowUpRight,
  BadgeCheck,
  Bookmark,
  Loader2,
  Package,
  Search,
} from 'lucide-react'
import { useState } from 'react'
import { NavLink, Navigate, Route, Routes } from 'react-router'

// UI Components
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/useToast'

// Dashboard Components
import { CalorieProgressRing } from '@/components/dashboard/CalorieProgressRing'
import { HydrationTracker } from '@/components/dashboard/HydrationTracker'
import { MacroProgressBar } from '@/components/dashboard/MacroProgressBar'
import { WorkoutCard } from '@/components/dashboard/WorkoutCard'

// Nutrition Components
import { DayTypeToggle } from '@/components/nutrition/DayTypeToggle'
import { MacroSlider } from '@/components/nutrition/MacroSlider'

// Workout Mode Components
import { RestTimer } from '@/components/workout-mode/RestTimer'
import { SetLoggerRow } from '@/components/workout-mode/SetLoggerRow'

// Common Components
import { EmptyState } from '@/components/common/EmptyState'
import { SkeletonCard } from '@/components/common/SkeletonCard'
import { HOME, THEME } from '@/constants/routes'
import { Logo } from '@/components/common/Logo'
import { WithBackgroundLogo } from '@/components/common/WithBackgroundLogo'

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-text-primary border-b border-white/10 pb-2">
        {title}
      </h2>
      {children}
    </div>
  )
}

function UIComponentsPage() {
  const { addToast } = useToast()

  return (
    <div className="space-y-8">
      <Section title="Toast">
        <p className="text-text-secondary text-sm mb-4">
          Click buttons to trigger different toast variants. Toasts auto-dismiss
          after 5 seconds. Hover to pause the timer.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() =>
              addToast({
                variant: 'success',
                title: 'Workout saved!',
                description: 'Your workout has been logged successfully.',
              })
            }
          >
            Success Toast
          </Button>
          <Button
            variant="destructive"
            onClick={() =>
              addToast({
                variant: 'error',
                title: 'Failed to save',
                description: 'Please check your connection and try again.',
              })
            }
          >
            Error Toast
          </Button>
          <Button
            variant="secondary"
            onClick={() =>
              addToast({
                variant: 'info',
                title: 'Pro tip',
                description: 'Swipe left on exercises to delete them.',
              })
            }
          >
            Info Toast
          </Button>
          <Button
            variant="ghost"
            onClick={() =>
              addToast({
                variant: 'warning',
                title: 'Unsaved changes',
                description: 'You have unsaved changes that will be lost.',
              })
            }
          >
            Warning Toast
          </Button>
        </div>
      </Section>

      <Section title="Button (shadcn)">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button loading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </Section>

      <Section title="Input">
        <div className="space-y-4 max-w-md">
          <Input placeholder="Basic input" />
          <Input label="With Label" placeholder="Enter value..." />
          <Input
            label="With Icon"
            placeholder="Search..."
            icon={<Search className="w-5 h-5" />}
          />
          <Input
            label="With Error"
            placeholder="Invalid input"
            error="This field is required"
          />
        </div>
      </Section>

      <Section title="GlassCard">
        <div className="grid gap-4 md:grid-cols-3">
          <GlassCard className="p-4">
            <h3 className="font-semibold mb-2">Default</h3>
            <p className="text-text-secondary text-sm">
              Default glass card with hover effect
            </p>
          </GlassCard>
          <GlassCard variant="elevated" className="p-4">
            <h3 className="font-semibold mb-2">Elevated</h3>
            <p className="text-text-secondary text-sm">
              Elevated variant with stronger shadow
            </p>
          </GlassCard>
          <GlassCard variant="selected" className="p-4">
            <h3 className="font-semibold mb-2">Selected</h3>
            <p className="text-text-secondary text-sm">
              Selected variant with glow effect
            </p>
          </GlassCard>
        </div>
      </Section>

      <Section title="Badge">
        <p className="text-text-secondary text-sm mb-2">Variants</p>
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="ghost">Ghost</Badge>
          <Badge variant="destructive">Destructive</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="link">Link</Badge>
        </div>
        <p className="text-text-secondary text-sm mb-2">With Icon</p>
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="secondary">
            <BadgeCheck className="size-3" />
            Verified
          </Badge>
          <Badge variant="outline">
            Bookmark
            <Bookmark className="size-3" />
          </Badge>
        </div>
        <p className="text-text-secondary text-sm mb-2">With Spinner</p>
        <div className="flex flex-wrap gap-3 mb-4">
          <Badge variant="destructive">
            <Loader2 className="size-3 animate-spin" />
            Deleting
          </Badge>
          <Badge variant="secondary">
            Generating
            <Loader2 className="size-3 animate-spin" />
          </Badge>
        </div>
        <p className="text-text-secondary text-sm mb-2">As Link</p>
        <div className="flex flex-wrap gap-3">
          <Badge asChild>
            <a href="#link">
              Open Link
              <ArrowUpRight className="size-3" />
            </a>
          </Badge>
          <Badge variant="secondary" asChild>
            <a href="#docs">
              Documentation
              <ArrowUpRight className="size-3" />
            </a>
          </Badge>
        </div>
      </Section>
    </div>
  )
}

function DashboardComponentsPage() {
  const [hydration, setHydration] = useState(1500)

  return (
    <div className="space-y-8">
      <Section title="CalorieProgressRing">
        <div className="flex justify-center mt-4 gap-3">
          <CalorieProgressRing consumed={1850} target={2200} />
          <CalorieProgressRing consumed={2500} target={2200} />
        </div>
      </Section>

      <Section title="MacroProgressBar">
        <div className="space-y-4 max-w-md">
          <MacroProgressBar
            label="Protein"
            current={120}
            target={150}
            color="protein"
          />
          <MacroProgressBar
            label="Carbs"
            current={200}
            target={250}
            color="carbs"
          />
          <MacroProgressBar label="Fat" current={0} target={60} color="fat" />
        </div>
      </Section>

      <Section title="HydrationTracker">
        <HydrationTracker
          current={hydration}
          target={2500}
          onIncrement={() => setHydration((h) => h + 250)}
          onDecrement={() => setHydration((h) => Math.max(0, h - 250))}
        />
      </Section>

      <Section title="WorkoutCard">
        <div className="space-y-4 max-w-md">
          <WorkoutCard
            name="Push Day"
            exerciseCount={6}
            estimatedDuration={45}
            muscleGroups={['Chest', 'Shoulders', 'Triceps']}
            status="pending"
            onStart={() => {}}
          />
          <WorkoutCard
            name="Pull Day"
            exerciseCount={5}
            estimatedDuration={50}
            muscleGroups={['Back', 'Biceps']}
            status="in_progress"
            onStart={() => {}}
          />
          <WorkoutCard
            name="Leg Day"
            exerciseCount={7}
            estimatedDuration={55}
            muscleGroups={['Quads', 'Hamstrings', 'Glutes']}
            status="completed"
            onStart={() => {}}
          />
        </div>
      </Section>
    </div>
  )
}

function NutritionComponentsPage() {
  const [protein, setProtein] = useState(30)
  const [carbs, setCarbs] = useState(45)
  const [fat, setFat] = useState(25)
  const [dayType, setDayType] = useState<'training' | 'rest'>('training')

  return (
    <div className="space-y-8">
      <Section title="MacroSlider">
        <div className="space-y-6 max-w-md">
          <MacroSlider
            label="Protein"
            value={protein}
            grams={Math.round(protein * 2)}
            color="protein"
            onChange={setProtein}
          />
          <MacroSlider
            label="Carbs"
            value={carbs}
            grams={Math.round(carbs * 3)}
            color="carbs"
            onChange={setCarbs}
          />
          <MacroSlider
            label="Fat"
            value={fat}
            grams={Math.round(fat * 0.8)}
            color="fat"
            onChange={setFat}
          />
        </div>
      </Section>

      <Section title="DayTypeToggle">
        <DayTypeToggle value={dayType} onChange={setDayType} />
      </Section>
    </div>
  )
}

function WorkoutModeComponentsPage() {
  const [sets, setSets] = useState([
    { weight: 60, reps: 10, completed: true },
    { weight: 70, reps: 8, completed: false },
    { weight: 75, reps: 6, completed: false },
  ])
  const [showTimer, setShowTimer] = useState(true)

  return (
    <div className="space-y-8">
      <Section title="SetLoggerRow">
        <div className="space-y-2 max-w-md">
          {sets.map((set, i) => (
            <SetLoggerRow
              key={i}
              setNumber={i + 1}
              targetReps="8-12"
              weight={set.weight}
              actualReps={set.reps}
              isActive={i === 1}
              isCompleted={set.completed}
              onWeightChange={(w) => {
                const newSets = [...sets]
                newSets[i].weight = w
                setSets(newSets)
              }}
              onRepsChange={(r) => {
                const newSets = [...sets]
                newSets[i].reps = r
                setSets(newSets)
              }}
              onComplete={() => {
                const newSets = [...sets]
                newSets[i].completed = true
                setSets(newSets)
              }}
            />
          ))}
        </div>
      </Section>

      <Section title="RestTimer">
        <div className="flex flex-col items-center">
          {showTimer ? (
            <RestTimer
              duration={90}
              onComplete={() => setShowTimer(false)}
              onSkip={() => setShowTimer(false)}
            />
          ) : (
            <Button onClick={() => setShowTimer(true)}>Show Timer Again</Button>
          )}
        </div>
      </Section>
    </div>
  )
}

function CommonComponentsPage() {
  return (
    <div className="space-y-8">
      <Section title="Logo">
        <div className="flex flex-row space-y-4 max-w-md">
          <Logo />
          <Logo animated />
          <Logo text="Pulse Fit App" />
        </div>
      </Section>

      <Section title="With Background Logo">
        <div className="flex flex-row gap-3">
          <WithBackgroundLogo variant="elevated" size="xs" />
          <WithBackgroundLogo variant="elevated" size="sm" />
          <WithBackgroundLogo variant="elevated" />
          <WithBackgroundLogo variant="selected" />
          <WithBackgroundLogo variant="elevated" size="lg" />
        </div>
      </Section>

      <Section title="SkeletonCard">
        <div className="space-y-4 max-w-md">
          <SkeletonCard />
          <SkeletonCard lines={5} />
        </div>
      </Section>

      <Section title="EmptyState">
        <EmptyState
          icon={Package}
          title="No Workouts Yet"
          description="Start your fitness journey by creating your first workout routine."
          actionLabel="Create Workout"
          onAction={() => {}}
        />
      </Section>
    </div>
  )
}

const navItems = [
  { to: `${THEME}/ui`, label: 'UI' },
  { to: `${THEME}/dashboard`, label: 'Dashboard' },
  { to: `${THEME}/nutrition`, label: 'Nutrition' },
  { to: `${THEME}/workout`, label: 'Workout' },
  { to: `${THEME}/common`, label: 'Common' },
]

export function ThemePage() {
  return (
    <div className="min-h-screen pb-8">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-white/10 px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Theme & Components</h1>
          <NavLink to={HOME}>
            <Button variant="ghost" size="sm">
              Back to Home
            </Button>
          </NavLink>
        </div>
        <nav className="flex gap-2 overflow-x-auto pb-2">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-button text-sm font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'bg-surface text-text-secondary hover:text-text-primary'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="p-6">
        {/* TODO: No need to add these routes in the routes config file */}
        <Routes>
          <Route index element={<Navigate to="ui" replace />} />
          <Route path="ui" element={<UIComponentsPage />} />
          <Route path="dashboard" element={<DashboardComponentsPage />} />
          <Route path="nutrition" element={<NutritionComponentsPage />} />
          <Route path="workout" element={<WorkoutModeComponentsPage />} />
          <Route path="common" element={<CommonComponentsPage />} />
        </Routes>
      </main>
    </div>
  )
}
