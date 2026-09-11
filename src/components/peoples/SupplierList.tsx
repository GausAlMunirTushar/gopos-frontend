'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus, Eye
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ResourceCreateModal } from '@/components/shared/ResourceCreateModal';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { actionButtonClassName, contactFields } from '@/lib/api/resource-fields';
import { contactRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Supplier {
  id?: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  img: string;
}

const supplierData: Supplier[] = [
  { id: '1', code: 'SU001', name: 'Apex Computers', email: 'apexcomputers@example.com', phone: '+15964712634', country: 'Germany', status: 'Active', img: 'computer' },
  { id: '2', code: 'SU002', name: 'Beats Headphones', email: 'beatsheadphone@example.com', phone: '+16372895190', country: 'Japan', status: 'Active', img: 'headphones' },
  { id: '3', code: 'SU003', name: 'Dazzle Shoes', email: 'dazzleshoes@example.com', phone: '+17589201739', country: 'USA', status: 'Active', img: 'shoes' },
  { id: '4', code: 'SU004', name: 'Best Accessories', email: 'bestaccessories@example.com', phone: '+18934092467', country: 'Austria', status: 'Active', img: 'accessories' },
  { id: '5', code: 'SU005', name: 'A-Z Store', email: 'a2zstore@example.com', phone: '+12568749035', country: 'Turkey', status: 'Active', img: 'store' },
  { id: '6', code: 'SU006', name: 'Hatimi Hardwares', email: 'hatimihardware@example.com', phone: '+19054674627', country: 'Mexico', status: 'Active', img: 'hardware' },
  { id: '7', code: 'SU007', name: 'Aesthetic Bags', email: 'aestheticbags@example.com', phone: '+18943670365', country: 'France', status: 'Active', img: 'bag' },
  { id: '8', code: 'SU008', name: 'Alpha Mobiles', email: 'alphamobiles@example.com', phone: '+16473894103', country: 'Greece', status: 'Active', img: 'mobile' },
  { id: '9', code: 'SU009', name: 'Sigma Chairs', email: 'sigmachair@example.com', phone: '+17590274536', country: 'Italy', status: 'Active', img: 'chair' },
  { id: '10', code: 'SU010', name: 'Zenith Bags', email: 'zenithbags@example.com', phone: '+12564098473', country: 'China', status: 'Active', img: 'backpack' },
];

export default function SupplierList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteSupplier = useDeleteApiResource(apiEndpoints.people.suppliers);

  const { data: suppliers } = useLiveRows<ApiRecord, Supplier>({
    resource: apiEndpoints.people.suppliers,
    fallbackData: supplierData,
    mapRow: (row, idx) => ({
      ...contactRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (supplier: Supplier) => {
    confirm({
      title: 'Delete Supplier',
      description: 'Are you sure you want to delete this supplier? Their contact information, outstanding balances, and purchase orders history will be archived.',
      itemName: `${supplier.name} (${supplier.code})`,
      confirmLabel: 'Delete Supplier',
      variant: 'danger',
      onConfirm: async () => {
        if (supplier.id) {
          await deleteSupplier.mutateAsync(supplier.id);
        }
      },
    });
  };

  const columns: ColumnDef<Supplier>[] = [
    { accessorKey: 'code', header: 'Code' },
    {
      accessorKey: 'name',
      header: 'Supplier',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://source.unsplash.com/100x100/?${row.original.img}&sig=${row.index}`} alt={row.original.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'country', header: 'Country' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors" title="View details"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit supplier"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete supplier"
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
        title="Suppliers" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Suppliers' }
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
              resource={apiEndpoints.people.suppliers}
              title="Add Supplier"
              description="Create a tenant-scoped supplier record."
              fields={contactFields('SUPPLIER')}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Supplier
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={suppliers} 
        searchKey="name"
        searchPlaceholder="Search suppliers..."
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
