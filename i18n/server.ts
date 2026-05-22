import 'server-only'

import { cookies, headers } from 'next/headers'
import Negotiator from 'negotiator'
import { match } from '@formatjs/intl-localematcher'
import type { Locale } from '.'
import { i18n } from '.'

const localeToLanguageTag = (locale: string) => {
  if (locale === 'zh-Hans') { return 'zh-CN' }
  return locale
}

const languageTagToLocale = (languageTag: string) => {
  if (languageTag === 'zh-CN') { return 'zh-Hans' }
  return languageTag
}

const isValidLanguageTag = (languageTag: string) => {
  if (!languageTag || languageTag === '*') { return false }

  try {
    Intl.getCanonicalLocales(languageTag)
    return true
  }
  catch {
    return false
  }
}

export const getLocaleOnServer = async (): Promise<Locale> => {
  // @ts-expect-error locales are readonly
  const locales: string[] = i18n.locales
  const supportedLanguageTags = locales.map(localeToLanguageTag)

  let languages: string[] | undefined
  // get locale from cookie
  const localeCookie = (await cookies()).get('locale')
  languages = localeCookie?.value ? [localeCookie.value] : []

  if (!languages.length) {
    // Negotiator expects plain object so we need to transform headers
    const negotiatorHeaders: Record<string, string> = {}
    const headersList = await headers()
    headersList.forEach((value, key) => (negotiatorHeaders[key] = value))
    // Use negotiator and intl-localematcher to get best locale
    languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  }

  const sanitizedLanguages = languages
    .map(localeToLanguageTag)
    .filter(isValidLanguageTag)

  const matchedLanguageTag = sanitizedLanguages.length > 0
    ? match(sanitizedLanguages, supportedLanguageTags, localeToLanguageTag(i18n.defaultLocale))
    : localeToLanguageTag(i18n.defaultLocale)

  return languageTagToLocale(matchedLanguageTag) as Locale
}
