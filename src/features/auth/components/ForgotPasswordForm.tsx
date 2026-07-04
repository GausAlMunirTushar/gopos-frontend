'use client';

import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ForgotPasswordForm() {
  const t = useTranslations('auth');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Forgot password?</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        If you forgot your password, well, then we&apos;ll email you
        instructions to reset your password.
      </p>

      <form className="space-y-6">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input 
              type="email" 
              placeholder="" 
              className="pr-10 bg-white border-gray-200"
            />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 rounded-xl text-md font-medium">
          Submit
        </Button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-500">
        Return to{' '}
        <NextLink href="/login" className="text-gray-900 font-medium hover:underline">
          Login
        </NextLink>
      </div>
    </>
  );
}
