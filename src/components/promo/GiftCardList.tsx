'use client';

import React from 'react';
import { 
  Search, Eye, Edit, Trash2, Plus, Gift
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { FilterCard } from '@/components/shared/FilterCard';
import { Input } from '@/components/ui/input';

const giftCardData = [
  { id: 'GC001', customer: 'Andrea Willer', amount: '$100', balance: '$80', expiry: '24 May 2025', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'GC002', customer: 'Timothy Sands', amount: '$50', balance: '$0', expiry: '20 May 2025', status: 'Used', color: 'bg-gray-100 text-gray-600' },
];

export default function GiftCardList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Gift Cards" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Promo' },
          { label: 'Gift Cards' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Gift Card
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard 
          label="Total Issued" 
          value="458" 
          icon={Gift}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Balance" 
          value="$12,450" 
          icon={Gift}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Gift Cards</h3>
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
                <th className="p-4 font-bold">Card ID</th>
                <th className="p-4 font-bold">Customer</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Balance</th>
                <th className="p-4 font-bold">Expiry Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {giftCardData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900">{row.customer}</td>
                  <td className="p-4 text-gray-500">{row.amount}</td>
                  <td className="p-4 text-gray-500">{row.balance}</td>
                  <td className="p-4 text-gray-500">{row.expiry}</td>
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
