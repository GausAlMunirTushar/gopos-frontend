'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, DollarSign, TrendingUp
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useCurrency } from '@/hooks/useCurrency';

interface Income {
  id: string;
  source: string;
  date: string;
  amount: string;
  status: string;
  color: string;
}

const incomeData: Income[] = [
  { id: 'INC001', source: 'Product Sales', date: '24 May 2025', amount: '$45,000', status: 'Received', color: 'bg-green-100 text-green-600' },
  { id: 'INC002', source: 'Services', date: '23 May 2025', amount: '$1,200', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
];

export default function IncomeList() {
  const columns: ColumnDef<Income>[] = [
    {
      accessorKey: 'id',
      header: 'Income ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'source',
      header: 'Source',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.source}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-gray-500">{row.original.date}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.amount}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const income = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${income.color}`}>
            {income.status}
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
        title="Income" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance' },
          { label: 'Income' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Income
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Income" 
          value="$148,988,078" 
          icon={TrendingUp}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="This Month" 
          value="$1,450,000" 
          icon={DollarSign}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={incomeData} 
        searchKey="source"
        searchPlaceholder="Search Source..."
        enableSelection={true}
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Received', value: 'Received' },
              { label: 'Pending', value: 'Pending' },
            ]
          }
        ]}
      />
    </div>
  );
}
