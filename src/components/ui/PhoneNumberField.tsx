import { useMemo, useState } from 'react'
import {
  validatePhoneNumberLength,
  type CountryCode,
} from 'libphonenumber-js'

import { CountryCodeSelect } from './phoneNumberField/CountryCodeSelect'
import {
  formatNationalNumber,
  getValidationMessage,
  trimToCountryLength,
} from './phoneNumberField/utils'

interface PhoneNumberFieldProps {
  country: CountryCode
  id: string
  onChange: (value: string) => void
  onCountryChange: (country: CountryCode) => void
  value: string
}

export function PhoneNumberField({
  country,
  id,
  onChange,
  onCountryChange,
  value,
}: PhoneNumberFieldProps) {
  const [hasBlurred, setHasBlurred] = useState(false)
  const validationMessage = useMemo(
    () => getValidationMessage(value, country),
    [country, value],
  )
  const isValid = value !== '' && validationMessage === ''
  const errorId = `${id}-error`

  function updateValue(nextValue: string, nextCountry = country) {
    const digits = nextValue.replace(/\D/g, '')
    const lengthError = validatePhoneNumberLength(digits, nextCountry)

    if (lengthError === 'TOO_LONG') return

    const formattedValue = formatNationalNumber(digits, nextCountry)
    onChange(formattedValue)
  }

  function handleNumberKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== 'Backspace' && event.key !== 'Delete') return

    const input = event.currentTarget
    const { selectionStart, selectionEnd } = input

    if (selectionStart === null || selectionEnd === null) return
    if (selectionStart !== selectionEnd) return

    const cursorIndex = selectionStart
    const formattingCharacter =
      event.key === 'Backspace'
        ? value[cursorIndex - 1]
        : value[cursorIndex]

    if (!formattingCharacter || /\d/.test(formattingCharacter)) return

    const digits = value.replace(/\D/g, '')
    const digitsBeforeCursor = value
      .slice(0, cursorIndex)
      .replace(/\D/g, '').length
    const digitIndexToRemove =
      event.key === 'Backspace'
        ? digitsBeforeCursor - 1
        : digitsBeforeCursor

    event.preventDefault()

    if (digitIndexToRemove < 0 || digitIndexToRemove >= digits.length) return

    const nextDigits =
      digits.slice(0, digitIndexToRemove) +
      digits.slice(digitIndexToRemove + 1)

    updateValue(nextDigits)
  }

  function handleCountryChange(nextCountry: CountryCode) {
    onCountryChange(nextCountry)
    setHasBlurred(false)
    const digits = trimToCountryLength(value, nextCountry)
    onChange(formatNationalNumber(digits, nextCountry))
  }

  return (
    <div>
      <label
        className="font-['Rubik'] text-sm font-normal leading-4 text-[#8292A1]/80"
        htmlFor={id}
      >
        Mobile Number <span className="text-[#FF7C52]">*</span>
      </label>

      <div className="mt-2 flex gap-4">
        <CountryCodeSelect
          country={country}
          id={id}
          onCountryChange={handleCountryChange}
        />

        <input
          id={id}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          className={`min-h-[52px] min-w-0 flex-1 rounded-xl border bg-white px-5 font-['Rubik'] text-base font-normal leading-6 text-[#132C4A] outline-none placeholder:text-sm placeholder:text-[#8292A1]/80 ${
            hasBlurred && validationMessage
              ? 'border-[#D14343] focus:border-[#D14343]'
              : 'border-[#729CF0] focus:border-[#0054FD]'
          }`}
          placeholder="Please enter your mobile number"
          value={value}
          aria-describedby={
            hasBlurred && validationMessage ? errorId : undefined
          }
          aria-invalid={hasBlurred && validationMessage ? true : undefined}
          onBlur={() => setHasBlurred(true)}
          onChange={(event) => updateValue(event.target.value)}
          onKeyDown={handleNumberKeyDown}
        />
      </div>

      {hasBlurred && validationMessage && (
        <p
          id={errorId}
          className="mt-2 font-['Rubik'] text-xs leading-4 text-[#D14343]"
          role="alert"
        >
          {validationMessage}
        </p>
      )}

      <span className="sr-only" aria-live="polite">
        {isValid ? 'Valid mobile number' : ''}
      </span>
    </div>
  )
}
