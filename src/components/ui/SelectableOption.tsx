import type { ReactNode } from 'react'

interface SelectableOptionProps {
  icon: ReactNode
  label: string
  onSelect: () => void
  selected: boolean
}

export function SelectableOption({
  icon,
  label,
  onSelect,
  selected,
}: SelectableOptionProps) {
  return (
    <button
      type="button"
      className={`flex min-h-14 w-full items-center gap-4 rounded-xl border bg-white px-5 text-left font-['Rubik'] text-base font-medium leading-6 shadow-[0_4px_10px_rgb(19_44_74/0.08)] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0054FD] ${
        selected
          ? 'border-[#0054FD] text-[#0054FD]'
          : 'border-[#D9E0E6] text-[#132C4A] hover:border-[#AEBBC7]'
      }`}
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
    >
      <span className="flex size-5 shrink-0 items-center justify-center" aria-hidden="true">
        {icon}
      </span>
      <span>{label}</span>
      {selected && (
        <span
          className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0054FD] text-white"
          aria-hidden="true"
        >
          <svg viewBox="0 0 16 16" className="size-3" fill="none">
            <path
              d="m3 8 3 3 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </button>
  )
}
