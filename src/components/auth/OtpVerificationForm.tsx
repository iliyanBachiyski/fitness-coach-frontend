import Button from '@/components/ui/button'
import { useCountdown } from '@/hooks/useCountdown'
import { otpSchema } from '@/lib/validations/otpSchema'
import { cn } from '@/lib/utils/cn'
import { useFormik } from 'formik'
import { useCallback, useRef, useState } from 'react'

interface OtpVerificationFormProps {
  email: string
  onSuccess: () => void
}

export function OtpVerificationForm({
  email,
  onSuccess,
}: OtpVerificationFormProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { seconds, isComplete, reset } = useCountdown(60)
  const [apiError, setApiError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      otp: ['', '', '', '', '', ''],
    },
    validationSchema: otpSchema,
    onSubmit: async (values) => {
      try {
        setApiError(null)
        // Mock API call with 1.5s delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Mock OTP verification - accept any 6 digits
        const code = values.otp.join('')
        if (code.length === 6) {
          onSuccess()
        }
      } catch {
        setApiError('Invalid verification code. Please try again.')
      }
    },
  })

  const isOtpComplete = formik.values.otp.every((digit) => digit !== '')

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow numeric input
      if (value && !/^[0-9]$/.test(value)) return

      const newOtp = [...formik.values.otp]
      newOtp[index] = value
      formik.setFieldValue('otp', newOtp)

      // Auto-advance to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus()
      }
    },
    [formik]
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      // Handle backspace
      if (e.key === 'Backspace' && !formik.values.otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }

      // Handle arrow keys
      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault()
        inputRefs.current[index - 1]?.focus()
      }
      if (e.key === 'ArrowRight' && index < 5) {
        e.preventDefault()
        inputRefs.current[index + 1]?.focus()
      }
    },
    [formik.values.otp]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault()
      const pastedData = e.clipboardData.getData('text').trim()
      const digits = pastedData.replace(/\D/g, '').slice(0, 6)

      if (digits) {
        const newOtp = [...formik.values.otp]
        digits.split('').forEach((digit, index) => {
          if (index < 6) {
            newOtp[index] = digit
          }
        })
        formik.setFieldValue('otp', newOtp)

        // Focus the last filled input or the next empty one
        const focusIndex = Math.min(digits.length, 5)
        inputRefs.current[focusIndex]?.focus()
      }
    },
    [formik]
  )

  const handleResend = useCallback(async () => {
    if (!isComplete) return

    // Mock resend API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    reset()
    setApiError(null)
    // Clear OTP inputs
    formik.setFieldValue('otp', ['', '', '', '', '', ''])
    inputRefs.current[0]?.focus()
  }, [isComplete, reset, formik])

  const maskedEmail = email.replace(
    /(.{2})(.*)(@.*)/,
    (_, start, middle, end) => start + '*'.repeat(middle.length) + end
  )

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-h2 font-semibold">Verify Your Email</h2>
        <p className="text-text-secondary text-sm">
          We sent a verification code to{' '}
          <span className="text-text-primary">{maskedEmail}</span>
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-3" onPaste={handlePaste}>
          {formik.values.otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={formik.isSubmitting}
              className={cn(
                'w-12 h-14 text-center text-xl font-semibold rounded-input',
                'bg-surface border outline-none transition-all duration-200',
                'focus:border-primary focus:ring-1 focus:ring-primary',
                apiError ? 'border-warning' : 'border-text-secondary/30',
                formik.isSubmitting && 'opacity-50'
              )}
              autoFocus={index === 0}
            />
          ))}
        </div>

        {apiError && (
          <p className="text-center text-sm text-warning">{apiError}</p>
        )}

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={formik.isSubmitting}
          disabled={formik.isSubmitting || !isOtpComplete}
        >
          {formik.isSubmitting ? 'Verifying...' : 'Verify'}
        </Button>

        <div className="text-center">
          {isComplete ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-primary hover:underline"
            >
              Resend code
            </button>
          ) : (
            <p className="text-sm text-text-secondary">
              Resend code in{' '}
              <span className="text-text-primary font-medium tabular-nums">
                {seconds}s
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  )
}
