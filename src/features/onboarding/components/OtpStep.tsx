import type { CountryCode } from 'libphonenumber-js'

import { Button } from '../../../components/ui/Button'
import { OnboardingQuestion } from '../../../components/ui/OnboardingQuestion'
import { PhoneNumberField } from '../../../components/ui/PhoneNumberField'

interface OtpStepProps {
  country: CountryCode
  isMobileNumberValid: boolean
  mobileNumber: string
  onBack: () => void
  onCountryChange: (country: CountryCode) => void
  onContinue: () => void
  onMobileNumberChange: (mobileNumber: string) => void
}

export function OtpStep({
  country,
  isMobileNumberValid,
  mobileNumber,
  onBack,
  onCountryChange,
  onContinue,
  onMobileNumberChange,
}: OtpStepProps) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10 lg:px-14">
      <OnboardingQuestion>
        <span className="font-medium">OTP Verification</span>
      </OnboardingQuestion>

      <div className="mt-12">
        <PhoneNumberField
          country={country}
          id="mobile-number"
          value={mobileNumber}
          onChange={onMobileNumberChange}
          onCountryChange={onCountryChange}
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-10 sm:gap-5">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!isMobileNumberValid} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
