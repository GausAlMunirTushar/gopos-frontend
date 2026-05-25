'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  FileSpreadsheet, Calendar, PackageSearch
} from 'lucide-react';

const productData = [
  { sku: 'PT001', name: 'Lenovo IdeaPad 3', category: 'Computers', price: '$300', qtySold: '50', revenue: '$15000', img: 'laptop' },
  { sku: 'PT002', name: 'Beats Pro', category: 'Electronics', price: '$160', qtySold: '120', revenue: '$19200', img: 'headphones' },
  { sku: 'PT003', name: 'Nike Jordan', category: 'Shoe', price: '$110', qtySold: '30', revenue: '$3300', img: 'shoes' },
  { sku: 'PT004', name: 'Apple Series 5 Watch', category: 'Electronics', price: '$120', qtySold: '45', revenue: '$5400', img: 'watch' },
  { sku: 'PT005', name: 'Amazon Echo Dot', category: 'Electronics', price: '$80', qtySold: '25', revenue: '$2000', img: 'speaker' },
];

export default function ProductReport() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Product Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Product Report</span>
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
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Product</label>
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
          <h3 className="font-bold text-gray-900 text-lg">Product Report</h3>
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
                <th className="p-4 font-bold">Product Name</th>
                <th className="p-4 font-bold">SKU ↑↓</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Price ↑↓</th>
                <th className="p-4 font-bold">Qty Sold ↑↓</th>
                <th className="p-4 font-bold">Revenue ↑↓</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.sku}</td>
                  <td className="p-4 text-gray-500">{row.category}</td>
                  <td className="p-4 text-gray-500">{row.price}</td>
                  <td className="p-4 text-gray-500">{row.qtySold}</td>
                  <td className="p-4 text-gray-500 font-medium">{row.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
