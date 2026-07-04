'use client';

import { useTranslations } from 'next-intl';
import { Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function VerifyForm() {
  const t = useTranslations('auth');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">2 Step Verification</h1>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        Please enter the OTP received to confirm your account ownership. A code has been send to ******doe@example.com
      </p>

      <form className="space-y-6">
        <div className="flex justify-between gap-4">
          {[1, 2, 3, 4].map((i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              className={`w-16 h-16 text-center text-2xl font-semibold rounded-lg border focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-white ${i === 1 ? 'border-orange-400 ring-1 ring-orange-400' : 'border-gray-200'}`}
              defaultValue={i === 1 ? '8' : ''}
            />
          ))}
        </div>

        <div className="flex justify-center mt-2">
          <div className="flex items-center gap-1.5 text-xs text-red-500 bg-red-50 px-2 py-1 rounded-md font-medium">
            <Clock className="w-3.5 h-3.5" />
            09:59 s
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          Didn&apos;t get the OTP? <button type="button" className="text-gray-900 font-medium hover:underline">Resend OTP</button>
        </div>

        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 rounded-xl text-md font-medium mt-6">
          Submit
        </Button>
      </form>
    </>
  );
}
