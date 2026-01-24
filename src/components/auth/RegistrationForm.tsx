import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { registrationSchema } from '@/lib/validations/registrationSchema'
import { cn } from '@/lib/utils/cn'
import { useFormik } from 'formik'
import { Check, Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'
import { PasswordStrengthIndicator } from './PasswordStrengthIndicator'

interface RegistrationFormProps {
  onSuccess: (email: string) => void
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    },
    validationSchema: registrationSchema,
    onSubmit: async (values) => {
      try {
        // Mock API call with 1.5s delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock successful registration - trigger OTP step
        onSuccess(values.email)
      } catch {
        // Error handling would be implemented with actual API
      }
    },
  })

  const getFieldError = (
    field: 'email' | 'password' | 'confirmPassword' | 'termsAccepted'
  ) => {
    return formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : undefined
  }

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        type="email"
        name="email"
        placeholder="Email address"
        icon={<Mail className="size-5" />}
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={getFieldError('email')}
        disabled={formik.isSubmitting}
        autoComplete="email"
      />

      <div className="space-y-2">
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            icon={<Lock className="size-5" />}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={getFieldError('password')}
            disabled={formik.isSubmitting}
            autoComplete="new-password"
          />
          <button
            type="button"
            className="absolute right-4 top-3 text-text-secondary hover:text-text-primary transition-colors"
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>
        {formik.values.password && (
          <PasswordStrengthIndicator password={formik.values.password} />
        )}
      </div>

      <div className="relative">
        <Input
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          placeholder="Confirm password"
          icon={<Lock className="size-5" />}
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={getFieldError('confirmPassword')}
          disabled={formik.isSubmitting}
          autoComplete="new-password"
        />
        <button
          type="button"
          className="absolute right-4 top-3 text-text-secondary hover:text-text-primary transition-colors"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
        >
          {showConfirmPassword ? (
            <EyeOff className="size-5" />
          ) : (
            <Eye className="size-5" />
          )}
        </button>
      </div>

      <label className="flex items-start gap-3 cursor-pointer group">
        <div className="relative mt-0.5">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formik.values.termsAccepted}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.isSubmitting}
            className="sr-only peer"
          />
          <div
            className={cn(
              'w-5 h-5 rounded border-2 flex items-center justify-center transition-all',
              'border-text-secondary/50 peer-focus-visible:ring-2 peer-focus-visible:ring-primary/50',
              formik.values.termsAccepted
                ? 'bg-primary border-primary'
                : 'bg-transparent group-hover:border-text-secondary'
            )}
          >
            {formik.values.termsAccepted && (
              <Check className="size-3 text-background" strokeWidth={3} />
            )}
          </div>
        </div>
        <span className="text-sm text-text-secondary">
          I agree to the{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              // Would open terms modal/page
            }}
          >
            Terms of Service
          </button>{' '}
          and{' '}
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={(e) => {
              e.preventDefault()
              // Would open privacy modal/page
            }}
          >
            Privacy Policy
          </button>
        </span>
      </label>
      {getFieldError('termsAccepted') && (
        <span className="text-sm text-warning">
          {getFieldError('termsAccepted')}
        </span>
      )}

      <Button
        type="submit"
        className="w-full"
        size="lg"
        loading={formik.isSubmitting}
        disabled={formik.isSubmitting || !formik.values.termsAccepted}
      >
        {formik.isSubmitting ? 'Creating account...' : 'Create Account'}
      </Button>
    </form>
  )
}
