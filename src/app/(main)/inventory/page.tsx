'use client';

import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Download, RefreshCw, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  quantity: number;
  reorderLevel: number;
  lastUpdated: string;
};

const data: InventoryItem[] = [
  { id: '1', sku: 'CB-002', name: 'Coffee Beans - Premium', quantity: 120, reorderLevel: 50, lastUpdated: 'Today, 08:30 AM' },
  { id: '2', sku: 'PK-003', name: 'Paper Cups 12oz', quantity: 4500, reorderLevel: 1000, lastUpdated: 'Yesterday' },
  { id: '3', sku: 'ING-004', name: 'Milk - Whole (Gallon)', quantity: 12, reorderLevel: 20, lastUpdated: 'Today, 09:15 AM' },
  { id: '4', sku: 'ING-005', name: 'Caramel Syrup (Bottle)', quantity: 0, reorderLevel: 10, lastUpdated: 'Oct 23, 2023' },
  { id: '5', sku: 'ING-007', name: 'Green Tea Bags', quantity: 40, reorderLevel: 50, lastUpdated: 'Oct 22, 2023' },
];

export const columns: ColumnDef<InventoryItem>[] = [
  {
    accessorKey: 'sku',
    header: 'SKU',
    cell: ({ row }) => <div className="font-medium text-gray-900">{row.getValue('sku')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Item Name',
  },
  {
    accessorKey: 'quantity',
    header: () => <div className="text-right">On Hand</div>,
    cell: ({ row }) => {
      const quantity = row.original.quantity;
      const reorderLevel = row.original.reorderLevel;
      const isLow = quantity <= reorderLevel && quantity > 0;
      const isOut = quantity === 0;

      return (
        <div className="flex items-center justify-end gap-2">
          {isOut && <AlertTriangle className="w-4 h-4 text-red-500" />}
          {isLow && <AlertTriangle className="w-4 h-4 text-orange-500" />}
          <span className={`font-semibold ${isOut ? 'text-red-600' : isLow ? 'text-orange-600' : 'text-gray-900'}`}>
            {quantity}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'reorderLevel',
    header: () => <div className="text-right">Reorder Level</div>,
    cell: ({ row }) => <div className="text-right text-gray-500">{row.getValue('reorderLevel')}</div>,
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: ({ row }) => <div className="text-gray-500">{row.getValue('lastUpdated')}</div>,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <Button variant="outline" size="sm" className="text-[#FF9F43] border-[#FF9F43] hover:bg-orange-50">
            Adjust
          </Button>
        </div>
      );
    },
  },
];

export default function InventoryPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-500 text-sm mt-1">Track stock levels and manage reorders.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Sync
          </Button>
          <Button className="bg-[#FF9F43] hover:bg-orange-500 text-white flex items-center gap-2">
            <Download className="w-4 h-4" /> Export Report
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
