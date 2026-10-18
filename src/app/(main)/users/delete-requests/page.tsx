'use client';

import React from 'react';
import { 
  Trash2, Check, X, AlertTriangle, 
  ShieldAlert, UserX, Clock 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

interface DeleteRequest {
  id: string;
  userName: string;
  email: string;
  userType: 'Customer' | 'Staff Employee';
  requestedDate: string;
  reason: string;
  status: 'Pending' | 'Processed' | 'Declined';
}

const mockDeleteRequests: DeleteRequest[] = [
  { id: 'DEL-01', userName: 'Karim Ullah', email: 'karim@gmail.com', userType: 'Customer', requestedDate: '16 Oct 2026', reason: 'No longer using store loyalty membership', status: 'Pending' },
  { id: 'DEL-02', userName: 'Anisul Hoque', email: 'anis@hotmail.com', userType: 'Customer', requestedDate: '12 Oct 2026', reason: 'Relocated to another city', status: 'Pending' },
  { id: 'DEL-03', userName: 'Kamrul Hasan', email: 'kamrul@staff.com', userType: 'Staff Employee', requestedDate: '01 Oct 2026', reason: 'Resigned from cashier position', status: 'Processed' },
];

export default function DeleteRequestsPage() {
  const columns: ColumnDef<DeleteRequest>[] = [
    {
      accessorKey: 'userName',
      header: 'Requester',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.userName}</span>
          <span className="text-[11px] text-gray-400">{row.original.email}</span>
        </div>
      ),
    },
    {
      accessorKey: 'userType',
      header: 'Account Type',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
          {row.original.userType}
        </span>
      ),
    },
    {
      accessorKey: 'requestedDate',
      header: 'Request Date',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-medium">{row.original.requestedDate}</span>,
    },
    {
      accessorKey: 'reason',
      header: 'Deletion Reason',
      cell: ({ row }) => (
        <span className="text-xs text-gray-500 max-w-sm truncate block" title={row.original.reason}>
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
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
            s === 'Pending' ? 'bg-amber-50 text-amber-700' :
            s === 'Processed' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {s}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center gap-1.5">
          {row.original.status === 'Pending' ? (
            <>
              <button title="Confirm and Delete" className="px-2.5 py-1 text-xs font-bold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-lg transition-colors flex items-center gap-1">
                <Trash2 className="w-3.5 h-3.5" /> Confirm
              </button>
              <button title="Decline Request" className="px-2.5 py-1 text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
                Decline
              </button>
            </>
          ) : (
            <span className="text-xs text-gray-400 italic">Archived</span>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Delete Account Requests"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'User Management', href: '/users' },
          { label: 'Delete Requests' },
        ]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Pending Deletion Requests" 
          value="2 Requests" 
          icon={Clock} 
          iconColor="text-amber-500" 
          iconBg="bg-amber-50" 
        />
        <StatsCard 
          label="Processed Requests" 
          value="1 Account" 
          icon={UserX} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Privacy Policy SLA" 
          value="48h Limit" 
          icon={ShieldAlert} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockDeleteRequests} searchKey="userName" />
      </div>
    </div>
  );
}
