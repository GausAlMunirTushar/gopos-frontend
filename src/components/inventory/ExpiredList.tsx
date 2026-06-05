'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface ExpiredProduct {
  sku: string;
  img: string;
  name: string;
  mfg: string;
  exp: string;
}

const expiredData: ExpiredProduct[] = [
  { sku: 'PT001', img: 'laptop', name: 'Lenovo IdeaPad 3', mfg: '24 Dec 2024', exp: '20 Dec 2026' },
  { sku: 'PT002', img: 'headphones', name: 'Beats Pro', mfg: '10 Dec 2024', exp: '07 Dec 2026' },
  { sku: 'PT003', img: 'shoe', name: 'Nike Jordan', mfg: '27 Nov 2024', exp: '20 Nov 2026' },
  { sku: 'PT004', img: 'watch', name: 'Apple Series 5 Watch', mfg: '18 Nov 2024', exp: '15 Nov 2026' },
  { sku: 'PT005', img: 'speaker', name: 'Amazon Echo Dot', mfg: '06 Nov 2024', exp: '04 Nov 2026' },
  { sku: 'PT006', img: 'sofa', name: 'Sanford Chair Sofa', mfg: '25 Oct 2024', exp: '20 Oct 2026' },
  { sku: 'PT007', img: 'bag', name: 'Red Premium Satchel', mfg: '14 Oct 2024', exp: '10 Oct 2026' },
  { sku: 'PT008', img: 'phone', name: 'Iphone 14 Pro', mfg: '03 Oct 2024', exp: '01 Oct 2026' },
  { sku: 'PT009', img: 'chair', name: 'Gaming Chair', mfg: '20 Sep 2024', exp: '16 Sep 2026' },
  { sku: 'PT010', img: 'backpack', name: 'Borealis Backpack', mfg: '10 Sep 2024', exp: '06 Sep 2026' },
];

export default function ExpiredProductsPage() {
  const columns: ColumnDef<ExpiredProduct>[] = [
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://source.unsplash.com/100x100/?${row.original.img}&sig=${row.index}`} alt={row.original.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'mfg',
      header: 'Manufactured Date',
    },
    {
      accessorKey: 'exp',
      header: 'Expired Date',
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
        title="Expired Products" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Expired Products' }
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
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={expiredData} 
        searchKey="name"
        searchPlaceholder="Search product..."
        enableSelection
      />
    </div>
  );
}
