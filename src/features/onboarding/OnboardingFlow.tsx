import { useEffect, useState } from 'react'

import { OnboardingContent } from '../../components/layout/OnboardingContent'
import { OnboardingFormPanel } from '../../components/layout/OnboardingFormPanel'
import { OnboardingLayout } from '../../components/layout/OnboardingLayout'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { useOnboardingFlow } from '../../hooks/useOnboardingFlow'
import { ONBOARDING_STEPS } from './constants'
import { AccountTypeStep } from './components/AccountTypeStep'
import { NameStep } from './components/NameStep'
import { OtpStep } from './components/OtpStep'
import { OtpVerificationStep } from './components/OtpVerificationStep'
import { PasswordStep } from './components/PasswordStep'
import { SuccessModal } from './components/SuccessModal'

const PROGRESS_COMPLETION_DELAY_MS = 550

export function OnboardingFlow() {
  const [isCompleting, setIsCompleting] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const {
    answers,
    currentStep,
    goBack,
    goToStep,
    isMobileNumberValid,
    resetFlow,
    setAccountType,
    setConfirmPassword,
    setFirstName,
    setLastName,
    setMobileNumber,
    setOtpCode,
    setPhoneCountry,
    setPassword,
  } = useOnboardingFlow()
  const currentStepIndex = ONBOARDING_STEPS.indexOf(currentStep)
  const showProgress = currentStep !== 'accountType'
  const totalSteps = ONBOARDING_STEPS.length - 1

  useEffect(() => {
    if (!isCompleting) return

    const timerId = window.setTimeout(() => {
      setIsSuccessModalOpen(true)
    }, PROGRESS_COMPLETION_DELAY_MS)

    return () => window.clearTimeout(timerId)
  }, [isCompleting])

  function handleDashboard() {
    resetFlow()
    setIsCompleting(false)
    setIsSuccessModalOpen(false)
  }

  return (
    <OnboardingLayout>
      <OnboardingContent />
      <OnboardingFormPanel>
        {showProgress && (
          <div className="mx-auto w-4/5 animate-progress-in">
            <ProgressBar
              currentStep={isCompleting ? totalSteps : currentStepIndex}
              totalSteps={totalSteps}
            />
          </div>
        )}
        <div key={currentStep} className="flex flex-1 animate-step-in">
          {currentStep === 'accountType' && (
            <AccountTypeStep
              accountType={answers.accountType}
              onAccountTypeChange={setAccountType}
              onContinue={() => goToStep('otp')}
            />
          )}
          {currentStep === 'otp' && (
            <OtpStep
              country={answers.phoneCountry}
              isMobileNumberValid={isMobileNumberValid}
              mobileNumber={answers.mobileNumber}
              onBack={goBack}
              onCountryChange={setPhoneCountry}
              onContinue={() => {
                setOtpCode('')
                goToStep('otpVerification')
              }}
              onMobileNumberChange={setMobileNumber}
            />
          )}
          {currentStep === 'otpVerification' && (
            <OtpVerificationStep
              otpCode={answers.otpCode}
              onBack={() => goToStep('otp')}
              onContinue={() => goToStep('name')}
              onOtpChange={setOtpCode}
              onResend={() => setOtpCode('')}
            />
          )}
          {currentStep === 'name' && (
            <NameStep
              firstName={answers.firstName}
              lastName={answers.lastName}
              onBack={() => goToStep('otp')}
              onFirstNameChange={setFirstName}
              onLastNameChange={setLastName}
              onContinue={() => goToStep('password')}
            />
          )}
          {currentStep === 'password' && (
            <PasswordStep
              confirmPassword={answers.confirmPassword}
              password={answers.password}
              onBack={() => goToStep('name')}
              onConfirmPasswordChange={setConfirmPassword}
              onContinue={() => setIsCompleting(true)}
              onPasswordChange={setPassword}
            />
          )}
        </div>
      </OnboardingFormPanel>
      <SuccessModal
        answers={answers}
        isOpen={isSuccessModalOpen}
        onDashboard={handleDashboard}
      />
    </OnboardingLayout>
  )
}
