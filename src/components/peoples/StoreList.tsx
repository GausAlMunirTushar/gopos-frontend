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
import { actionButtonClassName, locationFields } from '@/lib/api/resource-fields';
import { locationRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Store {
  id?: string;
  store: string;
  user: string;
  email: string;
  phone: string;
  status: string;
}

const storeData: Store[] = [
  { id: '1', store: 'Electro Mart', user: 'johnsmith', email: 'electromart@example.com', phone: '+12498345785', status: 'Active' },
  { id: '2', store: 'Quantum Gadgets', user: 'janedoe', email: 'quantum@example.com', phone: '+13178964582', status: 'Active' },
  { id: '3', store: 'Prime Bazaar', user: 'sarahlee', email: 'primebazaar@example.com', phone: '+12796183487', status: 'Active' },
  { id: '4', store: 'Gadget World', user: 'alexbrown', email: 'gadgetworld@example.com', phone: '+17538647943', status: 'Active' },
  { id: '5', store: 'Volt Vault', user: 'jesswhite', email: 'voltvault@example.com', phone: '+13798132475', status: 'Active' },
  { id: '6', store: 'Elite Retail', user: 'emilydavis', email: 'eliteretail@example.com', phone: '+17596341894', status: 'Active' },
  { id: '7', store: 'Prime Mart', user: 'tomharris', email: 'primemart@example.com', phone: '+12973548678', status: 'Active' },
  { id: '8', store: 'NeoTech Store', user: 'sarahjohnson', email: 'neotech@example.com', phone: '+13147858357', status: 'Active' },
  { id: '9', store: 'Urban Mart', user: 'laurawilson', email: 'urbanmart@example.com', phone: '+11978348626', status: 'Active' },
  { id: '10', store: 'Travel Mart', user: 'robertwhite', email: 'travelmart@example.com', phone: '+12678934561', status: 'Active' },
];

export default function StoreList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteStore = useDeleteApiResource(apiEndpoints.people.stores);

  const { data: stores } = useLiveRows<ApiRecord, Store>({
    resource: apiEndpoints.people.stores,
    fallbackData: storeData,
    mapRow: (row, idx) => ({
      ...locationRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (store: Store) => {
    confirm({
      title: 'Delete Store',
      description: 'Are you sure you want to delete this store? POS terminal assignments and store-specific registers will be closed.',
      itemName: store.store,
      confirmText: 'Delete Store',
      variant: 'danger',
      onConfirm: async () => {
        if (store.id) {
          await deleteStore.mutateAsync(store.id);
        }
      },
    });
  };

  const columns: ColumnDef<Store>[] = [
    { accessorKey: 'store', header: 'Store' },
    { accessorKey: 'user', header: 'User Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit store"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete store"
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
        title="Stores" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Stores' }
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
              resource={apiEndpoints.people.stores}
              title="Add Store"
              description="Create a tenant-scoped store location."
              fields={locationFields('STORE')}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Store
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={stores} 
        searchKey="store"
        searchPlaceholder="Search stores..."
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
