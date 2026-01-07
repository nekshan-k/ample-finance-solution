# Internationalization (i18n) Documentation

## Overview

This application uses **next-intl** for internationalization, supporting 4 languages:
- 🇺🇸 **en-US** - American English (Default)
- 🇬🇧 **en-GB** - British English
- 🇮🇳 **hi** - Hindi (हिन्दी)
- 🇮🇩 **id** - Indonesian (Bahasa Indonesia)

## Architecture

### File Structure

```
project-root/
├── i18n/
│   └── request.ts           # i18n configuration & locale detection
├── messages/
│   ├── en-US.json          # American English translations
│   ├── en-GB.json          # British English translations
│   ├── hi.json             # Hindi translations
│   └── id.json             # Indonesian translations
├── app/
│   ├── context/
│   │   └── LanguageContext.tsx  # Language state management
│   ├── components/
│   │   └── LanguageSwitcher.tsx # Language switcher UI
│   └── providers.tsx       # NextIntlClientProvider setup
├── middleware.ts           # Locale routing middleware
└── next.config.mjs         # next-intl plugin configuration
```

## Core Components

### 1. i18n Configuration (`i18n/request.ts`)

Handles locale detection and configuration:
- Defines supported locales: `['en-US', 'en-GB', 'hi', 'id']`
- Sets default locale: `en-US`
- Provides locale display names for UI
- Loads appropriate translation files based on locale

### 2. Translation Files (`messages/*.json`)

JSON files containing translations organized by sections:
- `common` - Common UI elements
- `nav` - Navigation items
- `hero` - Hero section content
- `features` - Features section
- `products` - Product information
- `calculator` - SIP calculator
- `testimonials` - Client testimonials
- `trust` - Trust indicators
- `cta` - Call-to-action sections
- `footer` - Footer content
- `about` - About page
- `contact` - Contact page
- `auth` - Authentication flows

### 3. LanguageContext (`app/context/LanguageContext.tsx`)

React Context for managing language state:
- Stores current locale in browser cookies
- Provides `useLanguage()` hook
- Triggers page reload on language change
- Persists language preference across sessions

### 4. LanguageSwitcher (`app/components/LanguageSwitcher.tsx`)

Dropdown component for language selection:
- Shows all available languages
- Displays current language with checkmark
- Uses globe icon from Lucide React
- Updates language preference on selection

## Usage Guide

### Using Translations in Components

#### Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('nav');
  
  return (
    <div>
      <h1>{t('home')}</h1>
      <p>{t('about')}</p>
    </div>
  );
}
```

#### Server Components

```tsx
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('hero');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('subtitle')}</p>
    </div>
  );
}
```

### Accessing Current Locale

```tsx
'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export function MyComponent() {
  const { locale, setLocale } = useLanguage();
  
  return <div>Current language: {locale}</div>;
}
```

### Changing Language Programmatically

```tsx
'use client';

import { useLanguage } from '@/app/context/LanguageContext';

export function MyComponent() {
  const { setLocale } = useLanguage();
  
  const switchToHindi = () => {
    setLocale('hi');
  };
  
  return <button onClick={switchToHindi}>Switch to Hindi</button>;
}
```

## Adding New Languages

### Step 1: Update Configuration

Edit `i18n/request.ts`:

```tsx
export const locales = ['en-US', 'en-GB', 'hi', 'id', 'fr'] as const;

export const localeNames: Record<Locale, string> = {
  'en-US': 'English (US)',
  'en-GB': 'English (UK)',
  'hi': 'हिन्दी',
  'id': 'Bahasa Indonesia',
  'fr': 'Français',
};
```

### Step 2: Create Translation File

Create `messages/fr.json` with all translation keys from other files.

### Step 3: Test

The new language will automatically appear in the LanguageSwitcher dropdown.

## Adding New Translation Keys

### Step 1: Add to All Language Files

Add the new key to all JSON files in `messages/`:

**en-US.json:**
```json
{
  "products": {
    "newProduct": "New Product Name"
  }
}
```

**hi.json:**
```json
{
  "products": {
    "newProduct": "नया उत्पाद नाम"
  }
}
```

### Step 2: Use in Components

```tsx
const t = useTranslations('products');
return <div>{t('newProduct')}</div>;
```

## Best Practices

### 1. Namespace Organization

Organize translations by page or section:
```json
{
  "homepage": { ... },
  "dashboard": { ... },
  "settings": { ... }
}
```

### 2. Consistent Keys

Use camelCase for translation keys:
```json
{
  "myTranslation": "...",
  "anotherKey": "..."
}
```

### 3. Avoid Hardcoded Text

Always use translation keys instead of hardcoded strings:

❌ Bad:
```tsx
<button>Click Here</button>
```

✅ Good:
```tsx
<button>{t('common.submit')}</button>
```

### 4. Keep Translations Synchronized

Ensure all language files have the same keys to avoid missing translations.

### 5. Use Placeholders

For dynamic content, use interpolation:

```json
{
  "greeting": "Hello, {name}!"
}
```

```tsx
t('greeting', { name: 'John' })
```

## Cookie Storage

Language preference is stored in:
- **Cookie Name:** `NEXT_LOCALE`
- **Max Age:** 1 year (31536000 seconds)
- **Path:** `/` (entire site)
- **SameSite:** Lax

## Troubleshooting

### Translation Not Showing

1. Check if the key exists in all language files
2. Verify the namespace matches in `useTranslations()`
3. Clear browser cookies and reload

### Language Not Persisting

1. Check browser cookie settings
2. Ensure cookies are enabled
3. Verify `NEXT_LOCALE` cookie is being set

### New Language Not Appearing

1. Confirm locale added to `locales` array in `i18n/request.ts`
2. Ensure translation file exists in `messages/` folder
3. Restart development server

## Performance Considerations

- Translation files are loaded dynamically based on locale
- Only the current language file is loaded (not all files)
- Messages are cached after first load
- Cookie-based locale detection is fast and server-friendly

## SEO Considerations

Current implementation uses cookie-based locale switching without URL prefixes. For SEO optimization with URL-based locales, consider:

1. Adding locale prefixes to routes (`/en-US/`, `/hi/`, etc.)
2. Implementing hreflang tags
3. Using Next.js internationalized routing

## Support

For issues or questions about i18n implementation:
1. Check this documentation
2. Review `i18n/request.ts` configuration
3. Inspect translation files in `messages/` folder
4. Verify provider setup in `app/providers.tsx`

---

**Last Updated:** January 2026
**Version:** 1.0.0
