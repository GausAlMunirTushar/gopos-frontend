'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Brand {
  name: string;
  img: string;
  date: string;
  status: string;
}

const brandData: Brand[] = [
  { name: 'Lenovo', img: 'logo', date: '24 Dec 2024', status: 'Active' },
  { name: 'Beats', img: 'logo', date: '10 Dec 2024', status: 'Active' },
  { name: 'Nike', img: 'logo', date: '27 Nov 2024', status: 'Active' },
  { name: 'Apple', img: 'logo', date: '18 Nov 2024', status: 'Active' },
  { name: 'Amazon', img: 'logo', date: '06 Nov 2024', status: 'Active' },
  { name: 'Woodmart', img: 'logo', date: '25 Oct 2024', status: 'Active' },
  { name: 'Dior', img: 'logo', date: '14 Oct 2024', status: 'Active' },
  { name: 'Lava', img: 'logo', date: '03 Oct 2024', status: 'Active' },
  { name: 'Nilkamal', img: 'logo', date: '20 Sep 2024', status: 'Active' },
  { name: 'The North Face', img: 'logo', date: '10 Sep 2024', status: 'Active' },
];

export default function BrandsPage() {
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><Edit className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
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
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors">
              <Plus className="w-4 h-4" /> Add Brand
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={brandData} 
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
