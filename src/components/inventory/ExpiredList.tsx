'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, 
  Edit, Trash2, ChevronLeft, ChevronRight, ChevronDown,
  FileSpreadsheet
} from 'lucide-react';

const expiredData = [
  { sku: 'PT001', img: 'laptop', name: 'Lenovo IdeaPad 3', mfg: '24 Dec 2024', exp: '20 Dec 2026' },
  { sku: 'PT002', img: 'headphones', name: 'Beats Pro', mfg: '10 Dec 2024', exp: '07 Dec 2026' },
  { sku: 'PT003', img: 'shoe', name: 'Nike Jordan', mfg: '27 Nov 2024', exp: '20 Nov 2026' },
  { sku: 'PT004', img: 'watch', name: 'Apple Series 5 Watch', mfg: '18 Nov 2024', exp: '15 Nov 2026' },
  { sku: 'PT005', img: 'speaker', name: 'Amazon Echo Dot', mfg: '06 Nov 2024', exp: '04 Nov 2026' },
  { sku: 'PT006', img: 'sofa', name: 'Sanford Chair Sofa', mfg: '25 Oct 2024', exp: '20 Oct 2026' },
  { sku: 'PT007', img: 'bag', name: 'Red Premium Satchel', mfg: '14 Oct 2024', exp: '10 Oct 2026' },
  { sku: 'PT008', img: 'phone', name: 'Iphone 14 Pro', mfg: '03 Oct 2024', exp: '01 Oct 2026' },
  { sku: 'PT009', img: 'chair', name: 'Gaming Chair', mfg: '20 Sep 2024', exp: '16 Sep 2026' },
  { sku: 'PT010', img: 'backpack', name: 'Borealis Backpack', mfg: '10 Sep 2024', exp: '06 Sep 2026' },
];

export default function ExpiredProductsPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Expired Products</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Expired Products</span>
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
                <th className="p-4 font-bold">SKU ↑↓</th>
                <th className="p-4 font-bold">Product Name</th>
                <th className="p-4 font-bold">Manufactured Date ↑↓</th>
                <th className="p-4 font-bold">Expired Date ↑↓</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {expiredData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                  <td className="p-4 text-gray-500">{row.sku}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.mfg}</td>
                  <td className="p-4 text-gray-500">{row.exp}</td>
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
