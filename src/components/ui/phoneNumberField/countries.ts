import {
  getCountries,
  getCountryCallingCode,
  type CountryCode,
} from 'libphonenumber-js'

export interface CountryOption {
  callingCode: string
  code: CountryCode
  name: string
}

export const countryNames = new Intl.DisplayNames(['en'], {
  type: 'region',
})

export const countries: CountryOption[] = getCountries()
  .map((country) => ({
    callingCode: getCountryCallingCode(country),
    code: country,
    name: countryNames.of(country) ?? country,
  }))
  .sort((first, second) => first.name.localeCompare(second.name))

