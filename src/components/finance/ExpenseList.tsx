'use client';

import React from 'react';
import { 
  RefreshCcw, Eye, Edit, Trash2, Plus, DollarSign, Wallet
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Expense {
  id: string;
  category: string;
  date: string;
  amount: string;
  status: string;
  color: string;
}

const expenseData: Expense[] = [
  { id: 'EXP001', category: 'Rent', date: '24 May 2025', amount: '$2,000', status: 'Paid', color: 'bg-green-100 text-green-600' },
  { id: 'EXP002', category: 'Electricity', date: '23 May 2025', amount: '$150', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
  { id: 'EXP003', category: 'Internet', date: '22 May 2025', amount: '$80', status: 'Paid', color: 'bg-green-100 text-green-600' },
];

export default function ExpenseList() {
  const columns: ColumnDef<Expense>[] = [
    {
      accessorKey: 'id',
      header: 'Expense ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.category}</span>,
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
        const expense = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${expense.color}`}>
            {expense.status}
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
        title="Expenses" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance' },
          { label: 'Expenses' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Expenses" 
          value="$8,980,097" 
          icon={DollarSign}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Paid" 
          value="$7,500,000" 
          icon={Wallet}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="Pending" 
          value="$1,480,097" 
          icon={RefreshCcw}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatsCard 
          label="This Month" 
          value="$450,000" 
          icon={DollarSign}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={expenseData} 
        searchKey="category"
        searchPlaceholder="Search category..."
        enableSelection={true}
        filters={[
          {
            column: 'category',
            label: 'All Categories',
            options: [
              { label: 'Rent', value: 'Rent' },
              { label: 'Utilities', value: 'Utilities' },
              { label: 'Marketing', value: 'Marketing' },
            ]
          },
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Paid', value: 'Paid' },
              { label: 'Pending', value: 'Pending' },
            ]
          }
        ]}
      />
    </div>
  );
}
