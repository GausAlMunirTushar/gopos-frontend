'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, Users, Briefcase
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  status: string;
  color: string;
}

const employeeData: Employee[] = [
  { id: 'EMP001', name: 'Mitchael Clerk', email: 'mitchael@example.com', phone: '+12163547758', department: 'Sales', designation: 'Manager', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'EMP002', name: 'Janet Stem', email: 'janet@example.com', phone: '+11367529510', department: 'Inventory', designation: 'Supervisor', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'EMP003', name: 'Robert Lamon', email: 'robert@example.com', phone: '+15362789414', department: 'HR', designation: 'Admin', status: 'Inactive', color: 'bg-red-100 text-red-600' },
];

export default function EmployeeList() {
  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: 'id',
      header: 'Employee ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <div className="flex items-center gap-3">
            <img src={`https://i.pravatar.cc/150?u=${employee.email}`} alt={employee.name} className="w-8 h-8 rounded-full bg-gray-100" />
            <div>
              <p className="font-bold text-gray-900">{employee.name}</p>
              <p className="text-[11px] text-gray-500">{employee.email}</p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'department',
      header: 'Department',
      cell: ({ row }) => <span className="text-gray-500">{row.original.department}</span>,
    },
    {
      accessorKey: 'designation',
      header: 'Designation',
      cell: ({ row }) => <span className="text-gray-500">{row.original.designation}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <span className="text-gray-500">{row.original.phone}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const employee = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${employee.color}`}>
            {employee.status}
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
        title="Employees" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM' },
          { label: 'Employees' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Employees" 
          value="124" 
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Departments" 
          value="8" 
          icon={Briefcase}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard 
          label="Active Staff" 
          value="118" 
          icon={Users}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={employeeData} 
        searchKey="name"
        searchPlaceholder="Search employees..."
        enableSelection={true}
        filters={[
          {
            column: 'department',
            label: 'All Departments',
            options: [
              { label: 'Sales', value: 'Sales' },
              { label: 'Inventory', value: 'Inventory' },
              { label: 'HR', value: 'HR' },
            ]
          },
          {
            column: 'status',
            label: 'All Status',
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
