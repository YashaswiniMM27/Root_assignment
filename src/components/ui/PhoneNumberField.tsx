import { useEffect, useMemo, useRef, useState } from 'react'
import {
  AsYouType,
  getCountries,
  getCountryCallingCode,
  isValidPhoneNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from 'libphonenumber-js'

interface PhoneNumberFieldProps {
  country: CountryCode
  id: string
  onChange: (value: string) => void
  onCountryChange: (country: CountryCode) => void
  value: string
}

const countryNames = new Intl.DisplayNames(['en'], { type: 'region' })

const countries = getCountries()
  .map((country) => ({
    callingCode: getCountryCallingCode(country),
    code: country,
    name: countryNames.of(country) ?? country,
  }))
  .sort((first, second) => first.name.localeCompare(second.name))

function getFlag(country: CountryCode) {
  return country
    .toUpperCase()
    .split('')
    .map((character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0)),
    )
    .join('')
}

function formatNationalNumber(value: string, country: CountryCode) {
  const digits = value.replace(/\D/g, '')
  return new AsYouType(country).input(digits)
}

function trimToCountryLength(value: string, country: CountryCode) {
  let digits = value.replace(/\D/g, '')

  while (
    digits &&
    validatePhoneNumberLength(digits, country) === 'TOO_LONG'
  ) {
    digits = digits.slice(0, -1)
  }

  return digits
}

function getValidationMessage(value: string, country: CountryCode) {
  const digits = value.replace(/\D/g, '')

  if (!digits) return ''

  const countryName = countryNames.of(country) ?? country
  const lengthError = validatePhoneNumberLength(digits, country)

  if (lengthError === 'TOO_SHORT') {
    return `The number is too short for ${countryName}.`
  }

  if (lengthError === 'TOO_LONG') {
    return `The number is too long for ${countryName}.`
  }

  if (!isValidPhoneNumber(digits, country)) {
    return `Enter a valid ${countryName} mobile number.`
  }

  return ''
}

