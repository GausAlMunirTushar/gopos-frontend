'use client';

import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Users, Phone, Mail, MessageSquare, Plus, 
  CheckCircle2, Clock, Calendar, ArrowUpRight, 
  MoreVertical, Eye, Edit, Trash2, X, Store, 
  TrendingUp, Sparkles, AlertCircle, Building2,
  DollarSign, CheckSquare, Send
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

export type LeadStage = 'New' | 'Contacted' | 'Demo Scheduled' | 'Proposal' | 'Won' | 'Lost';
export type LeadPriority = 'High' | 'Medium' | 'Low';

export interface Lead {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  city: string;
  estimatedStores: number;
  dealValue: string;
  stage: LeadStage;
  priority: LeadPriority;
  source: 'Website Form' | 'WhatsApp' | 'Referral' | 'Social Media' | 'Direct Call';
  lastActivity: string;
  notes?: string;
}

const DEFAULT_LEADS: Lead[] = [
  {
    id: 'LEAD-101',
    businessName: 'Shwapno Outlet Franchise',
    contactPerson: 'Zakir Hossain',
    email: 'zakir@shwapno-franchise.com',
    phone: '+880 1711-889900',
    city: 'Dhaka (Uttara)',
    estimatedStores: 4,
    dealValue: '৳ 60,000/yr',
    stage: 'Demo Scheduled',
    priority: 'High',
    source: 'Website Form',
    lastActivity: 'Demo session set for Thursday 3 PM',
    notes: 'Needs multi-store inventory transfer and barcode scanner integration.',
  },
  {
    id: 'LEAD-102',
    businessName: 'Chittagong Pharma Care',
    contactPerson: 'Dr. Anwarul Haque',
    email: 'anwar@pharmacare.com.bd',
    phone: '+880 1819-223344',
    city: 'Chittagong (GEC)',
    estimatedStores: 2,
    dealValue: '৳ 35,000/yr',
    stage: 'Proposal',
    priority: 'High',
    source: 'WhatsApp',
    lastActivity: 'Quotation sent for 2 stores with thermal printer setup',
    notes: 'Requested batch number tracking and expiry date alerts.',
  },
  {
    id: 'LEAD-103',
    businessName: 'Dhaka Taste Buds Cafe',
    contactPerson: 'Nadia Sharmin',
    email: 'nadia@tastebuds.cafe',
    phone: '+880 1612-445566',
    city: 'Dhaka (Dhanmondi)',
    estimatedStores: 1,
    dealValue: '৳ 20,000/yr',
    stage: 'New',
    priority: 'Medium',
    source: 'Website Form',
    lastActivity: 'Signed up for 14-day cloud trial',
    notes: 'Interested in kitchen display system (KDS) & table order routing.',
  },
  {
    id: 'LEAD-104',
    businessName: 'Sylhet Fashion Avenue',
    contactPerson: 'Mahinur Rahman',
    email: 'mahinur@fashionavenue.com',
    phone: '+880 1715-778899',
    city: 'Sylhet (Zindabazar)',
    estimatedStores: 3,
    dealValue: '৳ 50,000/yr',
    stage: 'Won',
    priority: 'High',
    source: 'Referral',
    lastActivity: 'Payment received via bKash Merchant; account activated',
    notes: 'Converted to Pro Plan. Onboarding completed.',
  },
  {
    id: 'LEAD-105',
    businessName: 'Rajshahi Agro Seed Mart',
    contactPerson: 'Belal Ahmed',
    email: 'belal@rajshahiagro.com',
    phone: '+880 1913-112233',
    city: 'Rajshahi',
    estimatedStores: 1,
    dealValue: '৳ 18,000/yr',
    stage: 'Contacted',
    priority: 'Low',
    source: 'Direct Call',
    lastActivity: 'Initial call completed, requested feature checklist',
    notes: 'Currently using manual books. Needs basic training video.',
  },
  {
    id: 'LEAD-106',
    businessName: 'Khulna Electronics Zone',
    contactPerson: 'Tanveer Mahmud',
    email: 'tanveer@khulnaelect.com',
    phone: '+880 1515-998877',
    city: 'Khulna (Shibbari)',
    estimatedStores: 2,
    dealValue: '৳ 35,000/yr',
    stage: 'Lost',
    priority: 'Low',
    source: 'Social Media',
    lastActivity: 'Postponed project till next financial quarter',
    notes: 'Budget constraints; will follow up in 3 months.',
  },
];

