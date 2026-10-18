'use client';

import React from 'react';
import { 
  CalendarCheck, Clock, Users, CheckCircle2, 
  XCircle, AlertCircle, Calendar, Download 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface AttendanceRecord {
  id: string;
  employeeName: string;
  role: string;
  date: string;
  clockIn: string;
  clockOut: string;
  totalHours: string;
  status: 'Present' | 'Late' | 'Absent' | 'On Leave';
}

const mockAttendance: AttendanceRecord[] = [
  { id: 'ATT-101', employeeName: 'Janet Stem', role: 'Store Supervisor', date: '18 Oct 2026', clockIn: '08:02 AM', clockOut: '04:15 PM', totalHours: '8h 13m', status: 'Present' },
  { id: 'ATT-102', employeeName: 'Mitchael Clerk', role: 'Head Cashier', date: '18 Oct 2026', clockIn: '08:22 AM', clockOut: '04:00 PM', totalHours: '7h 38m', status: 'Late' },
  { id: 'ATT-103', employeeName: 'Robert Lamon', role: 'Inventory Staff', date: '18 Oct 2026', clockIn: '07:55 AM', clockOut: '04:05 PM', totalHours: '8h 10m', status: 'Present' },
  { id: 'ATT-104', employeeName: 'Sarah Jenkins', role: 'Cashier', date: '18 Oct 2026', clockIn: '—', clockOut: '—', totalHours: '0h', status: 'On Leave' },
  { id: 'ATT-105', employeeName: 'David Miller', role: 'Security & Logistics', date: '18 Oct 2026', clockIn: '—', clockOut: '—', totalHours: '0h', status: 'Absent' },
];

export default function AttendancePage() {
  const columns: ColumnDef<AttendanceRecord>[] = [
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block">{row.original.employeeName}</span>
          <span className="text-xs text-gray-400">{row.original.role}</span>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
      cell: ({ row }) => <span className="text-xs text-gray-600">{row.original.date}</span>,
    },
    {
      accessorKey: 'clockIn',
      header: 'Clock In',
      cell: ({ row }) => (
        <span className={`text-xs font-semibold ${row.original.status === 'Late' ? 'text-amber-600 font-bold' : 'text-gray-700'}`}>
          {row.original.clockIn}
        </span>
      ),
    },
    {
      accessorKey: 'clockOut',
      header: 'Clock Out',
      cell: ({ row }) => <span className="text-xs text-gray-700">{row.original.clockOut}</span>,
    },
    {
      accessorKey: 'totalHours',
      header: 'Work Duration',
      cell: ({ row }) => <span className="text-xs font-bold text-gray-800">{row.original.totalHours}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const s = row.original.status;
        return (
          <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
            s === 'Present' ? 'bg-emerald-50 text-emerald-700' :
            s === 'Late' ? 'bg-amber-50 text-amber-700' :
            s === 'On Leave' ? 'bg-blue-50 text-blue-700' : 'bg-rose-50 text-rose-700'
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${
              s === 'Present' ? 'bg-emerald-500' :
              s === 'Late' ? 'bg-amber-500' :
              s === 'On Leave' ? 'bg-blue-500' : 'bg-rose-500'
            }`}></span>
            {s}
          </span>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employee Attendance"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Attendance' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-200 text-xs font-semibold">
              <Download className="w-3.5 h-3.5 mr-1" /> Export Attendance
            </Button>
            <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white rounded-xl">
              <Clock className="w-4 h-4 mr-1.5" /> Clock In / Out
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatsCard 
          label="Present Today" 
          value="42" 
          trend="88%" 
          trendType="up" 
          icon={CheckCircle2} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Late Arrival" 
          value="3" 
          trend="6%" 
          trendType="down" 
          icon={Clock} 
          iconColor="text-amber-500" 
          iconBg="bg-amber-50" 
        />
        <StatsCard 
          label="Absent" 
          value="2" 
          icon={XCircle} 
          iconColor="text-rose-500" 
          iconBg="bg-rose-50" 
        />
        <StatsCard 
          label="On Leave" 
          value="1" 
          icon={CalendarCheck} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockAttendance} searchKey="employeeName" />
      </div>
    </div>
  );
}
