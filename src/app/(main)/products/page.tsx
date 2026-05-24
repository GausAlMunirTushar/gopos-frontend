'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Dummy data
export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
};

const data: Product[] = [
  { id: '1', name: 'Espresso Machine', sku: 'EQ-001', category: 'Equipment', price: 1200.00, stock: 5, status: 'In Stock' },
  { id: '2', name: 'Coffee Beans - Premium', sku: 'CB-002', category: 'Ingredients', price: 24.50, stock: 120, status: 'In Stock' },
  { id: '3', name: 'Paper Cups 12oz', sku: 'PK-003', category: 'Packaging', price: 0.15, stock: 4500, status: 'In Stock' },
  { id: '4', name: 'Milk - Whole', sku: 'ING-004', category: 'Ingredients', price: 3.50, stock: 12, status: 'Low Stock' },
  { id: '5', name: 'Caramel Syrup', sku: 'ING-005', category: 'Ingredients', price: 12.00, stock: 0, status: 'Out of Stock' },
  { id: '6', name: 'Pastry Display Case', sku: 'EQ-006', category: 'Equipment', price: 850.00, stock: 2, status: 'In Stock' },
  { id: '7', name: 'Green Tea Bags', sku: 'ING-007', category: 'Ingredients', price: 15.00, stock: 40, status: 'In Stock' },
];

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: 'name',
    header: 'Product Name',
    cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <div className="text-gray-500">{row.getValue('sku')}</div>,
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('price'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'stock',
    header: () => <div className="text-right">Stock</div>,
    cell: ({ row }) => <div className="text-right">{row.getValue('stock')}</div>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string;
      return (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          status === 'In Stock' ? 'bg-green-100 text-green-800' :
          status === 'Low Stock' ? 'bg-orange-100 text-orange-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" /> Edit Product
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50">
              <Trash2 className="mr-2 h-4 w-4" /> Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products List</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your products and inventory catalog.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">Import / Export</Button>
          <Button className="bg-[#FF9F43] hover:bg-orange-500 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
