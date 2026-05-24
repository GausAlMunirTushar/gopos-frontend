'use client';

import React from 'react';
import NextLink from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 p-4">
      {/* Visual illustration placeholder using CSS & Icons */}
      <div className="relative mb-8 w-64 h-64 flex items-center justify-center">
        <div className="absolute inset-0 bg-orange-100 rounded-full animate-pulse opacity-50"></div>
        <div className="z-10 bg-white p-6 rounded-3xl shadow-xl transform rotate-3 border-4 border-orange-400">
          <h1 className="text-6xl font-black text-orange-500 tracking-tighter">404</h1>
        </div>
        <div className="absolute -bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg transform -rotate-6">
          ERROR
        </div>
      </div>

      <div className="text-center max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">
          Oops, something went wrong
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed">
          Error 404 Page not found. Sorry the page you looking for doesn't exist or has been moved.
        </p>
        
        <div className="pt-4">
          <NextLink href="/dashboard">
            <Button className="bg-[#FF9F43] hover:bg-orange-500 text-white rounded-xl px-8 h-12 flex items-center gap-2 mx-auto">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </NextLink>
        </div>
      </div>
    </div>
  );
}
