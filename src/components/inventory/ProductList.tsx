'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Plus, Download, FileText, RefreshCcw, Eye, Edit, Trash2, FileSpreadsheet
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { productRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

interface Product {
  sku: string;
  name: string;
  cat: string;
  brand: string;
  price: string;
  unit: string;
  qty: number;
  creator: string;
  avatar: string;
}

const productsData: Product[] = [
  { sku: 'PT001', name: 'Lenovo IdeaPad 3', cat: 'Computers', brand: 'Lenovo', price: '$600', unit: 'Pc', qty: 100, creator: 'James Kirwin', avatar: 'https://i.pravatar.cc/150?u=James' },
  { sku: 'PT002', name: 'Beats Pro', cat: 'Electronics', brand: 'Beats', price: '$160', unit: 'Pc', qty: 140, creator: 'Francis Chang', avatar: 'https://i.pravatar.cc/150?u=Francis' },
  { sku: 'PT003', name: 'Nike Jordan', cat: 'Shoe', brand: 'Nike', price: '$110', unit: 'Pc', qty: 300, creator: 'Antonio Engle', avatar: 'https://i.pravatar.cc/150?u=Antonio' },
  { sku: 'PT004', name: 'Apple Series 5 Watch', cat: 'Electronics', brand: 'Apple', price: '$120', unit: 'Pc', qty: 450, creator: 'Leo Kelly', avatar: 'https://i.pravatar.cc/150?u=Leo' },
  { sku: 'PT005', name: 'Amazon Echo Dot', cat: 'Electronics', brand: 'Amazon', price: '$80', unit: 'Pc', qty: 320, creator: 'Annette Walker', avatar: 'https://i.pravatar.cc/150?u=Annette' },
  { sku: 'PT006', name: 'Sanford Chair Sofa', cat: 'Furniture', brand: 'Modern Wave', price: '$320', unit: 'Pc', qty: 650, creator: 'John Weaver', avatar: 'https://i.pravatar.cc/150?u=John' },
  { sku: 'PT007', name: 'Red Premium Satchel', cat: 'Bags', brand: 'Dior', price: '$60', unit: 'Pc', qty: 700, creator: 'Gary Hennessy', avatar: 'https://i.pravatar.cc/150?u=Gary' },
  { sku: 'PT008', name: 'Iphone 14 Pro', cat: 'Phone', brand: 'Apple', price: '$540', unit: 'Pc', qty: 630, creator: 'Eleanor Panek', avatar: 'https://i.pravatar.cc/150?u=Eleanor' },
  { sku: 'PT009', name: 'Gaming Chair', cat: 'Furniture', brand: 'Arlime', price: '$200', unit: 'Pc', qty: 410, creator: 'William Levy', avatar: 'https://i.pravatar.cc/150?u=William' },
  { sku: 'PT010', name: 'Borealis Backpack', cat: 'Bags', brand: 'The North Face', price: '$45', unit: 'Pc', qty: 550, creator: 'Charlotte Klotz', avatar: 'https://i.pravatar.cc/150?u=Charlotte' },
];

export default function ProductsPage() {
  const { data: products } = useLiveRows<ApiRecord, Product>({
    resource: apiEndpoints.inventory.products,
    fallbackData: productsData,
    mapRow: productRow,
  });

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'sku',
      header: 'SKU',
    },
    {
      accessorKey: 'name',
      header: 'Product Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://source.unsplash.com/100x100/?${row.original.cat.toLowerCase()},product&sig=${row.index}`} alt={row.original.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'cat',
      header: 'Category',
    },
    {
      accessorKey: 'brand',
      header: 'Brand',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('price')}</span>,
    },
    {
      accessorKey: 'unit',
      header: 'Unit',
    },
    {
      accessorKey: 'qty',
      header: 'Qty',
    },
    {
      accessorKey: 'creator',
      header: 'Created By',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img src={row.original.avatar} alt={row.original.creator} className="w-6 h-6 rounded-full" />
          <span className="font-medium text-gray-900">{row.original.creator}</span>
        </div>
      ),
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><Edit className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Products" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Products' }
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
            
            <NextLink href="/inventory/products/create">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors">
                <Plus className="w-4 h-4" /> Add Product
              </button>
            </NextLink>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg font-medium transition-colors">
              <Download className="w-4 h-4" /> Import Product
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={products} 
        searchKey="name"
        searchPlaceholder="Search products..."
        enableSelection
        filters={[
          {
            column: 'cat',
            label: 'Category',
            options: [
              { label: 'Computers', value: 'Computers' },
              { label: 'Electronics', value: 'Electronics' },
              { label: 'Shoe', value: 'Shoe' },
            ]
          },
          {
            column: 'brand',
            label: 'Brand',
            options: [
              { label: 'Lenovo', value: 'Lenovo' },
              { label: 'Apple', value: 'Apple' },
              { label: 'Nike', value: 'Nike' },
            ]
          }
        ]}
      />
    </div>
  );
}
