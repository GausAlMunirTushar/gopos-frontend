'use client';

import React, { useState } from 'react';
import { 
  Globe, CheckCircle2, Clock, AlertTriangle, 
  ExternalLink, RefreshCw, ShieldCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DomainRequest {
  id: string;
  companyName: string;
  subdomain: string;
  customDomain: string;
  cnameTarget: string;
  sslStatus: 'Issued' | 'Pending' | 'Failed';
  status: 'Active' | 'Pending Verification' | 'Rejected';
  requestedDate: string;
}

const mockDomains: DomainRequest[] = [
  { id: 'DOM-01', companyName: 'Bengal Super Shop', subdomain: 'bengal.bikripos.com', customDomain: 'bengalshop.com.bd', cnameTarget: 'cname.bikripos.com', sslStatus: 'Issued', status: 'Active', requestedDate: '14 Feb 2026' },
  { id: 'DOM-02', companyName: 'Apex Retailers Ltd', subdomain: 'apex.bikripos.com', customDomain: 'pos.apexretail.com', cnameTarget: 'cname.bikripos.com', sslStatus: 'Issued', status: 'Active', requestedDate: '20 Mar 2026' },
  { id: 'DOM-03', companyName: 'Dhaka Cafe & Bakery', subdomain: 'dhakacafe.bikripos.com', customDomain: 'pos.dhakacafe.com', cnameTarget: 'cname.bikripos.com', sslStatus: 'Pending', status: 'Pending Verification', requestedDate: '16 Oct 2026' },
];

export default function DomainRequestsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-gray-900 tracking-tight">Custom Domain Requests</h1>
        <p className="text-gray-500 text-sm mt-0.5">Manage white-label custom domain mappings and automated Let&apos;s Encrypt SSL certificates.</p>
      </div>

      {/* Domain Instructions Banner */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-base">DNS Target Server</h3>
          </div>
          <p className="text-slate-300 text-xs">
            Tenants must create a CNAME record pointing to <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-blue-200">cname.bikripos.com</span> or A Record pointing to <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-blue-200">104.21.45.18</span>.
          </p>
        </div>

        <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition-all">
          Re-check All DNS Records
        </button>
      </div>

      {/* Domains Table */}
      <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-[11px] font-bold border-b border-gray-100">
              <tr>
                <th className="px-5 py-3.5">Company</th>
                <th className="px-5 py-3.5">Internal Subdomain</th>
                <th className="px-5 py-3.5">Custom Domain</th>
                <th className="px-5 py-3.5">CNAME Record</th>
                <th className="px-5 py-3.5">SSL Status</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {mockDomains.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-gray-900">{d.companyName}</td>
                  <td className="px-5 py-3.5 text-xs text-blue-600 font-mono">{d.subdomain}</td>
                  <td className="px-5 py-3.5 font-bold text-gray-900 font-mono text-xs flex items-center gap-1.5 mt-2">
                    <span>{d.customDomain}</span>
                    <a href={`https://${d.customDomain}`} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500 font-mono">{d.cnameTarget}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                      d.sslStatus === 'Issued' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      <ShieldCheck className="w-3 h-3" />
                      {d.sslStatus}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      d.status === 'Active' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    <button className="px-2.5 py-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-gray-700 rounded-lg transition-colors">
                      Verify DNS
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
