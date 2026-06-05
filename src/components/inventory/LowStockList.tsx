'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Mail
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface LowStock {
  warehouse: string;
  store: string;
  img: string;
  name: string;
  category: string;
  sku: string;
  qty: number;
  qtyAlert: number;
}

const lowStockData: LowStock[] = [
  { warehouse: 'Lavish Warehouse', store: 'Electro Mart', img: 'laptop', name: 'Lenovo IdeaPad 3', category: 'Computers', sku: 'PT001', qty: 20, qtyAlert: 15 },
  { warehouse: 'Quaint Warehouse', store: 'Quantum Gadgets', img: 'headphones', name: 'Beats Pro', category: 'Electronics', sku: 'PT002', qty: 25, qtyAlert: 20 },
  { warehouse: 'Traditional Warehouse', store: 'Prime Bazaar', img: 'shoe', name: 'Nike Jordan', category: 'Shoe', sku: 'PT003', qty: 40, qtyAlert: 35 },
  { warehouse: 'Cool Warehouse', store: 'Gadget World', img: 'watch', name: 'Apple Series 5 Watch', category: 'Electronics', sku: 'PT004', qty: 50, qtyAlert: 45 },
  { warehouse: 'Overflow Warehouse', store: 'Volt Vault', img: 'speaker', name: 'Amazon Echo Dot', category: 'Electronics', sku: 'PT005', qty: 30, qtyAlert: 25 },
  { warehouse: 'Nova Storage Hub', store: 'Elite Retail', img: 'sofa', name: 'Sanford Chair Sofa', category: 'Furniture', sku: 'PT006', qty: 10, qtyAlert: 8 },
  { warehouse: 'Retail Supply Hub', store: 'Prime Mart', img: 'bag', name: 'Red Premium Satchel', category: 'Bags', sku: 'PT007', qty: 70, qtyAlert: 60 },
  { warehouse: 'EdgeWare Solutions', store: 'NeoTech Store', img: 'phone', name: 'Iphone 14 Pro', category: 'Phone', sku: 'PT008', qty: 35, qtyAlert: 30 },
  { warehouse: 'North Zone Warehouse', store: 'Urban Mart', img: 'chair', name: 'Gaming Chair', category: 'Furniture', sku: 'PT009', qty: 15, qtyAlert: 10 },
  { warehouse: 'Fulfillment Hub', store: 'Travel Mart', img: 'backpack', name: 'Borealis Backpack', category: 'Bags', sku: 'PT010', qty: 45, qtyAlert: 40 },
];

export default function LowStocksPage() {
  const columns: ColumnDef<LowStock>[] = [
    { accessorKey: 'warehouse', header: 'Warehouse' },
    { accessorKey: 'store', header: 'Store' },
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
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'qty', header: 'Qty' },
    { accessorKey: 'qtyAlert', header: 'Qty Alert' },
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
        title="Low Stocks" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Low Stocks' }
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
            <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2C42] hover:bg-[#111e2f] text-white rounded-lg font-medium transition-colors">
              <Mail className="w-4 h-4" /> Send Email
            </button>
          </div>
        }
      />

      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 p-4 gap-4">
            <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-orange-100 text-orange-500 font-medium text-sm">Low Stocks</button>
                <button className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">Out of Stocks</button>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Notify</span>
                <button className="w-11 h-6 bg-green-500 rounded-full relative">
                    <span className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></span>
                </button>
            </div>
        </div>
        
        <div className="p-4">
          <DataTable 
            columns={columns} 
            data={lowStockData} 
            searchKey="name"
            searchPlaceholder="Search products..."
            enableSelection
            filters={[
              {
                column: 'warehouse',
                label: 'Warehouse',
                options: [
                  { label: 'Lavish Warehouse', value: 'Lavish Warehouse' },
                  { label: 'Quaint Warehouse', value: 'Quaint Warehouse' },
                ]
              },
              {
                column: 'store',
                label: 'Store',
                options: [
                  { label: 'Electro Mart', value: 'Electro Mart' },
                  { label: 'Gadget World', value: 'Gadget World' },
                ]
              },
              {
                column: 'category',
                label: 'Category',
                options: [
                  { label: 'Computers', value: 'Computers' },
                  { label: 'Electronics', value: 'Electronics' },
                ]
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
