'use client';

import React, { useState, useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { 
  DollarSign, Download, Search, CheckCircle2, 
  ExternalLink, FileText, ArrowDownToLine, MoreVertical, 
  Eye, RefreshCw, X, Printer, ShieldCheck
} from 'lucide-react';
import { DataTable } from '@/components/ui/data-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export interface Transaction {
  invoiceNo: string;
  companyName: string;
  plan: string;
  amount: string;
  method: string;
  date: string;
  status: 'Paid' | 'Pending' | 'Refunded';
}

const DEFAULT_TRANSACTIONS: Transaction[] = [
  { invoiceNo: 'INV-2026-081', companyName: 'Bengal Super Shop', plan: 'Enterprise (Monthly)', amount: '$99.00', method: 'bKash Merchant', date: '12 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-080', companyName: 'Dhaka Cafe & Bakery', plan: 'Pro (Yearly)', amount: '$490.00', method: 'Stripe Card', date: '10 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-079', companyName: 'Apex Retailers Ltd', plan: 'Enterprise (Yearly)', amount: '$990.00', method: 'Direct Bank Wire', date: '08 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-078', companyName: 'Urban Outfitters', plan: 'Pro (Monthly)', amount: '$49.00', method: 'Nagad', date: '05 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-077', companyName: 'Quick Pharmacy Plus', plan: 'Basic (Monthly)', amount: '$19.00', method: 'Nagad', date: '04 Oct 2026', status: 'Pending' },
  { invoiceNo: 'INV-2026-076', companyName: 'Kite Fashion Hub', plan: 'Basic (Monthly)', amount: '$19.00', method: 'bKash', date: '01 Oct 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-075', companyName: 'Sylhet Gourmet Foods', plan: 'Enterprise (Monthly)', amount: '$99.00', method: 'bKash Merchant', date: '28 Sep 2026', status: 'Paid' },
  { invoiceNo: 'INV-2026-074', companyName: 'Chittagong Agro Tech', plan: 'Pro (Monthly)', amount: '$49.00', method: 'bKash', date: '15 Sep 2026', status: 'Refunded' },
];

interface TransactionsTableProps {
  initialData?: Transaction[];
}

