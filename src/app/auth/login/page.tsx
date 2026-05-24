import { useTranslations } from 'next-intl';
import NextLink from 'next/link';
import { Mail, EyeOff, Facebook, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function LoginPage() {
  const t = useTranslations('auth');

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
      <p className="text-gray-500 text-sm mb-8">
        Access the Dreamspos panel using your email and passcode.
      </p>

      <form className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
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

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500 w-4 h-4 accent-orange-500" />
            <span className="text-sm text-gray-500">Remember Me</span>
          </label>
          <NextLink href="/auth/forgot-password" className="text-sm text-orange-500 font-medium hover:underline">
            Forgot Password?
          </NextLink>
        </div>

        <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white py-6 rounded-xl text-md font-medium">
          Sign In
        </Button>
      </form>

      <div className="mt-6 text-sm text-gray-500">
        New on our platform?{' '}
        <NextLink href="/auth/register" className="text-gray-900 font-medium hover:underline">
          Create an account
        </NextLink>
      </div>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span className="text-sm text-gray-400 uppercase">OR</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <Button variant="outline" className="h-12 bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-xl">
          <Facebook className="h-5 w-5" />
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
          <Apple className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
}
