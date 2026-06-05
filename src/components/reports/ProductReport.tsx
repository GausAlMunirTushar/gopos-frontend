'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, ChevronUp, ChevronRight,
  FileSpreadsheet, Calendar
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface ProductReportData {
  sku: string;
  name: string;
  category: string;
  price: string;
  qtySold: string;
  revenue: string;
  img: string;
}

const productData: ProductReportData[] = [
  { sku: 'PT001', name: 'Lenovo IdeaPad 3', category: 'Computers', price: '$300', qtySold: '50', revenue: '$15000', img: 'laptop' },
  { sku: 'PT002', name: 'Beats Pro', category: 'Electronics', price: '$160', qtySold: '120', revenue: '$19200', img: 'headphones' },
  { sku: 'PT003', name: 'Nike Jordan', category: 'Shoe', price: '$110', qtySold: '30', revenue: '$3300', img: 'shoes' },
  { sku: 'PT004', name: 'Apple Series 5 Watch', category: 'Electronics', price: '$120', qtySold: '45', revenue: '$5400', img: 'watch' },
  { sku: 'PT005', name: 'Amazon Echo Dot', category: 'Electronics', price: '$80', qtySold: '25', revenue: '$2000', img: 'speaker' },
];

export default function ProductReport() {
  const columns: ColumnDef<ProductReportData>[] = [
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
    { accessorKey: 'sku', header: 'SKU' },
    { accessorKey: 'category', header: 'Category' },
    { accessorKey: 'price', header: 'Price' },
    { accessorKey: 'qtySold', header: 'Qty Sold' },
    {
      accessorKey: 'revenue',
      header: 'Revenue',
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('revenue')}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Product Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Product Report</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Choose Date</label>
          <div className="relative">
            <input type="text" placeholder="01-Jan-2025 - 12-Dec-2025" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500" />
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Product</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="px-6 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors h-10">
            Generate Report
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-4">
        <DataTable 
          columns={columns} 
          data={productData} 
          searchKey="name"
          searchPlaceholder="Search product..."
          actions={
            <>
              <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-red-500 hover:bg-gray-50 bg-white">
                <FileText className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded border border-gray-200 text-green-600 hover:bg-gray-50 bg-white">
                <FileSpreadsheet className="w-4 h-4" />
              </button>
            </>
          }
        />
      </div>

    </div>
  );
}
