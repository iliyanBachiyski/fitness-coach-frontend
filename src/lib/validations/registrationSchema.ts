import {
  PASSWORD_DIGIT_PATTERN,
  PASSWORD_LOWERCASE_PATTERN,
  PASSWORD_SPECIAL_CHAR_PATTERN,
  PASSWORD_UPPERCASE_PATTERN,
} from '@/constants/regex'
import * as Yup from 'yup'

export const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      PASSWORD_UPPERCASE_PATTERN,
      'Password must contain at least one uppercase letter'
    )
    .matches(
      PASSWORD_LOWERCASE_PATTERN,
      'Password must contain at least one lowercase letter'
    )
    .matches(
      PASSWORD_DIGIT_PATTERN,
      'Password must contain at least one number'
    )
    .matches(
      PASSWORD_SPECIAL_CHAR_PATTERN,
      'Password must contain at least one special character'
    ),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Passwords must match'),
  termsAccepted: Yup.boolean()
    .required('You must accept the terms and conditions')
    .oneOf([true], 'You must accept the terms and conditions'),
})
