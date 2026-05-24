'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  Edit, Trash2, ChevronLeft, FileSpreadsheet, Plus, Download
} from 'lucide-react';

const transferData = [
  { from: 'Lavish Warehouse', to: 'North Zone Warehouse', products: 20, qty: 15, ref: '#458924', date: '24 Dec 2024' },
  { from: 'Quaint Warehouse', to: 'Nova Storage Hub', products: 25, qty: 20, ref: '#429054', date: '10 Dec 2024' },
  { from: 'Traditional Warehouse', to: 'Cool Warehouse', products: 40, qty: 30, ref: '#419893', date: '27 Nov 2024' },
  { from: 'Cool Warehouse', to: 'Retail Supply Hub', products: 50, qty: 40, ref: '#386914', date: '18 Nov 2024' },
  { from: 'Overflow Warehouse', to: 'Quaint Warehouse', products: 30, qty: 20, ref: '#366713', date: '06 Nov 2024' },
  { from: 'Nova Storage Hub', to: 'Traditional Warehouse', products: 10, qty: '06', ref: '#327814', date: '25 Oct 2024' },
  { from: 'Retail Supply Hub', to: 'Overflow Warehouse', products: 70, qty: 60, ref: '#274509', date: '14 Oct 2024' },
  { from: 'EdgeWare Solutions', to: 'Lavish Warehouse', products: 35, qty: 30, ref: '#239073', date: '03 Oct 2024' },
  { from: 'North Zone Warehouse', to: 'Fulfillment Hub', products: 15, qty: 10, ref: '#187204', date: '20 Sep 2024' },
  { from: 'Fulfillment Hub', to: 'EdgeWare Solutions', products: 45, qty: 35, ref: '#139064', date: '10 Sep 2024' },
];

export default function StockTransfer() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Stock Transfer</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Stock Transfer</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-red-500 hover:bg-gray-50 bg-white">
             <FileText className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-green-600 hover:bg-gray-50 bg-white">
             <FileSpreadsheet className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <ChevronUp className="w-5 h-5" />
          </button>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors">
            <Plus className="w-4 h-4" /> Add Transfer
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg font-medium transition-colors">
            <Download className="w-4 h-4" /> Import Transfer
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        
        {/* Filters */}
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></th>
                <th className="p-4 font-bold">From Warehouse</th>
                <th className="p-4 font-bold">To Warehouse</th>
                <th className="p-4 font-bold">No of Products ↑↓</th>
                <th className="p-4 font-bold">Quantity Transferred ↑↓</th>
                <th className="p-4 font-bold">Reference Number ↑↓</th>
                <th className="p-4 font-bold">Date ↑↓</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {transferData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                  <td className="p-4 text-gray-500">{row.from}</td>
                  <td className="p-4 text-gray-500">{row.to}</td>
                  <td className="p-4 text-gray-500">{row.products}</td>
                  <td className="p-4 text-gray-500">{row.qty}</td>
                  <td className="p-4 text-gray-500">{row.ref}</td>
                  <td className="p-4 text-gray-500">{row.date}</td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-orange-500 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <span>Row Per Page</span>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded px-2 py-1 pr-6 focus:outline-none focus:border-orange-500">
                <option>10</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-2 pointer-events-none" />
            </div>
            <span>Entries</span>
          </div>

          <div className="flex items-center gap-1">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-400 hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">3</button>
            <button className="w-8 h-8 flex items-center justify-center rounded bg-[#FF9F43] text-white font-medium">4</button>
            <span className="px-2">...</span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">15</button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-transparent text-gray-400 hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

      </div>

    </div>
  );
}
