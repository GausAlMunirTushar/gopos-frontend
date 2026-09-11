'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ResourceCreateModal } from '@/components/shared/ResourceCreateModal';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { actionButtonClassName, warrantyFields } from '@/lib/api/resource-fields';
import { warrantyRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Warranty {
  id?: string;
  name: string;
  desc: string;
  duration: string;
  status: string;
}

const warrantyData: Warranty[] = [
  { id: '1', name: 'Replacement Warranty', desc: 'Covers replacement of faulty items', duration: '2 Year', status: 'Active' },
  { id: '2', name: 'On-Site Warranty', desc: 'Product repairs done at the customer\'s location', duration: '1 Year', status: 'Active' },
  { id: '3', name: 'Accidental Protection Plan', desc: 'Coverage for accidental damage', duration: '6 Months', status: 'Active' },
  { id: '4', name: 'Labor-Only Warranty', desc: 'Covers only labor costs, not parts', duration: '6 Months', status: 'Active' },
  { id: '5', name: 'No-Cost Repairs', desc: 'No charge for repairs during warranty period', duration: '3 Months', status: 'Active' },
  { id: '6', name: 'Accidental Damage', desc: 'Coverage for unexpected damage', duration: '6 Months', status: 'Active' },
  { id: '7', name: 'Wear & Tear Warranty', desc: 'Covers specific product aging issues', duration: '1 Year', status: 'Active' },
  { id: '8', name: 'Money-Back Guarantee', desc: 'Refund within a specified period', duration: '3 Months', status: 'Active' },
  { id: '9', name: 'Water Damage Warranty', desc: 'Coverage for water-related issues', duration: '6 Months', status: 'Active' },
  { id: '10', name: 'Power Surge Protection', desc: 'Covers damage from power surges', duration: '6 Months', status: 'Active' },
];

export default function WarrantiesPage() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteWarranty = useDeleteApiResource(apiEndpoints.inventory.warranties);

  const { data: warranties } = useLiveRows<ApiRecord, Warranty>({
    resource: apiEndpoints.inventory.warranties,
    fallbackData: warrantyData,
    mapRow: (row, idx) => ({
      ...warrantyRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (warranty: Warranty) => {
    confirm({
      title: 'Delete Warranty Policy',
      description: 'Are you sure you want to delete this warranty policy? Existing warranty certificates will be preserved.',
      itemName: `${warranty.name} (${warranty.duration})`,
      confirmText: 'Delete Warranty',
      variant: 'danger',
      onConfirm: async () => {
        if (warranty.id) {
          await deleteWarranty.mutateAsync(warranty.id);
        }
      },
    });
  };

  const columns: ColumnDef<Warranty>[] = [
    { accessorKey: 'name', header: 'Warranty' },
    { accessorKey: 'desc', header: 'Description' },
    { accessorKey: 'duration', header: 'Duration' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 flex items-center w-fit gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> {row.getValue('status')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit warranty"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete warranty"
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
        title="Warranties" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Warranties' }
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
            <ResourceCreateModal
              resource={apiEndpoints.inventory.warranties}
              title="Add Warranty"
              description="Create a product warranty policy."
              fields={warrantyFields}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Warranty
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={warranties} 
        searchKey="name"
        searchPlaceholder="Search warranties..."
        enableSelection
        filters={[
          {
            column: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ]
          }
        ]}
      />
    </div>
  );
}
