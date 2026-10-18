'use client';

import React from 'react';
import { 
  BookOpen, Plus, Edit2, Trash2, Eye, Calendar, Sparkles 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  publishedDate: string;
  readTime: string;
  status: 'Published' | 'Draft';
}

const mockBlogs: BlogPost[] = [
  { id: 'BLG-01', title: 'Top 10 Inventory Best Practices for Retailers in 2026', category: 'Inventory & POS', author: 'Retail Team', publishedDate: '15 Oct 2026', readTime: '5 min read', status: 'Published' },
  { id: 'BLG-02', title: 'How Automated Barcode Scanning Accelerates Checkout Speed', category: 'Technology', author: 'Tech Lead', publishedDate: '08 Oct 2026', readTime: '4 min read', status: 'Published' },
  { id: 'BLG-03', title: 'Managing Seasonal Discounts & Festive Promotions Efficiently', category: 'Marketing', author: 'Store Manager', publishedDate: '29 Sep 2026', readTime: '6 min read', status: 'Published' },
  { id: 'BLG-04', title: 'Employee Attendance & Shift Planning Guide', category: 'HRM', author: 'HR Dept', publishedDate: '—', readTime: '4 min read', status: 'Draft' },
];

export default function BlogPage() {
  const columns: ColumnDef<BlogPost>[] = [
    {
      accessorKey: 'title',
      header: 'Article Title',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.title}</span>
          <span className="text-[11px] text-gray-400">{row.original.readTime}</span>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Topic Category',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-600">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: 'author',
      header: 'Author',
      cell: ({ row }) => <span className="text-xs text-gray-700 font-medium">{row.original.author}</span>,
    },
    {
      accessorKey: 'publishedDate',
      header: 'Date',
      cell: ({ row }) => <span className="text-xs text-gray-500 font-medium">{row.original.publishedDate}</span>,
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
        title="Store Blog & News"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Content (CMS)' },
          { label: 'Blog' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Write Article
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total Articles" 
          value="4 Posts" 
          icon={BookOpen} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Published Online" 
          value="3 Live" 
          icon={Eye} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Draft Articles" 
          value="1 In Review" 
          icon={Sparkles} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockBlogs} searchKey="title" />
      </div>
    </div>
  );
}
