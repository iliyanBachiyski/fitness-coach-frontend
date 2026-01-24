import type { PasswordStrength } from '@/types/registration'
import { useMemo } from 'react'

const PASSWORD_CRITERIA = [
  { test: (pwd: string) => pwd.length >= 8, label: 'At least 8 characters' },
  { test: (pwd: string) => /[A-Z]/.test(pwd), label: 'Uppercase letter' },
  { test: (pwd: string) => /[a-z]/.test(pwd), label: 'Lowercase letter' },
  { test: (pwd: string) => /[0-9]/.test(pwd), label: 'Number' },
  {
    test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd),
    label: 'Special character',
  },
]

const STRENGTH_LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']

export function usePasswordStrength(password: string): PasswordStrength {
  return useMemo(() => {
    const criteria = PASSWORD_CRITERIA.map((criterion) => ({
      label: criterion.label,
      met: password ? criterion.test(password) : false,
    }))

    if (!password) {
      return { score: 0, label: '', percentage: 0, criteria }
    }

    const passedCriteria = criteria.filter((c) => c.met).length

    const score = Math.min(passedCriteria, 4)
    const label = STRENGTH_LABELS[score]
    const percentage = (score / 4) * 100

    return { score, label, percentage, criteria }
  }, [password])
}

export { PASSWORD_CRITERIA }
