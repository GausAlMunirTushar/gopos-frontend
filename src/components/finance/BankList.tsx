'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, Landmark
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Bank {
  id: string;
  name: string;
  accountName: string;
  accountNo: string;
  balance: string;
  status: string;
  color: string;
}

const bankData: Bank[] = [
  { id: 'BNK001', name: 'Chase Bank', accountName: 'goPOS Main', accountNo: '****1234', balance: '$45,000', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'BNK002', name: 'Bank of America', accountName: 'goPOS Savings', accountNo: '****5678', balance: '$12,450', status: 'Active', color: 'bg-green-100 text-green-600' },
];

export default function BankList() {
  const columns: ColumnDef<Bank>[] = [
    {
      accessorKey: 'id',
      header: 'Bank ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Bank Name',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.name}</span>,
    },
    {
      accessorKey: 'accountName',
      header: 'Account Name',
      cell: ({ row }) => <span className="text-gray-500">{row.original.accountName}</span>,
    },
    {
      accessorKey: 'accountNo',
      header: 'Account No',
      cell: ({ row }) => <span className="text-gray-500">{row.original.accountNo}</span>,
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.balance}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const bank = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${bank.color}`}>
            {bank.status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors">
            <Edit className="w-4 h-4" />
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
        title="Bank Accounts" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance' },
          { label: 'Banks' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Account
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Balance" 
          value="$57,450" 
          icon={Landmark}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Accounts" 
          value="2" 
          icon={Landmark}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={bankData} 
        searchKey="name"
        searchPlaceholder="Search banks..."
        enableSelection={true}
      />
    </div>
  );
}
