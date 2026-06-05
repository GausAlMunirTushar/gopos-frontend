'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus, Eye
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Biller {
  code: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  status: string;
}

const billerData: Biller[] = [
  { code: 'BI001', name: 'Shaun Farley', company: 'GreenTech Industries', email: 'shaun@example.com', phone: '+18647961254', country: 'USA', status: 'Active' },
  { code: 'BI002', name: 'Jenny Ellis', company: 'BlueSky Logistics', email: 'jenny@example.com', phone: '+13197521863', country: 'Germany', status: 'Active' },
  { code: 'BI003', name: 'Leon Baxter', company: 'EcoFarm Organics', email: 'leon@example.com', phone: '+18496275831', country: 'Japan', status: 'Active' },
  { code: 'BI004', name: 'Karen Flores', company: 'SmartTech Solutions', email: 'karen@example.com', phone: '+18731498524', country: 'Austria', status: 'Active' },
  { code: 'BI005', name: 'Michael Dawson', company: 'Fresh Supplies', email: 'michael@example.com', phone: '+12876928738', country: 'Turkey', status: 'Active' },
  { code: 'BI006', name: 'Karen Galvan', company: 'BrightSource Lighting', email: 'karen@example.com', phone: '+17534896148', country: 'Mexico', status: 'Active' },
  { code: 'BI007', name: 'Thomas Ward', company: 'GlobalTech Industries', email: 'thomas@example.com', phone: '+16482479624', country: 'France', status: 'Active' },
  { code: 'BI008', name: 'Aliza Duncan', company: 'HealthWell Pharma', email: 'aliza@example.com', phone: '+13175964827', country: 'Greece', status: 'Active' },
  { code: 'BI009', name: 'James Higham', company: 'HomeStyle Furnishings', email: 'james@example.com', phone: '+13875196482', country: 'Italy', status: 'Active' },
  { code: 'BI010', name: 'Jada Robinson', company: 'EcoLogistics Partners', email: 'robinson@example.com', phone: '+17586143284', country: 'China', status: 'Active' },
];

export default function BillerList() {
  const columns: ColumnDef<Biller>[] = [
    { accessorKey: 'code', header: 'Code' },
    {
      accessorKey: 'name',
      header: 'Biller',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/100?img=${row.index + 20}`} alt={row.original.name} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    { accessorKey: 'company', header: 'Company Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'country', header: 'Country' },
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
        title="Billers" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Billers' }
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
              <Plus className="w-4 h-4" /> Add Biller
            </button>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={billerData} 
        searchKey="name"
        searchPlaceholder="Search billers..."
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
