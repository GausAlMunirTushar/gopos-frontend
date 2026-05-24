'use client';

import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function ResetPasswordForm() {
  const t = useTranslations('auth');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Reset password?</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Enter New Password & Confirm Password to get inside
      </p>

      <form className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            New Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input 
              type="password" 
              placeholder="" 
              className="pr-10 bg-white border-gray-200"
            />
            <EyeOff className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input 
              type="password" 
              placeholder="" 
              className="pr-10 bg-white border-gray-200"
            />
            <EyeOff className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 rounded-xl text-md font-medium mt-6">
          Change Password
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
