import { Button } from '../../../components/ui/Button'
import { Input } from '../../../components/ui/Input'
import { OnboardingQuestion } from '../../../components/ui/OnboardingQuestion'

interface NameStepProps {
  firstName: string
  lastName: string
  onBack: () => void
  onFirstNameChange: (firstName: string) => void
  onLastNameChange: (lastName: string) => void
  onContinue: () => void
}

export function NameStep({
  firstName,
  lastName,
  onBack,
  onFirstNameChange,
  onLastNameChange,
  onContinue,
}: NameStepProps) {
  const isComplete =
    firstName.trim().length > 0 && lastName.trim().length > 0

  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10 lg:px-14">
      <OnboardingQuestion>
        <span className="font-medium">What is your name?</span>
      </OnboardingQuestion>

      <div className="mt-12 flex flex-col gap-4">
        <Input
          id="first-name"
          label="First Name"
          autoComplete="given-name"
          placeholder="Enter your first name"
          value={firstName}
          onChange={(event) => onFirstNameChange(event.target.value)}
        />
        <Input
          id="last-name"
          label="Last Name"
          autoComplete="family-name"
          placeholder="Enter your last name"
          value={lastName}
          onChange={(event) => onLastNameChange(event.target.value)}
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-10 sm:gap-5">
        <Button variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button disabled={!isComplete} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
