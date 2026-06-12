import { useState } from 'react'
import { isValidPhoneNumber, type CountryCode } from 'libphonenumber-js'

import type {
  AccountType,
  OnboardingAnswers,
  OnboardingFlowState,
  OnboardingStep,
} from '../features/onboarding/types'

interface UseOnboardingFlowResult extends OnboardingFlowState {
  goBack: () => void
  goToStep: (step: OnboardingStep) => void
  isMobileNumberValid: boolean
  resetFlow: () => void
  setAccountType: (accountType: AccountType) => void
  setConfirmPassword: (confirmPassword: string) => void
  setFirstName: (firstName: string) => void
  setLastName: (lastName: string) => void
  setMobileNumber: (mobileNumber: string) => void
  setOtpCode: (otpCode: string) => void
  setPhoneCountry: (phoneCountry: CountryCode) => void
  setPassword: (password: string) => void
}

const initialAnswers: OnboardingAnswers = {
  accountType: null,
  confirmPassword: '',
  firstName: '',
  lastName: '',
  mobileNumber: '',
  otpCode: '',
  phoneCountry: 'US',
  password: '',
}

export function useOnboardingFlow(): UseOnboardingFlowResult {
  const [currentStep, setCurrentStep] =
    useState<OnboardingStep>('accountType')
  const [answers, setAnswers] = useState<OnboardingAnswers>(initialAnswers)
  const mobileDigits = answers.mobileNumber.replace(/\D/g, '')
  const isMobileNumberValid =
    mobileDigits !== '' &&
    isValidPhoneNumber(mobileDigits, answers.phoneCountry)

  function updateAnswers(nextAnswers: Partial<OnboardingAnswers>) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      ...nextAnswers,
    }))
  }

  return {
    answers,
    currentStep,
    goBack: () => setCurrentStep('accountType'),
    goToStep: setCurrentStep,
    isMobileNumberValid,
    resetFlow: () => {
      setAnswers(initialAnswers)
      setCurrentStep('accountType')
    },
    setAccountType: (accountType) => updateAnswers({ accountType }),
    setConfirmPassword: (confirmPassword) =>
      updateAnswers({ confirmPassword }),
    setFirstName: (firstName) => updateAnswers({ firstName }),
    setLastName: (lastName) => updateAnswers({ lastName }),
    setMobileNumber: (mobileNumber) => updateAnswers({ mobileNumber }),
    setOtpCode: (otpCode) => updateAnswers({ otpCode }),
    setPhoneCountry: (phoneCountry) => updateAnswers({ phoneCountry }),
    setPassword: (password) => updateAnswers({ password }),
  }
}
