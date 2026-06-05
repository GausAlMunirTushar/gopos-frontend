'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus, Eye
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Customer {
  code: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  avatar: string;
}

const customerData: Customer[] = [
  { code: 'CU001', name: 'Carl Evans', email: 'carlevans@example.com', phone: '+12163547758', country: 'Germany', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=1' },
  { code: 'CU002', name: 'Minerva Rameriz', email: 'rameriz@example.com', phone: '+11367529510', country: 'Japan', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=2' },
  { code: 'CU003', name: 'Robert Lamon', email: 'robert@example.com', phone: '+15362789414', country: 'USA', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=3' },
  { code: 'CU004', name: 'Patricia Lewis', email: 'patricia@example.com', phone: '+18513094627', country: 'Austria', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=4' },
  { code: 'CU005', name: 'Mark Joslyn', email: 'markjoslyn@example.com', phone: '+14678219025', country: 'Turkey', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=5' },
  { code: 'CU006', name: 'Marsha Betts', email: 'marshabetts@example.com', phone: '+10913278319', country: 'Mexico', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=6' },
  { code: 'CU007', name: 'Daniel Jude', email: 'danieljude@example.com', phone: '+19125852947', country: 'France', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=7' },
  { code: 'CU008', name: 'Emma Bates', email: 'emmabates@example.com', phone: '+13671835209', country: 'Greece', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=8' },
  { code: 'CU009', name: 'Richard Fralick', email: 'richard@example.com', phone: '+19756194733', country: 'Italy', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=9' },
  { code: 'CU010', name: 'Michelle Robison', email: 'robinson@example.com', phone: '+19167850925', country: 'China', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=10' },
];

export default function CustomerList() {
  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.avatar} alt={row.original.name} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'country',
      header: 'Country',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
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
        title="Customers" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Customers' }
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
              <Plus className="w-4 h-4" /> Add Customer
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={customerData} 
        searchKey="name"
        searchPlaceholder="Search customers..."
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
