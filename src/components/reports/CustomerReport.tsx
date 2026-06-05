'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, ChevronUp, ChevronRight,
  FileSpreadsheet, Calendar
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface CustomerReportData {
  name: string;
  phone: string;
  totalOrders: string;
  totalAmount: string;
  due: string;
}

const customerData: CustomerReportData[] = [
  { name: 'Carl Evans', phone: '+12163547758', totalOrders: '12', totalAmount: '$1500', due: '$0' },
  { name: 'Minerva Rameriz', phone: '+11367529510', totalOrders: '5', totalAmount: '$450', due: '$120' },
  { name: 'Robert Lamon', phone: '+15362789414', totalOrders: '18', totalAmount: '$3200', due: '$0' },
  { name: 'Patricia Lewis', phone: '+18513094627', totalOrders: '3', totalAmount: '$800', due: '$400' },
  { name: 'Mark Joslyn', phone: '+14678219025', totalOrders: '9', totalAmount: '$1200', due: '$0' },
];

export default function CustomerReport() {
  const columns: ColumnDef<CustomerReportData>[] = [
    {
      accessorKey: 'name',
      header: 'Customer Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/100?img=${row.index + 1}`} alt={row.original.name} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'totalOrders', header: 'Total Orders' },
    { accessorKey: 'totalAmount', header: 'Total Amount' },
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Customer Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Customer Report</span>
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
          <label className="text-sm font-medium text-gray-700">Customer</label>
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
          data={customerData} 
          searchKey="name"
          searchPlaceholder="Search customer..."
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
