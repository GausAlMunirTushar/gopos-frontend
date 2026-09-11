'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, Gift
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { giftCardRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface GiftCard {
  id: string;
  customer: string;
  amount: string;
  balance: string;
  expiry: string;
  status: string;
  color: string;
}

const giftCardData: GiftCard[] = [
  { id: 'GC001', customer: 'Andrea Willer', amount: '৳100', balance: '৳80', expiry: '24 May 2025', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'GC002', customer: 'Timothy Sands', amount: '৳50', balance: '৳0', expiry: '20 May 2025', status: 'Used', color: 'bg-gray-100 text-gray-600' },
];

export default function GiftCardList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteGiftCard = useDeleteApiResource(apiEndpoints.promo.giftCards);

  const { data: giftCards } = useLiveRows<ApiRecord, GiftCard>({
    resource: apiEndpoints.promo.giftCards,
    fallbackData: giftCardData,
    mapRow: (row, idx) => ({
      ...giftCardRow(row, idx),
      id: String(row.id || `GC${String(idx + 1).padStart(3, '0')}`),
    }),
  });

  const handleDelete = (card: GiftCard) => {
    confirm({
      title: 'Delete Gift Card',
      description: 'Are you sure you want to delete this gift card? Its remaining balance will become unusable.',
      itemName: `${card.id} - ${card.customer} (${card.balance} remaining)`,
      confirmText: 'Delete Card',
      variant: 'danger',
      onConfirm: async () => {
        if (card.id) {
          await deleteGiftCard.mutateAsync(card.id);
        }
      },
    });
  };

  const columns: ColumnDef<GiftCard>[] = [
    {
      accessorKey: 'id',
      header: 'Card ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'customer',
      header: 'Customer',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.customer}</span>,
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span className="text-gray-500">{row.original.amount}</span>,
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => <span className="text-gray-500">{row.original.balance}</span>,
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
        const giftCard = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${giftCard.color}`}>
            {giftCard.status}
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
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit gift card">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete gift card"
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
        title="Gift Cards" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Promo' },
          { label: 'Gift Cards' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Gift Card
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Issued" 
          value="458" 
          icon={Gift}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Balance" 
          value="৳12,450" 
          icon={Gift}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={giftCards} 
        searchKey="customer"
        searchPlaceholder="Search customer..."
        enableSelection={true}
      />
    </div>
  );
}
