'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Variant {
  name: string;
  values: string;
  date: string;
  status: string;
}

const variantData: Variant[] = [
  { name: 'Size', values: 'XS, S, M, L, XL', date: '24 Dec 2024', status: 'Active' },
  { name: 'Color', values: 'Red, Blue , Green', date: '10 Dec 2024', status: 'Active' },
  { name: 'Capacity', values: 'Small, Medium, Large', date: '27 Nov 2024', status: 'Active' },
  { name: 'Material', values: 'Cotton, Leather, Synthetic', date: '18 Nov 2024', status: 'Active' },
  { name: 'Weight', values: 'Light, Heavy', date: '06 Nov 2024', status: 'Active' },
  { name: 'Style', values: 'Casual, Formal, Sporty', date: '25 Oct 2024', status: 'Active' },
  { name: 'Pattern', values: 'Solid, Striped, Printed', date: '14 Oct 2024', status: 'Active' },
  { name: 'Memory', values: '8 GB, 16 GB, 36 GB', date: '03 Oct 2024', status: 'Active' },
  { name: 'Storage', values: '128 GB, 256 GB, 512 GB, 1TB', date: '20 Sep 2024', status: 'Active' },
  { name: 'Length', values: 'Short, Regular, Long', date: '10 Sep 2024', status: 'Active' },
];

export default function VariantAttributesPage() {
  const columns: ColumnDef<Variant>[] = [
    { accessorKey: 'name', header: 'Variant' },
    { accessorKey: 'values', header: 'Values' },
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
        title="Variant Attributes" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Variant Attributes' }
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
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Variant
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={variantData} 
        searchKey="name"
        searchPlaceholder="Search variants..."
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
