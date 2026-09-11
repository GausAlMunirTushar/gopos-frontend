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
import { purchaseReturnRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface PurchaseReturn {
  id: string;
  purchaseId: string;
  supplier: string;
  date: string;
  amount: string;
  status: string;
  color: string;
}

const returnData: PurchaseReturn[] = [
  { id: 'PR-001', purchaseId: 'PR001', supplier: 'Apex Computers', date: '25 May 2025', amount: '৳1,200', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
  { id: 'PR-002', purchaseId: 'PR002', supplier: 'Beats Electronics', date: '24 May 2025', amount: '৳500', status: 'Completed', color: 'bg-green-100 text-green-600' },
];

export default function PurchaseReturnList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteReturn = useDeleteApiResource(apiEndpoints.purchasing.purchaseReturns);

  const { data: returns } = useLiveRows<ApiRecord, PurchaseReturn>({
    resource: apiEndpoints.purchasing.purchaseReturns,
    fallbackData: returnData,
    mapRow: (row, idx) => ({
      ...purchaseReturnRow(row, idx),
      id: String(row.id || `PR-${String(idx + 1).padStart(3, '0')}`),
    }),
  });

  const handleDelete = (ret: PurchaseReturn) => {
    confirm({
      title: 'Delete Purchase Return',
      description: 'Are you sure you want to delete this purchase return note? Stock returns and supplier credit notes will be reversed.',
      itemName: `${ret.id} - ${ret.supplier} (${ret.amount})`,
      confirmText: 'Delete Return',
      variant: 'danger',
      onConfirm: async () => {
        if (ret.id) {
          await deleteReturn.mutateAsync(ret.id);
        }
      },
    });
  };

  const columns: ColumnDef<PurchaseReturn>[] = [
    {
      accessorKey: 'id',
      header: 'Return ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    { accessorKey: 'purchaseId', header: 'Purchase ID' },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('supplier')}</span>,
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
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View details"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit return"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete return"
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
        title="Purchase Returns" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Purchases', href: '/purchases' },
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
          value="৳18,458,747" 
          icon={ArrowLeftRight}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Completed Returns" 
          value="850" 
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
              { label: 'Completed', value: 'Completed' },
              { label: 'Pending', value: 'Pending' },
            ]
          }
        ]}
      />
    </div>
  );
}
