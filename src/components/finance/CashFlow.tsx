'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, Printer, Download
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';

interface CashFlowActivity {
  title: string;
  amount: number;
  positive: boolean;
}

interface CashFlowResponse {
  operatingActivities: CashFlowActivity[];
  investingActivities: CashFlowActivity[];
  financingActivities: CashFlowActivity[];
  totals: {
    totalInflow: number;
    totalOutflow: number;
    netCashFlow: number;
  };
}

const fallbackOperating: CashFlowActivity[] = [
  { title: 'Receipts from Cash & Card Sales', amount: 18450000, positive: true },
  { title: 'Collections from Trade Debtors', amount: 1200000, positive: true },
  { title: 'Payments to Merchandise Suppliers', amount: 11400000, positive: false },
  { title: 'Payments for Staff Payroll & Wages', amount: 840000, positive: false },
  { title: 'Store Utilities, Maintenance & Rent', amount: 754000, positive: false },
];

export default function CashFlow() {
  const { data: response } = useQuery({
    queryKey: [apiEndpoints.finance.cashFlow],
    queryFn: async () => apiClient.get<CashFlowResponse>(apiEndpoints.finance.cashFlow),
  });

  const cf = response?.data;
  const operatingActivities = cf?.operatingActivities?.length ? cf.operatingActivities : fallbackOperating;
  const investingActivities = cf?.investingActivities ?? [];
  const financingActivities = cf?.financingActivities ?? [];

  const totalInflow = cf?.totals?.totalInflow ?? 19650000;
  const totalOutflow = cf?.totals?.totalOutflow ?? 12994000;
  const netCashFlow = cf?.totals?.netCashFlow ?? (totalInflow - totalOutflow);

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
          label="Total Inflow" 
          value={`৳${totalInflow.toLocaleString()}`} 
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Total Outflow" 
          value={`৳${totalOutflow.toLocaleString()}`} 
          icon={TrendingDown}
          iconColor="text-orange-600"
          iconBg="bg-orange-50"
        />
        <StatsCard 
          label="Net Cash Flow" 
          value={`৳${netCashFlow.toLocaleString()}`} 
          icon={DollarSign}
          iconColor={netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}
          iconBg={netCashFlow >= 0 ? 'bg-green-50' : 'bg-red-50'}
        />
      </div>

      <div className="space-y-6">
        {/* Operating Section */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-base text-gray-900">Cash Flow from Operating Activities</h3>
            <span className={`text-sm font-bold ${netCashFlow >= 0 ? 'text-teal-600' : 'text-red-600'}`}>
              {netCashFlow >= 0 ? '+ ' : '- '}৳{Math.abs(netCashFlow).toLocaleString()}
            </span>
          </div>
          <div className="divide-y divide-gray-100 mt-2">
            {operatingActivities.map((item, idx) => (
              <div key={idx} className="py-3 flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.title}</span>
                <span className={`text-sm font-semibold flex items-center gap-1 ${item.positive ? 'text-teal-600' : 'text-red-600'}`}>
                  {item.positive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                  {item.positive ? '+ ' : '- '}৳{Number(item.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Investing Section if any */}
        {investingActivities.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">Cash Flow from Investing Activities</h3>
            </div>
            <div className="divide-y divide-gray-100 mt-2">
              {investingActivities.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.title}</span>
                  <span className={`text-sm font-semibold flex items-center gap-1 ${item.positive ? 'text-teal-600' : 'text-red-600'}`}>
                    {item.positive ? '+ ' : '- '}৳{Number(item.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Financing Section if any */}
        {financingActivities.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-base text-gray-900">Cash Flow from Financing Activities</h3>
            </div>
            <div className="divide-y divide-gray-100 mt-2">
              {financingActivities.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.title}</span>
                  <span className={`text-sm font-semibold flex items-center gap-1 ${item.positive ? 'text-teal-600' : 'text-red-600'}`}>
                    {item.positive ? '+ ' : '- '}৳{Number(item.amount).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

