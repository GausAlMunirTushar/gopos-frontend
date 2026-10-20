'use client';

import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  Globe, CheckCircle2, Clock, AlertTriangle, 
  ExternalLink, RefreshCw, ShieldCheck, Plus, 
  MoreVertical, Copy, Check, Trash2, X, Lock
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

export interface DomainRequest {
  id: string;
  companyName: string;
  subdomain: string;
  customDomain: string;
  cnameTarget: string;
  sslStatus: 'Issued' | 'Pending' | 'Failed';
  status: 'Active' | 'Pending Verification' | 'Rejected';
  requestedDate: string;
}

const DEFAULT_DOMAINS: DomainRequest[] = [
  { id: 'DOM-01', companyName: 'Bengal Super Shop', subdomain: 'bengal.bikripos.com', customDomain: 'bengalshop.com.bd', cnameTarget: 'cname.bikripos.com', sslStatus: 'Issued', status: 'Active', requestedDate: '14 Feb 2026' },
  { id: 'DOM-02', companyName: 'Apex Retailers Ltd', subdomain: 'apex.bikripos.com', customDomain: 'pos.apexretail.com', cnameTarget: 'cname.bikripos.com', sslStatus: 'Issued', status: 'Active', requestedDate: '20 Mar 2026' },
  { id: 'DOM-03', companyName: 'Dhaka Cafe & Bakery', subdomain: 'dhakacafe.bikripos.com', customDomain: 'pos.dhakacafe.com', cnameTarget: 'cname.bikripos.com', sslStatus: 'Pending', status: 'Pending Verification', requestedDate: '16 Oct 2026' },
  { id: 'DOM-04', companyName: 'Sylhet Gourmet Foods', subdomain: 'sylhetfood.bikripos.com', customDomain: 'sylhetfood.com.bd', cnameTarget: 'cname.bikripos.com', sslStatus: 'Issued', status: 'Active', requestedDate: '18 May 2026' },
  { id: 'DOM-05', companyName: 'Barisal Fresh Market', subdomain: 'barisalfresh.bikripos.com', customDomain: 'shop.barisalfresh.com', cnameTarget: 'cname.bikripos.com', sslStatus: 'Failed', status: 'Pending Verification', requestedDate: '01 Oct 2026' },
];

interface DomainRequestsTableProps {
  initialData?: DomainRequest[];
}

