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
import { actionButtonClassName, brandFields } from '@/lib/api/resource-fields';
import { namedRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Brand {
  id?: string;
  name: string;
  img: string;
  date: string;
  status: string;
}

const brandData: Brand[] = [
  { id: '1', name: 'Lenovo', img: 'logo', date: '24 Dec 2024', status: 'Active' },
  { id: '2', name: 'Beats', img: 'logo', date: '10 Dec 2024', status: 'Active' },
  { id: '3', name: 'Nike', img: 'logo', date: '27 Nov 2024', status: 'Active' },
  { id: '4', name: 'Apple', img: 'logo', date: '18 Nov 2024', status: 'Active' },
  { id: '5', name: 'Amazon', img: 'logo', date: '06 Nov 2024', status: 'Active' },
  { id: '6', name: 'Woodmart', img: 'logo', date: '25 Oct 2024', status: 'Active' },
  { id: '7', name: 'Dior', img: 'logo', date: '14 Oct 2024', status: 'Active' },
  { id: '8', name: 'Lava', img: 'logo', date: '03 Oct 2024', status: 'Active' },
  { id: '9', name: 'Nilkamal', img: 'logo', date: '20 Sep 2024', status: 'Active' },
  { id: '10', name: 'The North Face', img: 'logo', date: '10 Sep 2024', status: 'Active' },
];

export default function BrandsPage() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteBrand = useDeleteApiResource(apiEndpoints.inventory.brands);

  const { data: brands } = useLiveRows<ApiRecord, Brand>({
    resource: apiEndpoints.inventory.brands,
    fallbackData: brandData,
    mapRow: (row, idx) => ({
      ...namedRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (brand: Brand) => {
    confirm({
      title: 'Delete Brand',
      description: 'Are you sure you want to delete this brand? Products linked to this brand will remain but their brand association will be cleared.',
      itemName: brand.name,
      confirmText: 'Delete Brand',
      variant: 'danger',
      onConfirm: async () => {
        if (brand.id) {
          await deleteBrand.mutateAsync(brand.id);
        }
      },
    });
  };

  const columns: ColumnDef<Brand>[] = [
    {
      accessorKey: 'name',
      header: 'Brand',
    },
    {
      accessorKey: 'img',
      header: 'Image',
      cell: ({ row }) => (
        <img src={`https://source.unsplash.com/100x100/?${row.original.name.toLowerCase()}&sig=${row.index}`} alt={row.original.name} className="w-8 h-8 rounded-md object-contain bg-white border border-gray-100 p-1" />
      ),
    },
    {
      accessorKey: 'date',
      header: 'Created Date',
    },
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit brand"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete brand"
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
        title="Brands" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Brands' }
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
              resource={apiEndpoints.inventory.brands}
              title="Add Brand"
              description="Create a product brand."
              fields={brandFields}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Brand
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={brands} 
        searchKey="name"
        searchPlaceholder="Search brands..."
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
