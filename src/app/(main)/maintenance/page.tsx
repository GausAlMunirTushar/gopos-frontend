'use client';

import React from 'react';
import NextLink from 'next/link';
import { AlertTriangle, ArrowLeft, RefreshCw, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MaintenancePage() {
  return (
    <div className="min-h-[500px] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto border-2 border-amber-200 shadow-md">
          <Wrench className="w-10 h-10 animate-bounce" />
        </div>
      </div>

      <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">
        Under Scheduled Maintenance
      </h1>
      <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed mb-6">
        We are currently upgrading server modules and optimizing POS database indexes. All store data is secure. Normal service will resume shortly.
      </p>

      <div className="flex items-center gap-3">
        <NextLink href="/dashboard">
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white rounded-xl px-6 h-11 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Dashboard
          </Button>
        </NextLink>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()}
          className="border-gray-200 rounded-xl px-5 h-11 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Refresh Status
        </Button>
      </div>
    </div>
  );
}
