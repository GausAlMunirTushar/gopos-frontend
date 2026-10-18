'use client';

import React from 'react';
import { 
  Calendar, Download, TrendingUp, DollarSign, 
  ArrowUpRight, BarChart3, PieChart 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface MonthlySummary {
  month: string;
  sales: string;
  purchases: string;
  expenses: string;
  profit: string;
  growth: string;
}

const mockAnnualData: MonthlySummary[] = [
  { month: 'January 2026', sales: '$6,400', purchases: '$3,100', expenses: '$1,200', profit: '$2,100', growth: '+12%' },
  { month: 'February 2026', sales: '$5,900', purchases: '$2,800', expenses: '$1,150', profit: '$1,950', growth: '-4%' },
  { month: 'March 2026', sales: '$7,200', purchases: '$3,600', expenses: '$1,300', profit: '$2,300', growth: '+18%' },
  { month: 'April 2026', sales: '$6,800', purchases: '$3,200', expenses: '$1,250', profit: '$2,350', growth: '+5%' },
  { month: 'May 2026', sales: '$8,100', purchases: '$4,100', expenses: '$1,400', profit: '$2,600', growth: '+15%' },
  { month: 'June 2026', sales: '$7,900', purchases: '$3,900', expenses: '$1,350', profit: '$2,650', growth: '+8%' },
  { month: 'July 2026', sales: '$8,400', purchases: '$4,200', expenses: '$1,420', profit: '$2,780', growth: '+11%' },
  { month: 'August 2026', sales: '$8,900', purchases: '$4,400', expenses: '$1,450', profit: '$3,050', growth: '+14%' },
  { month: 'September 2026', sales: '$8,600', purchases: '$4,300', expenses: '$1,410', profit: '$2,890', growth: '+9%' },
  { month: 'October 2026 (MTD)', sales: '$8,300', purchases: '$3,900', expenses: '$1,320', profit: '$3,080', growth: '+16%' },
];

export default function AnnualReportPage() {
  const columns: ColumnDef<MonthlySummary>[] = [
    {
      accessorKey: 'month',
      header: 'Month',
      cell: ({ row }) => <span className="font-bold text-gray-900 text-xs">{row.original.month}</span>,
    },
    {
      accessorKey: 'sales',
      header: 'Total Sales',
      cell: ({ row }) => <span className="text-xs font-semibold text-gray-800">{row.original.sales}</span>,
    },
    {
      accessorKey: 'purchases',
      header: 'Purchases (Cost)',
      cell: ({ row }) => <span className="text-xs text-gray-600">{row.original.purchases}</span>,
    },
    {
      accessorKey: 'expenses',
      header: 'Operating Expenses',
      cell: ({ row }) => <span className="text-xs text-rose-500 font-medium">{row.original.expenses}</span>,
    },
    {
      accessorKey: 'profit',
      header: 'Net Profit',
      cell: ({ row }) => <span className="text-xs font-black text-emerald-600">{row.original.profit}</span>,
    },
    {
      accessorKey: 'growth',
      header: 'YOY Growth',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.growth.startsWith('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {row.original.growth}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Annual Financial Report"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports/sales' },
          { label: 'Annual Report' },
        ]}
        actions={
          <Button variant="outline" className="border-gray-200 text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Annual PDF
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatsCard 
          label="Annual Sales Revenue" 
          value="$76,500.00" 
          trend="+18.4%" 
          trendType="up" 
          icon={TrendingUp} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
        <StatsCard 
          label="Total Inventory Purchases" 
          value="$37,500.00" 
          icon={BarChart3} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Operating Expenses" 
          value="$12,800.00" 
          icon={PieChart} 
          iconColor="text-rose-500" 
          iconBg="bg-rose-50" 
        />
        <StatsCard 
          label="Annual Net Profit" 
          value="$22,850.00" 
          trend="+22.1%" 
          trendType="up" 
          icon={DollarSign} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockAnnualData} searchKey="month" />
      </div>
    </div>
  );
}
