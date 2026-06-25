import {
  AsYouType,
  isValidPhoneNumber,
  validatePhoneNumberLength,
  type CountryCode,
} from 'libphonenumber-js'

import { countryNames } from './countries'

export function getFlag(country: CountryCode) {
  return country
    .toUpperCase()
    .split('')
    .map((character) =>
      String.fromCodePoint(127397 + character.charCodeAt(0)),
    )
    .join('')
}

export function formatNationalNumber(
  value: string,
  country: CountryCode,
) {
  const digits = value.replace(/\D/g, '')
  return new AsYouType(country).input(digits)
}

export function trimToCountryLength(
  value: string,
  country: CountryCode,
) {
  let digits = value.replace(/\D/g, '')

  while (
    digits &&
    validatePhoneNumberLength(digits, country) === 'TOO_LONG'
  ) {
    digits = digits.slice(0, -1)
  }

  return digits
}

export function getValidationMessage(
  value: string,
  country: CountryCode,
) {
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

