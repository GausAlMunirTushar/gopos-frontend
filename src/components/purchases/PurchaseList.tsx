'use client';

import React from 'react';
import { 
  Search, FileText, RefreshCcw, Eye, Edit, Trash2, Plus, ShoppingBasket
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { FilterCard } from '@/components/shared/FilterCard';
import { Input } from '@/components/ui/input';

const purchaseData = [
  { id: 'PR001', supplier: 'Apex Computers', date: '24 May 2025', status: 'Received', payment: 'Paid', total: '$12,500', color: 'bg-teal-500' },
  { id: 'PR002', supplier: 'Beats Electronics', date: '23 May 2025', status: 'Pending', payment: 'Partial', total: '$8,600', color: 'bg-orange-500' },
  { id: 'PR003', supplier: 'Nike Global', date: '22 May 2025', status: 'Ordered', payment: 'Unpaid', total: '$5,400', color: 'bg-blue-500' },
];

export default function PurchaseList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Purchase List" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Purchases' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Purchase
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Purchases" 
          value="$24,145,789" 
          icon={ShoppingBasket}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Purchase Returns" 
          value="$18,458,747" 
          icon={RefreshCcw}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Pending Payments" 
          value="$2,458,000" 
          icon={FileText}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
      </div>

      <FilterCard onGenerate={() => {}} buttonLabel="Filter">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Supplier</label>
          <Input placeholder="Search Supplier" />
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Status</option>
            <option>Received</option>
            <option>Pending</option>
            <option>Ordered</option>
          </select>
        </div>
      </FilterCard>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Purchases</h3>
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
                <th className="p-4 font-bold">Purchase ID</th>
                <th className="p-4 font-bold">Supplier</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Payment</th>
                <th className="p-4 font-bold">Total</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900">{row.supplier}</td>
                  <td className="p-4 text-gray-500">{row.date}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded flex items-center gap-1 w-max ${row.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${
                      row.payment === 'Paid' ? 'bg-green-50 text-green-600' : 
                      row.payment === 'Partial' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                    }`}>
                      {row.payment}
                    </span>
                  </td>
                  <td className="p-4 font-bold text-gray-900">{row.total}</td>
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
