'use client';

import React, { useState } from 'react';
import { 
  Building2, Calendar, Download, Printer, Filter, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';

export default function AccountStatement() {
  const [selectedBank, setSelectedBank] = useState('City Bank - 1102938472');

  const transactions = [
    { date: '25 May 2025', ref: 'TRX-99821', desc: 'POS Batch Settlement (Terminal 1 & 2)', type: 'Credit', amount: '+ ৳148,200', balance: '৳3,240,500' },
    { date: '24 May 2025', ref: 'TRX-99814', desc: 'Supplier Invoice Payment (Apex Computers)', type: 'Debit', amount: '- ৳85,000', balance: '৳3,092,300' },
    { date: '23 May 2025', ref: 'TRX-99805', desc: 'Store Rent Transfer (Gulshan Outlet)', type: 'Debit', amount: '- ৳120,000', balance: '৳3,177,300' },
    { date: '22 May 2025', ref: 'TRX-99792', desc: 'Customer Direct Transfer (Corporate Sale)', type: 'Credit', amount: '+ ৳95,400', balance: '৳3,297,300' },
    { date: '21 May 2025', ref: 'TRX-99780', desc: 'Petty Cash Replenishment', type: 'Debit', amount: '- ৳25,000', balance: '৳3,201,900' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Account Statement" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Finance & Accounts' },
          { label: 'Account Statement' }
        ]}
        actions={
          <div className="flex gap-2">
            <button className="px-3 py-2 border border-gray-200 rounded-lg text-sm font-medium bg-white text-gray-700 hover:bg-gray-50 flex items-center gap-2">
              <Printer className="w-4 h-4" /> Print Statement
            </button>
            <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm">
              <Download className="w-4 h-4" /> Export Excel
            </button>
          </div>
        }
      />

      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Building2 className="w-5 h-5 text-[#FF9F43]" />
          <select 
            value={selectedBank} 
            onChange={(e) => setSelectedBank(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="City Bank - 1102938472">City Bank Ltd. (A/C: 1102938472)</option>
            <option value="BRAC Bank - 9982736154">BRAC Bank (A/C: 9982736154)</option>
            <option value="Islami Bank - 7726354189">Islami Bank Bangladesh (A/C: 7726354189)</option>
            <option value="Cash Counter - Store A">Cash in Hand (Store A Counter)</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-gray-500" /> Last 30 Days
          </button>
          <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-gray-500" /> Filter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Opening Balance" 
          value="৳3,121,900" 
          icon={Building2}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Total Inflow (Credits)" 
          value="৳243,600" 
          icon={ArrowUpRight}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Current Closing Balance" 
          value="৳3,240,500" 
          icon={Building2}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase text-gray-600">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Reference</th>
                <th className="px-6 py-4">Description / Narration</th>
                <th className="px-6 py-4 text-right">Amount (৳)</th>
                <th className="px-6 py-4 text-right">Running Balance (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((trx, idx) => (
                <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-6 py-3.5 text-xs text-gray-600 whitespace-nowrap">{trx.date}</td>
                  <td className="px-6 py-3.5 font-mono text-xs text-gray-500">{trx.ref}</td>
                  <td className="px-6 py-3.5 font-medium text-gray-900">{trx.desc}</td>
                  <td className={`px-6 py-3.5 text-right font-bold ${trx.type === 'Credit' ? 'text-teal-600' : 'text-red-600'}`}>
                    {trx.amount}
                  </td>
                  <td className="px-6 py-3.5 text-right font-bold text-gray-900">{trx.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
