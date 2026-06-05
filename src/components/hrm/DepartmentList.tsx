'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Department {
  id: string;
  name: string;
  code: string;
  employeeCount: number;
  status: string;
  color: string;
}

const departmentData: Department[] = [
  { id: 'DPT001', name: 'Sales', code: 'SLS', employeeCount: 24, status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DPT002', name: 'Inventory', code: 'INV', employeeCount: 15, status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DPT003', name: 'HR', code: 'HRM', employeeCount: 5, status: 'Active', color: 'bg-green-100 text-green-600' },
];

export default function DepartmentList() {
  const columns: ColumnDef<Department>[] = [
    {
      accessorKey: 'id',
      header: 'Dept ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.name}</span>,
    },
    {
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => <span className="text-gray-500">{row.original.code}</span>,
    },
    {
      accessorKey: 'employeeCount',
      header: 'Employees',
      cell: ({ row }) => <span className="text-gray-500">{row.original.employeeCount}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const dept = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${dept.color}`}>
            {dept.status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Departments" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Departments' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Department
          </button>
        }
      />

      <DataTable 
        columns={columns} 
        data={departmentData} 
        searchKey="name"
        searchPlaceholder="Search departments..."
        enableSelection={true}
      />
    </div>
  );
}
