export interface RegistrationFormValues {
  email: string
  password: string
  confirmPassword: string
  termsAccepted: boolean
}

export interface OtpFormValues {
  otp: string[]
}

export type RegistrationStep = 'form' | 'otp'

export interface PasswordCriterion {
  label: string
  met: boolean
}

export interface PasswordStrength {
  score: number
  label: string
  percentage: number
  criteria: PasswordCriterion[]
}
