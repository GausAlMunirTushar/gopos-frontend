'use client';

import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  CreditCard, Search, Calendar, CheckCircle2, 
  AlertCircle, RefreshCw, ArrowUpRight, Plus, 
  MoreVertical, FileText, Ban, Eye, X, DollarSign,
  ShieldCheck
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

export interface Subscription {
  id: string;
  companyName: string;
  planName: 'Basic' | 'Pro' | 'Enterprise';
  billingCycle: 'Monthly' | 'Yearly';
  amount: string;
  nextRenewal: string;
  paymentGateway: 'bKash' | 'Nagad' | 'Stripe' | 'Bank';
  status: 'Active' | 'Past Due' | 'Cancelled';
}

const DEFAULT_SUBSCRIPTIONS: Subscription[] = [
  { id: 'SUB-9812', companyName: 'Bengal Super Shop', planName: 'Enterprise', billingCycle: 'Monthly', amount: '$99.00', nextRenewal: '12 Nov 2026', paymentGateway: 'bKash', status: 'Active' },
  { id: 'SUB-9813', companyName: 'Dhaka Cafe & Bakery', planName: 'Pro', billingCycle: 'Yearly', amount: '$490.00', nextRenewal: '04 Feb 2027', paymentGateway: 'Stripe', status: 'Active' },
  { id: 'SUB-9814', companyName: 'Apex Retailers Ltd', planName: 'Enterprise', billingCycle: 'Yearly', amount: '$990.00', nextRenewal: '18 Mar 2027', paymentGateway: 'Bank', status: 'Active' },
  { id: 'SUB-9815', companyName: 'Quick Pharmacy Plus', planName: 'Basic', billingCycle: 'Monthly', amount: '$19.00', nextRenewal: '24 Oct 2026', paymentGateway: 'Nagad', status: 'Past Due' },
  { id: 'SUB-9816', companyName: 'Chittagong Agro Tech', planName: 'Pro', billingCycle: 'Monthly', amount: '$49.00', nextRenewal: '15 Sep 2026', paymentGateway: 'bKash', status: 'Cancelled' },
  { id: 'SUB-9817', companyName: 'Sylhet Gourmet Foods', planName: 'Enterprise', billingCycle: 'Monthly', amount: '$99.00', nextRenewal: '15 Nov 2026', paymentGateway: 'bKash', status: 'Active' },
  { id: 'SUB-9818', companyName: 'Barisal Fresh Market', planName: 'Basic', billingCycle: 'Monthly', amount: '$19.00', nextRenewal: '02 Nov 2026', paymentGateway: 'Nagad', status: 'Active' },
];

interface SubscriptionsTableProps {
  initialData?: Subscription[];
}

