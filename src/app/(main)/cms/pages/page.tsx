'use client';

import React from 'react';
import { 
  Files, Plus, Edit2, Trash2, Globe, ExternalLink 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface CmsPageItem {
  id: string;
  title: string;
  slug: string;
  lastUpdated: string;
  status: 'Published' | 'Draft';
  views: number;
}

const mockCmsPages: CmsPageItem[] = [
  { id: 'PG-01', title: 'Privacy Policy', slug: '/privacy-policy', lastUpdated: '12 Oct 2026', status: 'Published', views: 1420 },
  { id: 'PG-02', title: 'Terms of Service', slug: '/terms-of-service', lastUpdated: '10 Oct 2026', status: 'Published', views: 980 },
  { id: 'PG-03', title: 'About Our Store', slug: '/about', lastUpdated: '04 Oct 2026', status: 'Published', views: 3200 },
  { id: 'PG-04', title: 'Refund & Return Policy', slug: '/refund-policy', lastUpdated: '28 Sep 2026', status: 'Draft', views: 0 },
];

export default function CmsPagesPage() {
  const columns: ColumnDef<CmsPageItem>[] = [
    {
      accessorKey: 'title',
      header: 'Page Title',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.title}</span>
          <span className="text-[11px] text-gray-400 font-mono">{row.original.slug}</span>
        </div>
      ),
    },
    {
      accessorKey: 'lastUpdated',
      header: 'Last Modified',
      cell: ({ row }) => <span className="text-xs text-gray-600 font-medium">{row.original.lastUpdated}</span>,
    },
    {
      accessorKey: 'views',
      header: 'Page Views',
      cell: ({ row }) => (
        <span className="text-xs font-bold text-gray-800 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded">
          {row.original.views.toLocaleString()} Views
        </span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Published' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-600'
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
        title="CMS Pages"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Content (CMS)' },
          { label: 'Pages' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Create Page
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Content Pages" 
          value="4 Pages" 
          icon={Files} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Live Published" 
          value="3 Pages" 
          icon={Globe} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Total Engagement" 
          value="5,600 Views" 
          trend="+12%" 
          trendType="up" 
          icon={Globe} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockCmsPages} searchKey="title" />
      </div>
    </div>
  );
}
