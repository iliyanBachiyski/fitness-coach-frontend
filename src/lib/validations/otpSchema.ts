import * as Yup from 'yup'

export const otpSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().matches(/^[0-9]$/, 'Must be a digit'))
    .length(6, 'OTP must be 6 digits')
    .test('all-filled', 'Please enter all 6 digits', (value) => {
      return (
        value?.every((digit) => digit !== '' && digit !== undefined) ?? false
      )
    }),
})
