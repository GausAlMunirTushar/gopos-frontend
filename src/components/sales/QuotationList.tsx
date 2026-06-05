'use client';

import React from 'react';
import { 
  Search, FileText, RefreshCcw, Eye, Edit, Trash2, Plus, FileSignature
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { FilterCard } from '@/components/shared/FilterCard';
import { Input } from '@/components/ui/input';

const quotationData = [
  { id: 'QT-001', customer: 'Andrea Willer', date: '24 May 2025', expiry: '30 May 2025', amount: '$4560', status: 'Sent', color: 'bg-blue-100 text-blue-600' },
  { id: 'QT-002', customer: 'Timothy Sands', date: '23 May 2025', expiry: '05 Jun 2025', amount: '$3569', status: 'Accepted', color: 'bg-green-100 text-green-600' },
  { id: 'QT-003', customer: 'Bonnie Rodrigues', date: '22 May 2025', expiry: '25 May 2025', amount: '$2659', status: 'Expired', color: 'bg-red-100 text-red-600' },
];

export default function QuotationList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quotations" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sales', href: '/sales' },
          { label: 'Quotations' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Create Quotation
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Quotations" 
          value="458" 
          icon={FileSignature}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Accepted" 
          value="320" 
          icon={FileSignature}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="Pending" 
          value="138" 
          icon={FileSignature}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <FilterCard onGenerate={() => {}} buttonLabel="Filter">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Quotation ID</label>
          <Input placeholder="Enter Quotation ID" />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Status</option>
            <option>Sent</option>
            <option>Accepted</option>
            <option>Expired</option>
          </select>
        </div>
      </FilterCard>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Quotations</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Search..." className="pl-10 h-9" />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold">Quotation ID</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Expiry Date</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {quotationData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900">{row.customer}</td>
                  <td className="p-4 text-gray-500">{row.date}</td>
                  <td className="p-4 text-gray-500">{row.expiry}</td>
                  <td className="p-4 font-bold text-gray-900">{row.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
