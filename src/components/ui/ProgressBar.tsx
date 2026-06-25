interface ProgressBarProps {
  currentStep?: number
  totalSteps?: number
}

export function ProgressBar({
  currentStep = 0,
  totalSteps = 5,
}: ProgressBarProps) {
  const progress = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100))

  return (
    <div
      className="h-2 overflow-hidden rounded-xl border-[0.5px] border-[#0054FD] bg-transparent"
      role="progressbar"
      aria-label="Onboarding progress"
      aria-valuemin={0}
      aria-valuemax={totalSteps}
      aria-valuenow={currentStep}
    >
      <div
        className="h-full rounded-xl bg-[#0054FD] transition-[width] duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
