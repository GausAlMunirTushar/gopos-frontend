'use client';

import React from 'react';
import { 
  FileMinus, Download, Calendar, DollarSign, 
  TrendingDown, PieChart, ArrowUpRight 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface ExpenseReportItem {
  id: string;
  category: string;
  description: string;
  date: string;
  paymentMethod: string;
  amount: string;
  approvedBy: string;
}

const mockExpenseReport: ExpenseReportItem[] = [
  { id: 'EXP-101', category: 'Store Rent', description: 'Monthly store rental - Branch 1', date: '01 Oct 2026', paymentMethod: 'Bank Wire', amount: '$1,200.00', approvedBy: 'Store Admin' },
  { id: 'EXP-102', category: 'Utilities', description: 'Electricity & water bill', date: '05 Oct 2026', paymentMethod: 'bKash Merchant', amount: '$340.00', approvedBy: 'Manager' },
  { id: 'EXP-103', category: 'Packaging', description: 'Eco-friendly shopping bags & boxes', date: '09 Oct 2026', paymentMethod: 'Cash', amount: '$180.00', approvedBy: 'Store Admin' },
  { id: 'EXP-104', category: 'Maintenance', description: 'AC repair & filter cleaning', date: '14 Oct 2026', paymentMethod: 'Card', amount: '$95.00', approvedBy: 'Manager' },
];

export default function ExpenseReportPage() {
  const columns: ColumnDef<ExpenseReportItem>[] = [
    {
      accessorKey: 'category',
      header: 'Expense Category',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block">{row.original.category}</span>
          <span className="text-xs text-gray-400">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => <span className="text-xs text-gray-600">{row.original.description}</span>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-medium">{row.original.date}</span>,
    },
    {
      accessorKey: 'paymentMethod',
      header: 'Payment Method',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-700">
          {row.original.paymentMethod}
        </span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span className="text-xs font-black text-rose-600">-{row.original.amount}</span>,
    },
    {
      accessorKey: 'approvedBy',
      header: 'Approved By',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-medium">{row.original.approvedBy}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Expense Report"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports/sales' },
          { label: 'Expense Report' },
        ]}
        actions={
          <Button variant="outline" className="border-gray-200 text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Report (CSV)
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Monthly Expenses" 
          value="$1,815.00" 
          trend="-6.2%" 
          trendType="down" 
          icon={FileMinus} 
          iconColor="text-rose-500" 
          iconBg="bg-rose-50" 
        />
        <StatsCard 
          label="Highest Category" 
          value="Store Rent ($1,200)" 
          icon={DollarSign} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Expense Ratio" 
          value="18.4% of Revenue" 
          icon={PieChart} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockExpenseReport} searchKey="category" />
      </div>
    </div>
  );
}