export function TransactionsTable({ initialData = DEFAULT_TRANSACTIONS }: TransactionsTableProps) {
  const [data, setData] = useState<Transaction[]>(initialData);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);

  const exportCSV = () => {
    const headers = ['Invoice No,Company Name,Plan,Amount,Method,Date,Status\n'];
    const rows = data.map(
      (t) => `"${t.invoiceNo}","${t.companyName}","${t.plan}","${t.amount}","${t.method}","${t.date}","${t.status}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `bikripos-invoices-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: ColumnDef<Transaction>[] = useMemo(
    () => [
      {
        accessorKey: 'invoiceNo',
        header: 'Invoice No',
        cell: ({ row }) => (
          <span className="font-mono text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded border border-gray-200">
            {row.getValue('invoiceNo')}
          </span>
        ),
      },
      {
        accessorKey: 'companyName',
        header: 'Billed Business',
        cell: ({ row }) => {
          const tx = row.original;
          return (
            <div>
              <span className="font-bold text-gray-900 block leading-tight text-xs sm:text-sm">
                {tx.companyName}
              </span>
              <span className="text-[11px] text-gray-400 block mt-0.5 font-medium">
                {tx.plan}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: 'amount',
        header: 'Total Paid',
        cell: ({ row }) => (
          <span className="font-black text-gray-900 text-xs sm:text-sm">
            {row.getValue('amount')}
          </span>
        ),
      },
      {
        accessorKey: 'method',
        header: 'Payment Gateway',
        cell: ({ row }) => {
          const method = row.getValue('method') as string;
          return (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded border bg-white border-gray-200 text-gray-800 inline-block">
              {method}
            </span>
          );
        },
      },
      {
        accessorKey: 'date',
        header: 'Payment Date',
        cell: ({ row }) => (
          <span className="text-xs text-gray-600 font-medium">
            {row.getValue('date')}
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
                status === 'Paid'
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : status === 'Pending'
                  ? 'bg-amber-50 text-amber-700 border-amber-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  status === 'Paid'
                    ? 'bg-emerald-500'
                    : status === 'Pending'
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
          const tx = row.original;
          return (
            <div className="flex items-center justify-end gap-1.5">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSelectedTx(tx);
                  setIsReceiptModalOpen(true);
                }}
                className="h-8 text-xs font-semibold border-gray-200 text-gray-700 hover:bg-gray-50 flex items-center gap-1 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-orange-500" />
                <span className="hidden sm:inline">Receipt</span>
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
                    Invoice Controls
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedTx(tx);
                      setIsReceiptModalOpen(true);
                    }}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-500" />
                    <span>View / Print Invoice</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setData((prev) =>
                        prev.map((t) =>
                          t.invoiceNo === tx.invoiceNo
                            ? { ...t, status: t.status === 'Paid' ? 'Refunded' : 'Paid' }
                            : t
                        )
                      );
                    }}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-2 px-2 py-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-amber-500" />
                    <span>Toggle Paid / Refund</span>
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
          <span className="text-xs font-semibold text-gray-500">Total Billed Volume</span>
          <h3 className="text-2xl font-black text-gray-900 mt-1">$48,930</h3>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">Direct merchant settlement</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Successful Invoices</span>
          <h3 className="text-2xl font-black text-emerald-600 mt-1">
            {data.filter((t) => t.status === 'Paid').length}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">100% reconciled</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Pending Invoices</span>
          <h3 className="text-2xl font-black text-amber-600 mt-1">
            {data.filter((t) => t.status === 'Pending').length}
          </h3>
          <p className="text-[11px] text-amber-600 font-bold mt-1">Awaiting bank/gateway</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-4">
          <span className="text-xs font-semibold text-gray-500">Refunds Processed</span>
          <h3 className="text-2xl font-black text-rose-600 mt-1">
            {data.filter((t) => t.status === 'Refunded').length}
          </h3>
          <p className="text-[11px] text-gray-400 mt-1">SLA guarantee compliant</p>
        </div>
      </div>

      {/* Main Dynamic DataTable */}
      <DataTable
        columns={columns}
        data={data}
        searchKey="companyName"
        searchPlaceholder="Search invoice number or business..."
        filters={[
          {
            column: 'status',
            label: 'All Status',
            options: [
              { label: 'Paid', value: 'Paid' },
              { label: 'Pending', value: 'Pending' },
              { label: 'Refunded', value: 'Refunded' },
            ],
          },
        ]}
        actions={
          <Button
            onClick={exportCSV}
            className="bg-slate-100 hover:bg-slate-200 text-gray-800 flex items-center gap-1.5 rounded-xl h-10 px-4 text-xs font-bold border border-gray-200 cursor-pointer"
          >
            <Download className="w-4 h-4 text-gray-600" /> Export CSV Statement
          </Button>
        }
      />

      {/* Official SaaS Invoice Receipt Modal */}
      {isReceiptModalOpen && selectedTx && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-gray-200 text-gray-900">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black text-gray-900">Bikri</span>
                  <span className="text-xl font-black text-[#FF9F43]">POS</span>
                  <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-1.5 rounded border border-orange-200 uppercase ml-1">
                    Cloud Suite
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">BikriPOS Technologies Inc. • Tax Invoice</p>
              </div>
              <button
                onClick={() => setIsReceiptModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Receipt Body */}
            <div className="py-4 space-y-4 text-xs">
              <div className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                <div>
                  <span className="text-gray-400 block font-medium">Invoice Number</span>
                  <span className="font-mono font-bold text-gray-900 text-sm">{selectedTx.invoiceNo}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block font-medium">Payment Date</span>
                  <span className="font-bold text-gray-900">{selectedTx.date}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-400 block font-medium mb-1">Billed To (Tenant)</span>
                <p className="font-bold text-gray-900 text-sm">{selectedTx.companyName}</p>
                <p className="text-gray-500 text-[11px]">Authorized Enterprise Tenant Account</p>
              </div>

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 text-gray-500 font-bold border-b border-gray-200">
                    <tr>
                      <th className="p-3">Subscription Item</th>
                      <th className="p-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="p-3">
                        <span className="font-bold text-gray-800">{selectedTx.plan}</span>
                        <span className="block text-[11px] text-gray-400">Recurring Cloud POS multi-store SaaS subscription</span>
                      </td>
                      <td className="p-3 text-right font-black text-gray-900 text-sm">
                        {selectedTx.amount}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                <div>
                  <span className="text-emerald-800 font-bold block">Status: {selectedTx.status}</span>
                  <span className="text-[11px] text-emerald-600">Method: {selectedTx.method}</span>
                </div>
                <span className="text-lg font-black text-emerald-700">{selectedTx.amount}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-[10px] text-gray-400">support@bikripos.com</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsReceiptModalOpen(false)}
                  className="text-xs h-9 rounded-xl border-gray-200 cursor-pointer"
                >
                  Close
                </Button>
                <Button
                  onClick={() => window.print()}
                  className="bg-[#FF9F43] hover:bg-[#ff942a] text-white text-xs font-semibold h-9 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
