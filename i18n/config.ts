export const locales = ['en-US', 'en-GB', 'hi', 'id'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en-US';

export const localeNames: Record<Locale, string> = {
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  'hi': 'हिन्दी',
  'id': 'Bahasa Indonesia',
};

export function getLocaleFromCookie(): Locale {
  if (typeof window === 'undefined') return defaultLocale;
  
  const locale = document.cookie
    .split('; ')
    .find(row => row.startsWith('NEXT_LOCALE='))
    ?.split('=')[1] as Locale;
  
  if (locale && locales.includes(locale)) {
    return locale;
  }
  
  return defaultLocale;
}
