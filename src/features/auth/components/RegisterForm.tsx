'use client';

import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { Mail, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function RegisterForm() {
  const t = useTranslations('auth');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Register</h1>
      <p className="text-gray-500 text-sm mb-8">
        Create New Dreamspos Account
      </p>

      <form className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input 
              type="text" 
              placeholder="" 
              className="pr-10 bg-white border-gray-200"
            />
            <User className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

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

        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Password <span className="text-red-500">*</span>
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

        <div className="flex items-center">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4 accent-orange-500" />
            <span className="text-sm text-gray-500">
              I agree to the <NextLink href="#" className="text-orange-500 hover:underline">Terms & Privacy</NextLink>
            </span>
          </label>
        </div>

        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 rounded-xl text-md font-medium">
          Sign Up
        </Button>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        Already have an account?{' '}
        <NextLink href="/login" className="text-gray-900 font-medium hover:underline">
          Sign In Instead
        </NextLink>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-sm text-gray-400 uppercase">OR</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Button variant="outline" className="h-12 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
          </svg>
        </Button>
        <Button variant="outline" className="h-12 border-gray-200 hover:bg-gray-50 rounded-xl">
          <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
            <path d="M12.0003 10.5566V13.7225H18.5283C18.2468 15.6542 16.6343 18.0664 12.0003 18.0664C8.42398 18.0664 5.5137 15.0805 5.5137 11.4497C5.5137 7.81882 8.42398 4.83296 12.0003 4.83296C14.0041 4.83296 15.421 5.6987 16.2201 6.46746L18.6653 4.07348C16.9427 2.4549 14.6853 1.44971 12.0003 1.44971C6.47761 1.44971 2 5.92732 2 11.4497C2 16.9721 6.47761 21.4497 12.0003 21.4497C17.7725 21.4497 21.6111 17.3888 21.6111 11.6601C21.6111 10.963 21.5543 10.5566 21.4494 10.0381L12.0003 10.5566Z" fill="#4285F4" />
            <path d="M2.00032 11.4497C2.00032 12.9839 2.34848 14.4338 2.95679 15.7196L7.38243 12.2858C7.15933 11.5888 7.15933 10.8329 7.38243 10.1359L2.95679 6.70215C2.34848 7.98797 2.00032 9.43793 2.00032 11.4497Z" fill="#FBBC05" />
            <path d="M12.0003 21.4497C14.6853 21.4497 16.9427 20.5557 18.6653 18.9372L14.2397 15.5034C13.2924 16.1423 12.0003 16.4907 12.0003 16.4907C8.42398 16.4907 5.5137 13.5048 5.5137 9.87397L1.08805 13.3078C2.65609 16.421 5.86438 18.6441 9.61073 18.6441L12.0003 21.4497Z" fill="#34A853" />
            <path d="M12.0003 4.83296C14.0041 4.83296 15.421 5.6987 16.2201 6.46746L18.6653 4.07348C16.9427 2.4549 14.6853 1.44971 12.0003 1.44971C8.25397 1.44971 5.04568 3.67283 3.47764 6.786L7.90328 10.2198C8.85061 9.58097 10.1427 9.23253 12.0003 9.23253V4.83296Z" fill="#EA4335" />
          </svg>
        </Button>
        <Button variant="outline" className="h-12 bg-slate-900 hover:bg-slate-800 text-white border-0 rounded-xl">
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
            <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.126 3.805 3.052 1.527-.063 2.124-.984 3.96-.984 1.838 0 2.382.984 3.96.984 1.634.027 2.669-1.488 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.484-4.528 2.596-4.597-1.425-2.09-3.639-2.33-4.415-2.368-2.012-.224-4.143 1.069-4.617 1.069zm1.282-5.467c-.838 1.014-1.408 2.417-1.254 3.799 1.186.046 2.65-1.014 3.447-1.99 1.171-1.391 1.777-2.825 1.602-4.185-1.082.044-2.585.94-3.795 2.376z"/>
          </svg>
        </Button>
      </div>
    </>
  );
}
