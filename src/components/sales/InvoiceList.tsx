'use client';

import React from 'react';
import { 
  FileText, Eye, Download, Printer, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { invoiceRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

interface Invoice {
  id: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: string;
  status: string;
  color: string;
}

const invoiceData: Invoice[] = [
  { id: 'INV-001', customer: 'Andrea Willer', date: '24 May 2025', dueDate: '30 May 2025', amount: '৳4560', status: 'Paid', color: 'bg-green-100 text-green-600' },
  { id: 'INV-002', customer: 'Timothy Sands', date: '23 May 2025', dueDate: '05 Jun 2025', amount: '৳3569', status: 'Sent', color: 'bg-blue-100 text-blue-600' },
  { id: 'INV-003', customer: 'Bonnie Rodrigues', date: '22 May 2025', dueDate: '25 May 2025', amount: '৳2659', status: 'Overdue', color: 'bg-red-100 text-red-600' },
  { id: 'INV-004', customer: 'Randy McCree', date: '21 May 2025', dueDate: '10 Jun 2025', amount: '৳2155', status: 'Draft', color: 'bg-gray-100 text-gray-600' },
];

export default function InvoiceList() {
  const { data: invoices } = useLiveRows<ApiRecord, Invoice>({
    resource: apiEndpoints.sales.invoices,
    fallbackData: invoiceData,
    mapRow: invoiceRow,
  });

  const columns: ColumnDef<Invoice>[] = [
    {
      accessorKey: 'id',
      header: 'Invoice ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('customer')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'dueDate', header: 'Due Date' },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('amount')}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded text-[11px] font-bold ${row.original.color}`}>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"><Download className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-orange-500 transition-colors"><Printer className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Invoices" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sales', href: '/sales' },
          { label: 'Invoices' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Create Invoice
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Invoiced" 
          value="৳128,450" 
          icon={FileText}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Paid Invoices" 
          value="৳85,200" 
          icon={FileText}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="Unpaid Invoices" 
          value="৳43,250" 
          icon={FileText}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={invoices} 
        searchKey="id"
        searchPlaceholder="Search invoice ID..."
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Paid', value: 'Paid' },
              { label: 'Sent', value: 'Sent' },
              { label: 'Overdue', value: 'Overdue' },
              { label: 'Draft', value: 'Draft' },
            ]
          }
        ]}
      />
    </div>
  );
}
