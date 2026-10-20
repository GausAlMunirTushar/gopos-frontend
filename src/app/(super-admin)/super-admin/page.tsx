'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Calendar, ArrowUpRight, ArrowDownRight, 
  Building2, Users, CreditCard, DollarSign,
  ChevronDown, ExternalLink, Plus, Sparkles,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const companiesData = [
  { name: 'Mon', value: 40 },
  { name: 'Tue', value: 65 },
  { name: 'Wed', value: 30 },
  { name: 'Thu', value: 85 },
  { name: 'Fri', value: 50 },
  { name: 'Sat', value: 60 },
  { name: 'Sun', value: 75 },
];

const revenueData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 38 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 35 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 68 },
  { name: 'Aug', value: 78 },
  { name: 'Sep', value: 80 },
  { name: 'Oct', value: 82 },
  { name: 'Nov', value: 28 },
  { name: 'Dec', value: 78 },
];

const plansData = [
  { name: 'Basic Plan', value: 55, color: '#FF9F43' },
  { name: 'Pro Plan', value: 30, color: '#092C4C' },
  { name: 'Enterprise', value: 15, color: '#10B981' },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">BikriPOS Super Admin</h1>
            <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#FF9F43] text-xs font-bold">Cloud SaaS</span>
          </div>
          <p className="text-gray-500 text-sm mt-0.5">Global overview of multi-tenant businesses, retail outlets, revenue, and subscriptions.</p>
        </div>
        
        <div className="flex items-center gap-2.5">
          <NextLink href="/super-admin/companies">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff942a] text-white rounded-xl text-sm font-semibold transition-colors cursor-pointer shadow-xs">
              <Plus className="w-4 h-4" /> Add Company
            </button>
          </NextLink>
          <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 shadow-2xs">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>This Month: Oct 2026</span>
          </div>
        </div>
      </div>

      {/* Welcome Banner (Clean Light Theme) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between text-gray-900 relative overflow-hidden">
        <div className="relative z-10 mb-6 md:mb-0 space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200 text-xs font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>SaaS Platform Control Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Welcome, Platform Administrator</h2>
          <p className="text-gray-500 text-sm sm:text-base font-normal max-w-xl">
            14 new companies registered this week. Total platform revenue is up by <span className="text-[#FF9F43] font-bold">+18.4%</span>.
          </p>
        </div>
        
        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <NextLink href="/super-admin/companies">
            <button className="px-5 py-2.5 bg-[#FF9F43] hover:bg-[#ff942a] text-white rounded-xl font-semibold text-sm transition-all cursor-pointer flex items-center gap-2">
              <span>Manage Stores</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </NextLink>
          <NextLink href="/super-admin/packages">
            <button className="px-5 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 rounded-xl font-medium text-sm transition-all cursor-pointer">
              Packages & Pricing
            </button>
          </NextLink>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {[
          { label: 'Total Companies', value: '5,468', trend: '+19.01%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Building2, chartColor: '#FF9F43', sub: 'Across 12 countries' },
          { label: 'Active Subscriptions', value: '4,598', trend: '+12.4%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: CreditCard, chartColor: '#FF9F43', sub: '84.1% renewal rate' },
          { label: 'Total POS Terminals', value: '18,340', trend: '+8.2%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: Users, chartColor: '#10B981', sub: 'Live connected cashiers' },
          { label: 'Monthly Recurring (MRR)', value: '$89,878', trend: '+16.5%', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: DollarSign, chartColor: '#6366F1', sub: 'Avg $19.5/tenant' },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-5 flex flex-col justify-between shadow-xs hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-orange-50 border border-orange-100 text-[#FF9F43] shadow-xs">
                  <Icon className="w-5 h-5 text-[#FF9F43]" />
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${item.color} ${item.bg}`}>
                  <ArrowUpRight className="w-3 h-3" />
                  {item.trend}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-0.5">{item.value}</h3>
                <p className="text-xs font-semibold text-gray-600">{item.label}</p>
                <p className="text-[11px] text-gray-400 mt-1">{item.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Companies Growth */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-base">New Company Signups</h3>
              <p className="text-xs text-gray-400">Weekly onboarding rate</p>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
              +6% vs last week
            </span>
          </div>
          <div className="h-60 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={companiesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} />
                <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="value" fill="#092C4C" radius={[6, 6, 0, 0]} barSize={22}>
                  {companiesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 3 || index === 6 ? '#FF9F43' : '#092C4C'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Growth */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Monthly Platform Revenue</h3>
              <p className="text-xs text-gray-400">Total SaaS collection</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-black text-gray-900">$89,878</span>
              <p className="text-[11px] text-emerald-600 font-bold">+40% YOY</p>
            </div>
          </div>
          <div className="h-60 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                <Tooltip cursor={{ fill: '#F9FAFB' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                <Bar dataKey="value" fill="#FF9F43" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Plans Distribution */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Plan Distribution</h3>
              <p className="text-xs text-gray-400">By active subscribed stores</p>
            </div>
            <NextLink href="/super-admin/packages" className="text-xs font-semibold text-[#FF9F43] hover:underline">
              View Plans
            </NextLink>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-44 h-44 mx-auto relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={plansData}
                    innerRadius={52}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="none"
                  >
                    {plansData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="text-xl font-black text-gray-900">4,598</span>
                <span className="block text-[10px] text-gray-400 font-medium uppercase">Active</span>
              </div>
            </div>
            
            <div className="space-y-2 mt-4">
              {plansData.map((plan, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs px-2 py-1.5 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plan.color }}></span>
                    <span className="font-semibold text-gray-700">{plan.name}</span>
                  </div>
                  <span className="font-bold text-gray-900">{plan.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Recent Companies */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-base">New Companies</h3>
            <NextLink href="/super-admin/companies" className="text-xs font-semibold text-[#FF9F43] hover:underline">
              All Companies →
            </NextLink>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Bengal Super Shop', plan: 'Enterprise', stores: 5, date: 'Today' },
              { name: 'Dhaka Cafe & Bakery', plan: 'Pro', stores: 2, date: 'Yesterday' },
              { name: 'Apex Retailers Ltd', plan: 'Enterprise', stores: 12, date: '2 days ago' },
              { name: 'Fast Pharmacy Chain', plan: 'Basic', stores: 1, date: '3 days ago' },
            ].map((c, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{c.name}</h4>
                  <p className="text-[11px] text-gray-400">{c.stores} Stores • {c.date}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-600 border border-orange-100">
                  {c.plan}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Invoices */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900 text-base">Recent Payments</h3>
            <NextLink href="/super-admin/transactions" className="text-xs font-semibold text-[#FF9F43] hover:underline">
              Invoices →
            </NextLink>
          </div>
          <div className="space-y-3">
            {[
              { company: 'Bengal Super Shop', amount: '$299.00', method: 'bKash Merchant', status: 'Paid' },
              { company: 'Dhaka Cafe & Bakery', amount: '$49.00', method: 'Stripe Card', status: 'Paid' },
              { company: 'Apex Retailers Ltd', amount: '$499.00', method: 'Bank Transfer', status: 'Paid' },
              { company: 'Urban Outfitters', amount: '$49.00', method: 'Nagad', status: 'Paid' },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{t.company}</h4>
                  <p className="text-[11px] text-gray-400">{t.method}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-emerald-600">{t.amount}</span>
                  <span className="block text-[10px] text-gray-400">{t.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Platform Status & Quick Links */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-base mb-1">Platform Infrastructure</h3>
            <p className="text-xs text-gray-400 mb-4">Live health checks of SaaS cluster</p>

            <div className="space-y-2.5">
              {[
                { name: 'Core API Server', status: '99.98% Uptime', isOk: true },
                { name: 'PostgreSQL DB Cluster', status: 'Healthy (42ms)', isOk: true },
                { name: 'Payment Webhook Service', status: 'Listening', isOk: true },
                { name: 'Custom Domain SSL Engine', status: 'Active (Let\'s Encrypt)', isOk: true },
              ].map((s, i) => (
                <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-600 font-medium">{s.name}</span>
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 mt-4 flex items-center justify-between">
            <span className="text-xs text-gray-400">Database v16.3</span>
            <NextLink href="/super-admin/settings" className="text-xs font-bold text-[#092C4C] hover:text-[#FF9F43]">
              Settings →
            </NextLink>
          </div>
        </div>

      </div>

    </div>
  );
}
