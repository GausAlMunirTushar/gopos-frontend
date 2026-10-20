'use client';

import React from 'react';
import { TransactionsTable } from '@/components/super-admin/tables/transactions-table';

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Billing & Invoices</h1>
        <p className="text-gray-500 text-sm mt-0.5">
          Review tenant subscription payments, automated gateway settlements, and official tax invoices.
        </p>
      </div>

      {/* Dynamic Reusable Transactions DataTable */}
      <TransactionsTable />
    </div>
  );
}
