'use client';

import React from 'react';
import { 
  ArrowLeftRight, Eye, Trash2, Plus, Building2, CheckCircle2
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { TransferMoneyModal } from '@/components/finance/TransferMoneyModal';

interface TransferRecord {
  id: string;
  fromAccount: string;
  toAccount: string;
  date: string;
  amount: string;
  reference: string;
  status: string;
}

const transferData: TransferRecord[] = [
  { id: 'TRF001', fromAccount: 'City Bank (Main Corp)', toAccount: 'BRAC Bank (Retail Op)', date: '25 May 2025', amount: '৳250,000', reference: 'REF-88912', status: 'Completed' },
  { id: 'TRF002', fromAccount: 'Islami Bank (Branch)', toAccount: 'DBBL (Petty Cash)', date: '24 May 2025', amount: '৳85,000', reference: 'REF-88910', status: 'Completed' },
  { id: 'TRF003', fromAccount: 'City Bank (Main Corp)', toAccount: 'Cash in Hand (Store A)', date: '22 May 2025', amount: '৳50,000', reference: 'REF-88905', status: 'Completed' },
];

export default function MoneyTransfer() {
  const { data: transfers } = useLiveRows<ApiRecord, TransferRecord>({
    resource: apiEndpoints.finance.transfers,
    fallbackData: transferData,
    mapRow: (row: ApiRecord, index: number) => ({
      id: String(row.id || `TRF${String(index + 1).padStart(3, '0')}`),
      fromAccount: String(row.fromAccount || 'City Bank'),
      toAccount: String(row.toAccount || 'BRAC Bank'),
      date: row.date ? new Date(String(row.date)).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '25 May 2025',
      amount: `৳${Number(row.amount || 0).toLocaleString()}`,
      reference: String(row.reference || `REF-${index + 100}`),
      status: String(row.status || 'Completed'),
    }),
  });

  const columns: ColumnDef<TransferRecord>[] = [
    {
      accessorKey: 'id',
      header: 'Transfer ID',
      cell: ({ row }) => <span className="font-bold text-[#FF9F43]">{row.original.id}</span>,
    },
    {
      accessorKey: 'fromAccount',
      header: 'From Account',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-gray-400" />
          <span className="font-semibold text-gray-900">{row.original.fromAccount}</span>
        </div>
      ),
    },
    {
      accessorKey: 'toAccount',
      header: 'To Account',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-3.5 h-3.5 text-[#FF9F43]" />
          <span className="font-semibold text-gray-900">{row.original.toAccount}</span>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Transfer Date',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span className="font-bold text-teal-600">{row.original.amount}</span>,
    },
    {
      accessorKey: 'reference',
      header: 'Reference',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-mono">{row.original.reference}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700 flex items-center gap-1 w-max">
          <CheckCircle2 className="w-3 h-3" />
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Money Transfers" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance & Accounts' },
          { label: 'Money Transfer' }
        ]}
        actions={<TransferMoneyModal />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Transfers" 
          value="48" 
          icon={ArrowLeftRight}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Transferred This Month" 
          value="৳1,250,000" 
          icon={Building2}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Inter-Account Volume" 
          value="৳385,000" 
          icon={ArrowLeftRight}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={transfers} 
        searchKey="fromAccount"
        searchPlaceholder="Search accounts..."
      />
    </div>
  );
}
