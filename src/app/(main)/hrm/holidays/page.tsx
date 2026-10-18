'use client';

import React from 'react';
import { 
  CalendarHeart, Plus, Calendar, Sun, Edit, Trash2 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface Holiday {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  days: number;
  type: 'Public' | 'National' | 'Religious' | 'Optional';
  status: 'Upcoming' | 'Past';
}

const mockHolidays: Holiday[] = [
  { id: 'HOL-01', name: 'Victory Day', startDate: '16 Dec 2026', endDate: '16 Dec 2026', days: 1, type: 'National', status: 'Upcoming' },
  { id: 'HOL-02', name: 'Christmas Day', startDate: '25 Dec 2026', endDate: '25 Dec 2026', days: 1, type: 'Religious', status: 'Upcoming' },
  { id: 'HOL-03', name: 'New Year Day', startDate: '01 Jan 2027', endDate: '01 Jan 2027', days: 1, type: 'Public', status: 'Upcoming' },
  { id: 'HOL-04', name: 'Eid-ul-Fitr Break', startDate: '28 Mar 2026', endDate: '02 Apr 2026', days: 6, type: 'Religious', status: 'Past' },
  { id: 'HOL-05', name: 'Independence Day', startDate: '26 Mar 2026', endDate: '26 Mar 2026', days: 1, type: 'National', status: 'Past' },
];

export default function HolidaysPage() {
  const columns: ColumnDef<Holiday>[] = [
    {
      accessorKey: 'name',
      header: 'Holiday Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#FF9F43] flex items-center justify-center font-bold text-xs">
            <CalendarHeart className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-gray-900 block">{row.original.name}</span>
            <span className="text-xs text-gray-400">ID: {row.original.id}</span>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Dates',
      cell: ({ row }) => (
        <span className="text-xs font-medium text-gray-700">
          {row.original.startDate} {row.original.days > 1 && `to ${row.original.endDate}`}
        </span>
      ),
    },
    {
      accessorKey: 'days',
      header: 'Duration',
      cell: ({ row }) => (
        <span className="text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
          {row.original.days} {row.original.days === 1 ? 'Day' : 'Days'}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Upcoming' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
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
        title="Store Holidays"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Holidays' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add Holiday
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Holidays (2026)" 
          value="18 Days" 
          icon={CalendarHeart} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Upcoming Holidays" 
          value="3 Days" 
          icon={Calendar} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Past Holidays" 
          value="15 Days" 
          icon={Sun} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockHolidays} searchKey="name" />
      </div>
    </div>
  );
}
