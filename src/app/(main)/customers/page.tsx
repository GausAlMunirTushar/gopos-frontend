'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, MoreHorizontal, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  points: number;
  lastVisit: string;
};

const data: Customer[] = [
  { id: 'C001', name: 'John Doe', email: 'john.doe@example.com', phone: '+1 234 567 890', points: 120, lastVisit: 'Today, 10:23 AM' },
  { id: 'C002', name: 'Sarah Smith', email: 'sarah.s@example.com', phone: '+1 345 678 901', points: 450, lastVisit: 'Yesterday' },
  { id: 'C003', name: 'Michael Brown', email: 'mbrown@example.com', phone: '+1 456 789 012', points: 0, lastVisit: 'Oct 24, 2023' },
  { id: 'C004', name: 'Emily White', email: 'emily.white@example.com', phone: '+1 567 890 123', points: 85, lastVisit: 'Oct 22, 2023' },
  { id: 'C005', name: 'James Wilson', email: 'jwilson@example.com', phone: '+1 678 901 234', points: 300, lastVisit: 'Oct 20, 2023' },
];

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: 'Customer Name',
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
          {row.original.name.charAt(0)}
        </div>
        <div className="font-medium text-gray-900">{row.getValue('name')}</div>
      </div>
    ),
  },
  {
    accessorKey: 'email',
    header: 'Contact Info',
    cell: ({ row }) => (
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail className="w-3.5 h-3.5" />
          {row.getValue('email')}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Phone className="w-3.5 h-3.5" />
          {row.original.phone}
        </div>
      </div>
    ),
  },
  {
    accessorKey: 'points',
    header: 'Reward Points',
    cell: ({ row }) => (
      <div className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-700 font-semibold text-xs border border-purple-100">
        {row.getValue('points')} pts
      </div>
    ),
  },
  {
    accessorKey: 'lastVisit',
    header: 'Last Visit',
    cell: ({ row }) => <div className="text-gray-500 text-sm">{row.getValue('lastVisit')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem className="cursor-pointer">View Details</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">Edit Customer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 text-sm mt-1">View and manage your customer relationships.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">Export</Button>
          <Button className="bg-[#FF9F43] hover:bg-orange-500 text-white flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Customer
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
