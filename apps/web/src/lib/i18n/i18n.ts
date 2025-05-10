import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { en } from './en'

/**
 * For now have only one language,
 * but with this we have the possibility on the future
 * to add some languages.
 */
export const resources = {
  en: {
    translation: en,
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  debug: process.env.NODE_ENV !== 'production',

  interpolation: {
    escapeValue: false,
  },
})

export default i18n
