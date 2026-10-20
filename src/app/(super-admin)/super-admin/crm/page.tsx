'use client';

import React from 'react';
import { CrmTable } from '@/components/super-admin/tables/crm-table';

export default function CrmPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Super Admin CRM & Pipeline</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Manage prospect retail inquiries, schedule software demos, track negotiations, and convert leads into active tenants.
        </p>
      </div>

      {/* Dynamic Reusable CRM DataTable */}
      <CrmTable />
    </div>
  );
}
