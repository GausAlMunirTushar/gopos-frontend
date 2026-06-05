'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, ChevronUp, ChevronRight,
  FileSpreadsheet, Calendar
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface SupplierReportData {
  name: string;
  phone: string;
  totalPurchases: string;
  paidAmount: string;
  due: string;
}

const supplierData: SupplierReportData[] = [
  { name: 'Apex Computers', phone: '+15964712634', totalPurchases: '20', paidAmount: '$15000', due: '$0' },
  { name: 'Beats Headphones', phone: '+16372895190', totalPurchases: '8', paidAmount: '$4500', due: '$1200' },
  { name: 'Dazzle Shoes', phone: '+17589201739', totalPurchases: '15', paidAmount: '$8200', due: '$0' },
  { name: 'Best Accessories', phone: '+18934092467', totalPurchases: '12', paidAmount: '$3100', due: '$400' },
  { name: 'A-Z Store', phone: '+12568749035', totalPurchases: '25', paidAmount: '$11200', due: '$0' },
];

export default function SupplierReport() {
  const columns: ColumnDef<SupplierReportData>[] = [
    {
      accessorKey: 'name',
      header: 'Supplier Name',
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('name')}</span>,
    },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'totalPurchases', header: 'Total Purchases' },
    { accessorKey: 'paidAmount', header: 'Paid Amount' },
    {
      accessorKey: 'due',
      header: 'Due Amount',
      cell: ({ row }) => {
        const due = row.getValue('due') as string;
        return (
          <span className={`font-medium ${due === '$0' ? 'text-green-600' : 'text-red-500'}`}>
            {due}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Supplier Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Supplier Report</span>
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
          <label className="text-sm font-medium text-gray-700">Supplier</label>
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
          data={supplierData} 
          searchKey="name"
          searchPlaceholder="Search supplier..."
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
