'use client';

import React, { useState } from 'react';
import { 
  Building2, Plus, Search, Filter, ExternalLink, 
  MoreVertical, CheckCircle2, XCircle, Store, 
  ShieldAlert, UserCheck, ArrowUpRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Company {
  id: string;
  name: string;
  owner: string;
  email: string;
  phone: string;
  subdomain: string;
  customDomain?: string;
  plan: 'Basic' | 'Pro' | 'Enterprise';
  storesCount: number;
  status: 'Active' | 'Suspended' | 'Trial';
  joinedDate: string;
}

const mockCompanies: Company[] = [
  { id: '1', name: 'Bengal Super Shop', owner: 'Rafiqul Islam', email: 'rafiq@bengalshop.com', phone: '+880 1711-234567', subdomain: 'bengal.bikripos.com', customDomain: 'bengalshop.com.bd', plan: 'Enterprise', storesCount: 5, status: 'Active', joinedDate: '12 Jan 2026' },
  { id: '2', name: 'Dhaka Cafe & Bakery', owner: 'Tasnim Ahmed', email: 'tasnim@dhakacafe.com', phone: '+880 1819-876543', subdomain: 'dhakacafe.bikripos.com', plan: 'Pro', storesCount: 2, status: 'Active', joinedDate: '04 Feb 2026' },
  { id: '3', name: 'Apex Retailers Ltd', owner: 'Mahmudul Hasan', email: 'hasan@apexretail.com', phone: '+880 1912-345678', subdomain: 'apex.bikripos.com', customDomain: 'pos.apexretail.com', plan: 'Enterprise', storesCount: 12, status: 'Active', joinedDate: '18 Mar 2026' },
  { id: '4', name: 'Quick Pharmacy Plus', owner: 'Farhana Kabir', email: 'farhana@quickrx.com', phone: '+880 1610-987654', subdomain: 'quickrx.bikripos.com', plan: 'Basic', storesCount: 1, status: 'Trial', joinedDate: '10 Oct 2026' },
  { id: '5', name: 'Chittagong Agro Tech', owner: 'Zubair Hossain', email: 'zubair@ctgagro.com', phone: '+880 1515-112233', subdomain: 'ctgagro.bikripos.com', plan: 'Pro', storesCount: 3, status: 'Suspended', joinedDate: '22 Aug 2025' },
];

export default function CompaniesPage() {
  const [search, setSearch] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCompanies = mockCompanies.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.owner.toLowerCase().includes(search.toLowerCase()) ||
                          c.subdomain.toLowerCase().includes(search.toLowerCase());
    const matchesPlan = selectedPlan === 'All' || c.plan === selectedPlan;
    const matchesStatus = selectedStatus === 'All' || c.status === selectedStatus;
    return matchesSearch && matchesPlan && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Companies & Stores</h1>
          <p className="text-gray-500 text-sm mt-0.5">Manage all registered businesses, stores, and tenant subdomains.</p>
        </div>

        <Button className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-2 rounded-xl shadow-xs">
          <Plus className="w-4 h-4" /> Add New Company
        </Button>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Total Businesses</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">5,468</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+14 new this week</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Active Outlets/Stores</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">18,340</h3>
          <p className="text-[11px] text-gray-400 mt-1">Avg 3.3 stores/company</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs">
          <span className="text-xs font-semibold text-gray-500">Trial Period Tenants</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">142</h3>
          <p className="text-[11px] text-amber-600 font-bold mt-1">14-day free onboarding</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input 
            placeholder="Search company, owner name, or subdomain..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-10 rounded-xl bg-gray-50 border-gray-200"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Plan filter */}
          <select 
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value)}
            className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="All">All Plans</option>
            <option value="Basic">Basic Plan</option>
            <option value="Pro">Pro Plan</option>
            <option value="Enterprise">Enterprise Plan</option>
          </select>

          {/* Status filter */}
          <select 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="h-10 px-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 outline-none"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Trial">Trial</option>
            <option value="Suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/80 text-gray-500 uppercase text-[11px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-5 py-3.5">Company & Subdomain</th>
                <th className="px-5 py-3.5">Owner / Contact</th>
                <th className="px-5 py-3.5">Package</th>
                <th className="px-5 py-3.5 text-center">Stores</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Joined</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {filteredCompanies.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {c.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-gray-900 block leading-tight">{c.name}</span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-xs text-blue-600 font-mono hover:underline">{c.subdomain}</span>
                          {c.customDomain && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 font-medium px-1.5 rounded">
                              {c.customDomain}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className="font-semibold text-gray-800 block text-xs">{c.owner}</span>
                    <span className="text-xs text-gray-400 block">{c.email}</span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      c.plan === 'Enterprise' 
                        ? 'bg-purple-50 text-purple-700 border border-purple-200'
                        : c.plan === 'Pro'
                          ? 'bg-blue-50 text-blue-700 border border-blue-200'
                          : 'bg-orange-50 text-orange-700 border border-orange-200'
                    }`}>
                      {c.plan}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-center">
                    <span className="font-bold text-gray-900 bg-gray-100 px-2 py-0.5 rounded-md text-xs">
                      {c.storesCount}
                    </span>
                  </td>

                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                      c.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700'
                        : c.status === 'Trial'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-rose-50 text-rose-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        c.status === 'Active' ? 'bg-emerald-500' : c.status === 'Trial' ? 'bg-amber-500' : 'bg-rose-500'
                      }`}></span>
                      {c.status}
                    </span>
                  </td>

                  <td className="px-5 py-3.5 text-xs text-gray-500 font-medium">
                    {c.joinedDate}
                  </td>

                  <td className="px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {/* Impersonate button */}
                      <button 
                        title="Impersonate / Login to Tenant"
                        className="px-2.5 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-[#092C4C] hover:text-white text-gray-700 rounded-lg transition-colors flex items-center gap-1"
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Access</span>
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
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
