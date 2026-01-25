import { WithBackgroundLogo } from '@/components/common/WithBackgroundLogo'
import { LoginForm } from '@/components/auth/LoginForm'
import { FORGOT_PASSWORD, SIGNUP } from '@/constants/routes'
import { SocialLoginButton } from '@/components/auth/SocialLoginButton'
import { GlassCard } from '@/components/ui/glass-card'
import { Link } from 'react-router'

export function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard variant="elevated" className="w-full max-w-md p-8 space-y-6">
        <div className="flex justify-center">
          <WithBackgroundLogo variant="selected" size="lg" />
        </div>

        <LoginForm />

        <Link
          to={FORGOT_PASSWORD}
          className="block text-center text-sm text-text-secondary hover:underline"
        >
          Forgot password?
        </Link>

        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-text-secondary/30" />
          <span className="text-sm text-text-secondary">or continue with</span>
          <div className="h-px flex-1 bg-text-secondary/30" />
        </div>

        <SocialLoginButton />

        <p className="text-center text-sm text-text-secondary">
          Don't have an account?{' '}
          <Link to={SIGNUP} className="text-primary hover:underline">
            Sign Up
          </Link>
        </p>
      </GlassCard>
    </div>
  )
}
