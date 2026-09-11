'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus, Download
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { transferRow, type ApiRecord } from '@/lib/api/row-mappers';
import { actionButtonClassName } from '@/lib/api/resource-fields';
import { StockTransferCreateModal } from '@/components/stock/StockOperationModals';
import { ColumnDef } from '@tanstack/react-table';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Transfer {
  id?: string;
  from: string;
  to: string;
  products: number;
  qty: string | number;
  ref: string;
  date: string;
}

const transferData: Transfer[] = [
  { id: '1', from: 'Lavish Warehouse', to: 'North Zone Warehouse', products: 20, qty: 15, ref: '#458924', date: '24 Dec 2024' },
  { id: '2', from: 'Quaint Warehouse', to: 'Nova Storage Hub', products: 25, qty: 20, ref: '#429054', date: '10 Dec 2024' },
  { id: '3', from: 'Traditional Warehouse', to: 'Cool Warehouse', products: 40, qty: 30, ref: '#419893', date: '27 Nov 2024' },
  { id: '4', from: 'Cool Warehouse', to: 'Retail Supply Hub', products: 50, qty: 40, ref: '#386914', date: '18 Nov 2024' },
  { id: '5', from: 'Overflow Warehouse', to: 'Quaint Warehouse', products: 30, qty: 20, ref: '#366713', date: '06 Nov 2024' },
  { id: '6', from: 'Nova Storage Hub', to: 'Traditional Warehouse', products: 10, qty: '06', ref: '#327814', date: '25 Oct 2024' },
  { id: '7', from: 'Retail Supply Hub', to: 'Overflow Warehouse', products: 70, qty: 60, ref: '#274509', date: '14 Oct 2024' },
  { id: '8', from: 'EdgeWare Solutions', to: 'Lavish Warehouse', products: 35, qty: 30, ref: '#239073', date: '03 Oct 2024' },
  { id: '9', from: 'North Zone Warehouse', to: 'Fulfillment Hub', products: 15, qty: 10, ref: '#187204', date: '20 Sep 2024' },
  { id: '10', from: 'Fulfillment Hub', to: 'EdgeWare Solutions', products: 45, qty: 35, ref: '#139064', date: '10 Sep 2024' },
];

export default function StockTransfer() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteTransfer = useDeleteApiResource(apiEndpoints.inventory.stockTransfers);

  const { data: transfers } = useLiveRows<ApiRecord, Transfer>({
    resource: apiEndpoints.inventory.stockTransfers,
    fallbackData: transferData,
    mapRow: (row, idx) => ({
      ...transferRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (transfer: Transfer) => {
    confirm({
      title: 'Delete Stock Transfer',
      description: 'Are you sure you want to delete this stock transfer record? Origin and destination inventory balances will be restored.',
      itemName: `${transfer.ref} (${transfer.from} → ${transfer.to})`,
      confirmText: 'Delete Transfer',
      variant: 'danger',
      onConfirm: async () => {
        if (transfer.id) {
          await deleteTransfer.mutateAsync(transfer.id);
        }
      },
    });
  };

  const columns: ColumnDef<Transfer>[] = [
    { accessorKey: 'from', header: 'From Warehouse' },
    { accessorKey: 'to', header: 'To Warehouse' },
    { accessorKey: 'products', header: 'No of Products' },
    { accessorKey: 'qty', header: 'Quantity Transferred' },
    { accessorKey: 'ref', header: 'Reference Number' },
    { accessorKey: 'date', header: 'Date' },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit transfer"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete transfer"
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
        title="Stock Transfer" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Stock Transfer' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-gray-50 bg-white">
               <FileText className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-green-600 hover:bg-gray-50 bg-white">
               <FileSpreadsheet className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
               <RefreshCcw className="w-5 h-5" />
            </button>
            <StockTransferCreateModal buttonClassName={actionButtonClassName}>
              <Plus className="w-4 h-4" /> Add Transfer
            </StockTransferCreateModal>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg font-medium transition-colors">
              <Download className="w-4 h-4" /> Import Transfer
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={transfers} 
        searchKey="ref"
        searchPlaceholder="Search reference..."
        enableSelection
      />
    </div>
  );
}
