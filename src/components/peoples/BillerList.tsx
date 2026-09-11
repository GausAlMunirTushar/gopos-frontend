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

interface Biller {
  id?: string;
  code: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  status: string;
}

const billerData: Biller[] = [
  { id: '1', code: 'BI001', name: 'Shaun Farley', company: 'GreenTech Industries', email: 'shaun@example.com', phone: '+18647961254', country: 'USA', status: 'Active' },
  { id: '2', code: 'BI002', name: 'Jenny Ellis', company: 'BlueSky Logistics', email: 'jenny@example.com', phone: '+13197521863', country: 'Germany', status: 'Active' },
  { id: '3', code: 'BI003', name: 'Leon Baxter', company: 'EcoFarm Organics', email: 'leon@example.com', phone: '+18496275831', country: 'Japan', status: 'Active' },
  { id: '4', code: 'BI004', name: 'Karen Flores', company: 'SmartTech Solutions', email: 'karen@example.com', phone: '+18731498524', country: 'Austria', status: 'Active' },
  { id: '5', code: 'BI005', name: 'Michael Dawson', company: 'Fresh Supplies', email: 'michael@example.com', phone: '+12876928738', country: 'Turkey', status: 'Active' },
  { id: '6', code: 'BI006', name: 'Karen Galvan', company: 'BrightSource Lighting', email: 'karen@example.com', phone: '+17534896148', country: 'Mexico', status: 'Active' },
  { id: '7', code: 'BI007', name: 'Thomas Ward', company: 'GlobalTech Industries', email: 'thomas@example.com', phone: '+16482479624', country: 'France', status: 'Active' },
  { id: '8', code: 'BI008', name: 'Aliza Duncan', company: 'HealthWell Pharma', email: 'aliza@example.com', phone: '+13175964827', country: 'Greece', status: 'Active' },
  { id: '9', code: 'BI009', name: 'James Higham', company: 'HomeStyle Furnishings', email: 'james@example.com', phone: '+13875196482', country: 'Italy', status: 'Active' },
  { id: '10', code: 'BI010', name: 'Jada Robinson', company: 'EcoLogistics Partners', email: 'robinson@example.com', phone: '+17586143284', country: 'China', status: 'Active' },
];

export default function BillerList() {
  const { confirm, ConfirmDialogComponent } = useConfirmModal();
  const deleteBiller = useDeleteApiResource(apiEndpoints.people.billers);

  const { data: billers } = useLiveRows<ApiRecord, Biller>({
    resource: apiEndpoints.people.billers,
    fallbackData: billerData,
    mapRow: (row, idx) => ({
      ...contactRow(row, idx),
      id: String(row.id || ''),
    }),
  });

  const handleDelete = (biller: Biller) => {
    confirm({
      title: 'Delete Biller',
      description: 'Are you sure you want to delete this biller profile? Their invoicing history and signature authority will be revoked.',
      itemName: `${biller.name} (${biller.code})`,
      confirmText: 'Delete Biller',
      variant: 'danger',
      onConfirm: async () => {
        if (biller.id) {
          await deleteBiller.mutateAsync(biller.id);
        }
      },
    });
  };

  const columns: ColumnDef<Biller>[] = [
    { accessorKey: 'code', header: 'Code' },
    {
      accessorKey: 'name',
      header: 'Biller',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/100?img=${row.index + 20}`} alt={row.original.name} className="w-8 h-8 rounded-full object-cover" />
          <span className="font-medium text-gray-900">{row.original.name}</span>
        </div>
      ),
    },
    { accessorKey: 'company', header: 'Company Name' },
    { accessorKey: 'email', header: 'Email' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'country', header: 'Country' },
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
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors" title="View details"><Eye className="w-4 h-4" /></button>
          <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors" title="Edit biller"><Edit className="w-4 h-4" /></button>
          <button 
            onClick={() => handleDelete(row.original)}
            className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors cursor-pointer" 
            title="Delete biller"
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
        title="Billers" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Billers' }
        ]}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-gray-50 bg-white">
               <FileText className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-green-600 hover:bg-gray-50 bg-white">
               <FileSpreadsheet className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
               <RefreshCcw className="w-5 h-5" />
            </button>
            <ResourceCreateModal
              resource={apiEndpoints.people.billers}
              title="Add Biller"
              description="Create a tenant-scoped biller record."
              fields={contactFields('BILLER')}
              buttonClassName={actionButtonClassName}
            >
              <Plus className="w-4 h-4" /> Add Biller
            </ResourceCreateModal>
          </div>
        }
      />

      <DataTable 
        columns={columns} 
        data={billers} 
        searchKey="name"
        searchPlaceholder="Search billers..."
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
