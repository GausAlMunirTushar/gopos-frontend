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

interface Warehouse {
  id?: string;
  warehouse: string;
  person: string;
  phone: string;
  products: number;
  stock: number;
  qty: number;
  created: string;
  status: string;
}

const warehouseData: Warehouse[] = [
  { id: '1', warehouse: 'Lavish Warehouse', person: 'Chad Taylor', phone: '+12498345785', products: 10, stock: 600, qty: 80, created: '24 Dec 2024', status: 'Active' },
  { id: '2', warehouse: 'Quaint Warehouse', person: 'Jenny Ellis', phone: '+13178964582', products: 15, stock: 300, qty: 85, created: '10 Dec 2024', status: 'Active' },
  { id: '3', warehouse: 'Traditional Warehouse', person: 'Leon Baxter', phone: '+12796183487', products: 12, stock: 400, qty: 70, created: '27 Nov 2024', status: 'Active' },
  { id: '4', warehouse: 'Cool Warehouse', person: 'Karen Flores', phone: '+17538647943', products: 20, stock: 320, qty: 65, created: '18 Nov 2024', status: 'Active' },
  { id: '5', warehouse: 'Overflow Warehouse', person: 'Michael Dawson', phone: '+13798132475', products: 8, stock: 170, qty: 80, created: '06 Nov 2024', status: 'Active' },
  { id: '6', warehouse: 'Nova Storage Hub', person: 'Karen Galvan', phone: '+17596341894', products: 13, stock: 220, qty: 75, created: '25 Oct 2024', status: 'Active' },
  { id: '7', warehouse: 'Retail Supply Hub', person: 'Thomas Ward', phone: '+12973548678', products: 17, stock: 310, qty: 60, created: '14 Oct 2024', status: 'Active' },
  { id: '8', warehouse: 'EdgeWare Solutions', person: 'Aliza Duncan', phone: '+13147858357', products: 22, stock: 450, qty: 50, created: '03 Oct 2024', status: 'Active' },
  { id: '9', warehouse: 'North Zone Warehouse', person: 'James Higham', phone: '+11978348626', products: 24, stock: 270, qty: 70, created: '20 Sep 2024', status: 'Active' },
  { id: '10', warehouse: 'Fulfillment Hub', person: 'Jada Robinson', phone: '+12678934561', products: 14, stock: 300, qty: 45, created: '10 Sep 2024', status: 'Active' },
];

export default function WarehouseList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteWarehouse = useDeleteApiResource(apiEndpoints.people.warehouses);

  const { data: warehouses } = useLiveRows<ApiRecord, Warehouse>({
    resource: apiEndpoints.people.warehouses,
    fallbackData: warehouseData,
    mapRow: (row, idx) => ({
      ...locationRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (warehouse: Warehouse) => {
    confirm({
      title: 'Delete Warehouse',
      description: 'Are you sure you want to delete this warehouse? All assigned inventory stock and storage bin configurations will be unlinked.',
      itemName: warehouse.warehouse,
      confirmLabel: 'Delete Warehouse',
      variant: 'danger',
      onConfirm: async () => {
        if (warehouse.id) {
          await deleteWarehouse.mutateAsync(warehouse.id);
        }
      },
    });
  };

  const columns: ColumnDef<Warehouse>[] = [
    { accessorKey: 'warehouse', header: 'Warehouse' },
    {
      accessorKey: 'person',
      header: 'Contact Person',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/100?img=${row.index + 30}`} alt={row.original.person} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-medium text-gray-900">{row.original.person}</span>
        </div>
      ),
    },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'products', header: 'Total Products' },
    { accessorKey: 'stock', header: 'Stock' },
    { accessorKey: 'qty', header: 'Qty' },
    { accessorKey: 'created', header: 'Created On' },
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit warehouse"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete warehouse"
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
        title="Warehouses" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Warehouses' }
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
              resource={apiEndpoints.people.warehouses}
              title="Add Warehouse"
              description="Create a tenant-scoped warehouse location."
              fields={locationFields('WAREHOUSE')}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Warehouse
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={warehouses} 
        searchKey="warehouse"
        searchPlaceholder="Search warehouses..."
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
