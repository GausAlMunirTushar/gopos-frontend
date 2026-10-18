'use client';

import React from 'react';
import { 
  Key, Plus, ShieldCheck, Check, Edit2, Trash2 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface RolePermission {
  id: string;
  roleName: string;
  usersCount: number;
  permissions: string[];
  description: string;
  createdAt: string;
}

const mockRoles: RolePermission[] = [
  { id: 'ROL-01', roleName: 'Store Administrator', usersCount: 2, permissions: ['Full Access', 'Finance', 'HRM', 'Inventory', 'POS', 'Settings'], description: 'Complete system control over store and accounts', createdAt: '01 Jan 2026' },
  { id: 'ROL-02', roleName: 'Branch Manager', usersCount: 4, permissions: ['POS Sales', 'Inventory Edit', 'Stock Transfer', 'Staff Attendance', 'Basic Reports'], description: 'Manages outlet inventory, cashiers, and daily closing', createdAt: '15 Jan 2026' },
  { id: 'ROL-03', roleName: 'Cashier / POS Operator', usersCount: 10, permissions: ['POS Terminal', 'Create Order', 'Print Receipt', 'View Customers'], description: 'Counter checkout and barcode scanning access only', createdAt: '01 Feb 2026' },
  { id: 'ROL-04', roleName: 'Stock & Warehouse Keeper', usersCount: 3, permissions: ['Manage Stock', 'Stock Adjustment', 'Transfer Goods', 'Barcode Print'], description: 'Product receiving and warehouse stock movements', createdAt: '10 Feb 2026' },
];

export default function RolesPermissionsPage() {
  const columns: ColumnDef<RolePermission>[] = [
    {
      accessorKey: 'roleName',
      header: 'Role Title',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.roleName}</span>
          <span className="text-[11px] text-gray-400">{row.original.description}</span>
        </div>
      ),
    },
    {
      accessorKey: 'usersCount',
      header: 'Assigned Users',
      cell: ({ row }) => (
        <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded text-xs">
          {row.original.usersCount} Staff
        </span>
      ),
    },
    {
      accessorKey: 'permissions',
      header: 'Permissions Scope',
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1 max-w-sm">
          {row.original.permissions.map((p, i) => (
            <span key={i} className="text-[10px] font-semibold bg-orange-50 text-orange-700 px-2 py-0.5 rounded border border-orange-100">
              {p}
            </span>
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'createdAt',
      header: 'Created On',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-medium">{row.original.createdAt}</span>,
    },
    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Roles & Permissions"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'User Management', href: '/users' },
          { label: 'Roles' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Create Role
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Security Roles" 
          value="4 Roles" 
          icon={Key} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Assigned Staff" 
          value="19 Users" 
          icon={ShieldCheck} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Permission Rules" 
          value="24 Nodes" 
          icon={Key} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockRoles} searchKey="roleName" />
      </div>
    </div>
  );
}
