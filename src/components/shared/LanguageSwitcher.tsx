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
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === currentLocale || isPending) return;
    startTransition(async () => {
      await setUserLocale(newLocale);
      // Soft refresh router to re-fetch translations from server
      window.location.reload();
    });
  };

  if (variant === 'compact') {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <button
          disabled={isPending}
          onClick={() => handleLanguageChange(currentLocale === 'en' ? 'bn' : 'en')}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-all cursor-pointer disabled:opacity-60"
          title="Switch Language"
        >
          {isPending ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin text-orange-500" />
          ) : (
            <Globe className="w-3.5 h-3.5 text-orange-500" />
          )}
          <span className="font-bold">{currentLocale === 'en' ? 'বাংলা' : 'EN'}</span>
        </button>
      </div>
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

  // Default Pill Switcher
  return (
    <div className={`inline-flex items-center bg-slate-100/90 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700 shadow-inner ${className}`}>
      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
          currentLocale === 'en'
            ? 'bg-white text-orange-600 shadow-xs ring-1 ring-slate-200/60'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>🇬🇧</span>
        <span>EN</span>
        {currentLocale === 'en' && !isPending && (
          <Check className="w-3 h-3 text-orange-500 stroke-[3]" />
        )}
      </button>

      <button
        type="button"
        disabled={isPending}
        onClick={() => handleLanguageChange('bn')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
          currentLocale === 'bn'
            ? 'bg-white text-orange-600 shadow-xs ring-1 ring-slate-200/60'
            : 'text-slate-600 hover:text-slate-900'
        }`}
      >
        <span>🇧🇩</span>
        <span>বাং</span>
        {currentLocale === 'bn' && !isPending && (
          <Check className="w-3 h-3 text-orange-500 stroke-[3]" />
        )}
      </button>
    </div>
  );
}
