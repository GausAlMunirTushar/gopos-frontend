'use client';

import React from 'react';
import { FileText, RefreshCcw, Eye, Edit, Trash2, ShoppingBasket } from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { purchaseRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { PurchaseWorkflowModal } from '@/components/purchases/PurchaseWorkflowModals';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Purchase {
  id: string;
  supplier: string;
  date: string;
  status: string;
  payment: string;
  total: string;
  color: string;
}

const purchaseData: Purchase[] = [
  { id: 'PR001', supplier: 'Apex Computers', date: '24 May 2025', status: 'Received', payment: 'Paid', total: '৳12,500', color: 'bg-teal-500' },
  { id: 'PR002', supplier: 'Beats Electronics', date: '23 May 2025', status: 'Pending', payment: 'Partial', total: '৳8,600', color: 'bg-orange-500' },
  { id: 'PR003', supplier: 'Nike Global', date: '22 May 2025', status: 'Ordered', payment: 'Unpaid', total: '৳5,400', color: 'bg-blue-500' },
];

export default function PurchaseList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deletePurchase = useDeleteApiResource(apiEndpoints.purchasing.purchases);

  const { data: purchases } = useLiveRows<ApiRecord, Purchase>({
    resource: apiEndpoints.purchasing.purchases,
    fallbackData: purchaseData,
    mapRow: (row, idx) => ({
      ...purchaseRow(row, idx),
      id: String(row.id || `PR${String(idx + 1).padStart(3, '0')}`),
    }),
  });

  const handleDelete = (purchase: Purchase) => {
    confirm({
      title: 'Delete Purchase Record',
      description: 'Are you sure you want to delete this purchase invoice? Associated product stock balance adjustments and supplier payable ledger items will be recalculated.',
      itemName: `${purchase.id} - ${purchase.supplier} (${purchase.total})`,
      confirmText: 'Delete Purchase',
      variant: 'danger',
      onConfirm: async () => {
        if (purchase.id) {
          await deletePurchase.mutateAsync(purchase.id);
        }
      },
    });
  };

  const columns: ColumnDef<Purchase>[] = [
    {
      accessorKey: 'id',
      header: 'Purchase ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('supplier')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded flex items-center gap-1 w-max ${row.original.color}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      accessorKey: 'payment',
      header: 'Payment',
      cell: ({ row }) => {
        const payment = row.getValue('payment') as string;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${
            payment === 'Paid' ? 'bg-green-50 text-green-600' : 
            payment === 'Partial' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
          }`}>
            {payment}
          </span>
        );
      },
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('total')}</span>,
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View details"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit purchase"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete purchase"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ConfirmDialogComponent />
      <PageHeader 
        title="Purchase List" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Purchases' }
        ]}
        actions={<PurchaseWorkflowModal mode="PURCHASE" />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Purchases" 
          value="৳24,145,789" 
          icon={ShoppingBasket}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Purchase Returns" 
          value="৳18,458,747" 
          icon={RefreshCcw}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Pending Payments" 
          value="৳2,458,000" 
          icon={FileText}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={purchases} 
        searchKey="supplier"
        searchPlaceholder="Search supplier..."
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Received', value: 'Received' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Ordered', value: 'Ordered' },
            ]
          }
        ]}
      />
    </div>
  );
}
