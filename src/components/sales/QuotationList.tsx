'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, FileSignature
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { quotationRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

interface Quotation {
  id: string;
  customer: string;
  date: string;
  expiry: string;
  amount: string;
  status: string;
  color: string;
}

const quotationData: Quotation[] = [
  { id: 'QT-001', customer: 'Andrea Willer', date: '24 May 2025', expiry: '30 May 2025', amount: '৳4560', status: 'Sent', color: 'bg-blue-100 text-blue-600' },
  { id: 'QT-002', customer: 'Timothy Sands', date: '23 May 2025', expiry: '05 Jun 2025', amount: '৳3569', status: 'Accepted', color: 'bg-green-100 text-green-600' },
  { id: 'QT-003', customer: 'Bonnie Rodrigues', date: '22 May 2025', expiry: '25 May 2025', amount: '৳2659', status: 'Expired', color: 'bg-red-100 text-red-600' },
];

export default function QuotationList() {
  const { data: quotations } = useLiveRows<ApiRecord, Quotation>({
    resource: apiEndpoints.sales.quotations,
    fallbackData: quotationData,
    mapRow: quotationRow,
  });

  const columns: ColumnDef<Quotation>[] = [
    {
      accessorKey: 'id',
      header: 'Quotation ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('customer')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'expiry', header: 'Expiry Date' },
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
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors"><Edit className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quotations" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sales', href: '/sales' },
          { label: 'Quotations' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Create Quotation
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Quotations" 
          value="458" 
          icon={FileSignature}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Accepted" 
          value="320" 
          icon={FileSignature}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="Pending" 
          value="138" 
          icon={FileSignature}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={quotations} 
        searchKey="id"
        searchPlaceholder="Search quotation ID..."
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Sent', value: 'Sent' },
              { label: 'Accepted', value: 'Accepted' },
              { label: 'Expired', value: 'Expired' },
            ]
          }
        ]}
      />
    </div>
  );
}
