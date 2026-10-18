'use client';

import React from 'react';
import { 
  CalendarMinus, Plus, Check, X, Clock, 
  Calendar, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface LeaveRequest {
  id: string;
  employeeName: string;
  leaveType: 'Annual Leave' | 'Sick Leave' | 'Casual Leave' | 'Maternity';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}

const mockLeaves: LeaveRequest[] = [
  { id: 'LV-01', employeeName: 'Sarah Jenkins', leaveType: 'Casual Leave', startDate: '18 Oct 2026', endDate: '19 Oct 2026', days: 2, reason: 'Family emergency / personal matters', status: 'Pending' },
  { id: 'LV-02', employeeName: 'Robert Lamon', leaveType: 'Sick Leave', startDate: '12 Oct 2026', endDate: '14 Oct 2026', days: 3, reason: 'Viral fever with doctor note', status: 'Approved' },
  { id: 'LV-03', employeeName: 'Mitchael Clerk', leaveType: 'Annual Leave', startDate: '01 Nov 2026', endDate: '07 Nov 2026', days: 7, reason: 'Annual vacation trip', status: 'Approved' },
  { id: 'LV-04', employeeName: 'Janet Stem', leaveType: 'Casual Leave', startDate: '05 Oct 2026', endDate: '06 Oct 2026', days: 2, reason: 'Personal errands', status: 'Rejected' },
];

export default function LeavesPage() {
  const columns: ColumnDef<LeaveRequest>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block">{row.original.employeeName}</span>
          <span className="text-xs text-gray-400">ID: {row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: 'leaveType',
      header: 'Leave Type',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-gray-100 text-gray-800">
          {row.original.leaveType}
        </span>
      ),
    },
    {
      accessorKey: 'startDate',
      header: 'Duration',
      cell: ({ row }) => (
        <div className="text-xs text-gray-700">
          <span className="font-medium">{row.original.startDate} to {row.original.endDate}</span>
          <span className="text-gray-400 block mt-0.5">({row.original.days} Days)</span>
        </div>
      ),
    },
    {
      accessorKey: 'reason',
      header: 'Reason',
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 max-w-xs truncate block" title={row.original.reason}>
          {row.original.reason}
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
            s === 'Approved' ? 'bg-emerald-50 text-emerald-700' :
            s === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {s}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Approval Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          {row.original.status === 'Pending' ? (
            <>
              <button title="Approve" className="p-1.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-colors">
                <Check className="w-4 h-4" />
              </button>
              <button title="Reject" className="p-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-400 font-medium italic">Completed</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Leave Management"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Leaves' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Request Leave
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Pending Approvals" 
          value="1 Request" 
          icon={Clock} 
          iconColor="text-amber-500" 
          iconBg="bg-amber-50" 
        />
        <StatsCard 
          label="Approved This Month" 
          value="8 Days" 
          icon={CheckCircle2} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Staff on Leave Today" 
          value="1 Employee" 
          icon={CalendarMinus} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockLeaves} searchKey="employeeName" />
      </div>
    </div>
  );
}
