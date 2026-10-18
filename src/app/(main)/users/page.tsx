'use client';

import React from 'react';
import { 
  Users, Plus, Edit2, Trash2, ShieldCheck, 
  UserCheck, Mail, Phone, Lock 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface StoreUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Store Admin' | 'Store Manager' | 'Cashier' | 'Stock Keeper';
  branch: string;
  status: 'Active' | 'Inactive';
}

const mockUsers: StoreUser[] = [
  { id: 'USR-01', name: 'John Peterson', email: 'john@gopos.com', phone: '+1 555-0199', role: 'Store Admin', branch: 'Main Branch (Dhanmondi)', status: 'Active' },
  { id: 'USR-02', name: 'Janet Clerk', email: 'janet@gopos.com', phone: '+1 555-0182', role: 'Store Manager', branch: 'Gulshan Outlet', status: 'Active' },
  { id: 'USR-03', name: 'Sarah Jenkins', email: 'sarah@gopos.com', phone: '+1 555-0144', role: 'Cashier', branch: 'Main Branch (Dhanmondi)', status: 'Active' },
  { id: 'USR-04', name: 'Robert Vance', email: 'robert@gopos.com', phone: '+1 555-0163', role: 'Stock Keeper', branch: 'Central Warehouse', status: 'Active' },
  { id: 'USR-05', name: 'Kevin Malone', email: 'kevin@gopos.com', phone: '+1 555-0128', role: 'Cashier', branch: 'Uttara Branch', status: 'Inactive' },
];

export default function UsersPage() {
  const columns: ColumnDef<StoreUser>[] = [
    {
      accessorKey: 'name',
      header: 'Staff Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-orange-100 text-[#FF9F43] flex items-center justify-center font-bold text-xs shrink-0">
            {row.original.name.charAt(0)}
          </div>
          <div>
            <span className="font-bold text-gray-900 block text-xs">{row.original.name}</span>
            <span className="text-[11px] text-gray-400">{row.original.email}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role / Designation',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {row.original.role}
        </span>
      ),
    },
    {
      accessorKey: 'branch',
      header: 'Assigned Outlet / Branch',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-medium">{row.original.branch}</span>,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-mono">{row.original.phone}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
        }`}>
          {row.original.status}
        </span>
      ),
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
        title="Store Users & Staff"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'User Management' },
          { label: 'Users' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add User Account
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Staff Accounts" 
          value="18" 
          icon={Users} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Active Cashiers" 
          value="12" 
          trend="Live in POS" 
          trendType="up" 
          icon={UserCheck} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Security Roles" 
          value="4 Configured" 
          icon={ShieldCheck} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockUsers} searchKey="name" />
      </div>
    </div>
  );
}
