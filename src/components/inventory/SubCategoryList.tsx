'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface SubCategory {
  img: string;
  name: string;
  cat: string;
  code: string;
  desc: string;
  status: string;
}

const subCategoryData: SubCategory[] = [
  { img: 'laptop', name: 'Laptop', cat: 'Computers', code: 'CT001', desc: 'Efficient Productivity', status: 'Active' },
  { img: 'desktop', name: 'Desktop', cat: 'Computers', code: 'CT002', desc: 'Compact Design', status: 'Active' },
  { img: 'shoe', name: 'Sneakers', cat: 'Shoe', code: 'CT003', desc: 'Dynamic Grip', status: 'Active' },
  { img: 'formals', name: 'Formals', cat: 'Shoe', code: 'CT004', desc: 'Stylish Comfort', status: 'Active' },
  { img: 'headphones', name: 'Wearables', cat: 'Electronics', code: 'CT005', desc: 'Seamless Connectivity', status: 'Active' },
  { img: 'speaker', name: 'Speakers', cat: 'Electronics', code: 'CT006', desc: 'Reliable Sound', status: 'Active' },
  { img: 'bag', name: 'Handbags', cat: 'Bags', code: 'CT007', desc: 'Compact Carry', status: 'Active' },
  { img: 'travel', name: 'Travel', cat: 'Bags', code: 'CT008', desc: 'Travel Ready', status: 'Active' },
  { img: 'sofa', name: 'Sofa', cat: 'Furniture', code: 'CT009', desc: 'Cozy Comfort', status: 'Active' },
  { img: 'chair', name: 'Chair', cat: 'Furniture', code: 'CT010', desc: 'Stylish Comfort', status: 'Active' },
];

export default function SubCategoryPage() {
  const columns: ColumnDef<SubCategory>[] = [
    {
      accessorKey: 'img',
      header: 'Image',
      cell: ({ row }) => (
        <img src={`https://source.unsplash.com/100x100/?${row.original.img}&sig=${row.index}`} alt={row.original.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
      ),
    },
    { accessorKey: 'name', header: 'Sub Category' },
    { accessorKey: 'cat', header: 'Category' },
    { accessorKey: 'code', header: 'Category Code' },
    { accessorKey: 'desc', header: 'Description' },
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
        title="Sub Category" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sub Category' }
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
              <Plus className="w-4 h-4" /> Add Sub Category
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={subCategoryData} 
        searchKey="name"
        searchPlaceholder="Search sub category..."
        enableSelection
        filters={[
          {
            column: 'cat',
            label: 'Category',
            options: [
              { label: 'Computers', value: 'Computers' },
              { label: 'Shoe', value: 'Shoe' },
              { label: 'Electronics', value: 'Electronics' },
            ]
          },
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
