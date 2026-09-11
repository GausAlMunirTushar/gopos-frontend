'use client';

import React from 'react';
import { 
  FileSpreadsheet, Scale, Printer, Download, CheckCircle2
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';

export default function TrialBalance() {
  const accounts = [
    { code: '1010', name: 'Cash in Hand (Store Counter)', debit: '৳150,000', credit: '—' },
    { code: '1020', name: 'City Bank Ltd. (Main Operating)', debit: '৳3,240,500', credit: '—' },
    { code: '1030', name: 'BRAC Bank (Branch Collection)', debit: '৳1,189,700', credit: '—' },
    { code: '1110', name: 'Accounts Receivable (Trade Debtors)', debit: '৳1,245,600', credit: '—' },
    { code: '1210', name: 'Merchandise Inventory', debit: '৳8,920,400', credit: '—' },
    { code: '1510', name: 'Store Fixtures & Equipment', debit: '৳1,500,000', credit: '—' },
    { code: '2010', name: 'Accounts Payable (Suppliers)', debit: '—', credit: '৳2,850,000' },
    { code: '2020', name: 'Short-term Borrowings', debit: '—', credit: '৳1,200,000' },
    { code: '2030', name: 'VAT & Tax Payable', debit: '—', credit: '৳450,200' },
    { code: '3010', name: 'Owner Capital & Reserves', debit: '—', credit: '৳6,000,000' },
    { code: '4010', name: 'Sales Revenue', debit: '—', credit: '৳18,540,000' },
    { code: '5010', name: 'Cost of Goods Sold (COGS)', debit: '৳11,200,000', credit: '—' },
    { code: '6010', name: 'Store Staff Salaries', debit: '৳840,000', credit: '—' },
    { code: '6020', name: 'Store Utility & Rent', debit: '৳754,000', credit: '—' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Trial Balance" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance & Accounts' },
          { label: 'Trial Balance' }
        ]}
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export CSV
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Debit" 
          value="৳29,040,200" 
          icon={Scale}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Total Credit" 
          value="৳29,040,200" 
          icon={Scale}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Balance Variance" 
          value="৳0.00 (Balanced)" 
          icon={CheckCircle2}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">Account Code</th>
                <th className="px-6 py-4">Account Title</th>
                <th className="px-6 py-4 text-right">Debit (৳)</th>
                <th className="px-6 py-4 text-right">Credit (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {accounts.map((acc, idx) => (
                <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-3.5 font-mono text-xs text-gray-500">{acc.code}</td>
                  <td className="px-6 py-3.5 font-semibold text-gray-900">{acc.name}</td>
                  <td className="px-6 py-3.5 text-right font-medium text-gray-900">{acc.debit}</td>
                  <td className="px-6 py-3.5 text-right font-medium text-gray-900">{acc.credit}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-bold border-t-2 border-gray-300 text-gray-900">
              <tr>
                <td colSpan={2} className="px-6 py-4 text-right uppercase tracking-wider">Total:</td>
                <td className="px-6 py-4 text-right text-teal-600">৳29,040,200</td>
                <td className="px-6 py-4 text-right text-blue-600">৳29,040,200</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
