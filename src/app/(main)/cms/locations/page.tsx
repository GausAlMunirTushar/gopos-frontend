'use client';

import React from 'react';
import { 
  MapPin, Plus, Edit2, Trash2, Store, Phone, Globe 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface StoreLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  type: 'Flagship Store' | 'Retail Outlet' | 'Central Warehouse';
  status: 'Open' | 'Closed';
}

const mockLocations: StoreLocation[] = [
  { id: 'LOC-01', name: 'Dhanmondi Flagship Outlet', address: 'House 42, Road 7/A, Dhanmondi', city: 'Dhaka', country: 'Bangladesh', phone: '+880 1711-000111', type: 'Flagship Store', status: 'Open' },
  { id: 'LOC-02', name: 'Gulshan Premium Store', address: 'Avenue 2, Circle 2, Gulshan', city: 'Dhaka', country: 'Bangladesh', phone: '+880 1819-000222', type: 'Retail Outlet', status: 'Open' },
  { id: 'LOC-03', name: 'Uttara Retail Branch', address: 'Sector 3, Jashimuddin Road', city: 'Dhaka', country: 'Bangladesh', phone: '+880 1912-000333', type: 'Retail Outlet', status: 'Open' },
  { id: 'LOC-04', name: 'Tejgaon Central Depot', address: 'Plot 12, Industrial Area, Tejgaon', city: 'Dhaka', country: 'Bangladesh', phone: '+880 1610-000444', type: 'Central Warehouse', status: 'Open' },
];

export default function LocationsPage() {
  const columns: ColumnDef<StoreLocation>[] = [
    {
      accessorKey: 'name',
      header: 'Outlet / Location',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.name}</span>
          <span className="text-[11px] text-gray-400">{row.original.address}</span>
        </div>
      ),
    },
    {
      accessorKey: 'city',
      header: 'City & Country',
      cell: ({ row }) => (
        <span className="text-xs text-gray-700 font-medium">
          {row.original.city}, {row.original.country}
        </span>
      ),
    },
    {
      accessorKey: 'type',
      header: 'Facility Type',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-600">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: 'phone',
      header: 'Contact Phone',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-mono">{row.original.phone}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'
        }`}>
          {row.original.status}
        </span>
      ),
    },
    {
      id: 'actions',
      header: 'Action',
      cell: () => (
        <div className="flex items-center gap-1.5">
          <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Store Locations"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Content (CMS)' },
          { label: 'Locations' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add Location
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Facilities" 
          value="4 Locations" 
          icon={MapPin} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Open Outlets" 
          value="4 Stores" 
          icon={Store} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Central Warehouse" 
          value="1 Facility" 
          icon={Globe} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockLocations} searchKey="name" />
      </div>
    </div>
  );
}
