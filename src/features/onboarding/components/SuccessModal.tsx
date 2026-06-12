import { getCountryCallingCode } from 'libphonenumber-js'

import { Button } from '../../../components/ui/Button'
import { Modal } from '../../../components/ui/Modal'
import type { OnboardingAnswers } from '../types'

interface SuccessModalProps {
  answers: OnboardingAnswers
  isOpen: boolean
  onDashboard: () => void
}

interface SummaryRowProps {
  label: string
  value: string
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-4 font-['Rubik'] text-sm leading-5">
      <dt className="font-normal text-[#717680]">{label}</dt>
      <dd className="min-w-0 break-words text-right font-medium text-[#181D27]">
        {value}
      </dd>
    </div>
  )
}

export function SuccessModal({
  answers,
  isOpen,
  onDashboard,
}: SuccessModalProps) {
  const accountType = answers.accountType
    ? `${answers.accountType[0].toUpperCase()}${answers.accountType.slice(1)}`
    : 'Not provided'
  const fullName =
    `${answers.firstName} ${answers.lastName}`.trim() || 'Not provided'
  const mobileNumber = answers.mobileNumber
    ? `+${getCountryCallingCode(answers.phoneCountry)} ${answers.mobileNumber}`
    : 'Not provided'

  return (
    <Modal
      isOpen={isOpen}
      ariaLabelledBy="success-modal-title"
      onClose={onDashboard}
    >
      <div className="text-center">
        <div
          className="mx-auto flex size-10 items-center justify-center rounded-full border-2 border-[#4B59D5] text-[#4B59D5]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="size-6" fill="none">
            <path
              d="m4.5 12 4.5 4.5L19.5 6"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2
          id="success-modal-title"
          className="mt-4 font-['Open_Sans'] text-2xl font-semibold leading-none text-[#3F3E3F]"
        >
          You&apos;re all set!
        </h2>
        <p className="mt-3 font-['Open_Sans'] text-sm font-normal leading-5 text-[#565656]">
          Here&apos;s a quick summary of your account details
        </p>
      </div>

      <dl className="mt-6 flex flex-col gap-3 rounded-3xl bg-[#F5F5F5] p-6">
        <SummaryRow label="Account Type" value={accountType} />
        <SummaryRow label="Email" value="Not provided" />
        <SummaryRow label="Name" value={fullName} />
        <SummaryRow label="Mobile Number" value={mobileNumber} />
      </dl>

      <p className="mt-6 flex items-center justify-center gap-1 text-center font-['Open_Sans'] text-xs font-normal leading-4 text-[#565656]">
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-5 shrink-0 text-emerald-600"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M10 2.5 16 5v4.2c0 3.6-2.4 6.7-6 8.3-3.6-1.6-6-4.7-6-8.3V5l6-2.5Z"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path
            d="m7.2 9.8 1.8 1.8 3.8-4"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Your account is secured with bank-grade security
      </p>

      <div className="mt-7 flex justify-center">
        <Button className="max-w-[245px]" onClick={onDashboard}>
          Go To Dashboard
        </Button>
      </div>
    </Modal>
  )
}
