'use client';

import React from 'react';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronDown,
  FileSpreadsheet, Calendar, TrendingUp, Users, Package,
  ShoppingCart, MoreVertical, Eye, Edit, Trash2, Plus
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { FilterCard } from '@/components/shared/FilterCard';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const salesData = [
  { id: 'SL001', customer: 'Andrea Willer', date: '24 May 2025', status: 'Completed', payment: 'Paid', total: '$4560', baddr: 'USA', color: 'bg-teal-500' },
  { id: 'SL002', customer: 'Timothy Sands', date: '23 May 2025', status: 'Completed', payment: 'Paid', total: '$3569', baddr: 'UAE', color: 'bg-teal-500' },
  { id: 'SL003', customer: 'Bonnie Rodrigues', date: '22 May 2025', status: 'Pending', payment: 'Unpaid', total: '$2659', baddr: 'Germany', color: 'bg-orange-500' },
  { id: 'SL004', customer: 'Randy McCree', date: '21 May 2025', status: 'Completed', payment: 'Paid', total: '$2155', baddr: 'Belgium', color: 'bg-teal-500' },
  { id: 'SL005', customer: 'Carlos Curran', date: '20 May 2025', status: 'Cancelled', payment: 'Refunded', total: '$1250', baddr: 'Greenland', color: 'bg-red-500' },
];

export default function SalesList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sales List" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Sales List' }
        ]}
        actions={
          <>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white transition-colors">
              <RefreshCcw className="w-5 h-5" />
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Add Sale
            </button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Total Sales" 
          value="$48,988,078" 
          trend="22%" 
          trendType="up"
          icon={ShoppingCart}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Sales Returns" 
          value="$16,478,145" 
          trend="12%" 
          trendType="down"
          icon={RefreshCcw}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard 
          label="Invoices" 
          value="8,690" 
          trend="15%" 
          trendType="up"
          icon={FileText}
          iconColor="text-pink-600"
          iconBg="bg-pink-50"
        />
        <StatsCard 
          label="Pending Payments" 
          value="$12,458,747" 
          trend="8%" 
          trendType="up"
          icon={Package}
          iconColor="text-orange-500"
          iconBg="bg-orange-50"
        />
      </div>

      <FilterCard onGenerate={() => {}} buttonLabel="Filter">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Customer</label>
          <div className="relative">
            <Input placeholder="Search Customer" className="pl-10" />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Status</option>
            <option>Completed</option>
            <option>Pending</option>
            <option>Cancelled</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Payment</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Payments</option>
            <option>Paid</option>
            <option>Unpaid</option>
            <option>Refunded</option>
          </select>
        </div>
      </FilterCard>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-bold text-gray-900 text-lg">Recent Sales</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Search..." className="pl-10 h-9" />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-red-500 hover:bg-gray-50 bg-white transition-colors">
              <FileText className="w-4 h-4" />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded border border-gray-200 text-green-600 hover:bg-gray-50 bg-white transition-colors">
              <FileSpreadsheet className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold">Sale ID ↑↓</th>
                <th className="p-4 font-bold">Customer Name</th>
                <th className="p-4 font-bold">Date</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Payment</th>
                <th className="p-4 font-bold">Total</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?u=${row.customer}`} alt={row.customer} className="w-8 h-8 rounded-full bg-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900">{row.customer}</p>
                        <p className="text-[11px] text-gray-500">{row.baddr}</p>
                      </div>
                    </div>
                  </td>
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
                      row.payment === 'Unpaid' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
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
