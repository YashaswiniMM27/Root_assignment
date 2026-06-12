import { Button } from '../../../components/ui/Button'
import { OnboardingQuestion } from '../../../components/ui/OnboardingQuestion'
import { SelectableOption } from '../../../components/ui/SelectableOption'
import type { AccountType } from '../types'

interface AccountTypeStepProps {
  accountType: AccountType | null
  onAccountTypeChange: (accountType: AccountType) => void
  onContinue: () => void
}

function PersonalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6.5 19c0-3 2.46-5 5.5-5s5.5 2 5.5 5H6.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BusinessIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path
        d="M5 9h14v10H5V9Zm3 0V6h8v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M8 9v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export function AccountTypeStep({
  accountType,
  onAccountTypeChange,
  onContinue,
}: AccountTypeStepProps) {
  return (
    <div className="flex flex-1 flex-col rounded-2xl bg-white px-6 py-8 shadow-card sm:px-10 sm:py-10 lg:px-14">
      <OnboardingQuestion id="account-type-question">
        To join us tell us <span className="font-medium">what type of account</span>
        <br className="hidden sm:block" /> you are opening
      </OnboardingQuestion>

      <div
        className="mt-10 flex flex-col gap-4"
        role="radiogroup"
        aria-labelledby="account-type-question"
      >
        <SelectableOption
          icon={<PersonalIcon />}
          label="Personal"
          selected={accountType === 'personal'}
          onSelect={() => onAccountTypeChange('personal')}
        />
        <SelectableOption
          icon={<BusinessIcon />}
          label="Business"
          selected={accountType === 'business'}
          onSelect={() => onAccountTypeChange('business')}
        />
      </div>

      <div className="mt-auto grid grid-cols-2 gap-4 pt-10 sm:gap-5">
        <Button variant="secondary" disabled>
          Back
        </Button>
        <Button disabled={accountType === null} onClick={onContinue}>
          Continue
        </Button>
      </div>
    </div>
  )
}
