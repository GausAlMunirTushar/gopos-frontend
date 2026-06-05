'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Warranty {
  name: string;
  desc: string;
  duration: string;
  status: string;
}

const warrantyData: Warranty[] = [
  { name: 'Replacement Warranty', desc: 'Covers replacement of faulty items', duration: '2 Year', status: 'Active' },
  { name: 'On-Site Warranty', desc: 'Product repairs done at the customer\'s location', duration: '1 Year', status: 'Active' },
  { name: 'Accidental Protection Plan', desc: 'Coverage for accidental damage', duration: '6 Months', status: 'Active' },
  { name: 'Labor-Only Warranty', desc: 'Covers only labor costs, not parts', duration: '6 Months', status: 'Active' },
  { name: 'No-Cost Repairs', desc: 'No charge for repairs during warranty period', duration: '3 Months', status: 'Active' },
  { name: 'Accidental Damage', desc: 'Coverage for unexpected damage', duration: '6 Months', status: 'Active' },
  { name: 'Wear & Tear Warranty', desc: 'Covers specific product aging issues', duration: '1 Year', status: 'Active' },
  { name: 'Money-Back Guarantee', desc: 'Refund within a specified period', duration: '3 Months', status: 'Active' },
  { name: 'Water Damage Warranty', desc: 'Coverage for water-related issues', duration: '6 Months', status: 'Active' },
  { name: 'Power Surge Protection', desc: 'Covers damage from power surges', duration: '6 Months', status: 'Active' },
];

export default function WarrantiesPage() {
  const columns: ColumnDef<Warranty>[] = [
    { accessorKey: 'name', header: 'Warranty' },
    { accessorKey: 'desc', header: 'Description' },
    { accessorKey: 'duration', header: 'Duration' },
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><Edit className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Warranties" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Warranties' }
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
              <Plus className="w-4 h-4" /> Add Warranty
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={warrantyData} 
        searchKey="name"
        searchPlaceholder="Search warranties..."
        enableSelection
        filters={[
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
