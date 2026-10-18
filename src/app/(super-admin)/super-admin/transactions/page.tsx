'use client';

import React, { useState } from 'react';
import { 
  DollarSign, Download, Search, CheckCircle2, 
  ExternalLink, FileText, ArrowDownToLine 
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Transaction {
  invoiceNo: string;
  companyName: string;
  plan: string;
  amount: string;
  method: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Refunded';
}

const mockTransactions: Transaction[] = [
  { invoiceNo: 'INV-2026-081', companyName: 'Bengal Super Shop', plan: 'Enterprise (Monthly)', amount: '$99.00', method: 'bKash Merchant', date: '12 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-080', companyName: 'Dhaka Cafe & Bakery', plan: 'Pro (Yearly)', amount: '$490.00', method: 'Stripe Card', date: '10 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-079', companyName: 'Apex Retailers Ltd', plan: 'Enterprise (Yearly)', amount: '$990.00', method: 'Direct Bank Wire', date: '08 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-078', companyName: 'Urban Outfitters', plan: 'Pro (Monthly)', amount: '$49.00', method: 'Nagad', date: '05 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-077', companyName: 'Kite Fashion Hub', plan: 'Basic (Monthly)', amount: '$19.00', method: 'bKash', date: '01 Oct 2026', status: 'Paid' },
];

export default function TransactionsPage() {
  const [search, setSearch] = useState('');

  const filtered = mockTransactions.filter(t => 
    t.companyName.toLowerCase().includes(search.toLowerCase()) || 
    t.invoiceNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Billing & Invoices</h1>
          <p className="text-gray-500 text-sm mt-0.5">Review tenant subscription payments, gateway fees, and invoices.</p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-gray-800 rounded-xl text-xs font-bold transition-colors">
          <Download className="w-4 h-4" /> Export CSV Statement
        </button>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input 
            placeholder="Search invoice number or business..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-5 py-3.5">Invoice #</th>
                <th className="px-5 py-3.5">Company / Store</th>
                <th className="px-5 py-3.5">Package</th>
                <th className="px-5 py-3.5">Gateway / Method</th>
                <th className="px-5 py-3.5">Payment Date</th>
                <th className="px-5 py-3.5">Total Amount</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((t) => (
                <tr key={t.invoiceNo} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-gray-900">{t.invoiceNo}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{t.companyName}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">{t.plan}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">
                      {t.method}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{t.date}</td>
                  <td className="px-5 py-3.5 font-black text-gray-900">{t.amount}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {t.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button 
                      title="Download PDF Invoice"
                      className="p-1.5 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ArrowDownToLine className="w-4 h-4" />
                    </button>
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
