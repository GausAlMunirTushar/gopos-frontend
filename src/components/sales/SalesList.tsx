'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Eye, Edit, Trash2, Plus,
  FileSpreadsheet, ShoppingCart, Package
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { saleRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Sale {
  id: string;
  customer: string;
  date: string;
  status: string;
  payment: string;
  total: string;
  baddr: string;
  color: string;
  rawId?: string;
}

const salesData: Sale[] = [
  { id: 'SL001', customer: 'Andrea Willer', date: '24 May 2025', status: 'Completed', payment: 'Paid', total: '৳4560', baddr: 'USA', color: 'bg-teal-500' },
  { id: 'SL002', customer: 'Timothy Sands', date: '23 May 2025', status: 'Completed', payment: 'Paid', total: '৳3569', baddr: 'UAE', color: 'bg-teal-500' },
  { id: 'SL003', customer: 'Bonnie Rodrigues', date: '22 May 2025', status: 'Pending', payment: 'Unpaid', total: '৳2659', baddr: 'Germany', color: 'bg-orange-500' },
  { id: 'SL004', customer: 'Randy McCree', date: '21 May 2025', status: 'Completed', payment: 'Paid', total: '৳2155', baddr: 'Belgium', color: 'bg-teal-500' },
  { id: 'SL005', customer: 'Carlos Curran', date: '20 May 2025', status: 'Cancelled', payment: 'Refunded', total: '৳1250', baddr: 'Greenland', color: 'bg-red-500' },
];

export default function SalesList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteSale = useDeleteApiResource(apiEndpoints.sales.sales);

  const { data: sales } = useLiveRows<ApiRecord, Sale>({
    resource: apiEndpoints.sales.sales,
    fallbackData: salesData,
    mapRow: (row, idx) => ({
      ...saleRow(row, idx),
      rawId: String(row.id || ''),
    }),
  });

  const handleDelete = (sale: Sale) => {
    confirm({
      title: 'Cancel / Delete Sale',
      description: 'Are you sure you want to delete this sale record? Payment invoices and inventory lot movements linked to this order will be reconciled.',
      itemName: `${sale.id} - ${sale.customer} (${sale.total})`,
      confirmText: 'Yes, Delete Sale',
      variant: 'danger',
      onConfirm: async () => {
        if (sale.rawId) {
          await deleteSale.mutateAsync(sale.rawId);
        }
      },
    });
  };

  const columns: ColumnDef<Sale>[] = [
    {
      accessorKey: 'id',
      header: 'Sale ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer Name',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/150?u=${row.original.customer}`} alt={row.original.customer} className="w-8 h-8 rounded-full bg-gray-100" />
          <div>
            <p className="font-bold text-gray-900">{row.original.customer}</p>
            <p className="text-[11px] text-gray-500">{row.original.baddr}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: 'Date',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded flex items-center gap-1 w-max ${row.original.color}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      accessorKey: 'payment',
      header: 'Payment',
      cell: ({ row }) => {
        const payment = row.getValue('payment') as string;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${
            payment === 'Paid' ? 'bg-green-50 text-green-600' : 
            payment === 'Unpaid' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
          }`}>
            {payment}
          </span>
        );
      },
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.getValue('total')}</span>,
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View details">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit sale">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete sale"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <ConfirmDialogComponent />

      <PageHeader 
        title="Sales List" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sales List' }
        ]}
        actions={
          <>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white transition-colors shadow-2xs">
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors shadow-xs">
              <Plus className="w-4 h-4" /> Add Sale
            </button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Sales" 
          value="৳48,988,078" 
          trend="22%" 
          trendType="up"
          icon={ShoppingCart}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Sales Returns" 
          value="৳16,478,145" 
          trend="12%" 
          trendType="down"
          icon={RefreshCcw}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard 
          label="Invoices" 
          value="8,690" 
          trend="15%" 
          trendType="up"
          icon={FileText}
          iconColor="text-pink-600"
          iconBg="bg-pink-50"
        />
        <StatsCard 
          label="Pending Payments" 
          value="৳12,458,747" 
          trend="8%" 
          trendType="up"
          icon={Package}
          iconColor="text-orange-500"
          iconBg="bg-orange-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={sales} 
        searchKey="customer"
        searchPlaceholder="Search customer..."
        actions={
          <>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-gray-50 bg-white transition-colors shadow-2xs">
              <FileText className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-green-600 hover:bg-gray-50 bg-white transition-colors shadow-2xs">
              <FileSpreadsheet className="w-4 h-4" />
            </button>
          </>
        }
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Completed', value: 'Completed' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Cancelled', value: 'Cancelled' },
            ]
          },
          {
            column: 'payment',
            label: 'All Payments',
            options: [
              { label: 'Paid', value: 'Paid' },
              { label: 'Unpaid', value: 'Unpaid' },
              { label: 'Refunded', value: 'Refunded' },
            ]
          }
        ]}
      />
    </div>
  );
}
