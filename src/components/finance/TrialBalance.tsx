'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  FileSpreadsheet, Scale, Printer, Download, CheckCircle2
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';

interface TrialBalanceAccount {
  code: string;
  name: string;
  debit: number | null;
  credit: number | null;
}

interface TrialBalanceResponse {
  accounts: TrialBalanceAccount[];
  totalDebit: number;
  totalCredit: number;
  isBalanced: boolean;
}

const fallbackAccounts: TrialBalanceAccount[] = [
  { code: '1010', name: 'Cash in Hand (Store Counter)', debit: 150000, credit: null },
  { code: '1020', name: 'City Bank Ltd. (Main Operating)', debit: 3240500, credit: null },
  { code: '1030', name: 'BRAC Bank (Branch Collection)', debit: 1189700, credit: null },
  { code: '1110', name: 'Accounts Receivable (Trade Debtors)', debit: 1245600, credit: null },
  { code: '1210', name: 'Merchandise Inventory', debit: 8920400, credit: null },
  { code: '2010', name: 'Accounts Payable (Suppliers)', debit: null, credit: 2850000 },
  { code: '4010', name: 'Sales Revenue', debit: null, credit: 18540000 },
  { code: '5010', name: 'Cost of Goods Sold (COGS)', debit: 11200000, credit: null },
];

export default function TrialBalance() {
  const { data: response } = useQuery({
    queryKey: [apiEndpoints.finance.trialBalance],
    queryFn: async () => apiClient.get<TrialBalanceResponse>(apiEndpoints.finance.trialBalance),
  });

  const tb = response?.data;
  const accounts = tb?.accounts ?? fallbackAccounts;
  const totalDebit = tb?.totalDebit ?? 29040200;
  const totalCredit = tb?.totalCredit ?? 29040200;
  const isBalanced = tb?.isBalanced ?? true;

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
          value={`৳${totalDebit.toLocaleString()}`} 
          icon={Scale}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Total Credit" 
          value={`৳${totalCredit.toLocaleString()}`} 
          icon={Scale}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Balance Variance" 
          value={isBalanced ? '৳0.00 (Balanced)' : `৳${Math.abs(totalDebit - totalCredit).toLocaleString()}`} 
          icon={CheckCircle2}
          iconColor={isBalanced ? 'text-green-600' : 'text-red-600'}
          iconBg={isBalanced ? 'bg-green-50' : 'bg-red-50'}
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
                  <td className="px-6 py-3.5 text-right font-medium text-teal-700">
                    {acc.debit !== null ? `৳${acc.debit.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-6 py-3.5 text-right font-medium text-blue-700">
                    {acc.credit !== null ? `৳${acc.credit.toLocaleString()}` : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 font-bold border-t-2 border-gray-300 text-gray-900">
              <tr>
                <td colSpan={2} className="px-6 py-4 text-right uppercase tracking-wider">Total:</td>
                <td className="px-6 py-4 text-right text-teal-600">৳{totalDebit.toLocaleString()}</td>
                <td className="px-6 py-4 text-right text-blue-600">৳{totalCredit.toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}

