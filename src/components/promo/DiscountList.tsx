'use client';

import React from 'react';
import { 
  Percent, Eye, Edit, Trash2, Plus, Tag
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { couponRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Discount {
  id: string;
  code: string;
  discount: string;
  type: string;
  expiry: string;
  status: string;
  color: string;
}

const discountData: Discount[] = [
  { id: 'DSC001', code: 'EID2025', discount: '15%', type: 'Percentage', expiry: '30 Jun 2025', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DSC002', code: 'SUMMER500', discount: '৳500', type: 'Fixed', expiry: '15 Jul 2025', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DSC003', code: 'NEWUSER', discount: '10%', type: 'Percentage', expiry: '31 Dec 2025', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DSC004', code: 'FLASH50', discount: '50%', type: 'Percentage', expiry: '01 May 2025', status: 'Expired', color: 'bg-red-100 text-red-600' },
];

export default function DiscountList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteDiscount = useDeleteApiResource(apiEndpoints.promo.coupons);

  const { data: discounts } = useLiveRows<ApiRecord, Discount>({
    resource: apiEndpoints.promo.coupons,
    fallbackData: discountData,
    mapRow: (row, idx) => ({
      ...couponRow(row, idx),
      id: String(row.id || `DSC${String(idx + 1).padStart(3, '0')}`),
    }),
  });

  const handleDelete = (discount: Discount) => {
    confirm({
      title: 'Delete Discount Campaign',
      description: 'Are you sure you want to delete this discount campaign? The promo code will become inactive immediately.',
      itemName: `${discount.code} (${discount.discount} ${discount.type})`,
      confirmText: 'Delete Discount',
      variant: 'danger',
      onConfirm: async () => {
        if (discount.id) {
          await deleteDiscount.mutateAsync(discount.id);
        }
      },
    });
  };

  const columns: ColumnDef<Discount>[] = [
    {
      accessorKey: 'code',
      header: 'Discount Code',
      cell: ({ row }) => <span className="font-bold text-[#FF9F43]">{row.original.code}</span>,
    },
    {
      accessorKey: 'discount',
      header: 'Discount Value',
      cell: ({ row }) => <span className="font-semibold text-gray-900">{row.original.discount}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <span className="text-gray-600">{row.original.type}</span>,
    },
    {
      accessorKey: 'expiry',
      header: 'Valid Till',
      cell: ({ row }) => <span className="text-gray-500">{row.original.expiry}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`px-2 py-1 rounded text-[11px] font-bold ${row.original.color}`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View details">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit discount">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete discount"
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
        title="Discounts & Promos" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Promo' },
          { label: 'Discounts' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Discount
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Active Campaigns" 
          value="12" 
          icon={Tag}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="Total Redemptions" 
          value="1,450" 
          icon={Percent}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Discount Savings Given" 
          value="৳85,400" 
          icon={Tag}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={discounts} 
        searchKey="code"
        searchPlaceholder="Search discount code..."
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Expired', value: 'Expired' },
              { label: 'Inactive', value: 'Inactive' },
            ]
          }
        ]}
      />
    </div>
  );
}
