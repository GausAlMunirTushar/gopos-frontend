'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus, FileCode2
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { stockBalanceRow, type ApiRecord } from '@/lib/api/row-mappers';
import { actionButtonClassName } from '@/lib/api/resource-fields';
import { StockAdjustmentCreateModal } from '@/components/stock/StockOperationModals';
import { ColumnDef } from '@tanstack/react-table';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Adjustment {
  id?: string;
  warehouse: string;
  store: string;
  product: string;
  date: string;
  person: string;
  img: string;
}

const adjustmentData: Adjustment[] = [
  { id: '1', warehouse: 'Lavish Warehouse', store: 'Electro Mart', product: 'Lenovo IdeaPad 3', date: '24 Dec 2024', person: 'James Kirwin', img: 'laptop' },
  { id: '2', warehouse: 'Quaint Warehouse', store: 'Quantum Gadgets', product: 'Beats Pro', date: '10 Dec 2024', person: 'Francis Chang', img: 'headphones' },
  { id: '3', warehouse: 'Traditional Warehouse', store: 'Prime Bazaar', product: 'Nike Jordan', date: '27 Nov 2024', person: 'Antonio Engle', img: 'shoe' },
  { id: '4', warehouse: 'Cool Warehouse', store: 'Gadget World', product: 'Apple Series 5 Watch', date: '18 Nov 2024', person: 'Leo Kelly', img: 'watch' },
  { id: '5', warehouse: 'Overflow Warehouse', store: 'Volt Vault', product: 'Amazon Echo Dot', date: '06 Nov 2024', person: 'Annette Walker', img: 'speaker' },
  { id: '6', warehouse: 'Nova Storage Hub', store: 'Elite Retail', product: 'Sanford Chair Sofa', date: '25 Oct 2024', person: 'John Weaver', img: 'sofa' },
  { id: '7', warehouse: 'Retail Supply Hub', store: 'Prime Mart', product: 'Red Premium Satchel', date: '14 Oct 2024', person: 'Gary Hennessy', img: 'bag' },
  { id: '8', warehouse: 'EdgeWare Solutions', store: 'NeoTech Store', product: 'Iphone 14 Pro', date: '03 Oct 2024', person: 'Eleanor Panek', img: 'phone' },
  { id: '9', warehouse: 'North Zone Warehouse', store: 'Urban Mart', product: 'Gaming Chair', date: '20 Sep 2024', person: 'William Levy', img: 'chair' },
  { id: '10', warehouse: 'Fulfillment Hub', store: 'Travel Mart', product: 'Borealis Backpack', date: '10 Sep 2024', person: 'Charlotte Klotz', img: 'backpack' },
];

export default function StockAdjustment() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteAdjustment = useDeleteApiResource(apiEndpoints.inventory.stockAdjustments);

  const { data: adjustments } = useLiveRows<ApiRecord, Adjustment>({
    resource: apiEndpoints.inventory.stockAdjustments,
    fallbackData: adjustmentData,
    mapRow: (row, idx) => ({
      ...stockBalanceRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (item: Adjustment) => {
    confirm({
      title: 'Delete Stock Adjustment',
      description: 'Are you sure you want to delete this stock adjustment record? The discrepancy count will be reverted.',
      itemName: `${item.product} at ${item.warehouse !== '—' ? item.warehouse : item.store}`,
      confirmText: 'Delete Adjustment',
      variant: 'danger',
      onConfirm: async () => {
        if (item.id) {
          await deleteAdjustment.mutateAsync(item.id);
        }
      },
    });
  };

  const columns: ColumnDef<Adjustment>[] = [
    { accessorKey: 'warehouse', header: 'Warehouse' },
    { accessorKey: 'store', header: 'Store' },
    {
      accessorKey: 'product',
      header: 'Product Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://source.unsplash.com/100x100/?${row.original.img}&sig=${row.index}`} alt={row.original.product} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
          <span className="font-medium text-gray-900">{row.original.product}</span>
        </div>
      ),
    },
    { accessorKey: 'date', header: 'Date' },
    {
      accessorKey: 'person',
      header: 'Person',
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-gray-700">
          <img src={`https://i.pravatar.cc/100?img=${row.index + 10}`} alt={row.original.person} className="w-6 h-6 rounded-full object-cover" />
          {row.original.person}
        </div>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-[#092C4C] transition-colors" title="Audit report"><FileCode2 className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit adjustment"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete adjustment"
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
        title="Stock Adjustment" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Stock Adjustment' }
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
            <StockAdjustmentCreateModal buttonClassName={actionButtonClassName}>
              <Plus className="w-4 h-4" /> Add Adjustment
            </StockAdjustmentCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={adjustments} 
        searchKey="product"
        searchPlaceholder="Search products..."
        enableSelection
        filters={[
          {
            column: 'warehouse',
            label: 'Warehouse',
            options: [
              { label: 'Lavish Warehouse', value: 'Lavish Warehouse' },
              { label: 'Quaint Warehouse', value: 'Quaint Warehouse' },
            ]
          }
        ]}
      />
    </div>
  );
}