export function DomainRequestsTable({ initialData = DEFAULT_DOMAINS }: DomainRequestsTableProps) {
  const [data, setData] = useState<DomainRequest[]>(initialData);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Request Form State
  const [newReq, setNewReq] = useState({
    companyName: '',
    subdomain: '',
    customDomain: '',
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleVerifyDns = (id: string) => {
    setVerifyingId(id);
    setTimeout(() => {
      setData((prev) =>
        prev.map((d) => {
          if (d.id === id) {
            return {
              ...d,
              status: 'Active',
              sslStatus: 'Issued',
            };
          }
          return d;
        })
      );
      setVerifyingId(null);
    }, 1200);
  };

  const handleAddDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReq.companyName || !newReq.customDomain) return;

    const created: DomainRequest = {
      id: `DOM-0${data.length + 1}`,
      companyName: newReq.companyName,
      subdomain: newReq.subdomain ? `${newReq.subdomain}.bikripos.com` : 'store.bikripos.com',
      customDomain: newReq.customDomain,
      cnameTarget: 'cname.bikripos.com',
      sslStatus: 'Pending',
      status: 'Pending Verification',
      requestedDate: 'Today',
    };

    setData((prev) => [created, ...prev]);
    setIsAddModalOpen(false);
    setNewReq({ companyName: '', subdomain: '', customDomain: '' });
  };

  const columns: ColumnDef<DomainRequest>[] = useMemo(
    () => [
      {
        accessorKey: 'companyName',
        header: 'Company / Tenant',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div>
              <span className="font-bold text-gray-900 block leading-tight text-xs sm:text-sm">
                {item.companyName}
              </span>
              <span className="text-xs text-orange-600 font-mono block mt-0.5">
                {item.subdomain}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'customDomain',
        header: 'Custom Domain Mapping',
        cell: ({ row }) => {
          const item = row.original;
          return (
            <div className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <a
                href={`https://${item.customDomain}`}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-blue-900 text-xs hover:underline flex items-center gap-1"
              >
                <span>{item.customDomain}</span>
                <ExternalLink className="w-3 h-3 text-blue-400" />
              </a>
            </div>
          );
        },
      },
      {
        accessorKey: 'cnameTarget',
        header: 'DNS Target (CNAME)',
        cell: ({ row }) => {
          const target = row.original.cnameTarget;
          return (
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">
                {target}
              </span>
              <button
                type="button"
                onClick={() => handleCopy(target)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded hover:bg-gray-100 cursor-pointer"
                title="Copy DNS Target"
              >
                {copiedText === target ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: 'sslStatus',
        header: 'SSL Certificate',
        cell: ({ row }) => {
          const ssl = row.getValue('sslStatus') as string;
          return (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                ssl === 'Issued'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : ssl === 'Pending'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <Lock className="w-3 h-3" />
              {ssl}
            </span>
          );
        },
      },
      {
        accessorKey: 'status',
        header: 'Verification Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string;
          return (
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 border ${
                status === 'Active'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : status === 'Pending Verification'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === 'Active'
                    ? 'bg-emerald-500'
                    : status === 'Pending Verification'
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
        accessorKey: 'requestedDate',
        header: 'Date',
        cell: ({ row }) => (
          <span className="text-xs text-gray-500 font-medium">
            {row.getValue('requestedDate')}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <div className="text-right">Actions</div>,
        cell: ({ row }) => {
          const item = row.original;
          const isVerifying = verifyingId === item.id;

          return (
            <div className="flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleVerifyDns(item.id)}
                disabled={isVerifying}
                className="h-8 text-xs font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-blue-600 ${isVerifying ? 'animate-spin' : ''}`}
                />
                <span className="hidden sm:inline">
                  {isVerifying ? 'Checking...' : 'Verify DNS'}
                </span>
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
                    Domain Actions
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => handleVerifyDns(item.id)}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Re-issue SSL Certificate</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-1 bg-gray-100" />
                  <DropdownMenuItem
                    onClick={() => setData((prev) => prev.filter((d) => d.id !== item.id))}
                    className="text-xs font-medium text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove Mapping</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          );
        },
      },
    ],
    [copiedText, verifyingId]
  );

  return (
    <div className="space-y-6">
      {/* DNS Instructions Banner (Clean Light Theme) */}
      <div className="bg-white border border-gray-200/90 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-gray-900">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-[#FF9F43]" />
            <h3 className="font-bold text-base text-gray-900">DNS Target Server Routing</h3>
          </div>
          <p className="text-gray-600 text-xs max-w-2xl leading-relaxed">
            Tenants must create a CNAME record pointing to{' '}
            <span className="font-mono bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded font-semibold">
              cname.bikripos.com
            </span>{' '}
            or an A Record pointing to{' '}
            <span className="font-mono bg-orange-50 text-orange-700 border border-orange-200 px-2 py-0.5 rounded font-semibold">
              104.21.45.18
            </span>
            . SSL certificates are provisioned automatically via Let&apos;s Encrypt upon DNS propagation.
          </p>
        </div>

        <Button
          onClick={() => {
            setVerifyingId('ALL');
            setTimeout(() => {
              setData((prev) =>
                prev.map((d) => ({
                  ...d,
                  status: 'Active',
                  sslStatus: 'Issued',
                }))
              );
              setVerifyingId(null);
            }, 1000);
          }}
          className="bg-orange-50 hover:bg-orange-100 text-[#FF9F43] rounded-xl text-xs font-semibold border border-orange-200 cursor-pointer h-10 px-4 shrink-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${verifyingId === 'ALL' ? 'animate-spin' : ''}`} />
          Re-check All DNS Records
        </Button>
      </div>

      {/* Main Dynamic DataTable */}
      <DataTable
        columns={columns}
        data={data}
        searchKey="companyName"
        searchPlaceholder="Search tenant or custom domain..."
        filters={[
          {
            column: 'sslStatus',
            label: 'All SSL',
            options: [
              { label: 'Issued', value: 'Issued' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Failed', value: 'Failed' },
            ],
          },
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Active', value: 'Active' },
              { label: 'Pending Verification', value: 'Pending Verification' },
              { label: 'Rejected', value: 'Rejected' },
            ],
          },
        ]}
        actions={
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-1.5 rounded-xl h-10 px-4 text-xs font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Request Domain Mapping
          </Button>
        }
      />

      {/* Add Domain Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 border border-gray-200">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[#FF9F43]" />
                <h3 className="text-base font-bold text-gray-900">Add Custom Domain</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDomain} className="py-4 space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tenant Company *</label>
                <Input
                  required
                  placeholder="e.g. Bengal Super Shop"
                  value={newReq.companyName}
                  onChange={(e) => setNewReq({ ...newReq, companyName: e.target.value })}
                  className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Subdomain Slug</label>
                <div className="relative">
                  <Input
                    placeholder="bengal"
                    value={newReq.subdomain}
                    onChange={(e) => setNewReq({ ...newReq, subdomain: e.target.value })}
                    className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200 pr-24"
                  />
                  <span className="absolute right-2 top-2 text-[10px] text-gray-400 font-mono">
                    .bikripos.com
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Custom Domain *</label>
                <Input
                  required
                  placeholder="pos.yourbrand.com or store.com"
                  value={newReq.customDomain}
                  onChange={(e) => setNewReq({ ...newReq, customDomain: e.target.value })}
                  className="h-9 rounded-xl text-xs bg-gray-50 border-gray-200"
                />
              </div>

              <div className="p-3 bg-orange-50/60 rounded-xl border border-orange-100 text-xs text-orange-800">
                <p className="font-semibold">DNS Configuration Required</p>
                <p className="text-[11px] text-orange-700 mt-0.5">
                  Point your DNS CNAME to <span className="font-mono font-bold">cname.bikripos.com</span>.
                </p>
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
                  Save & Issue Certificate
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
