import Button from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/lib/validations/loginSchema'
import { useAppDispatch } from '@/store'
import { loginFailure, loginSuccess } from '@/store/slices/authSlice'
import { useFormik } from 'formik'
import { Eye, EyeOff, Lock, Mail } from 'lucide-react'
import { useState } from 'react'

export function LoginForm() {
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    onSubmit: async () => {
      try {
        // Mock API call with 1.5s delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock successful response
        dispatch(
          loginSuccess({
            accessToken: 'mock-access-token-' + Date.now(),
            refreshToken: 'mock-refresh-token-' + Date.now(),
          })
        )
      } catch {
        dispatch(loginFailure('Login failed. Please try again.'))
      }
    },
  })

  const getFieldError = (field: 'email' | 'password') => {
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
          autoComplete="current-password"
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

      <Button
        type="submit"
        className="w-full"
        size="lg"
        loading={formik.isSubmitting}
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  )
}
