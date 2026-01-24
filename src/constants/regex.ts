// PASSWORD VALIDATION PATTERNS
export const PASSWORD_UPPERCASE_PATTERN = /[A-Z]/
export const PASSWORD_LOWERCASE_PATTERN = /[a-z]/
export const PASSWORD_DIGIT_PATTERN = /[0-9]/
export const PASSWORD_SPECIAL_CHAR_PATTERN = /[!@#$%^&*(),.?":{}|<>]/

// OTP / NUMERIC INPUT PATTERNS
export const SINGLE_DIGIT_PATTERN = /^[0-9]$/
export const NON_DIGIT_GLOBAL_PATTERN = /\D/g

// EMAIL PATTERNS
export const EMAIL_MASK_PATTERN = /(.{2})(.*)(@.*)/
