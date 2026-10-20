'use client';

import React, { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { setUserLocale, type Locale } from '@/services/locale';
import { Globe, Check, Loader2 } from 'lucide-react';

interface LanguageSwitcherProps {
  variant?: 'pill' | 'dropdown' | 'compact' | 'footer';
  className?: string;
}

export function LanguageSwitcher({ variant = 'pill', className = '' }: LanguageSwitcherProps) {
  const currentLocale = (useLocale() as Locale) || 'en';
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale || isPending) return;
    
    // 1. Immediately set cookie synchronously on client
    if (typeof document !== 'undefined') {
      document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    }

    startTransition(async () => {
      try {
        await setUserLocale(newLocale);
      } catch (err) {
        console.warn('setUserLocale action error (handled):', err);
      }
      // Force reload page with new locale
      window.location.reload();
    });
  };

  const toggleLanguage = () => {
    handleLanguageChange(currentLocale === 'en' ? 'bn' : 'en');
  };

  // Flag Badge Pill matching the user's uploaded header screenshot: [ 🇺🇸 EN ] or [ 🇧🇩 বাংলা ]
  if (variant === 'compact' || variant === 'dropdown') {
    return (
      <button
        type="button"
        disabled={isPending}
        onClick={toggleLanguage}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 border border-slate-200/90 transition-all cursor-pointer shadow-2xs ${className}`}
        title={currentLocale === 'en' ? 'বাংলা ভাষায় পরিবর্তন করুন' : 'Switch to English'}
      >
        {isPending ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
        ) : (
          <span className="text-sm leading-none">
            {currentLocale === 'en' ? '🇺🇸' : '🇧🇩'}
          </span>
        )}
        <span className="font-bold tracking-wide">
          {currentLocale === 'en' ? 'EN' : 'বাংলা'}
        </span>
      </button>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-slate-400 text-xs flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-slate-400" />
          <span>Language:</span>
        </span>
        <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800">
          <button
            onClick={() => handleLanguageChange('en')}
            disabled={isPending}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              currentLocale === 'en'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇬🇧 English
          </button>
          <button
            onClick={() => handleLanguageChange('bn')}
            disabled={isPending}
            className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
              currentLocale === 'bn'
                ? 'bg-orange-500 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🇧🇩 বাংলা
          </button>
        </div>
      </div>
    );
  }

  // Default Pill Switcher matching uploaded design
  return (
    <div
      className={`inline-flex items-center p-1 rounded-full bg-[#F1F5F9] border border-slate-200/80 shadow-2xs ${className}`}
    >
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('en')}
        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          currentLocale === 'en'
            ? 'bg-white text-slate-900 shadow-xs font-bold'
            : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        English
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('bn')}
        className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
          currentLocale === 'bn'
            ? 'bg-white text-slate-900 shadow-xs font-bold'
            : 'text-slate-500 hover:text-slate-800 font-medium'
        }`}
      >
        বাংলা
      </button>
    </div>
  );
}
