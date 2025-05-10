import { createContext } from 'react'

export enum Locale {
  EN = 'en',
}

export type I18nContextType = {
  locale: Locale
  setLocale: (locale: Locale) => void
}

export const I18nContext = createContext<I18nContextType>({
  locale: Locale.EN,
  setLocale: () => null,
})
