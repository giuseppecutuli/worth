import { type PropsWithChildren, useEffect, useState } from 'react'
import * as z from 'zod/v4'

import { i18n } from '@/lib/i18n'

import { I18nContext, Locale } from './i18n.context'

export const I18nProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<Locale>(Locale.EN)

  useEffect(() => {
    i18n.changeLanguage(locale)
    z.config(z.locales[locale]())
  }, [locale])

  return <I18nContext.Provider value={{ locale, setLocale }}>{children}</I18nContext.Provider>
}
