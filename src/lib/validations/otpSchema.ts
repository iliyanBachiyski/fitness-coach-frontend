import { SINGLE_DIGIT_PATTERN } from '@/constants/regex'
import * as Yup from 'yup'

export const otpSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().matches(SINGLE_DIGIT_PATTERN, 'Must be a digit'))
    .length(6, 'OTP must be 6 digits')
    .test('all-filled', 'Please enter all 6 digits', (value) => {
      return (
        value?.every((digit) => digit !== '' && digit !== undefined) ?? false
      )
    }),
})
