'use client';

import React from 'react';
import { 
  Search, RefreshCcw, Eye, Edit, Trash2, Plus, DollarSign, Wallet
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { FilterCard } from '@/components/shared/FilterCard';
import { Input } from '@/components/ui/input';

const expenseData = [
  { id: 'EXP001', category: 'Rent', date: '24 May 2025', amount: '$2,000', status: 'Paid', color: 'bg-green-100 text-green-600' },
  { id: 'EXP002', category: 'Electricity', date: '23 May 2025', amount: '$150', status: 'Pending', color: 'bg-orange-100 text-orange-600' },
  { id: 'EXP003', category: 'Internet', date: '22 May 2025', amount: '$80', status: 'Paid', color: 'bg-green-100 text-green-600' },
];

export default function ExpenseList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Expenses" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance' },
          { label: 'Expenses' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Expense
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Expenses" 
          value="$8,980,097" 
          icon={DollarSign}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Paid" 
          value="$7,500,000" 
          icon={Wallet}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
        <StatsCard 
          label="Pending" 
          value="$1,480,097" 
          icon={RefreshCcw}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatsCard 
          label="This Month" 
          value="$450,000" 
          icon={DollarSign}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
      </div>

      <FilterCard onGenerate={() => {}} buttonLabel="Filter">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Categories</option>
            <option>Rent</option>
            <option>Utilities</option>
            <option>Marketing</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>
        </div>
      </FilterCard>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Expense Transactions</h3>
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
                <th className="p-4 font-bold">Expense ID</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Amount</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900">{row.category}</td>
                  <td className="p-4 text-gray-500">{row.date}</td>
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
