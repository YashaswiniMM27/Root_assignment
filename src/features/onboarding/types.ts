import type { CountryCode } from 'libphonenumber-js'

export type AccountType = 'personal' | 'business'

export type OnboardingStep =
  | 'accountType'
  | 'otp'
  | 'otpVerification'
  | 'name'
  | 'password'
  | 'pin'
  | 'login'
  | 'resetPassword'
  | 'success'

export interface OnboardingAnswers {
  accountType: AccountType | null
  confirmPassword: string
  firstName: string
  lastName: string
  mobileNumber: string
  otpCode: string
  phoneCountry: CountryCode
  password: string
}

export interface OnboardingFlowState {
  answers: OnboardingAnswers
  currentStep: OnboardingStep
}
