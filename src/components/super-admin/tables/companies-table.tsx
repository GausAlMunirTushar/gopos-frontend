'use client';

import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Building2, Plus, ExternalLink, MoreVertical, 
  Store, UserCheck, ShieldAlert, CheckCircle2, 
  XCircle, Eye, Edit, Trash2, Mail, Phone, Globe,
  Download, ArrowUpRight, Sparkles, X, AlertTriangle
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Company {
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

const DEFAULT_COMPANIES: Company[] = [
  { id: '1', name: 'Bengal Super Shop', owner: 'Rafiqul Islam', email: 'rafiq@bengalshop.com', phone: '+880 1711-234567', subdomain: 'bengal.bikripos.com', customDomain: 'bengalshop.com.bd', plan: 'Enterprise', storesCount: 5, status: 'Active', joinedDate: '12 Jan 2026' },
  { id: '2', name: 'Dhaka Cafe & Bakery', owner: 'Tasnim Ahmed', email: 'tasnim@dhakacafe.com', phone: '+880 1819-876543', subdomain: 'dhakacafe.bikripos.com', plan: 'Pro', storesCount: 2, status: 'Active', joinedDate: '04 Feb 2026' },
  { id: '3', name: 'Apex Retailers Ltd', owner: 'Mahmudul Hasan', email: 'hasan@apexretail.com', phone: '+880 1912-345678', subdomain: 'apex.bikripos.com', customDomain: 'pos.apexretail.com', plan: 'Enterprise', storesCount: 12, status: 'Active', joinedDate: '18 Mar 2026' },
  { id: '4', name: 'Quick Pharmacy Plus', owner: 'Farhana Kabir', email: 'farhana@quickrx.com', phone: '+880 1610-987654', subdomain: 'quickrx.bikripos.com', plan: 'Basic', storesCount: 1, status: 'Trial', joinedDate: '10 Oct 2026' },
  { id: '5', name: 'Chittagong Agro Tech', owner: 'Zubair Hossain', email: 'zubair@ctgagro.com', phone: '+880 1515-112233', subdomain: 'ctgagro.bikripos.com', plan: 'Pro', storesCount: 3, status: 'Suspended', joinedDate: '22 Aug 2025' },
  { id: '6', name: 'Sylhet Gourmet Foods', owner: 'Kamrul Zaman', email: 'kamrul@sylhetfood.com', phone: '+880 1718-445566', subdomain: 'sylhetfood.bikripos.com', customDomain: 'sylhetfood.com.bd', plan: 'Enterprise', storesCount: 4, status: 'Active', joinedDate: '15 May 2026' },
  { id: '7', name: 'Barisal Fresh Market', owner: 'Nusrat Jahan', email: 'nusrat@barisalfresh.com', phone: '+880 1914-998877', subdomain: 'barisalfresh.bikripos.com', plan: 'Basic', storesCount: 1, status: 'Active', joinedDate: '02 Jun 2026' },
];

interface CompaniesTableProps {
  initialData?: Company[];
}

export function CompaniesTable({ initialData = DEFAULT_COMPANIES }: CompaniesTableProps) {
  const [data, setData] = useState<Company[]>(initialData);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Add Company Form State
  const [newCompany, setNewCompany] = useState<Partial<Company>>({
    name: '',
    owner: '',
    email: '',
    phone: '',
    subdomain: '',
    customDomain: '',
    plan: 'Pro',
    storesCount: 1,
    status: 'Active',
  });

  const handleAddCompany = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.owner || !newCompany.email) return;

    const created: Company = {
      id: String(Date.now()),
      name: newCompany.name || '',
      owner: newCompany.owner || '',
      email: newCompany.email || '',
      phone: newCompany.phone || '+880 1700-000000',
      subdomain: newCompany.subdomain ? `${newCompany.subdomain}.bikripos.com` : `${newCompany.name.toLowerCase().replace(/\s+/g, '')}.bikripos.com`,
      customDomain: newCompany.customDomain || undefined,
      plan: (newCompany.plan as any) || 'Pro',
      storesCount: Number(newCompany.storesCount) || 1,
      status: (newCompany.status as any) || 'Active',
      joinedDate: 'Today',
    };

    setData((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewCompany({
      name: '',
      owner: '',
      email: '',
      phone: '',
      subdomain: '',
      customDomain: '',
      plan: 'Pro',
      storesCount: 1,
      status: 'Active',
    });
  };

  const toggleCompanyStatus = (id: string) => {
    setData((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'Active' ? 'Suspended' : 'Active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  const deleteCompany = (id: string) => {
    setData((prev) => prev.filter((c) => c.id !== id));
  };

  const columns: ColumnDef<Company>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Company & Subdomain',
        cell: ({ row }) => {
          const company = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#092C4C] text-white flex items-center justify-center font-black text-sm shrink-0 border border-slate-700">
                {company.name.charAt(0)}
              </div>
              <div className="min-w-0">
                <span className="font-bold text-gray-900 block leading-tight truncate">
                  {company.name}
                </span>
                <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                  <span className="text-xs text-orange-600 font-mono hover:underline truncate">
                    {company.subdomain}
                  </span>
                  {company.customDomain && (
                    <span className="text-[10px] bg-slate-100 text-slate-700 font-semibold px-1.5 py-0.2 rounded border border-slate-200">
                      {company.customDomain}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'owner',
        header: 'Owner / Contact',
        cell: ({ row }) => {
          const company = row.original;
          return (
            <div>
              <span className="font-semibold text-gray-800 block text-xs leading-tight">
                {company.owner}
              </span>
              <span className="text-[11px] text-gray-500 block font-mono mt-0.5 truncate">
                {company.email}
              </span>
              <span className="text-[10px] text-gray-400 block font-mono">
                {company.phone}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'plan',
        header: 'Package Plan',
        cell: ({ row }) => {
          const plan = row.getValue('plan') as string;
          return (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full border inline-block ${
                plan === 'Enterprise'
                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                  : plan === 'Pro'
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-orange-50 text-orange-700 border-orange-200'
              }`}
            >
              {plan}
            </span>
          );
        },
      },
      {
        accessorKey: 'storesCount',
        header: () => <div className="text-center">Stores</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <span className="font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md text-xs border border-gray-200">
              {row.getValue('storesCount')}
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : status === 'Trial'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === 'Active'
                    ? 'bg-emerald-500'
                    : status === 'Trial'
                    ? 'bg-amber-500'
                    : 'bg-rose-500'
                }`}
              />
              {status}
            </span>
          );
        },
      },
      {
        accessorKey: 'joinedDate',
        header: 'Joined',
        cell: ({ row }) => (
          <span className="text-xs text-gray-500 font-medium">
            {row.getValue('joinedDate')}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const company = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5">
              {/* Impersonate Access */}
              <a
                href={`/dashboard?tenant=${company.id}`}
                target="_blank"
                rel="noreferrer"
                title={`Access ${company.name} as Super Admin`}
                className="px-2.5 py-1.5 text-xs font-semibold bg-orange-50 hover:bg-[#FF9F43] text-[#FF9F43] hover:text-white rounded-lg transition-colors flex items-center gap-1 border border-orange-200 hover:border-[#FF9F43] cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Access</span>
              </a>

              {/* Action Dropdown Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 rounded-xl p-1 z-50">
                  <DropdownMenuLabel className="text-xs text-gray-500 px-2 py-1 font-semibold">
                    Manage Business
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCompany(company);
                      setIsViewModalOpen(true);
                    }}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    <span>View Details</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => toggleCompanyStatus(company.id)}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    {company.status === 'Active' ? (
                      <>
                        <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                        <span>Suspend Access</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Activate Access</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem
                    onClick={() => deleteCompany(company.id)}
                    className="text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Tenant</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <div className="space-y-6">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Total Registered Tenants</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{data.length}</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Active multi-tenant platform</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Active Stores & Outlets</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">
            {data.reduce((sum, c) => sum + c.storesCount, 0)}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">Across all registered brands</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Enterprise Accounts</span>
          <h3 className="text-2xl font-black text-purple-700 mt-1">
            {data.filter((c) => c.plan === 'Enterprise').length}
          </h3>
          <p className="text-[11px] text-purple-600 font-bold mt-1">High volume retailers</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Trial Period Tenants</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">
            {data.filter((c) => c.status === 'Trial').length}
          </h3>
          <p className="text-[11px] text-amber-600 font-bold mt-1">14-day free onboarding</p>
        </div>
      </div>

      {/* Main Dynamic DataTable */}
      <DataTable
        columns={columns}
        data={data}
        searchKey="name"
        searchPlaceholder="Search company, owner or subdomain..."
        filters={[
          {
            column: 'plan',
            label: 'All Plans',
            options: [
              { label: 'Basic', value: 'Basic' },
              { label: 'Pro', value: 'Pro' },
              { label: 'Enterprise', value: 'Enterprise' },
            ],
          },
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Trial', value: 'Trial' },
              { label: 'Suspended', value: 'Suspended' },
            ],
          },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-1.5 rounded-xl h-10 px-4 text-xs font-bold cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Company
            </Button>
          </div>
        }
      />

      {/* View Company Details Modal */}
      {isViewModalOpen && selectedCompany && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200">
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#092C4C] text-white font-black text-lg flex items-center justify-center">
                  {selectedCompany.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{selectedCompany.name}</h3>
                  <p className="text-xs text-orange-600 font-mono">{selectedCompany.subdomain}</p>
                </div>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium">Owner Name</span>
                  <span className="font-bold text-gray-800 text-sm">{selectedCompany.owner}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Outlets / Branches</span>
                  <span className="font-bold text-gray-800 text-sm">{selectedCompany.storesCount} Outlets</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Email</span>
                  <span className="font-bold text-gray-800">{selectedCompany.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Phone</span>
                  <span className="font-bold text-gray-800">{selectedCompany.phone}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-xl">
                <div>
                  <span className="text-gray-400 block font-medium">Current SaaS Plan</span>
                  <span className="font-bold text-gray-900">{selectedCompany.plan} Plan</span>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    selectedCompany.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {selectedCompany.status}
                </span>
              </div>

              {selectedCompany.customDomain && (
                <div className="p-3 bg-blue-50/60 border border-blue-100 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <div>
                      <span className="text-gray-500 block text-[11px]">Mapped Custom Domain</span>
                      <span className="font-bold text-blue-900">{selectedCompany.customDomain}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    SSL Active
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="text-xs h-9 rounded-xl border-gray-200 cursor-pointer"
              >
                Close
              </Button>
              <a
                href={`/dashboard?tenant=${selectedCompany.id}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#FF9F43] hover:bg-[#ff942a] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Impersonate Login</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Add New Company Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#FF9F43]" />
                <h3 className="text-base font-bold text-gray-900">Add New Tenant Company</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddCompany} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company / Store Name *</label>
                <Input
                  required
                  placeholder="e.g. Green Valley Supermarket"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Owner Name *</label>
                  <Input
                    required
                    placeholder="Owner Full Name"
                    value={newCompany.owner}
                    onChange={(e) => setNewCompany({ ...newCompany, owner: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                  <Input
                    placeholder="+880 1711-XXXXXX"
                    value={newCompany.phone}
                    onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Email Address *</label>
                  <Input
                    required
                    type="email"
                    placeholder="owner@store.com"
                    value={newCompany.email}
                    onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subdomain Slug</label>
                  <div className="relative">
                    <Input
                      placeholder="greenvalley"
                      value={newCompany.subdomain}
                      onChange={(e) => setNewCompany({ ...newCompany, subdomain: e.target.value })}
                      className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200 pr-24"
                    />
                    <span className="absolute right-2 top-2 text-[10px] text-gray-400 font-mono">
                      .bikripos.com
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">SaaS Package</label>
                  <select
                    value={newCompany.plan}
                    onChange={(e) => setNewCompany({ ...newCompany, plan: e.target.value as any })}
                    className="w-full h-9 px-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="Basic">Basic</option>
                    <option value="Pro">Pro</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Initial Outlets</label>
                  <Input
                    type="number"
                    min="1"
                    value={newCompany.storesCount}
                    onChange={(e) => setNewCompany({ ...newCompany, storesCount: Number(e.target.value) })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Status</label>
                  <select
                    value={newCompany.status}
                    onChange={(e) => setNewCompany({ ...newCompany, status: e.target.value as any })}
                    className="w-full h-9 px-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Trial">Trial</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-xs h-9 rounded-xl border-gray-200 cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF9F43] hover:bg-[#ff942a] text-white text-xs font-bold h-9 rounded-xl cursor-pointer"
                >
                  Save & Provision Tenant
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
