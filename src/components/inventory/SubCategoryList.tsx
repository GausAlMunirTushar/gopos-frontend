'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { subCategoryRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface SubCategory {
  id?: string;
  img: string;
  name: string;
  cat: string;
  code: string;
  desc: string;
  status: string;
}

const subCategoryData: SubCategory[] = [
  { id: '1', img: 'laptop', name: 'Laptop', cat: 'Computers', code: 'CT001', desc: 'Efficient Productivity', status: 'Active' },
  { id: '2', img: 'desktop', name: 'Desktop', cat: 'Computers', code: 'CT002', desc: 'Compact Design', status: 'Active' },
  { id: '3', img: 'shoe', name: 'Sneakers', cat: 'Shoe', code: 'CT003', desc: 'Dynamic Grip', status: 'Active' },
  { id: '4', img: 'formals', name: 'Formals', cat: 'Shoe', code: 'CT004', desc: 'Stylish Comfort', status: 'Active' },
  { id: '5', img: 'headphones', name: 'Wearables', cat: 'Electronics', code: 'CT005', desc: 'Seamless Connectivity', status: 'Active' },
  { id: '6', img: 'speaker', name: 'Speakers', cat: 'Electronics', code: 'CT006', desc: 'Reliable Sound', status: 'Active' },
  { id: '7', img: 'bag', name: 'Handbags', cat: 'Bags', code: 'CT007', desc: 'Compact Carry', status: 'Active' },
  { id: '8', img: 'travel', name: 'Travel', cat: 'Bags', code: 'CT008', desc: 'Travel Ready', status: 'Active' },
  { id: '9', img: 'sofa', name: 'Sofa', cat: 'Furniture', code: 'CT009', desc: 'Cozy Comfort', status: 'Active' },
  { id: '10', img: 'chair', name: 'Chair', cat: 'Furniture', code: 'CT010', desc: 'Stylish Comfort', status: 'Active' },
];

export default function SubCategoryPage() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteSubCategory = useDeleteApiResource(apiEndpoints.inventory.subCategories);

  const { data: subCategories } = useLiveRows<ApiRecord, SubCategory>({
    resource: apiEndpoints.inventory.subCategories,
    fallbackData: subCategoryData,
    mapRow: (row, idx) => ({
      ...subCategoryRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (sub: SubCategory) => {
    confirm({
      title: 'Delete Sub Category',
      description: 'Are you sure you want to delete this sub category? Items under this sub category will be detached.',
      itemName: `${sub.name} (${sub.code})`,
      confirmText: 'Delete Sub Category',
      variant: 'danger',
      onConfirm: async () => {
        if (sub.id) {
          await deleteSubCategory.mutateAsync(sub.id);
        }
      },
    });
  };

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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit sub category"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete sub category"
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
        data={subCategories} 
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
