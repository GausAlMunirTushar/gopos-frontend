'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  FileSpreadsheet, Calendar, ShoppingCart
} from 'lucide-react';

const purchaseData = [
  { no: 'PUR-101', supplier: 'Apex Computers', date: '22 Dec 2024', amount: '$5000', paid: '$5000', status: 'Paid' },
  { no: 'PUR-102', supplier: 'Beats Headphones', date: '19 Dec 2024', amount: '$2500', paid: '$1500', status: 'Partial' },
  { no: 'PUR-103', supplier: 'Dazzle Shoes', date: '15 Dec 2024', amount: '$3200', paid: '$0', status: 'Unpaid' },
  { no: 'PUR-104', supplier: 'Best Accessories', date: '10 Dec 2024', amount: '$1100', paid: '$1100', status: 'Paid' },
];

export default function PurchaseReport() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Purchase Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Purchase Report</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Filters Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Choose Date</label>
          <div className="relative">
            <input type="text" placeholder="01-Jan-2025 - 12-Dec-2025" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500" />
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Supplier</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="px-6 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors h-10">
            Generate Report
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        
        {/* Table Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Purchase Report</h3>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-red-500 hover:bg-gray-50 bg-white">
              <FileText className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-green-600 hover:bg-gray-50 bg-white">
              <FileSpreadsheet className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold">Purchase ID ↑↓</th>
                <th className="p-4 font-bold">Supplier</th>
                <th className="p-4 font-bold">Date ↑↓</th>
                <th className="p-4 font-bold">Total Amount ↑↓</th>
                <th className="p-4 font-bold">Paid ↑↓</th>
                <th className="p-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {purchaseData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-orange-500">{row.no}</td>
                  <td className="p-4 text-gray-900 font-medium">{row.supplier}</td>
                  <td className="p-4 text-gray-500">{row.date}</td>
                  <td className="p-4 text-gray-500">{row.amount}</td>
                  <td className="p-4 text-gray-500">{row.paid}</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${
                      row.status === 'Paid' ? 'bg-green-50 text-green-600 border-green-200' :
                      row.status === 'Unpaid' ? 'bg-red-50 text-red-600 border-red-200' :
                      'bg-orange-50 text-orange-600 border-orange-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        row.status === 'Paid' ? 'bg-green-600' :
                        row.status === 'Unpaid' ? 'bg-red-600' :
                        'bg-orange-600'
                      }`}></span>
                      {row.status}
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