export function CrmTable() {
  const [data, setData] = useState<Lead[]>(DEFAULT_LEADS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNote, setNewNote] = useState('');

  // Add Lead Form State
  const [newLead, setNewLead] = useState<Partial<Lead>>({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    city: 'Dhaka',
    estimatedStores: 1,
    dealValue: '৳ 20,000/yr',
    stage: 'New',
    priority: 'Medium',
    source: 'Website Form',
    notes: '',
  });

  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLead.businessName || !newLead.contactPerson) return;

    const created: Lead = {
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      businessName: newLead.businessName || '',
      contactPerson: newLead.contactPerson || '',
      email: newLead.email || 'lead@retail.com',
      phone: newLead.phone || '+880 1700-000000',
      city: newLead.city || 'Dhaka',
      estimatedStores: Number(newLead.estimatedStores) || 1,
      dealValue: newLead.dealValue || '৳ 20,000/yr',
      stage: (newLead.stage as LeadStage) || 'New',
      priority: (newLead.priority as LeadPriority) || 'Medium',
      source: (newLead.source as any) || 'Website Form',
      lastActivity: 'Lead created in CRM',
      notes: newLead.notes || 'Inquired about BikriPOS cloud edition.',
    };

    setData((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewLead({
      businessName: '',
      contactPerson: '',
      email: '',
      phone: '',
      city: 'Dhaka',
      estimatedStores: 1,
      dealValue: '৳ 20,000/yr',
      stage: 'New',
      priority: 'Medium',
      source: 'Website Form',
      notes: '',
    });
  };

  const updateStage = (id: string, stage: LeadStage) => {
    setData((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage, lastActivity: `Stage updated to ${stage}` } : l))
    );
  };

  const deleteLead = (id: string) => {
    setData((prev) => prev.filter((l) => l.id !== id));
  };

  const columns: ColumnDef<Lead>[] = useMemo(
    () => [
      {
        accessorKey: 'businessName',
        header: 'Lead / Store Business',
        cell: ({ row }) => {
          const lead = row.original;
          return (
            <div>
              <span className="font-medium text-gray-900 block leading-tight text-xs sm:text-sm">
                {lead.businessName}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[11px] text-gray-500 font-medium">{lead.contactPerson}</span>
                <span className="text-[10px] text-gray-400">• {lead.city}</span>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'phone',
        header: 'Contact Info',
        cell: ({ row }) => {
          const lead = row.original;
          const cleanPhone = lead.phone.replace(/[^0-9]/g, '');
          return (
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-xs text-gray-800">{lead.phone}</span>
                <a
                  href={`https://wa.me/${cleanPhone}`}
                  target="_blank"
                  rel="noreferrer"
                  title="Direct WhatsApp"
                  className="p-1 text-emerald-600 hover:bg-emerald-50 rounded"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                </a>
              </div>
              <span className="text-[11px] text-gray-400 block font-mono">{lead.email}</span>
            </div>
          );
        },
      },
      {
        accessorKey: 'estimatedStores',
        header: () => <div className="text-center">Stores</div>,
        cell: ({ row }) => (
          <div className="text-center">
            <span className="font-medium text-gray-800 bg-gray-100 px-2 py-0.5 rounded-md text-xs border border-gray-200">
              {row.getValue('estimatedStores')} Outlets
            </span>
          </div>
        ),
      },
      {
        accessorKey: 'dealValue',
        header: 'Deal Value',
        cell: ({ row }) => (
          <span className="font-semibold text-gray-900 text-xs">
            {row.getValue('dealValue')}
          </span>
        ),
      },
      {
        accessorKey: 'stage',
        header: 'Pipeline Stage',
        cell: ({ row }) => {
          const stage = row.getValue('stage') as LeadStage;
          const colors: Record<LeadStage, string> = {
            New: 'bg-blue-50 text-blue-700 border-blue-200',
            Contacted: 'bg-purple-50 text-purple-700 border-purple-200',
            'Demo Scheduled': 'bg-orange-50 text-orange-700 border-orange-200',
            Proposal: 'bg-amber-50 text-amber-700 border-amber-200',
            Won: 'bg-emerald-50 text-emerald-700 border-emerald-200',
            Lost: 'bg-rose-50 text-rose-700 border-rose-200',
          };
          return (
            <span
              className={`text-xs font-medium px-2.5 py-0.5 rounded-full border inline-block ${
                colors[stage] || 'bg-gray-50 text-gray-700 border-gray-200'
              }`}
            >
              {stage}
            </span>
          );
        },
      },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }) => {
          const p = row.getValue('priority') as LeadPriority;
          return (
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded inline-flex items-center gap-1 ${
                p === 'High'
                  ? 'text-rose-600 bg-rose-50'
                  : p === 'Medium'
                  ? 'text-orange-600 bg-orange-50'
                  : 'text-gray-500 bg-gray-100'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  p === 'High' ? 'bg-rose-500' : p === 'Medium' ? 'bg-orange-500' : 'bg-gray-400'
                }`}
              />
              {p}
            </span>
          );
        },
      },
      {
        accessorKey: 'source',
        header: 'Source',
        cell: ({ row }) => (
          <span className="text-xs text-gray-500 font-medium">
            {row.getValue('source')}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const lead = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedLead(lead);
                  setIsViewModalOpen(true);
                }}
                className="h-8 text-xs font-medium border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#FF9F43]" />
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
                    Change Stage
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => updateStage(lead.id, 'Demo Scheduled')}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>Set Demo Scheduled</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateStage(lead.id, 'Proposal')}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Send className="w-3.5 h-3.5 text-blue-500" />
                    <span>Send Proposal</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => updateStage(lead.id, 'Won')}
                    className="text-xs font-medium text-emerald-700 hover:bg-emerald-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Mark as Won / Closed</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem
                    onClick={() => deleteLead(lead.id)}
                    className="text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Archive Lead</span>
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
      {/* Top CRM Pipeline Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Total Inquiries & Leads</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">{data.length}</h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">+18 new this week</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Demos Scheduled</span>
          <h3 className="text-2xl font-black text-orange-600 mt-1">
            {data.filter((l) => l.stage === 'Demo Scheduled').length}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">Ready for live walkthrough</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Won / Converted</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">
            {data.filter((l) => l.stage === 'Won').length}
          </h3>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">Active subscriber tenants</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Est. Pipeline Value</span>
          <h3 className="text-2xl font-black text-purple-700 mt-1">৳ 218,000</h3>
          <p className="text-[11px] text-purple-600 font-medium mt-1">High conversion potential</p>
        </div>
      </div>

      {/* Main Dynamic DataTable */}
      <DataTable
        columns={columns}
        data={data}
        searchKey="businessName"
        searchPlaceholder="Search lead, business, or contact person..."
        filters={[
          {
            column: 'stage',
            label: 'All Stages',
            options: [
              { label: 'New', value: 'New' },
              { label: 'Contacted', value: 'Contacted' },
              { label: 'Demo Scheduled', value: 'Demo Scheduled' },
              { label: 'Proposal', value: 'Proposal' },
              { label: 'Won', value: 'Won' },
              { label: 'Lost', value: 'Lost' },
            ],
          },
          {
            column: 'priority',
            label: 'All Priority',
            options: [
              { label: 'High', value: 'High' },
              { label: 'Medium', value: 'Medium' },
              { label: 'Low', value: 'Low' },
            ],
          },
        ]}
        actions={
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-1.5 rounded-xl h-10 px-4 text-xs font-semibold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Prospect Lead
          </Button>
        }
      />

      {/* Lead Details & Notes Modal */}
      {isViewModalOpen && selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200">
            <div className="flex items-start justify-between border-b border-gray-100 pb-3">
              <div>
                <span className="text-xs text-gray-400 font-mono font-medium">{selectedLead.id}</span>
                <h3 className="text-base font-bold text-gray-900">{selectedLead.businessName}</h3>
                <p className="text-xs text-gray-500">{selectedLead.contactPerson} • {selectedLead.city}</p>
              </div>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium">Phone</span>
                  <span className="font-semibold text-gray-900">{selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Email</span>
                  <span className="font-semibold text-gray-900">{selectedLead.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Estimated Outlets</span>
                  <span className="font-semibold text-gray-900">{selectedLead.estimatedStores} Outlets</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Expected Value</span>
                  <span className="font-semibold text-gray-900">{selectedLead.dealValue}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block font-medium mb-1">Latest Activity / Note</span>
                <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-orange-900">
                  {selectedLead.lastActivity}
                </div>
              </div>

              {selectedLead.notes && (
                <div>
                  <span className="text-gray-400 block font-medium mb-1">Requirement Notes</span>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                    {selectedLead.notes}
                  </p>
                </div>
              )}

              {/* Quick Communication Actions */}
              <div className="flex items-center gap-2 pt-2">
                <a
                  href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-semibold rounded-xl border border-emerald-200 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Message</span>
                </a>
                <a
                  href={`tel:${selectedLead.phone}`}
                  className="flex-1 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold rounded-xl border border-blue-200 text-center flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
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

      {/* Add Lead Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#FF9F43]" />
                <h3 className="text-base font-bold text-gray-900">Add New Prospect Lead</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLead} className="py-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">Business / Retail Store *</label>
                <Input
                  required
                  placeholder="e.g. Meena Bazar Uttara"
                  value={newLead.businessName}
                  onChange={(e) => setNewLead({ ...newLead, businessName: e.target.value })}
                  className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Contact Person *</label>
                  <Input
                    required
                    placeholder="Owner / Manager Name"
                    value={newLead.contactPerson}
                    onChange={(e) => setNewLead({ ...newLead, contactPerson: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Phone (WhatsApp) *</label>
                  <Input
                    required
                    placeholder="+880 1711-XXXXXX"
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    placeholder="owner@store.com"
                    value={newLead.email}
                    onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">City / Location</label>
                  <Input
                    placeholder="e.g. Dhaka (Gulshan)"
                    value={newLead.city}
                    onChange={(e) => setNewLead({ ...newLead, city: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Estimated Outlets</label>
                  <Input
                    type="number"
                    min="1"
                    value={newLead.estimatedStores}
                    onChange={(e) => setNewLead({ ...newLead, estimatedStores: Number(e.target.value) })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Stage</label>
                  <select
                    value={newLead.stage}
                    onChange={(e) => setNewLead({ ...newLead, stage: e.target.value as any })}
                    className="w-full h-9 px-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Demo Scheduled">Demo Scheduled</option>
                    <option value="Proposal">Proposal</option>
                    <option value="Won">Won</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">Priority</label>
                  <select
                    value={newLead.priority}
                    onChange={(e) => setNewLead({ ...newLead, priority: e.target.value as any })}
                    className="w-full h-9 px-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium text-gray-700 outline-none"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-1">Requirement Notes</label>
                <textarea
                  rows={2}
                  placeholder="Store requirements, current software, requested demo date..."
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-800 outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
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
                  className="bg-[#FF9F43] hover:bg-[#ff942a] text-white text-xs font-semibold h-9 rounded-xl cursor-pointer"
                >
                  Save Lead
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
