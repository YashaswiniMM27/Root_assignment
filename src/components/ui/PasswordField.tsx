import { useState } from 'react'

interface PasswordFieldProps {
  error?: boolean
  helperText: string
  id: string
  label: string
  onChange: (value: string) => void
  placeholder: string
  value: string
}

function EyeIcon({ hidden }: { hidden: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" aria-hidden="true">
      <path
        d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      {hidden && (
        <path
          d="m4 4 16 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      )}
    </svg>
  )
}

export function PasswordField({
  error = false,
  helperText,
  id,
  label,
  onChange,
  placeholder,
  value,
}: PasswordFieldProps) {
  const [isVisible, setIsVisible] = useState(false)
  const helperId = `${id}-helper`

  return (
    <div>
      <label
        className="block font-['Rubik'] text-sm font-normal leading-4 text-[#8292A1]/80"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative mt-2">
        <input
          id={id}
          type={isVisible ? 'text' : 'password'}
          autoComplete="new-password"
          className={`min-h-[52px] w-full rounded-xl border bg-white px-5 pr-12 font-['Rubik'] text-base font-normal leading-6 text-[#132C4A] outline-none placeholder:text-sm placeholder:text-[#8292A1]/40 ${
            error
              ? 'border-[#D14343] focus:border-[#D14343]'
              : 'border-[#729CF0] focus:border-[#0054FD]'
          }`}
          placeholder={placeholder}
          value={value}
          aria-describedby={helperId}
          aria-invalid={error || undefined}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#0054FD] outline-none focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0054FD]"
          aria-label={isVisible ? `Hide ${label}` : `Show ${label}`}
          aria-pressed={isVisible}
          onClick={() => setIsVisible((currentValue) => !currentValue)}
        >
          <EyeIcon hidden={!isVisible} />
        </button>
      </div>
      <p
        id={helperId}
        className={`mt-2 font-['Rubik'] text-sm font-normal leading-4 ${
          error ? 'text-[#D14343]' : 'text-[#8292A1]/80'
        }`}
      >
        {helperText}
      </p>
    </div>
  )
}
