'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, ChevronUp,
  FileSpreadsheet, Calendar
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { PageHeader } from '@/components/shared/PageHeader';

interface PurchaseReportData {
  no: string;
  supplier: string;
  date: string;
  amount: string;
  paid: string;
  status: string;
}

const purchaseData: PurchaseReportData[] = [
  { no: 'PUR-101', supplier: 'Apex Computers', date: '22 Dec 2024', amount: '৳5000', paid: '৳5000', status: 'Paid' },
  { no: 'PUR-102', supplier: 'Beats Headphones', date: '19 Dec 2024', amount: '৳2500', paid: '৳1500', status: 'Partial' },
  { no: 'PUR-103', supplier: 'Dazzle Shoes', date: '15 Dec 2024', amount: '৳3200', paid: '৳0', status: 'Unpaid' },
  { no: 'PUR-104', supplier: 'Best Accessories', date: '10 Dec 2024', amount: '৳1100', paid: '৳1100', status: 'Paid' },
];

export default function PurchaseReport() {
  const columns: ColumnDef<PurchaseReportData>[] = [
    {
      accessorKey: 'no',
      header: 'Purchase ID',
      cell: ({ row }) => <span className="font-medium text-orange-500">{row.getValue('no')}</span>,
    },
    {
      accessorKey: 'supplier',
      header: 'Supplier',
      cell: ({ row }) => <span className="font-medium text-gray-900">{row.getValue('supplier')}</span>,
    },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'amount', header: 'Total Amount' },
    { accessorKey: 'paid', header: 'Paid' },
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
      <PageHeader 
        title="Purchase Report" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports' },
          { label: 'Purchase Report' }
        ]}
        actions={
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
               <RefreshCcw className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
               <ChevronUp className="w-5 h-5" />
            </button>
          </div>
        }
      />

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
          data={purchaseData} 
          searchKey="no"
          searchPlaceholder="Search purchase ID..."
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
