import { Button } from '../../../components/ui/Button'
import { OnboardingQuestion } from '../../../components/ui/OnboardingQuestion'
import { PasswordField } from '../../../components/ui/PasswordField'

interface PasswordStepProps {
  confirmPassword: string
  onBack: () => void
  onConfirmPasswordChange: (confirmPassword: string) => void
  onContinue: () => void
  onPasswordChange: (password: string) => void
  password: string
}

export function PasswordStep({
  confirmPassword,
  onBack,
  onConfirmPasswordChange,
  onContinue,
  onPasswordChange,
  password,
}: PasswordStepProps) {
  const isPasswordLongEnough = password.length >= 6
  const doPasswordsMatch =
    confirmPassword.length > 0 && password === confirmPassword
  const canContinue = isPasswordLongEnough && doPasswordsMatch

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10 lg:px-14">
      <OnboardingQuestion>
        <span className="font-medium">
          Create Password for your account
        </span>
      </OnboardingQuestion>

      <div className="mt-12 flex flex-col gap-4">
        <PasswordField
          id="new-password"
          label="Enter new password"
          placeholder="Enter new password"
          value={password}
          error={password.length > 0 && !isPasswordLongEnough}
          helperText="Must be at least 6 characters"
          onChange={onPasswordChange}
        />
        <PasswordField
          id="confirm-password"
          label="Confirm password"
          placeholder="Confirm password"
          value={confirmPassword}
          error={confirmPassword.length > 0 && !doPasswordsMatch}
          helperText="Both passwords must match"
          onChange={onConfirmPasswordChange}
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-10 sm:gap-5">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!canContinue} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
