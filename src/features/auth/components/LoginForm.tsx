'use client';

import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Mail, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api/client';
import type { AuthSession } from '@/lib/auth/session';

export function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const formData = new FormData(event.currentTarget);
    try {
      const response = await apiClient.post<AuthSession>('/auth/login', {
        email: formData.get('email'),
        password: formData.get('password'),
        rememberMe: formData.get('rememberMe') === 'on',
      });
      apiClient.setSession(response.data);
      router.push('/dashboard');
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Unable to sign in');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-500 text-sm mb-8">
          Access the goPOS panel using your email and passcode.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        {error && <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              name="email"
              type="email"
              placeholder="Enter your email"
              defaultValue="gopos@gausalmunir.site"
              className="pr-10 bg-white border-gray-200"
            />
            <Mail className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              name="password"
              type="password"
              placeholder="Enter your password"
              defaultValue="password"
              className="pr-10 bg-white border-gray-200"
            />
            <EyeOff className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input name="rememberMe" type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4 accent-orange-500" />
            <span className="text-sm text-gray-500">Remember Me</span>
          </label>
          <NextLink href="/forgot-password" className="text-sm text-orange-500 font-medium hover:underline">
            Forgot Password?
          </NextLink>
        </div>

        <Button disabled={isSubmitting} className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 rounded-xl text-md font-medium">
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        New on our platform?{' '}
        <NextLink href="/register" className="text-gray-900 font-medium hover:underline">
          Create an account
        </NextLink>
      </div>


    </>
  );
}
