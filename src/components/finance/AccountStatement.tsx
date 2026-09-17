'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Building2, Calendar, Download, Printer, ArrowUpRight
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';

interface BankRecord {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  openingBalance: number;
  currentBalance: number;
}

interface StatementTransaction {
  id: string;
  date: string;
  ref: string;
  desc: string;
  type: string;
  amount: string;
  balance: string;
}

interface StatementResponse {
  bankAccount: BankRecord | null;
  transactions: StatementTransaction[];
}

const fallbackTransactions: StatementTransaction[] = [
  { id: '1', date: '25 May 2025', ref: 'TRX-99821', desc: 'POS Batch Settlement (Terminal 1 & 2)', type: 'Credit', amount: '+ ৳148,200', balance: '৳3,240,500' },
  { id: '2', date: '24 May 2025', ref: 'TRX-99814', desc: 'Supplier Invoice Payment (Apex Computers)', type: 'Debit', amount: '- ৳85,000', balance: '৳3,092,300' },
  { id: '3', date: '23 May 2025', ref: 'TRX-99805', desc: 'Store Rent Transfer (Gulshan Outlet)', type: 'Debit', amount: '- ৳120,000', balance: '৳3,177,300' },
];

export default function AccountStatement() {
  const [selectedBankId, setSelectedBankId] = useState<string>('');

  const banksQuery = useQuery({
    queryKey: [apiEndpoints.finance.banks],
    queryFn: async () => apiClient.get<BankRecord[]>(apiEndpoints.finance.banks, { limit: 100 }),
  });
  const banks = banksQuery.data?.data ?? [];

  const activeBankId = selectedBankId || (banks[0]?.id ?? '');

  const statementQuery = useQuery({
    queryKey: [apiEndpoints.finance.statement, activeBankId],
    queryFn: async () => apiClient.get<StatementResponse>(apiEndpoints.finance.statement, { bankAccountId: activeBankId || undefined }),
    enabled: Boolean(activeBankId) || banks.length === 0,
  });

  const statement = statementQuery.data?.data;
  const currentBank = statement?.bankAccount ?? (banks.find(b => b.id === activeBankId) ?? null);
  const transactions = statement?.transactions?.length ? statement.transactions : fallbackTransactions;

  const openingBalance = currentBank ? Number(currentBank.openingBalance) : 1500000;
  const currentBalance = currentBank ? Number(currentBank.currentBalance) : 2450000;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Account Statement" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance & Accounts' },
          { label: 'Account Statement' }
        ]}
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print Statement
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Excel
            </button>
          </div>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-[#FF9F43]" />
          <select 
            value={activeBankId} 
            onChange={(e) => setSelectedBankId(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            {banks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.bankName} - {b.accountName} (A/C: {b.accountNumber})
              </option>
            ))}
            {banks.length === 0 && (
              <option value="">City Bank Ltd. (A/C: 1102938472)</option>
            )}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500" /> Recent Statements
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Opening Balance" 
          value={`৳${openingBalance.toLocaleString()}`} 
          icon={Building2}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Movements Recorded" 
          value={String(transactions.length)} 
          icon={ArrowUpRight}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Current Closing Balance" 
          value={`৳${currentBalance.toLocaleString()}`} 
          icon={Building2}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Description / Narration</th>
                <th className="px-6 py-4 text-right">Amount (৳)</th>
                <th className="px-6 py-4 text-right">Running Balance (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx, idx) => (
                <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-3.5 text-xs text-gray-600 whitespace-nowrap">
                    {trx.date ? new Date(trx.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '—'}
                  </td>
                  <td className="px-6 py-3.5 font-mono text-xs text-gray-500">{trx.ref}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-900">{trx.desc}</td>
                  <td className={`px-6 py-3.5 text-right font-bold ${trx.type === 'Credit' ? 'text-teal-600' : 'text-red-600'}`}>
                    {trx.amount}
                  </td>
                  <td className="px-6 py-3.5 text-right font-bold text-gray-900">{trx.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

