'use client';

import React from 'react';
import { 
  FileText, RefreshCcw, Edit, Trash2, FileSpreadsheet, Plus, Eye
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ResourceCreateModal } from '@/components/shared/ResourceCreateModal';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { actionButtonClassName, contactFields } from '@/lib/api/resource-fields';
import { contactRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';
import { useConfirmModal } from '@/hooks/useConfirmModal';
import { useDeleteApiResource } from '@/hooks/api/useApiResource';

interface Customer {
  id?: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: string;
  avatar: string;
}

const customerData: Customer[] = [
  { code: 'CU001', name: 'Carl Evans', email: 'carlevans@example.com', phone: '+12163547758', country: 'Germany', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=1' },
  { code: 'CU002', name: 'Minerva Rameriz', email: 'rameriz@example.com', phone: '+11367529510', country: 'Japan', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=2' },
  { code: 'CU003', name: 'Robert Lamon', email: 'robert@example.com', phone: '+15362789414', country: 'USA', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=3' },
  { code: 'CU004', name: 'Patricia Lewis', email: 'patricia@example.com', phone: '+18513094627', country: 'Austria', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=4' },
  { code: 'CU005', name: 'Mark Joslyn', email: 'markjoslyn@example.com', phone: '+14678219025', country: 'Turkey', status: 'Active', avatar: 'https://i.pravatar.cc/100?img=5' },
];

export default function CustomerList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteCustomer = useDeleteApiResource(apiEndpoints.people.customers);

  const { data: customers } = useLiveRows<ApiRecord, Customer>({
    resource: apiEndpoints.people.customers,
    fallbackData: customerData,
    mapRow: (row, idx) => ({
      ...contactRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (customer: Customer) => {
    confirm({
      title: 'Delete Customer',
      description: 'Are you sure you want to delete this customer? Outstanding balances and transaction history will be preserved in archived records.',
      itemName: `${customer.name} (${customer.code})`,
      confirmText: 'Yes, Delete Customer',
      variant: 'danger',
      onConfirm: async () => {
        if (customer.id) {
          await deleteCustomer.mutateAsync(customer.id);
        }
      },
    });
  };

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'code',
      header: 'Code',
    },
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.avatar} alt={row.original.name} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
    },
    {
      accessorKey: 'country',
      header: 'Country',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-200">
          <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors" title="View details">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit customer">
            <Edit className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete customer"
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
        title="Customers" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Customers' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-gray-50 bg-white shadow-2xs">
               <FileText className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-green-600 hover:bg-gray-50 bg-white shadow-2xs">
               <FileSpreadsheet className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white shadow-2xs">
               <RefreshCcw className="w-5 h-5" />
            </button>
            <ResourceCreateModal
              resource={apiEndpoints.people.customers}
              title="Add Customer"
              description="Create a tenant-scoped customer record."
              fields={contactFields('CUSTOMER')}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Customer
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={customers} 
        searchKey="name"
        searchPlaceholder="Search customers..."
        enableSelection
        filters={[
          {
            column: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Inactive', value: 'Inactive' },
            ]
          }
        ]}
      />
    </div>
  );
}
