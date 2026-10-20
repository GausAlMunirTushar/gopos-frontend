'use client';

import React from 'react';
import { SubscriptionsTable } from '@/components/super-admin/tables/subscriptions-table';

export default function SubscriptionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Active Subscriptions</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Track recurring SaaS billing cycles, upcoming renewals, and subscriber payments.
        </p>
      </div>

      {/* Dynamic Reusable Subscriptions DataTable */}
      <SubscriptionsTable />
    </div>
  );
}
