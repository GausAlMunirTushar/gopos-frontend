'use client';

import React from 'react';
import { 
  Percent, Download, FileSpreadsheet, Calendar, 
  Receipt, ArrowUpRight, Scale 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface TaxReportRow {
  id: string;
  taxName: string;
  rate: string;
  taxableSales: string;
  collectedTax: string;
  inputTaxPaid: string;
  netTaxDue: string;
  filingPeriod: string;
}

const mockTaxReport: TaxReportRow[] = [
  { id: 'TAX-01', taxName: 'Standard VAT (Retail Products)', rate: '5.0%', taxableSales: '$42,500.00', collectedTax: '$2,125.00', inputTaxPaid: '$1,200.00', netTaxDue: '$925.00', filingPeriod: 'Q3 2026' },
  { id: 'TAX-02', taxName: 'Premium Goods VAT', rate: '15.0%', taxableSales: '$12,000.00', collectedTax: '$1,800.00', inputTaxPaid: '$850.00', netTaxDue: '$950.00', filingPeriod: 'Q3 2026' },
  { id: 'TAX-03', taxName: 'Service Tax / Delivery Fee', rate: '7.5%', taxableSales: '$3,800.00', collectedTax: '$285.00', inputTaxPaid: '$60.00', netTaxDue: '$225.00', filingPeriod: 'Q3 2026' },
  { id: 'TAX-04', taxName: 'Zero-Rated / Fresh Food Exemption', rate: '0.0%', taxableSales: '$18,200.00', collectedTax: '$0.00', inputTaxPaid: '$0.00', netTaxDue: '$0.00', filingPeriod: 'Q3 2026' },
];

export default function TaxReportPage() {
  const columns: ColumnDef<TaxReportRow>[] = [
    {
      accessorKey: 'taxName',
      header: 'Tax Specification',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block">{row.original.taxName}</span>
          <span className="text-xs text-gray-400">ID: {row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: 'rate',
      header: 'VAT / Tax Rate',
      cell: ({ row }) => (
        <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-600">
          {row.original.rate}
        </span>
      ),
    },
    {
      accessorKey: 'taxableSales',
      header: 'Taxable Turnover',
      cell: ({ row }) => <span className="text-xs font-semibold text-gray-800">{row.original.taxableSales}</span>,
    },
    {
      accessorKey: 'collectedTax',
      header: 'Collected (Output)',
      cell: ({ row }) => <span className="text-xs font-bold text-emerald-600">{row.original.collectedTax}</span>,
    },
    {
      accessorKey: 'inputTaxPaid',
      header: 'Purchase Credit (Input)',
      cell: ({ row }) => <span className="text-xs font-medium text-gray-500">{row.original.inputTaxPaid}</span>,
    },
    {
      accessorKey: 'netTaxDue',
      header: 'Net Tax Payable',
      cell: ({ row }) => <span className="text-xs font-black text-gray-900">{row.original.netTaxDue}</span>,
    },
    {
      accessorKey: 'filingPeriod',
      header: 'Filing Cycle',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-medium">{row.original.filingPeriod}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Tax & VAT Report"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports/sales' },
          { label: 'Tax Report' },
        ]}
        actions={
          <Button variant="outline" className="border-gray-200 text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Tax Return (CSV)
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Collected VAT" 
          value="$4,210.00" 
          trend="+8.1%" 
          trendType="up" 
          icon={Receipt} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Purchase Tax Rebate" 
          value="$2,110.00" 
          icon={Scale} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
        <StatsCard 
          label="Net Tax Payable" 
          value="$2,100.00" 
          icon={Percent} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockTaxReport} searchKey="taxName" />
      </div>
    </div>
  );
}
