'use server';

import { cookies } from 'next/headers';

export type Locale = 'en' | 'bn';

const COOKIE_NAME = 'NEXT_LOCALE';
const defaultLocale: Locale = 'en';

export async function getUserLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const value = cookieStore.get(COOKIE_NAME)?.value;
  if (value === 'bn' || value === 'en') {
    return value;
  }
  return defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  });
}
