'use client';

import React from 'react';
import { 
  HelpCircle, Plus, Edit2, Trash2, MessageCircle, 
  HelpCircle as QuestionIcon, CheckCircle2 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';

interface FaqItem {
  id: string;
  question: string;
  category: string;
  answer: string;
  order: number;
  status: 'Published' | 'Draft';
}

const mockFaqs: FaqItem[] = [
  { id: 'FAQ-01', question: 'What payment methods are supported at checkout counters?', category: 'Payments', answer: 'We accept Cash, bKash, Nagad, Visa, Mastercard, and store gift cards.', order: 1, status: 'Published' },
  { id: 'FAQ-02', question: 'How can a customer return or exchange an item?', category: 'Returns & Refunds', answer: 'Items can be returned within 7 days with the original printed receipt and unbroken barcodes.', order: 2, status: 'Published' },
  { id: 'FAQ-03', question: 'How does the customer loyalty membership point system work?', category: 'Loyalty Club', answer: 'Customers earn 1 reward point for every ৳100 spent, which can be redeemed on future sales.', order: 3, status: 'Published' },
  { id: 'FAQ-04', question: 'Can purchases be split across multiple payment methods?', category: 'Payments', answer: 'Yes, our POS terminal supports split billing (e.g. part cash, part mobile banking).', order: 4, status: 'Published' },
];

export default function FaqPage() {
  const columns: ColumnDef<FaqItem>[] = [
    {
      accessorKey: 'question',
      header: 'Frequently Asked Question',
      cell: ({ row }) => (
        <div>
          <span className="font-bold text-gray-900 block text-xs">{row.original.question}</span>
          <p className="text-[11px] text-gray-500 max-w-md truncate mt-0.5">{row.original.answer}</p>
        </div>
      ),
    },
    {
      accessorKey: 'category',
      header: 'Category',
      cell: ({ row }) => (
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-orange-50 text-orange-600">
          {row.original.category}
        </span>
      ),
    },
    {
      accessorKey: 'order',
      header: 'Order Priority',
      cell: ({ row }) => <span className="text-xs font-bold text-gray-700">#{row.original.order}</span>,
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
        title="Frequently Asked Questions (FAQ)"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Content (CMS)' },
          { label: 'FAQ' },
        ]}
        actions={
          <Button className="bg-[#FF9F43] hover:bg-orange-600 text-white flex items-center gap-2 rounded-xl">
            <Plus className="w-4 h-4" /> Add FAQ Item
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatsCard 
          label="Total FAQ Entries" 
          value="4 Questions" 
          icon={HelpCircle} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Published Online" 
          value="4 Live" 
          icon={CheckCircle2} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
        <StatsCard 
          label="Top Category" 
          value="Payments & Returns" 
          icon={MessageCircle} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-xs">
        <DataTable columns={columns} data={mockFaqs} searchKey="question" />
      </div>
    </div>
  );
}
