import type { ReactNode } from 'react'

interface OnboardingQuestionProps {
  children: ReactNode
  id?: string
}

export function OnboardingQuestion({
  children,
  id,
}: OnboardingQuestionProps) {
  return (
    <h2
      id={id}
      className="font-['Rubik'] text-2xl font-normal leading-8 text-[#132C4A]"
    >
      {children}
    </h2>
  )
}
