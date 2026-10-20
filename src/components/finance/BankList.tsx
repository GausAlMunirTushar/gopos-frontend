'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus, Landmark
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ResourceCreateModal } from '@/components/shared/ResourceCreateModal';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { actionButtonClassName, bankFields } from '@/lib/api/resource-fields';
import { bankRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { useCurrency } from '@/hooks/useCurrency';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Bank {
  id: string;
  name: string;
  accountName: string;
  accountNo: string;
  balance: string;
  status: string;
  color: string;
}

const bankData: Bank[] = [
  { id: 'BNK001', name: 'Dutch Bangla Bank', accountName: 'BikriPOS Main Account', accountNo: '****1234', balance: '৳450,000', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'BNK002', name: 'BRAC Bank', accountName: 'BikriPOS Savings Account', accountNo: '****5678', balance: '৳124,500', status: 'Active', color: 'bg-green-100 text-green-600' },
];

export default function BankList() {
  const { formatCurrency } = useCurrency();
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteBank = useDeleteApiResource(apiEndpoints.finance.banks);

  const { data: banks } = useLiveRows<ApiRecord, Bank>({
    resource: apiEndpoints.finance.banks,
    fallbackData: bankData,
    mapRow: (row, idx) => ({
      ...bankRow(row, idx),
      id: String(row.id || `BNK${String(idx + 1).padStart(3, '0')}`),
    }),
  });

  const handleDelete = (bank: Bank) => {
    confirm({
      title: 'Delete Bank Account',
      description: 'Are you sure you want to delete this bank account? Please ensure all active payment methods linked to this account are updated.',
      itemName: `${bank.name} - ${bank.accountName} (${bank.accountNo})`,
      confirmText: 'Delete Account',
      variant: 'danger',
      onConfirm: async () => {
        if (bank.id) {
          await deleteBank.mutateAsync(bank.id);
        }
      },
    });
  };

  const columns: ColumnDef<Bank>[] = [
    {
      accessorKey: 'id',
      header: 'Bank ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Bank Name',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.name}</span>,
    },
    {
      accessorKey: 'accountName',
      header: 'Account Name',
      cell: ({ row }) => <span className="text-gray-500">{row.original.accountName}</span>,
    },
    {
      accessorKey: 'accountNo',
      header: 'Account No',
      cell: ({ row }) => <span className="text-gray-500">{row.original.accountNo}</span>,
    },
    {
      accessorKey: 'balance',
      header: 'Balance',
      cell: ({ row }) => <span className="font-bold text-gray-900">{formatCurrency(row.getValue('balance') as string)}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const bank = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${bank.color}`}>
            {bank.status}
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
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors" title="Edit account">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer" 
            title="Delete account"
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
        title="Bank Accounts" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance' },
          { label: 'Banks' }
        ]}
        actions={
          <ResourceCreateModal
            resource={apiEndpoints.finance.banks}
            title="Add Bank Account"
            description="Create a bank/cash account for tenant payments and finance tracking."
            fields={bankFields}
            buttonClassName={actionButtonClassName}
          >
            <Plus className="w-4 h-4" /> Add Account
          </ResourceCreateModal>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Balance" 
          value={formatCurrency("574500")} 
          icon={Landmark}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Accounts" 
          value="2" 
          icon={Landmark}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <DataTable 
        columns={columns} 
        data={banks} 
        searchKey="name"
        searchPlaceholder="Search banks..."
        enableSelection={true}
      />
    </div>
  );
}
