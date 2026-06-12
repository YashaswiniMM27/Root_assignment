import { useEffect, useState } from 'react'

import { Button } from '../../../components/ui/Button'
import { OnboardingQuestion } from '../../../components/ui/OnboardingQuestion'
import { OtpInput } from '../../../components/ui/OtpInput'

interface OtpVerificationStepProps {
  onBack: () => void
  onContinue: () => void
  onOtpChange: (otpCode: string) => void
  onResend: () => void
  otpCode: string
}

const RESEND_COOLDOWN_SECONDS = 30

export function OtpVerificationStep({
  onBack,
  onContinue,
  onOtpChange,
  onResend,
  otpCode,
}: OtpVerificationStepProps) {
  const [resendAvailableAt, setResendAvailableAt] = useState<number | null>(
    null,
  )
  const [remainingSeconds, setRemainingSeconds] = useState(0)

  useEffect(() => {
    if (resendAvailableAt === null) return

    function updateCountdown() {
      const nextRemainingSeconds = Math.max(
        0,
        Math.ceil((resendAvailableAt! - Date.now()) / 1000),
      )

      setRemainingSeconds(nextRemainingSeconds)
      if (nextRemainingSeconds === 0) {
        setResendAvailableAt(null)
      }
    }

    updateCountdown()
    const timerId = window.setInterval(updateCountdown, 1000)

    return () => window.clearInterval(timerId)
  }, [resendAvailableAt])

  function handleResend() {
    onResend()
    setRemainingSeconds(RESEND_COOLDOWN_SECONDS)
    setResendAvailableAt(
      Date.now() + RESEND_COOLDOWN_SECONDS * 1000,
    )
  }

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10 lg:px-14">
      <OnboardingQuestion>
        <span className="font-medium">OTP Verification</span>
      </OnboardingQuestion>

      <div className="mt-12">
        <label
          className="font-['Rubik'] text-sm font-normal leading-4 text-[#8292A1]/80"
          htmlFor="otp-code"
        >
          An OTP has been sent to your mobile number
        </label>
        <div className="mt-3">
          <OtpInput
            id="otp-code"
            value={otpCode}
            onChange={onOtpChange}
          />
        </div>
        <p className="mt-5 text-center font-['Rubik'] text-sm font-normal leading-4 text-[#132C4A]/80">
          {resendAvailableAt === null ? (
            <>
              Did not receive OTP?{' '}
              <button
                type="button"
                className="font-medium text-[#0054FD] outline-none hover:underline focus-visible:underline"
                onClick={handleResend}
              >
                Resend OTP
              </button>
            </>
          ) : (
            <span role="timer" aria-live="off">
              OTP resent successfully.{' '}
              <span className="font-medium text-[#0054FD]">
                Resend in {remainingSeconds}s
              </span>
            </span>
          )}
        </p>
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-10 sm:gap-5">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button disabled={otpCode.length !== 4} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
