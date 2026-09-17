'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Building, DollarSign, PieChart, ShieldCheck, Download, Printer
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';

interface BalanceItem {
  name: string;
  amount: number;
  type: string;
}

interface BalanceSheetResponse {
  assets: BalanceItem[];
  liabilities: BalanceItem[];
  equity: BalanceItem[];
  totals: {
    totalAssets: number;
    totalLiabilities: number;
    totalEquity: number;
  };
}

export default function BalanceSheet() {
  const { data: response } = useQuery({
    queryKey: [apiEndpoints.finance.balanceSheet],
    queryFn: async () => apiClient.get<BalanceSheetResponse>(apiEndpoints.finance.balanceSheet),
  });

  const sheet = response?.data;

  const assets = sheet?.assets ?? [
    { name: 'Cash and Bank Balances', amount: 4580200, type: 'Current Asset' },
    { name: 'Accounts Receivable (Customers)', amount: 1245600, type: 'Current Asset' },
    { name: 'Inventory Stock Valuation', amount: 8920400, type: 'Current Asset' },
  ];

  const liabilities = sheet?.liabilities ?? [
    { name: 'Accounts Payable (Suppliers)', amount: 2850000, type: 'Current Liability' },
  ];

  const equity = sheet?.equity ?? [
    { name: 'Owner Capital & Reserves', amount: 6000000, type: 'Equity' },
    { name: 'Retained Earnings (YTD)', amount: 3196000, type: 'Equity' },
  ];

  const totalAssets = sheet?.totals?.totalAssets ?? 17196200;
  const totalLiabilities = sheet?.totals?.totalLiabilities ?? 8000200;
  const totalEquity = sheet?.totals?.totalEquity ?? 9196000;

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
          value={`৳${totalAssets.toLocaleString()}`} 
          icon={Building}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Total Liabilities" 
          value={`৳${totalLiabilities.toLocaleString()}`} 
          icon={DollarSign}
          iconColor="text-red-600"
          iconBg="bg-red-50"
        />
        <StatsCard 
          label="Total Equity" 
          value={`৳${totalEquity.toLocaleString()}`} 
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
            <span className="text-sm font-bold text-teal-600">৳{totalAssets.toLocaleString()}</span>
          </div>

          <div className="divide-y divide-gray-100 mt-4">
            {assets.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.type}</p>
                </div>
                <span className="text-sm font-bold text-gray-900">৳{item.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities & Equity Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Liabilities</h3>
              <span className="text-sm font-bold text-red-600">৳{totalLiabilities.toLocaleString()}</span>
            </div>

            <div className="divide-y divide-gray-100 mt-4">
              {liabilities.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">৳{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900">Equity</h3>
              <span className="text-sm font-bold text-blue-600">৳{totalEquity.toLocaleString()}</span>
            </div>

            <div className="divide-y divide-gray-100 mt-4">
              {equity.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.type}</p>
                  </div>
                  <span className="text-sm font-bold text-gray-900">৳{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
