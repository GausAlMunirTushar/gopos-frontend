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
import { actionButtonClassName, unitFields } from '@/lib/api/resource-fields';
import { namedRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

interface Unit {
  name: string;
  short: string;
  products: number;
  date: string;
  status: string;
}

const unitData: Unit[] = [
  { name: 'Kilograms', short: 'kg', products: 25, date: '24 Dec 2024', status: 'Active' },
  { name: 'Liters', short: 'l', products: 18, date: '10 Dec 2024', status: 'Active' },
  { name: 'Dozen', short: 'dz', products: 30, date: '27 Nov 2024', status: 'Active' },
  { name: 'Pieces', short: 'pcs', products: 42, date: '18 Nov 2024', status: 'Active' },
  { name: 'Boxes', short: 'bx', products: 60, date: '06 Nov 2024', status: 'Active' },
  { name: 'Tons', short: 't', products: 10, date: '25 Oct 2024', status: 'Active' },
  { name: 'Bundles', short: 'bn', products: 18, date: '14 Oct 2024', status: 'Active' },
  { name: 'Grams', short: 'g', products: 70, date: '03 Oct 2024', status: 'Active' },
  { name: 'Meters', short: 'm', products: 80, date: '20 Sep 2024', status: 'Active' },
  { name: 'Centimeters', short: 'cm', products: 120, date: '10 Sep 2024', status: 'Active' },
];

export default function UnitsPage() {
  const { data: units } = useLiveRows<ApiRecord, Unit>({
    resource: apiEndpoints.inventory.units,
    fallbackData: unitData,
    mapRow: namedRow,
  });

  const columns: ColumnDef<Unit>[] = [
    { accessorKey: 'name', header: 'Unit' },
    { accessorKey: 'short', header: 'Short Name' },
    { accessorKey: 'products', header: 'No of Products' },
    { accessorKey: 'date', header: 'Created Date' },
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><Edit className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Units" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Units' }
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
              resource={apiEndpoints.inventory.units}
              title="Add Unit"
              description="Create a product measurement unit."
              fields={unitFields}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Unit
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={units} 
        searchKey="name"
        searchPlaceholder="Search units..."
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
