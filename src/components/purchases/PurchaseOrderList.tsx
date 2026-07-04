'use client';

import React from 'react';
import { Eye, Edit, Trash2, ClipboardList } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { purchaseRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { PurchaseWorkflowModal } from '@/components/purchases/PurchaseWorkflowModals';

interface PurchaseOrder {
  id: string;
  supplier: string;
  date: string;
  deliveryDate: string;
  amount: string;
  status: string;
  color: string;
}

const orderData: PurchaseOrder[] = [
  { id: 'PO-001', supplier: 'Apex Computers', date: '24 May 2025', deliveryDate: '30 May 2025', amount: '$12,500', status: 'Sent', color: 'bg-blue-100 text-blue-600' },
  { id: 'PO-002', supplier: 'Beats Electronics', date: '23 May 2025', deliveryDate: '05 Jun 2025', amount: '$8,600', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
];

export default function PurchaseOrderList() {
  const { data: orders } = useLiveRows<ApiRecord, PurchaseOrder>({
    resource: apiEndpoints.purchasing.purchaseOrders,
    fallbackData: orderData,
    mapRow: purchaseRow,
  });

  const columns: ColumnDef<PurchaseOrder>[] = [
    {
      accessorKey: 'id',
      header: 'Order ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('supplier')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'deliveryDate', header: 'Delivery Date' },
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
        title="Purchase Orders" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Purchases', href: '/purchases' },
          { label: 'Orders' }
        ]}
        actions={<PurchaseWorkflowModal mode="ORDER" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Orders" 
          value="158" 
          icon={ClipboardList}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Pending Delivery" 
          value="45" 
          icon={ClipboardList}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={orders} 
        searchKey="id"
        searchPlaceholder="Search order ID..."
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Sent', value: 'Sent' },
              { label: 'Pending', value: 'Pending' },
            ]
          }
        ]}
      />
    </div>
  );
}
