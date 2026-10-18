'use client';

import React from 'react';
import { 
  TrendingUp, Download, Calendar, DollarSign, 
  ArrowUpRight, Wallet, CheckCircle2 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface IncomeReportItem {
  id: string;
  source: string;
  account: string;
  date: string;
  referenceNo: string;
  amount: string;
  receivedBy: string;
}

const mockIncomeReport: IncomeReportItem[] = [
  { id: 'INC-201', source: 'POS Counter Sales', account: 'Main Cash Drawer', date: '18 Oct 2026', referenceNo: 'POS-REC-891', amount: '$4,850.00', receivedBy: 'Cashier Staff' },
  { id: 'INC-202', source: 'Corporate Bulk Supply', account: 'City Bank AC', date: '16 Oct 2026', referenceNo: 'INV-CORP-44', amount: '$2,400.00', receivedBy: 'Manager' },
  { id: 'INC-203', source: 'Online Web Orders', account: 'bKash Merchant', date: '15 Oct 2026', referenceNo: 'WEB-ORD-92', amount: '$1,320.00', receivedBy: 'System Auto' },
  { id: 'INC-204', source: 'Rebate & Supplier Discount', account: 'BRAC Bank', date: '10 Oct 2026', referenceNo: 'REB-0082', amount: '$450.00', receivedBy: 'Store Admin' },
];

export default function IncomeReportPage() {
  const columns: ColumnDef<IncomeReportItem>[] = [
    {
      accessorKey: 'source',
      header: 'Income Source',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block">{row.original.source}</span>
          <span className="text-xs text-gray-400">Ref: {row.original.referenceNo}</span>
        </div>
      ),
    },
    {
      accessorKey: 'account',
      header: 'Deposit Account',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 text-gray-800">
          {row.original.account}
        </span>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-medium">{row.original.date}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount Received',
      cell: ({ row }) => <span className="text-xs font-black text-emerald-600">+{row.original.amount}</span>,
    },
    {
      accessorKey: 'receivedBy',
      header: 'Received By',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-medium">{row.original.receivedBy}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Income Report"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports/sales' },
          { label: 'Income Report' },
        ]}
        actions={
          <Button variant="outline" className="border-gray-200 text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Income (CSV)
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Revenue Income" 
          value="$9,020.00" 
          trend="+14.8%" 
          trendType="up" 
          icon={TrendingUp} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Direct Store Cash" 
          value="$4,850.00" 
          icon={Wallet} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Digital Payments" 
          value="$4,170.00" 
          trend="46.2% share" 
          trendType="up" 
          icon={DollarSign} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockIncomeReport} searchKey="source" />
      </div>
    </div>
  );
}
