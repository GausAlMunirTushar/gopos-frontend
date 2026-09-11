'use client';

import React from 'react';
import { 
  TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Download
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';

export default function CashFlow() {
  const operatingActivities = [
    { title: 'Receipts from Cash & Card Sales', amount: '+ ৳18,450,000', positive: true },
    { title: 'Collections from Trade Debtors', amount: '+ ৳1,200,000', positive: true },
    { title: 'Payments to Merchandise Suppliers', amount: '- ৳11,400,000', positive: false },
    { title: 'Payments for Staff Payroll & Wages', amount: '- ৳840,000', positive: false },
    { title: 'Store Utilities, Maintenance & Rent', amount: '- ৳754,000', positive: false },
    { title: 'VAT and Corporate Taxes Paid', amount: '- ৳380,000', positive: false },
  ];

  const investingActivities = [
    { title: 'Purchase of Thermal POS Printers & Scanners', amount: '- ৳120,000', positive: false },
    { title: 'Store Counter & Display Racks Renovation', amount: '- ৳250,000', positive: false },
  ];

  const financingActivities = [
    { title: 'Short-term Bank Credit Inflow', amount: '+ ৳500,000', positive: true },
    { title: 'Bank Loan Principal Repayment', amount: '- ৳350,000', positive: false },
    { title: 'Owner Drawings & Dividends', amount: '- ৳400,000', positive: false },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cash Flow Statement" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance & Accounts' },
          { label: 'Cash Flow' }
        ]}
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Report
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Net Operating Cash" 
          value="৳6,276,000" 
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Net Investing Outflow" 
          value="৳370,000" 
          icon={TrendingDown}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatsCard 
          label="Net Cash Growth (YTD)" 
          value="৳5,656,000" 
          icon={DollarSign}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <div className="space-y-6">
        {/* Operating Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-base text-gray-900">Cash Flow from Operating Activities</h3>
            <span className="text-sm font-bold text-teal-600">+ ৳6,276,000</span>
          </div>
          <div className="divide-y divide-gray-100 mt-2">
            {operatingActivities.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.title}</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${item.positive ? 'text-teal-600' : 'text-red-600'}`}>
                  {item.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Investing Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-base text-gray-900">Cash Flow from Investing Activities</h3>
            <span className="text-sm font-bold text-orange-600">- ৳370,000</span>
          </div>
          <div className="divide-y divide-gray-100 mt-2">
            {investingActivities.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.title}</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${item.positive ? 'text-teal-600' : 'text-red-600'}`}>
                  {item.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Financing Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-base text-gray-900">Cash Flow from Financing Activities</h3>
            <span className="text-sm font-bold text-red-600">- ৳250,000</span>
          </div>
          <div className="divide-y divide-gray-100 mt-2">
            {financingActivities.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.title}</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${item.positive ? 'text-teal-600' : 'text-red-600'}`}>
                  {item.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {item.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
