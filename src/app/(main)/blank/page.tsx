'use client';

import React from 'react';
import { File, Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';

export default function BlankPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Blank Starter Page"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Pages' },
          { label: 'Blank Page' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white rounded-xl">
            <Plus className="w-4 h-4 mr-1.5" /> Action Button
          </Button>
        }
      />

      <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center flex flex-col items-center justify-center min-h-[360px]">
        <div className="w-14 h-14 rounded-2xl bg-orange-50 text-[#FF9F43] flex items-center justify-center mb-3">
          <File className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Create Something Great</h3>
        <p className="text-xs text-gray-400 max-w-sm mb-4">
          This is a blank starter layout ready for custom components, widgets, data tables, or analytics graphs.
        </p>
        <Button variant="outline" className="border-gray-200 text-xs font-semibold rounded-xl">
          Start Customizing
        </Button>
      </div>
    </div>
  );
}
