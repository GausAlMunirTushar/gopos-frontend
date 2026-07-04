'use client';

import React from 'react';
import { 
  Eye, Edit, Trash2, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { ResourceCreateModal } from '@/components/shared/ResourceCreateModal';
import { DataTable } from '@/components/ui/data-table';
import { useLiveRows } from '@/hooks/api/useLiveRows';
import { apiEndpoints } from '@/lib/api/endpoints';
import { actionButtonClassName, designationFields } from '@/lib/api/resource-fields';
import { designationRow, type ApiRecord } from '@/lib/api/row-mappers';
import { ColumnDef } from '@tanstack/react-table';

interface Designation {
  id: string;
  name: string;
  status: string;
  color: string;
}

const designationData: Designation[] = [
  { id: 'DSG001', name: 'Manager', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DSG002', name: 'Supervisor', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DSG003', name: 'Sales Executive', status: 'Active', color: 'bg-green-100 text-green-600' },
];

export default function DesignationList() {
  const { data: designations } = useLiveRows<ApiRecord, Designation>({
    resource: apiEndpoints.hrm.designations,
    fallbackData: designationData,
    mapRow: designationRow,
  });

  const columns: ColumnDef<Designation>[] = [
    {
      accessorKey: 'id',
      header: 'Desig ID',
      cell: ({ row }) => <span className="text-[#FF9F43] font-medium">{row.original.id}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Designation Name',
      cell: ({ row }) => <span className="font-bold text-gray-900">{row.original.name}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const designation = row.original;
        return (
          <span className={`px-2 py-1 rounded text-[11px] font-bold ${designation.color}`}>
            {designation.status}
          </span>
        );
      },
    },
    {
      id: 'actions',
      header: () => <div className="text-center">Action</div>,
      cell: () => (
        <div className="flex items-center justify-center gap-2">
          <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Designations" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Designations' }
        ]}
        actions={
          <ResourceCreateModal
            resource={apiEndpoints.hrm.designations}
            title="Add Designation"
            description="Create an HRM designation."
            fields={designationFields}
            buttonClassName={actionButtonClassName}
          >
            <Plus className="w-4 h-4" /> Add Designation
          </ResourceCreateModal>
        }
      />

      <DataTable 
        columns={columns} 
        data={designations} 
        searchKey="name"
        searchPlaceholder="Search designations..."
        enableSelection={true}
      />
    </div>
  );
}
