import { NavLink } from 'react-router'
import { Home, Calendar, Dumbbell, List, User } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

const navItems = [
  { to: '/home', icon: Home, label: 'Home' },
  { to: '/calendar', icon: Calendar, label: 'Calendar' },
  { to: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { to: '/exercises', icon: List, label: 'Exercises' },
  { to: '/profile', icon: User, label: 'Profile' },
]

export function BottomNavigation() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-glass
                    border-t border-white/10 safe-area-bottom"
    >
      <div className="flex justify-around items-center h-16">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-col items-center gap-1 px-4 py-2 transition-colors duration-200',
                isActive
                  ? 'text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              )
            }
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
