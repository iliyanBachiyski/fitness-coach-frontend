import { OtpVerificationForm } from '@/components/auth/OtpVerificationForm'
import { RegistrationForm } from '@/components/auth/RegistrationForm'
import { SocialLoginButton } from '@/components/auth/SocialLoginButton'
import { WithBackgroundLogo } from '@/components/common/WithBackgroundLogo'
import { GlassCard } from '@/components/ui/glass-card'
import { LOGIN } from '@/constants/routes'
import { useToast } from '@/hooks/useToast'
import type { RegistrationStep } from '@/types/registration'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export function RegistrationPage() {
  const [step, setStep] = useState<RegistrationStep>('form')
  const [email, setEmail] = useState('')
  const { addToast } = useToast()
  const navigate = useNavigate()

  const handleRegistrationSuccess = (userEmail: string) => {
    setEmail(userEmail)
    setStep('otp')
  }

  const handleOtpSuccess = () => {
    addToast({
      variant: 'success',
      title: 'Account created successfully!',
      description: 'Please log in with your credentials.',
    })
    navigate(LOGIN)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <GlassCard variant="elevated" className="w-full max-w-md p-8 space-y-6">
        {step === 'form' ? (
          <>
            <div className="flex justify-center">
              <WithBackgroundLogo variant="selected" size="lg" />
            </div>

            <RegistrationForm onSuccess={handleRegistrationSuccess} />

            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-text-secondary/30" />
              <span className="text-sm text-text-secondary">
                or continue with
              </span>
              <div className="h-px flex-1 bg-text-secondary/30" />
            </div>

            <SocialLoginButton />

            <p className="text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link to={LOGIN} className="text-primary hover:underline">
                Login
              </Link>
            </p>
          </>
        ) : (
          <OtpVerificationForm email={email} onSuccess={handleOtpSuccess} />
        )}
      </GlassCard>
    </div>
  )
}
