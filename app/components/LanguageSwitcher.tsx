'use client';

import { useLanguage } from '@/app/context/LanguageContext';
import { locales, localeNames, type Locale } from '../../i18n/config';
import { Button } from '@/app/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';
import { Languages, Check } from 'lucide-react';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Languages className="h-5 w-5" />
          <span className="sr-only">Select Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            onClick={() => setLocale(loc)}
            className="cursor-pointer flex items-center justify-between"
          >
            <span>{localeNames[loc]}</span>
            {locale === loc && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
