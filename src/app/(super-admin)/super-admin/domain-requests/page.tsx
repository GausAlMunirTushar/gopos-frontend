'use client';

import React from 'react';
import { DomainRequestsTable } from '@/components/super-admin/tables/domain-requests-table';

export default function DomainRequestsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Custom Domain Requests</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Manage white-label custom domain mappings and automated Let&apos;s Encrypt SSL certificates.
        </p>
      </div>

      {/* Dynamic Reusable Domain Requests DataTable */}
      <DomainRequestsTable />
    </div>
  );
}
