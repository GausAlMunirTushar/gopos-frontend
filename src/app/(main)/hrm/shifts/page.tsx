'use client';

import React, { useState } from 'react';
import { 
  Shuffle, Plus, Clock, Users, Edit, Trash2, 
  CheckCircle2, Moon, Sun, Sunrise 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface Shift {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  breakDuration: string;
  gracePeriod: string;
  assignedStaff: number;
  status: 'Active' | 'Inactive';
}

const mockShifts: Shift[] = [
  { id: 'SH-01', name: 'Morning Shift', startTime: '08:00 AM', endTime: '04:00 PM', breakDuration: '45 mins', gracePeriod: '15 mins', assignedStaff: 12, status: 'Active' },
  { id: 'SH-02', name: 'Evening Shift', startTime: '03:30 PM', endTime: '11:30 PM', breakDuration: '45 mins', gracePeriod: '15 mins', assignedStaff: 16, status: 'Active' },
  { id: 'SH-03', name: 'Night Shift (24/7 Outlets)', startTime: '11:00 PM', endTime: '07:30 AM', breakDuration: '60 mins', gracePeriod: '20 mins', assignedStaff: 4, status: 'Active' },
  { id: 'SH-04', name: 'Weekend Special Shift', startTime: '10:00 AM', endTime: '08:00 PM', breakDuration: '60 mins', gracePeriod: '15 mins', assignedStaff: 8, status: 'Inactive' },
];

export default function ShiftsPage() {
  const columns: ColumnDef<Shift>[] = [
    {
      accessorKey: 'name',
      header: 'Shift Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF9F43] flex items-center justify-center font-bold text-xs">
            <Clock className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{row.original.name}</span>
            <span className="text-xs text-gray-400">ID: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'startTime',
      header: 'Timings',
      cell: ({ row }) => (
        <span className="text-xs font-semibold text-gray-700 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-md">
          {row.original.startTime} — {row.original.endTime}
        </span>
      ),
    },
    {
      accessorKey: 'breakDuration',
      header: 'Break Time',
      cell: ({ row }) => <span className="text-xs text-gray-600">{row.original.breakDuration}</span>,
    },
    {
      accessorKey: 'gracePeriod',
      header: 'Grace Time',
      cell: ({ row }) => <span className="text-xs text-amber-600 font-medium">{row.original.gracePeriod}</span>,
    },
    {
      accessorKey: 'assignedStaff',
      header: 'Assigned Staff',
      cell: ({ row }) => (
        <span className="font-bold text-gray-900 bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full text-xs">
          {row.original.assignedStaff} Staff
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-500'
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
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Shift Management"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Shifts' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Create Shift
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Active Shifts" 
          value="3 Shifts" 
          icon={Shuffle} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Staff on Duty" 
          value="40 Employees" 
          icon={Users} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
        <StatsCard 
          label="On-Time Attendance" 
          value="96.2%" 
          trend="+2.4%" 
          trendType="up" 
          icon={Clock} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockShifts} searchKey="name" />
      </div>
    </div>
  );
}
