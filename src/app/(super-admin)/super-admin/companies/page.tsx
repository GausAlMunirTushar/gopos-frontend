'use client';

import React from 'react';
import { CompaniesTable } from '@/components/super-admin/tables/companies-table';

export default function CompaniesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Companies & Stores</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Manage all registered multi-tenant businesses, retail outlets, and subdomain mappings.
        </p>
      </div>

      {/* Dynamic Reusable Companies DataTable */}
      <CompaniesTable />
    </div>
  );
}
