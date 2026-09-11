'use client';

import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { Mail, Eye, EyeOff, AlertCircle, Sparkles, ServerCrash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api/client';
import type { AuthSession } from '@/lib/auth/session';

export function LoginForm() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [email, setEmail] = useState('admin@gopos.com');
  const [password, setPassword] = useState('admin123');
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isServerOffline, setIsServerOffline] = useState(false);

  const fillCredentials = (userEmail: string, userPass: string) => {
    setEmail(userEmail);
    setPassword(userPass);
    setError(null);
    setIsServerOffline(false);
  };

  const handleDemoBypass = () => {
    const mockSession: AuthSession = {
      accessToken: 'demo-mock-access-token',
      refreshToken: 'demo-mock-refresh-token',
      user: {
        id: 'demo-admin-id',
        name: email === 'admin@gopos.com' ? 'Super Admin' : 'Demo Owner',
        email: email,
        role: email === 'admin@gopos.com' ? 'ADMIN' : 'OWNER',
        organization: {
          id: 'demo-org-id',
          name: 'Demo Store',
          slug: 'demo-store',
        },
      },
    };
    apiClient.setSession(mockSession);
    router.push('/dashboard');
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsServerOffline(false);
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
      
      if (message.includes('Failed to fetch') || message.includes('NetworkError') || caught?.name === 'TypeError') {
        setIsServerOffline(true);
        setError('Cannot connect to backend server at http://localhost:5000. Start backend with "pnpm run dev" in gopos-backend or continue with Demo Mode.');
      } else {
        setError(message || 'Unable to sign in. Please check your credentials.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-500 text-sm mb-6">
          Access the goPOS panel using your email and password.
        </p>

        {/* Quick Demo Credentials Switcher */}
        <div className="mb-6 p-3 bg-orange-50/60 rounded-xl border border-orange-100 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs font-semibold text-orange-800">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              Quick Demo Accounts
            </span>
            <span className="text-[10px] text-orange-500 font-normal">Click to auto-fill</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fillCredentials('admin@gopos.com', 'admin123')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                email === 'admin@gopos.com'
                  ? 'bg-white text-orange-600 border-orange-300 shadow-xs ring-1 ring-orange-200 font-semibold'
                  : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              <div className="font-semibold text-gray-800 text-[11px]">Super Admin</div>
              <div className="text-[10px] text-gray-500 truncate">admin@gopos.com</div>
            </button>
            <button
              type="button"
              onClick={() => fillCredentials('owner@gopos.local', 'ChangeMe123!')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-left border transition-all cursor-pointer ${
                email === 'owner@gopos.local'
                  ? 'bg-white text-orange-600 border-orange-300 shadow-xs ring-1 ring-orange-200 font-semibold'
                  : 'bg-white/80 text-gray-600 border-gray-200 hover:bg-white'
              }`}
            >
              <div className="font-semibold text-gray-800 text-[11px]">Store Owner</div>
              <div className="text-[10px] text-gray-500 truncate">owner@gopos.local</div>
            </button>
          </div>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && (
          <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-xs sm:text-sm text-red-700 flex flex-col gap-2 animate-in fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
            {isServerOffline && (
              <div className="pt-2 border-t border-red-200/60 flex items-center justify-between">
                <span className="text-[11px] text-red-600 font-medium flex items-center gap-1">
                  <ServerCrash className="w-3.5 h-3.5" /> Backend offline
                </span>
                <button
                  type="button"
                  onClick={handleDemoBypass}
                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-medium shadow-xs transition-colors cursor-pointer"
                >
                  Enter with Demo Mode →
                </button>
              </div>
            )}
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gopos.com"
              className="pr-10 bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-orange-500"
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
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="pr-10 bg-white border-gray-200 text-black placeholder:text-gray-400 focus:border-orange-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 focus:outline-none cursor-pointer"
            >
              {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              name="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4 accent-orange-500"
            />
            <span className="text-sm text-gray-500">Remember Me</span>
          </label>
          <NextLink href="/forgot-password" className="text-sm text-orange-500 font-medium hover:underline">
            Forgot Password?
          </NextLink>
        </div>

        <Button
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-5.5 rounded-xl text-md font-medium shadow-md shadow-orange-500/20 cursor-pointer transition-all"
        >
          {isSubmitting ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6 text-sm text-gray-500 text-center">
        New on our platform?{' '}
        <NextLink href="/register" className="text-orange-600 font-semibold hover:underline">
          Create an account
        </NextLink>
      </div>
    </>
  );
}

