import type { ReactNode } from 'react'

interface OnboardingFormPanelProps {
  children: ReactNode
}

export function OnboardingFormPanel({ children }: OnboardingFormPanelProps) {
  return (
    <section
      className="flex w-full lg:min-h-[calc(100vh-12rem)]"
      aria-label="Onboarding form"
    >
      <div className="flex w-full flex-1 flex-col gap-3">{children}</div>
    </section>
  )
}
