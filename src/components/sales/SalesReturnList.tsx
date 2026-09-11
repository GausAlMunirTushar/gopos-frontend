'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, ArrowLeftRight
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { saleReturnRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

interface SalesReturn {
  id: string;
  saleId: string;
  customer: string;
  date: string;
  amount: string;
  status: string;
  color: string;
}

const returnData: SalesReturn[] = [
  { id: 'SR-001', saleId: 'SL001', customer: 'Andrea Willer', date: '25 May 2025', amount: '৳450', status: 'Received', color: 'bg-green-100 text-green-600' },
  { id: 'SR-002', saleId: 'SL002', customer: 'Timothy Sands', date: '24 May 2025', amount: '৳120', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
];

export default function SalesReturnList() {
  const { data: returns } = useLiveRows<ApiRecord, SalesReturn>({
    resource: apiEndpoints.sales.salesReturns,
    fallbackData: returnData,
    mapRow: saleReturnRow,
  });

  const columns: ColumnDef<SalesReturn>[] = [
    {
      accessorKey: 'id',
      header: 'Return ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    { accessorKey: 'saleId', header: 'Sale ID' },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('customer')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
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
        title="Sales Returns" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sales', href: '/sales' },
          { label: 'Returns' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Return
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Returns" 
          value="৳16,478,145" 
          icon={ArrowLeftRight}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Received Returns" 
          value="1,245" 
          icon={ArrowLeftRight}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={returns} 
        searchKey="id"
        searchPlaceholder="Search return ID..."
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
