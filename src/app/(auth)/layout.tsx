import React from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Left Column - Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative z-10">
        {/* Brand Logo Header */}
        <div className="flex items-center justify-between">
          <NextLink href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/logo.svg"
              alt="BikriPOS Logo"
              width={36}
              height={36}
              className="w-9 h-9 rounded-xl shadow-xs object-contain"
              priority
            />
            <div className="flex items-center">
              <span className="text-2xl font-black text-gray-900 tracking-tight">
                Bikri<span className="text-orange-500">POS</span>
              </span>
            </div>
          </NextLink>

          <NextLink
            href="/"
            className="text-xs font-semibold text-gray-500 hover:text-orange-500 transition-colors"
          >
            ← Back to Home
          </NextLink>
        </div>

        {/* Main Content Card */}
        <div className="flex-1 flex flex-col justify-center max-w-sm sm:max-w-md mx-auto w-full py-8 sm:py-12">
          {children}
        </div>

        {/* Footer */}
        <div className="pt-4 text-center text-xs text-gray-400">
          Copyrights © 2026 - BikriPOS Technologies Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column - Illustration Showcase using /screen/login.svg */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-orange-50/70 via-slate-50 to-amber-50/40 border-l border-gray-100 flex-col items-center justify-center p-12 overflow-hidden select-none">
        {/* Ambient subtle glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />

        {/* Illustration Container */}
        <div className="relative z-10 w-full max-w-xl flex flex-col items-center">
          <img
            src="/screen/login.svg"
            alt="BikriPOS Retail Management System"
            className="w-full h-auto max-h-[500px] object-contain drop-shadow-none"
          />

          {/* Feature Highlights beneath image */}
          <div className="mt-8 text-center space-y-2">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Next-Gen Retail & Multi-Branch Cloud POS
            </h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Real-time inventory sync, lightning checkout speeds, thermal printer support, and automated accounting in one unified platform.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex items-center gap-2 mt-4 flex-wrap justify-center">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200/80 text-[11px] font-medium text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Multi-Branch Sync
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200/80 text-[11px] font-medium text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> Offline Resilience
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white border border-gray-200/80 text-[11px] font-medium text-gray-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-orange-500" /> WhatsApp Receipts 2.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
