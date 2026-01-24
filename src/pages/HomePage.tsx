import Button from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'
import { THEME } from '@/constants/routes'
import { useAppDispatch } from '@/store'
import { logout } from '@/store/slices/authSlice'
import { LogOut, Palette } from 'lucide-react'
import { Link } from 'react-router'

export function HomePage() {
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Fitness Coach</h1>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="size-5 mr-2" />
          Logout
        </Button>
      </div>
      <p className="text-text-secondary">
        Welcome to your personal fitness companion.
      </p>

      <GlassCard className="p-4">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <Link to={THEME}>
          <Button className="w-full">
            <Palette className="size-5 mr-2" />
            View Theme & Components
          </Button>
        </Link>
      </GlassCard>
    </div>
  )
}
