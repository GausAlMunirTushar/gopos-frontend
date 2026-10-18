'use client';

import React from 'react';
import { 
  Banknote, Plus, Download, CheckCircle2, 
  Clock, DollarSign, FileText, ArrowDownToLine 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface PayrollRecord {
  id: string;
  employeeName: string;
  role: string;
  month: string;
  basicSalary: string;
  allowance: string;
  deduction: string;
  netPay: string;
  paymentMethod: string;
  status: 'Paid' | 'Pending';
}

const mockPayroll: PayrollRecord[] = [
  { id: 'PAY-01', employeeName: 'Mitchael Clerk', role: 'Store Manager', month: 'September 2026', basicSalary: '$1,800.00', allowance: '$250.00', deduction: '$50.00', netPay: '$2,000.00', paymentMethod: 'Direct Deposit', status: 'Paid' },
  { id: 'PAY-02', employeeName: 'Janet Stem', role: 'Head Supervisor', month: 'September 2026', basicSalary: '$1,400.00', allowance: '$150.00', deduction: '$20.00', netPay: '$1,530.00', paymentMethod: 'Direct Deposit', status: 'Paid' },
  { id: 'PAY-03', employeeName: 'Robert Lamon', role: 'Senior Cashier', month: 'September 2026', basicSalary: '$1,100.00', allowance: '$100.00', deduction: '$30.00', netPay: '$1,170.00', paymentMethod: 'Bank Transfer', status: 'Paid' },
  { id: 'PAY-04', employeeName: 'Sarah Jenkins', role: 'Cashier Staff', month: 'October 2026', basicSalary: '$950.00', allowance: '$80.00', deduction: '$0.00', netPay: '$1,030.00', paymentMethod: 'bKash Wallet', status: 'Pending' },
  { id: 'PAY-05', employeeName: 'David Miller', role: 'Warehouse Attendant', month: 'October 2026', basicSalary: '$900.00', allowance: '$50.00', deduction: '$0.00', netPay: '$950.00', paymentMethod: 'Cash', status: 'Pending' },
];

export default function PayrollPage() {
  const columns: ColumnDef<PayrollRecord>[] = [
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
      accessorKey: 'month',
      header: 'Salary Month',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-medium">{row.original.month}</span>,
    },
    {
      accessorKey: 'basicSalary',
      header: 'Basic Pay',
      cell: ({ row }) => <span className="text-xs text-gray-700 font-medium">{row.original.basicSalary}</span>,
    },
    {
      accessorKey: 'allowance',
      header: 'Allowance',
      cell: ({ row }) => <span className="text-xs text-emerald-600 font-medium">+{row.original.allowance}</span>,
    },
    {
      accessorKey: 'deduction',
      header: 'Deductions',
      cell: ({ row }) => <span className="text-xs text-rose-500 font-medium">-{row.original.deduction}</span>,
    },
    {
      accessorKey: 'netPay',
      header: 'Net Salary',
      cell: ({ row }) => <span className="text-xs font-black text-gray-900">{row.original.netPay}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Payment Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
        }`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Payslip',
      cell: () => (
        <button title="Download Payslip" className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-800 transition-colors">
          <ArrowDownToLine className="w-4 h-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employee Payroll & Salary"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Payroll' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-gray-200 text-xs font-semibold">
              <Download className="w-3.5 h-3.5 mr-1" /> Export Payroll
            </Button>
            <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white rounded-xl">
              <Plus className="w-4 h-4 mr-1.5" /> Process Salary
            </Button>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Monthly Payroll" 
          value="$6,680.00" 
          trend="+4.2%" 
          trendType="up" 
          icon={Banknote} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Paid Salaries" 
          value="$4,700.00" 
          icon={CheckCircle2} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Pending Disbursement" 
          value="$1,980.00" 
          icon={Clock} 
          iconColor="text-amber-500" 
          iconBg="bg-amber-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockPayroll} searchKey="employeeName" />
      </div>
    </div>
  );
}
