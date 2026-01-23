import { Link } from 'react-router'
import { Palette } from 'lucide-react'
import Button from '@/components/ui/button'
import { GlassCard } from '@/components/ui/glass-card'

export function HomePage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Fitness Coach</h1>
      <p className="text-text-secondary">
        Welcome to your personal fitness companion.
      </p>

      <GlassCard className="p-4">
        <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
        <Link to="/theme">
          <Button className="w-full">
            <Palette className="w-5 h-5 mr-2" />
            View Theme & Components
          </Button>
        </Link>
      </GlassCard>
    </div>
  )
}
