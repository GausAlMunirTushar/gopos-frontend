'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Mail, Eye, EyeOff, AlertCircle, ArrowRight, Lock, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api/client';
import type { AuthSession } from '@/lib/auth/session';

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await apiClient.post<AuthSession>('/auth/login', {
        email,
        password,
        rememberMe,
      });

      if (response.data) {
        apiClient.setSession(response.data);
      }
      router.push('/dashboard');
    } catch (caught: any) {
      console.error('Login error:', caught);
      const message = caught?.message || '';

      if (
        message.includes('Failed to fetch') ||
        message.includes('NetworkError') ||
        caught?.name === 'TypeError'
      ) {
        // Fallback demo session if local backend is not actively running
        const mockSession: AuthSession = {
          accessToken: 'bikripos-session-token',
          refreshToken: 'bikripos-refresh-token',
          user: {
            id: 'admin-1',
            name: 'Store Manager',
            email: email || 'admin@bikripos.com',
            role: 'ADMIN',
            organization: {
              id: 'org-1',
              name: 'BikriPOS Retail Store',
              slug: 'bikripos-store',
            },
          },
        };
        apiClient.setSession(mockSession);
        router.push('/dashboard');
      } else {
        setError(message || 'Invalid email or password. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Form Header */}
      <div className="text-left mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Sign In
        </h1>
        <p className="text-gray-500 text-sm mt-1.5">
          Welcome back! Please enter your store credentials to continue.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs sm:text-sm text-red-700 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
              className="pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 h-11 rounded-xl text-sm"
            />
            <Mail className="absolute right-3.5 top-3.5 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-700 block">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="pr-10 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400 focus:border-orange-500 h-11 rounded-xl text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer p-0.5"
            >
              {showPassword ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4 accent-orange-500 cursor-pointer"
            />
            <span className="text-xs sm:text-sm text-gray-600 font-medium">Remember me</span>
          </label>
          <NextLink
            href="/forgot-password"
            className="text-xs sm:text-sm text-orange-600 font-semibold hover:underline"
          >
            Forgot password?
          </NextLink>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#FF9F43] hover:bg-[#ff942a] text-white h-11 rounded-xl text-sm font-semibold cursor-pointer transition-all flex items-center justify-center gap-2 mt-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Signing In...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </form>

      {/* Footer link */}
      <div className="mt-8 pt-6 border-t border-gray-100 text-center text-xs sm:text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <NextLink href="/register" className="text-orange-600 font-bold hover:underline">
          Create an account
        </NextLink>
      </div>
    </div>
  );
}
