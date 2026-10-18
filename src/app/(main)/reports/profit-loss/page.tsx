'use client';

import React from 'react';
import { 
  RotateCcw, Download, TrendingUp, DollarSign, 
  ArrowUpRight, ArrowDownRight, Scale, Calculator 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { Button } from '@/components/ui/button';

export default function ProfitLossPage() {
  const statement = {
    grossRevenue: 76500,
    salesReturn: 1250,
    netSales: 75250,
    openingStock: 24000,
    purchases: 42000,
    closingStock: 28500,
    cogs: 37500,
    grossProfit: 37750,
    expenses: [
      { name: 'Staff Salaries & Wages', amount: 6680 },
      { name: 'Store Rent & Lease', amount: 3600 },
      { name: 'Utilities & Power Bills', amount: 1020 },
      { name: 'Marketing & Promotions', amount: 850 },
      { name: 'Maintenance & Software', amount: 650 },
    ],
    totalExpenses: 12800,
    operatingProfit: 24950,
    taxes: 2100,
    netProfit: 22850,
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <PageHeader 
        title="Profit & Loss Statement"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports/sales' },
          { label: 'Profit & Loss' },
        ]}
        actions={
          <Button variant="outline" className="border-gray-200 text-xs font-semibold">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Statement (PDF)
          </Button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <StatsCard 
          label="Net Sales Revenue" 
          value={`$${statement.netSales.toLocaleString()}`} 
          trend="+16.2%" 
          trendType="up" 
          icon={TrendingUp} 
          iconColor="text-blue-500" 
          iconBg="bg-blue-50" 
        />
        <StatsCard 
          label="Gross Profit" 
          value={`$${statement.grossProfit.toLocaleString()}`} 
          trend="50.2% Margin" 
          trendType="up" 
          icon={Scale} 
          iconColor="text-orange-500" 
          iconBg="bg-orange-50" 
        />
        <StatsCard 
          label="Total Operating Costs" 
          value={`$${statement.totalExpenses.toLocaleString()}`} 
          icon={Calculator} 
          iconColor="text-rose-500" 
          iconBg="bg-rose-50" 
        />
        <StatsCard 
          label="Net Profit" 
          value={`$${statement.netProfit.toLocaleString()}`} 
          trend="30.3% Margin" 
          trendType="up" 
          icon={DollarSign} 
          iconColor="text-emerald-500" 
          iconBg="bg-emerald-50" 
        />
      </div>

      {/* Detailed Income Statement Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Income Statement (P&L)</h2>
          <p className="text-xs text-gray-400">Reporting Period: 01 Jan 2026 to 18 Oct 2026 • Currency: USD ($)</p>
        </div>

        {/* Revenue Section */}
        <div className="space-y-2 border-b border-gray-100 pb-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">1. Operating Revenue</div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Gross Sales Revenue</span>
            <span className="font-semibold">${statement.grossRevenue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-rose-600">
            <span>Less: Sales Returns & Discounts</span>
            <span className="font-semibold">-${statement.salesReturn.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-dashed border-gray-100">
            <span>Net Revenue</span>
            <span>${statement.netSales.toLocaleString()}</span>
          </div>
        </div>

        {/* Cost of Goods Sold */}
        <div className="space-y-2 border-b border-gray-100 pb-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">2. Cost of Sales (COGS)</div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Opening Inventory Value</span>
            <span>${statement.openingStock.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Add: Purchases of Inventory</span>
            <span>+${statement.purchases.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Less: Closing Inventory on Hand</span>
            <span>-${statement.closingStock.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-dashed border-gray-100">
            <span>Total Cost of Goods Sold (COGS)</span>
            <span className="text-rose-600">-${statement.cogs.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-[#FF9F43] pt-2">
            <span>Gross Profit</span>
            <span>${statement.grossProfit.toLocaleString()}</span>
          </div>
        </div>

        {/* Operating Expenses */}
        <div className="space-y-2 border-b border-gray-100 pb-4">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">3. Operating Expenses</div>
          {statement.expenses.map((exp, idx) => (
            <div key={idx} className="flex justify-between text-sm text-gray-700">
              <span>{exp.name}</span>
              <span className="font-medium">${exp.amount.toLocaleString()}</span>
            </div>
          ))}
          <div className="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-dashed border-gray-100">
            <span>Total Operating Expenses</span>
            <span className="text-rose-600">-${statement.totalExpenses.toLocaleString()}</span>
          </div>
        </div>

        {/* Net Profit Bottom Line */}
        <div className="p-4 bg-orange-50/60 rounded-xl space-y-2 border border-orange-100">
          <div className="flex justify-between text-sm font-bold text-gray-800">
            <span>Operating Profit (EBITDA)</span>
            <span>${statement.operatingProfit.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Estimated Income Taxes Payable</span>
            <span>-${statement.taxes.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-base font-black text-emerald-600 pt-2 border-t border-orange-200/80">
            <span>Net Profit for the Period</span>
            <span>+${statement.netProfit.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
