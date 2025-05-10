import { type PropsWithChildren, useEffect, useState } from 'react'

import { i18n } from '@/lib/i18n'

import { I18nContext, Locale } from './i18n.context'

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<Locale>(Locale.EN)

  useEffect(() => {
    i18n.changeLanguage(locale)
  }, [locale])

  return <I18nContext.Provider value={{ locale, setLocale }}>{children}</I18nContext.Provider>
}
