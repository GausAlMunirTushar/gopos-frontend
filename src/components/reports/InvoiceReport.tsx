'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, ChevronUp, ChevronRight,
  FileSpreadsheet, Calendar
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface InvoiceReportData {
  no: string;
  customer: string;
  date: string;
  amount: string;
  paid: string;
  due: string;
  status: string;
}

const invoiceData: InvoiceReportData[] = [
  { no: 'INV-001', customer: 'Carl Evans', date: '25 Dec 2024', amount: '$3000', paid: '$3000', due: '$0', status: 'Paid' },
  { no: 'INV-002', customer: 'Minerva Rameriz', date: '24 Dec 2024', amount: '$1600', paid: '$1000', due: '$600', status: 'Partial' },
  { no: 'INV-003', customer: 'Robert Lamon', date: '20 Dec 2024', amount: '$880', paid: '$880', due: '$0', status: 'Paid' },
  { no: 'INV-004', customer: 'Patricia Lewis', date: '18 Dec 2024', amount: '$1200', paid: '$0', due: '$1200', status: 'Unpaid' },
];

export default function InvoiceReport() {
  const columns: ColumnDef<InvoiceReportData>[] = [
    {
      accessorKey: 'no',
      header: 'Invoice No',
      cell: ({ row }) => <span className="font-medium text-orange-500">{row.getValue('no')}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer Name',
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('customer')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'amount', header: 'Total Amount' },
    { accessorKey: 'paid', header: 'Paid' },
    { accessorKey: 'due', header: 'Due' },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        const colorClass = status === 'Paid' ? 'bg-green-50 text-green-600 border-green-200' : status === 'Unpaid' ? 'bg-red-50 text-red-600 border-red-200' : 'bg-orange-50 text-orange-600 border-orange-200';
        const dotClass = status === 'Paid' ? 'bg-green-600' : status === 'Unpaid' ? 'bg-red-600' : 'bg-orange-600';
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${colorClass}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
            {status}
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
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Invoice Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Invoice Report</span>
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
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
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
          data={invoiceData} 
          searchKey="no"
          searchPlaceholder="Search invoice no..."
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
