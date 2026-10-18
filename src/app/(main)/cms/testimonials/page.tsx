'use client';

import React from 'react';
import { 
  Star, Plus, Edit2, Trash2, CheckCircle2, 
  MessageSquare, Users, ThumbsUp 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface Testimonial {
  id: string;
  customerName: string;
  designation: string;
  rating: number;
  review: string;
  branch: string;
  date: string;
  status: 'Approved' | 'Pending';
}

const mockTestimonials: Testimonial[] = [
  { id: 'TST-01', customerName: 'Farhan Kabir', designation: 'Verified Buyer', rating: 5, review: 'Super fast POS checkout and invoice generation. The customer service at Dhanmondi branch is fantastic!', branch: 'Dhanmondi Branch', date: '14 Oct 2026', status: 'Approved' },
  { id: 'TST-02', customerName: 'Sabrina Mostafa', designation: 'Loyalty Club Member', rating: 5, review: 'Great discount offers and smooth gift card redemption process. Love shopping here.', branch: 'Gulshan Outlet', date: '11 Oct 2026', status: 'Approved' },
  { id: 'TST-03', customerName: 'Tanvir Hossain', designation: 'Regular Customer', rating: 4, review: 'Very clean barcode receipts and quick return policy when an exchange is needed.', branch: 'Uttara Branch', date: '04 Oct 2026', status: 'Approved' },
  { id: 'TST-04', customerName: 'Rumana Islam', designation: 'New Customer', rating: 5, review: 'Very impressed with the variety of organic grocery products available.', branch: 'Dhanmondi Branch', date: '02 Oct 2026', status: 'Pending' },
];

export default function TestimonialsPage() {
  const columns: ColumnDef<Testimonial>[] = [
    {
      accessorKey: 'customerName',
      header: 'Customer',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.customerName}</span>
          <span className="text-[11px] text-gray-400">{row.original.designation}</span>
        </div>
      ),
    },
    {
      accessorKey: 'rating',
      header: 'Rating',
      cell: ({ row }) => (
        <div className="flex items-center gap-0.5 text-amber-400">
          {[...Array(row.original.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current" />
          ))}
        </div>
      ),
    },
    {
      accessorKey: 'review',
      header: 'Customer Feedback',
      cell: ({ row }) => (
        <p className="text-xs text-gray-600 max-w-sm truncate" title={row.original.review}>
          &ldquo;{row.original.review}&rdquo;
        </p>
      ),
    },
    {
      accessorKey: 'branch',
      header: 'Outlet',
      cell: ({ row }) => <span className="text-xs text-gray-700 font-medium">{row.original.branch}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
          row.original.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
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
        title="Customer Testimonials"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Content (CMS)' },
          { label: 'Testimonials' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add Review
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Average Customer Rating" 
          value="4.8 / 5.0" 
          trend="98% Positive" 
          trendType="up" 
          icon={Star} 
          iconColor="text-amber-500" 
          iconBg="bg-amber-50" 
        />
        <StatsCard 
          label="Approved Testimonials" 
          value="3 Reviews" 
          icon={ThumbsUp} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Pending Review" 
          value="1 Review" 
          icon={MessageSquare} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockTestimonials} searchKey="customerName" />
      </div>
    </div>
  );
}