export function PhoneNumberField({
  country,
  id,
  onChange,
  onCountryChange,
  value,
}: PhoneNumberFieldProps) {
  const [highlightedCountry, setHighlightedCountry] =
    useState<CountryCode>(country)
  const [hasBlurred, setHasBlurred] = useState(false)
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState('')
  const countryPickerRef = useRef<HTMLDivElement>(null)
  const countrySearchRef = useRef<HTMLInputElement>(null)
  const validationMessage = useMemo(
    () => getValidationMessage(value, country),
    [country, value],
  )
  const isValid = value !== '' && validationMessage === ''
  const errorId = `${id}-error`
  const countryMenuId = `${id}-country-menu`
  const selectedCountry =
    countries.find((option) => option.code === country) ?? countries[0]
  const filteredCountries = useMemo(() => {
    const query = countrySearch.trim().toLowerCase().replace(/^\+/, '')

    if (!query) return countries

    return countries.filter(
      (option) =>
        option.name.toLowerCase().includes(query) ||
        option.code.toLowerCase().includes(query) ||
        option.callingCode.startsWith(query),
    )
  }, [countrySearch])

  useEffect(() => {
    if (!isCountryMenuOpen) return

    countrySearchRef.current?.focus()

    function handlePointerDown(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !countryPickerRef.current?.contains(event.target)
      ) {
        setIsCountryMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [isCountryMenuOpen])

  function updateValue(nextValue: string, nextCountry = country) {
    const digits = nextValue.replace(/\D/g, '')
    const lengthError = validatePhoneNumberLength(digits, nextCountry)

    if (lengthError === 'TOO_LONG') return

    const formattedValue = formatNationalNumber(digits, nextCountry)
    onChange(formattedValue)
  }

  function handleCountryChange(nextCountry: CountryCode) {
    onCountryChange(nextCountry)
    setHasBlurred(false)
    const digits = trimToCountryLength(value, nextCountry)
    onChange(formatNationalNumber(digits, nextCountry))
  }

  function openCountryMenu() {
    setCountrySearch('')
    setHighlightedCountry(country)
    setIsCountryMenuOpen(true)
  }

  function moveCountryHighlight(direction: 1 | -1) {
    if (filteredCountries.length === 0) return

    const currentIndex = filteredCountries.findIndex(
      (option) => option.code === highlightedCountry,
    )
    const nextIndex =
      (currentIndex + direction + filteredCountries.length) %
      filteredCountries.length
    setHighlightedCountry(filteredCountries[nextIndex].code)
    document
      .getElementById(`${id}-country-${filteredCountries[nextIndex].code}`)
      ?.scrollIntoView({ block: 'nearest' })
  }

  function selectCountry(nextCountry: CountryCode) {
    handleCountryChange(nextCountry)
    setHighlightedCountry(nextCountry)
    setCountrySearch('')
    setIsCountryMenuOpen(false)
  }

  function handleCountryMenuKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      moveCountryHighlight(1)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      moveCountryHighlight(-1)
    } else if (event.key === 'Enter' && filteredCountries.length > 0) {
      event.preventDefault()
      selectCountry(highlightedCountry)
    } else if (event.key === 'Escape' || event.key === 'Tab') {
      setIsCountryMenuOpen(false)
    }
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
        <div ref={countryPickerRef} className="relative w-[94px] shrink-0">
          <button
            type="button"
            className="flex min-h-[52px] w-full items-center rounded-xl border border-[#729CF0] bg-white py-2 pl-3 pr-7 font-['Rubik'] text-sm font-normal text-[#132C4A] outline-none focus:border-[#0054FD]"
            aria-label="Country code"
            aria-expanded={isCountryMenuOpen}
            aria-controls={countryMenuId}
            aria-haspopup="listbox"
            onClick={() =>
              isCountryMenuOpen
                ? setIsCountryMenuOpen(false)
                : openCountryMenu()
            }
          >
            <span aria-hidden="true">{getFlag(selectedCountry.code)}</span>
            <span className="ml-1">+{selectedCountry.callingCode}</span>
          </button>
          <svg
            viewBox="0 0 16 16"
            className={`pointer-events-none absolute right-2 top-[26px] size-4 -translate-y-1/2 text-[#132C4A] transition-transform ${
              isCountryMenuOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            aria-hidden="true"
          >
            <path
              d="m4 6 4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {isCountryMenuOpen && (
            <div
              className="absolute left-0 top-[calc(100%+8px)] z-30 w-[280px] rounded-xl border border-[#D9E0E6] bg-white p-1.5 shadow-[0_12px_30px_rgb(19_44_74/0.14)]"
              onKeyDown={handleCountryMenuKeyDown}
            >
              <div className="p-1.5">
                <div className="relative">
                  <svg
                    viewBox="0 0 20 20"
                    className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#8292A1]"
                    fill="none"
                    aria-hidden="true"
                  >
                    <circle
                      cx="8.5"
                      cy="8.5"
                      r="5.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="m13 13 4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  <input
                    ref={countrySearchRef}
                    type="search"
                    className="h-10 w-full rounded-lg border border-[#D9E0E6] bg-white pl-9 pr-3 font-['Rubik'] text-sm text-[#132C4A] outline-none placeholder:text-[#8292A1] focus:border-[#0054FD]"
                    placeholder="Search country or code"
                    value={countrySearch}
                    aria-label="Search countries"
                    onChange={(event) => {
                      const nextSearch = event.target.value
                      const normalizedSearch = nextSearch
                        .trim()
                        .toLowerCase()
                        .replace(/^\+/, '')
                      const nextCountries = countries.filter(
                        (option) =>
                          !normalizedSearch ||
                          option.name
                            .toLowerCase()
                            .includes(normalizedSearch) ||
                          option.code
                            .toLowerCase()
                            .includes(normalizedSearch) ||
                          option.callingCode.startsWith(normalizedSearch),
                      )

                      setCountrySearch(nextSearch)
                      if (nextCountries[0]) {
                        setHighlightedCountry(nextCountries[0].code)
                      }
                    }}
                  />
                </div>
              </div>

              <div
                id={countryMenuId}
                className="max-h-[264px] overflow-y-auto"
                role="listbox"
                aria-label="Select country code"
                aria-activedescendant={
                  filteredCountries.length > 0
                    ? `${id}-country-${highlightedCountry}`
                    : undefined
                }
              >
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((option) => {
                    const isSelected = option.code === country
                    const isHighlighted =
                      option.code === highlightedCountry

                    return (
                      <button
                        key={option.code}
                        id={`${id}-country-${option.code}`}
                        type="button"
                        className={`flex h-11 w-full items-center gap-3 rounded-lg px-3 text-left font-['Rubik'] text-sm text-[#132C4A] outline-none transition-colors ${
                          isSelected
                            ? 'bg-[#E2ECFF]'
                            : isHighlighted
                              ? 'bg-[#EEF4FF]'
                              : 'hover:bg-[#EEF4FF]'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={-1}
                        onMouseEnter={() =>
                          setHighlightedCountry(option.code)
                        }
                        onClick={() => selectCountry(option.code)}
                      >
                        <span className="text-base" aria-hidden="true">
                          {getFlag(option.code)}
                        </span>
                        <span className="min-w-0 flex-1 truncate">
                          {option.name}
                        </span>
                        <span className="shrink-0 text-[#8292A1]">
                          +{option.callingCode}
                        </span>
                      </button>
                    )
                  })
                ) : (
                  <p className="px-3 py-6 text-center font-['Rubik'] text-sm text-[#8292A1]">
                    No countries found
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

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
