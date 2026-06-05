'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Category {
  name: string;
  slug: string;
  date: string;
  status: string;
}

const categoryData: Category[] = [
  { name: 'Computers', slug: 'computers', date: '24 Dec 2024', status: 'Active' },
  { name: 'Electronics', slug: 'electronics', date: '10 Dec 2024', status: 'Active' },
  { name: 'Shoe', slug: 'shoe', date: '27 Nov 2024', status: 'Active' },
  { name: 'Cosmetics', slug: 'cosmetics', date: '18 Nov 2024', status: 'Active' },
  { name: 'Groceries', slug: 'groceries', date: '06 Nov 2024', status: 'Active' },
  { name: 'Furniture', slug: 'furniture', date: '25 Oct 2024', status: 'Active' },
  { name: 'Bags', slug: 'bags', date: '14 Oct 2024', status: 'Active' },
  { name: 'Phone', slug: 'phone', date: '03 Oct 2024', status: 'Active' },
  { name: 'Appliances', slug: 'appliances', date: '20 Sep 2024', status: 'Active' },
  { name: 'Clothing', slug: 'clothing', date: '10 Sep 2024', status: 'Active' },
];

export default function CategoryPage() {
  const columns: ColumnDef<Category>[] = [
    {
      accessorKey: 'name',
      header: 'Category',
    },
    {
      accessorKey: 'slug',
      header: 'Category Slug',
    },
    {
      accessorKey: 'date',
      header: 'Created On',
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
        title="Category" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Category' }
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
              <Plus className="w-4 h-4" /> Add Category
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={categoryData} 
        searchKey="name"
        searchPlaceholder="Search category..."
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
