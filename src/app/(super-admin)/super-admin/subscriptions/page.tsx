'use client';

import React, { useState } from 'react';
import { 
  CreditCard, Search, Calendar, CheckCircle2, 
  AlertCircle, RefreshCw, ArrowUpRight 
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Subscription {
  id: string;
  companyName: string;
  planName: string;
  billingCycle: 'Monthly' | 'Yearly';
  amount: string;
  nextRenewal: string;
  paymentGateway: 'bKash' | 'Nagad' | 'Stripe' | 'Bank';
  status: 'Active' | 'Past Due' | 'Cancelled';
}

const mockSubscriptions: Subscription[] = [
  { id: 'SUB-9812', companyName: 'Bengal Super Shop', planName: 'Enterprise', billingCycle: 'Monthly', amount: '$99.00', nextRenewal: '12 Nov 2026', paymentGateway: 'bKash', status: 'Active' },
  { id: 'SUB-9813', companyName: 'Dhaka Cafe & Bakery', planName: 'Pro', billingCycle: 'Yearly', amount: '$490.00', nextRenewal: '04 Feb 2027', paymentGateway: 'Stripe', status: 'Active' },
  { id: 'SUB-9814', companyName: 'Apex Retailers Ltd', planName: 'Enterprise', billingCycle: 'Yearly', amount: '$990.00', nextRenewal: '18 Mar 2027', paymentGateway: 'Bank', status: 'Active' },
  { id: 'SUB-9815', companyName: 'Quick Pharmacy Plus', planName: 'Basic', billingCycle: 'Monthly', amount: '$19.00', nextRenewal: '24 Oct 2026', paymentGateway: 'Nagad', status: 'Past Due' },
  { id: 'SUB-9816', companyName: 'Chittagong Agro Tech', planName: 'Pro', billingCycle: 'Monthly', amount: '$49.00', nextRenewal: '15 Sep 2026', paymentGateway: 'bKash', status: 'Cancelled' },
];

export default function SubscriptionsPage() {
  const [search, setSearch] = useState('');

  const filtered = mockSubscriptions.filter(s => 
    s.companyName.toLowerCase().includes(search.toLowerCase()) || 
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Active Subscriptions</h1>
        <p className="text-gray-500 text-sm mt-0.5">Track recurring SaaS billing cycles, upcoming renewals, and payments.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input 
            placeholder="Search subscription ID or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200"
          />
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-5 py-3.5">Sub ID</th>
                <th className="px-5 py-3.5">Company Name</th>
                <th className="px-5 py-3.5">Plan</th>
                <th className="px-5 py-3.5">Cycle</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Next Renewal</th>
                <th className="px-5 py-3.5">Payment Method</th>
                <th className="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs font-bold text-gray-800">{s.id}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900">{s.companyName}</td>
                  <td className="px-5 py-3.5">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-600">
                      {s.planName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-600">{s.billingCycle}</td>
                  <td className="px-5 py-3.5 font-black text-gray-900">{s.amount}</td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">{s.nextRenewal}</td>
                  <td className="px-5 py-3.5 text-xs font-semibold text-slate-700">{s.paymentGateway}</td>
                  <td className="px-5 py-3.5 text-right">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                      s.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-600'
                        : s.status === 'Past Due'
                          ? 'bg-amber-50 text-amber-600'
                          : 'bg-rose-50 text-rose-600'
                    }`}>
                      {s.status}
                    </span>
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
