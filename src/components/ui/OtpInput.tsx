import { useRef } from 'react'

interface OtpInputProps {
  id: string
  length?: number
  onChange: (value: string) => void
  value: string
}

export function OtpInput({
  id,
  length = 4,
  onChange,
  value,
}: OtpInputProps) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from({ length }, (_, index) => value[index] ?? '')

  function updateDigit(index: number, nextValue: string) {
    const numericValue = nextValue.replace(/\D/g, '')

    if (!numericValue) {
      const nextDigits = [...digits]
      nextDigits[index] = ''
      onChange(nextDigits.join(''))
      return
    }

    const nextDigits = [...digits]
    nextDigits[index] = numericValue[numericValue.length - 1] ?? ''
    onChange(nextDigits.join(''))

    if (index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const pastedDigits = event.clipboardData
      .getData('text')
      .replace(/\D/g, '')
      .slice(0, length)

    if (!pastedDigits) return

    event.preventDefault()
    onChange(pastedDigits)
    inputRefs.current[Math.min(pastedDigits.length, length) - 1]?.focus()
  }

  return (
    <div
      className="flex gap-4 sm:gap-6"
      role="group"
      aria-label={`${length}-digit verification code`}
      onPaste={handlePaste}
    >
      {digits.map((digit, index) => (
        <input
          key={`${id}-${index}`}
          ref={(element) => {
            inputRefs.current[index] = element
          }}
          id={index === 0 ? id : undefined}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={1}
          className="size-14 rounded-xl border border-[#729CF0] bg-white text-center font-['Rubik'] text-base font-normal text-[#132C4A] outline-none focus:border-[#0054FD] sm:size-16"
          value={digit}
          aria-label={`Digit ${index + 1}`}
          onChange={(event) => updateDigit(index, event.target.value)}
          onFocus={(event) => event.currentTarget.select()}
          onKeyDown={(event) => {
            if (
              event.key === 'Backspace' &&
              !digit &&
              index > 0
            ) {
              inputRefs.current[index - 1]?.focus()
            } else if (event.key === 'ArrowLeft' && index > 0) {
              inputRefs.current[index - 1]?.focus()
            } else if (
              event.key === 'ArrowRight' &&
              index < length - 1
            ) {
              inputRefs.current[index + 1]?.focus()
            }
          }}
        />
      ))}
    </div>
  )
}
