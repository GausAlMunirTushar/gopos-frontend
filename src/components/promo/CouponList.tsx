'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, Ticket, Gift, Percent
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

interface Coupon {
  id: string;
  code: string;
  discount: string;
  type: string;
  expiry: string;
  status: string;
  color: string;
}

const couponData: Coupon[] = [
  { id: 'CPN001', code: 'WELCOME10', discount: '10%', type: 'Fixed', expiry: '24 May 2025', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'CPN002', code: 'SUMMER20', discount: '20%', type: 'Percentage', expiry: '23 May 2025', status: 'Expired', color: 'bg-red-100 text-red-600' },
];

export default function CouponList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteCoupon = useDeleteApiResource(apiEndpoints.promo.coupons);

  const { data: coupons } = useLiveRows<ApiRecord, Coupon>({
    resource: apiEndpoints.promo.coupons,
    fallbackData: couponData,
    mapRow: (row, idx) => ({
      ...couponRow(row, idx),
      id: String(row.id || `CPN${String(idx + 1).padStart(3, '0')}`),
    }),
  });

  const handleDelete = (coupon: Coupon) => {
    confirm({
      title: 'Delete Coupon',
      description: 'Are you sure you want to delete this coupon? Customers will no longer be able to apply this promotion code at checkout.',
      itemName: `${coupon.code} (${coupon.discount} ${coupon.type})`,
      confirmText: 'Delete Coupon',
      variant: 'danger',
      onConfirm: async () => {
        if (coupon.id) {
          await deleteCoupon.mutateAsync(coupon.id);
        }
      },
    });
  };

  const columns: ColumnDef<Coupon>[] = [
    {
      accessorKey: 'id',
      header: 'Coupon ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'code',
      header: 'Code',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.code}</span>,
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: ({ row }) => <span className="text-gray-500">{row.original.discount}</span>,
    },
    {
      accessorKey: 'type',
      header: 'Type',
      cell: ({ row }) => <span className="text-gray-500">{row.original.type}</span>,
    },
    {
      accessorKey: 'expiry',
      header: 'Expiry Date',
      cell: ({ row }) => <span className="text-gray-500">{row.original.expiry}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const coupon = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${coupon.color}`}>
            {coupon.status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors" title="View details">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit coupon">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete coupon"
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
        title="Coupons" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Promo' },
          { label: 'Coupons' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Coupon
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Active Coupons" 
          value="45" 
          icon={Ticket}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Used" 
          value="1,245" 
          icon={Percent}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard 
          label="Gift Cards" 
          value="85" 
          icon={Gift}
          iconColor="text-pink-600"
          iconBg="bg-pink-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={coupons} 
        searchKey="code"
        searchPlaceholder="Enter Code..."
        enableSelection={true}
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Expired', value: 'Expired' },
            ]
          }
        ]}
      />
    </div>
  );
}
