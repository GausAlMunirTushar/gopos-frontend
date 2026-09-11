'use client';

import React from 'react';
import { 
  Building, DollarSign, PieChart, ShieldCheck, Download, Printer
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';

export default function BalanceSheet() {
  const assets = [
    { name: 'Cash and Bank Balances', amount: '৳4,580,200', type: 'Current Asset' },
    { name: 'Accounts Receivable (Customers)', amount: '৳1,245,600', type: 'Current Asset' },
    { name: 'Inventory Stock Valuation', amount: '৳8,920,400', type: 'Current Asset' },
    { name: 'Store Fixtures & POS Equipment', amount: '৳1,500,000', type: 'Fixed Asset' },
    { name: 'Vehicles & Transport', amount: '৳950,000', type: 'Fixed Asset' },
  ];

  const liabilities = [
    { name: 'Accounts Payable (Suppliers)', amount: '৳2,850,000', type: 'Current Liability' },
    { name: 'Short-term Operating Loans', amount: '৳1,200,000', type: 'Current Liability' },
    { name: 'Accrued Taxes & VAT Due', amount: '৳450,200', type: 'Current Liability' },
    { name: 'Long-term Bank Financing', amount: '৳3,500,000', type: 'Long-term Liability' },
  ];

  const equity = [
    { name: 'Owner Capital & Reserves', amount: '৳6,000,000', type: 'Equity' },
    { name: 'Retained Earnings (YTD)', amount: '৳3,196,000', type: 'Equity' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Balance Sheet" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance & Accounts' },
          { label: 'Balance Sheet' }
        ]}
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export PDF
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Assets" 
          value="৳17,196,200" 
          icon={Building}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Total Liabilities" 
          value="৳8,000,200" 
          icon={DollarSign}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Total Equity" 
          value="৳9,196,000" 
          icon={PieChart}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-teal-600" />
              <h3 className="font-bold text-lg text-gray-900">Assets</h3>
            </div>
            <span className="text-sm font-bold text-teal-600">৳17,196,200</span>
          </div>

          <div className="divide-y divide-gray-100 mt-4">
            {assets.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.type}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities & Equity Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Liabilities</h3>
              <span className="text-sm font-bold text-red-600">৳8,000,200</span>
            </div>

            <div className="divide-y divide-gray-100 mt-4">
              {liabilities.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Equity</h3>
              <span className="text-sm font-bold text-blue-600">৳9,196,000</span>
            </div>

            <div className="divide-y divide-gray-100 mt-4">
              {equity.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{item.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