export function SubscriptionsTable({ initialData = DEFAULT_SUBSCRIPTIONS }: SubscriptionsTableProps) {
  const [data, setData] = useState<Subscription[]>(initialData);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Subscription Form State
  const [newSub, setNewSub] = useState<Partial<Subscription>>({
    companyName: '',
    planName: 'Pro',
    billingCycle: 'Monthly',
    amount: '$49.00',
    paymentGateway: 'bKash',
    status: 'Active',
    nextRenewal: '30 Days from today',
  });

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSub.companyName) return;

    const created: Subscription = {
      id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
      companyName: newSub.companyName || '',
      planName: (newSub.planName as any) || 'Pro',
      billingCycle: (newSub.billingCycle as any) || 'Monthly',
      amount: newSub.amount || '$49.00',
      paymentGateway: (newSub.paymentGateway as any) || 'bKash',
      status: (newSub.status as any) || 'Active',
      nextRenewal: '20 Nov 2026',
    };

    setData((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewSub({
      companyName: '',
      planName: 'Pro',
      billingCycle: 'Monthly',
      amount: '$49.00',
      paymentGateway: 'bKash',
      status: 'Active',
    });
  };

  const toggleSubStatus = (id: string) => {
    setData((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const next = s.status === 'Active' ? 'Cancelled' : 'Active';
          return { ...s, status: next };
        }
        return s;
      })
    );
  };

  const columns: ColumnDef<Subscription>[] = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'Subscription ID',
        cell: ({ row }) => (
          <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
            {row.getValue('id')}
          </span>
        ),
      },
      {
        accessorKey: 'companyName',
        header: 'Subscriber Business',
        cell: ({ row }) => {
          const sub = row.original;
          return (
            <div>
              <span className="font-bold text-gray-900 block leading-tight text-xs sm:text-sm">
                {sub.companyName}
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5">
                Gateway: {sub.paymentGateway}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'planName',
        header: 'Package Plan',
        cell: ({ row }) => {
          const plan = row.getValue('planName') as string;
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
        accessorKey: 'billingCycle',
        header: 'Cycle',
        cell: ({ row }) => {
          const cycle = row.getValue('billingCycle') as string;
          return (
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
                cycle === 'Yearly'
                  ? 'bg-emerald-50 text-emerald-700 font-bold'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {cycle}
            </span>
          );
        },
      },
      {
        accessorKey: 'amount',
        header: 'Recurring Fee',
        cell: ({ row }) => (
          <span className="font-extrabold text-gray-900 text-xs sm:text-sm">
            {row.getValue('amount')}
          </span>
        ),
      },
      {
        accessorKey: 'paymentGateway',
        header: 'Gateway',
        cell: ({ row }) => {
          const gw = row.getValue('paymentGateway') as string;
          return (
            <span
              className={`text-xs font-bold px-2 py-0.5 rounded border inline-block ${
                gw === 'bKash'
                  ? 'bg-pink-50 text-pink-700 border-pink-200'
                  : gw === 'Nagad'
                  ? 'bg-orange-50 text-orange-700 border-orange-200'
                  : gw === 'Stripe'
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                  : 'bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              {gw}
            </span>
          );
        },
      },
      {
        accessorKey: 'nextRenewal',
        header: 'Next Renewal',
        cell: ({ row }) => (
          <span className="text-xs text-gray-600 font-medium">
            {row.getValue('nextRenewal')}
          </span>
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
                  : status === 'Past Due'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === 'Active'
                    ? 'bg-emerald-500'
                    : status === 'Past Due'
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
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const sub = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedSub(sub);
                  setIsViewModalOpen(true);
                }}
                className="h-8 text-xs font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Details</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-gray-500 hover:text-gray-900 rounded-lg cursor-pointer"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border border-gray-200 rounded-xl p-1 z-50">
                  <DropdownMenuLabel className="text-xs text-gray-500 px-2 py-1 font-semibold">
                    Billing Options
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => toggleSubStatus(sub.id)}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    {sub.status === 'Active' ? (
                      <>
                        <Ban className="w-3.5 h-3.5 text-rose-500" />
                        <span>Cancel Subscription</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Reactivate Subscription</span>
                      </>
                    )}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setData((prev) =>
                        prev.map((s) => (s.id === sub.id ? { ...s, nextRenewal: '30 Days Extended' } : s))
                      );
                    }}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
                    <span>Extend 30-Day Grace</span>
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
      {/* Top Revenue Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Monthly Recurring (MRR)</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">$14,820</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">+12.6% vs last month</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Active Subscriptions</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">
            {data.filter((s) => s.status === 'Active').length}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">Paid automated billings</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Past Due / Retrying</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">
            {data.filter((s) => s.status === 'Past Due').length}
          </h3>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Auto-retry in 24 hours</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Local Gateways</span>
          <h3 className="text-2xl font-black text-pink-600 mt-1">bKash + Nagad</h3>
          <p className="text-[11px] text-gray-400 mt-1">Direct merchant settlement</p>
        </div>
      </div>

      {/* Main Dynamic DataTable */}
      <DataTable
        columns={columns}
        data={data}
        searchKey="companyName"
        searchPlaceholder="Search company or subscription ID..."
        filters={[
          {
            column: 'planName',
            label: 'All Plans',
            options: [
              { label: 'Basic', value: 'Basic' },
              { label: 'Pro', value: 'Pro' },
              { label: 'Enterprise', value: 'Enterprise' },
            ],
          },
          {
            column: 'paymentGateway',
            label: 'All Gateways',
            options: [
              { label: 'bKash', value: 'bKash' },
              { label: 'Nagad', value: 'Nagad' },
              { label: 'Stripe', value: 'Stripe' },
              { label: 'Bank', value: 'Bank' },
            ],
          },
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Past Due', value: 'Past Due' },
              { label: 'Cancelled', value: 'Cancelled' },
            ],
          },
        ]}
        actions={
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-1.5 rounded-xl h-10 px-4 text-xs font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Create Subscription
          </Button>
        }
      />

      {/* Subscription Details Modal */}
      {isViewModalOpen && selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs text-gray-400 font-mono font-bold">{selectedSub.id}</span>
                <h3 className="text-base font-bold text-gray-900">{selectedSub.companyName}</h3>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Subscribed Package</span>
                <span className="font-bold text-gray-800">{selectedSub.planName} Plan</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Billing Cycle</span>
                <span className="font-bold text-gray-800">{selectedSub.billingCycle}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Amount Charged</span>
                <span className="font-black text-gray-900 text-sm">{selectedSub.amount}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Payment Gateway</span>
                <span className="font-bold text-gray-800">{selectedSub.paymentGateway}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Next Scheduled Renewal</span>
                <span className="font-bold text-gray-800">{selectedSub.nextRenewal}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-500">Status</span>
                <span className="font-bold text-emerald-600">{selectedSub.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
              <Button
                variant="outline"
                onClick={() => setIsViewModalOpen(false)}
                className="text-xs h-9 rounded-xl border-gray-200 cursor-pointer"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Subscription Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#FF9F43]" />
                <h3 className="text-base font-bold text-gray-900">Create Subscription</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubscription} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company / Store *</label>
                <Input
                  required
                  placeholder="e.g. Bengal Super Shop"
                  value={newSub.companyName}
                  onChange={(e) => setNewSub({ ...newSub, companyName: e.target.value })}
                  className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Plan</label>
                  <select
                    value={newSub.planName}
                    onChange={(e) => setNewSub({ ...newSub, planName: e.target.value as any })}
                    className="w-full h-9 px-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="Basic">Basic ($19/mo)</option>
                    <option value="Pro">Pro ($49/mo)</option>
                    <option value="Enterprise">Enterprise ($99/mo)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Billing Cycle</label>
                  <select
                    value={newSub.billingCycle}
                    onChange={(e) => setNewSub({ ...newSub, billingCycle: e.target.value as any })}
                    className="w-full h-9 px-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="Monthly">Monthly</option>
                    <option value="Yearly">Yearly (Save 20%)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Payment Gateway</label>
                  <select
                    value={newSub.paymentGateway}
                    onChange={(e) => setNewSub({ ...newSub, paymentGateway: e.target.value as any })}
                    className="w-full h-9 px-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="bKash">bKash Merchant</option>
                    <option value="Nagad">Nagad Direct</option>
                    <option value="Stripe">Stripe Card</option>
                    <option value="Bank">Direct Bank Wire</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Fee Amount</label>
                  <Input
                    value={newSub.amount}
                    onChange={(e) => setNewSub({ ...newSub, amount: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
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
                  Create & Activate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
