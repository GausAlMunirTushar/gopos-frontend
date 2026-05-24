import React from 'react';
import NextLink from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { LockScreenForm } from '@/features/auth/components/LockScreenForm';

export default function LockScreenPage() {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center bg-orange-50/30 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/4 w-[120%] h-48 bg-[#FF9F43] opacity-80 -rotate-3 z-0"></div>
      <div className="absolute right-0 top-1/3 w-1/3 h-64 bg-[#FFE8D6] opacity-80 rotate-6 z-0"></div>
      <div className="absolute inset-0 bg-white/70 backdrop-blur-3xl z-0"></div>

      {/* Header Logo */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        <div className="relative">
          <ShoppingBag className="w-10 h-10 text-[#092C4C]" />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#FF9F43] rounded-full"></div>
        </div>
        <h1 className="text-3xl font-bold text-[#092C4C] tracking-tight">
          Dreams<span className="text-[#FF9F43] text-sm align-top">POS</span>
        </h1>
      </div>

      {/* Main Content */}
      <LockScreenForm />

      {/* Footer */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-center w-full">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-2 font-medium">
          <NextLink href="#" className="hover:text-gray-900 transition-colors">Terms & Condition</NextLink>
          <NextLink href="#" className="hover:text-gray-900 transition-colors">Privacy</NextLink>
          <NextLink href="#" className="hover:text-gray-900 transition-colors">Help</NextLink>
          <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
            English
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
        </div>
        <p className="text-xs text-gray-400">
          Copyrights © 2025 - DreamsPOS
        </p>
      </div>
    </div>
  );
}
