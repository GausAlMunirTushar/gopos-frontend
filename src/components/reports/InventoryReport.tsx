'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  FileSpreadsheet, Calendar, Package
} from 'lucide-react';

const inventoryData = [
  { code: 'PT001', name: 'Lenovo IdeaPad 3', category: 'Computers', brand: 'Lenovo', unit: 'pc', instock: '100', img: 'laptop' },
  { code: 'PT002', name: 'Beats Pro', category: 'Electronics', brand: 'Beats', unit: 'pc', instock: '140', img: 'headphones' },
  { code: 'PT003', name: 'Nike Jordan', category: 'Shoe', brand: 'Nike', unit: 'pair', instock: '300', img: 'shoes' },
  { code: 'PT004', name: 'Apple Series 5 Watch', category: 'Electronics', brand: 'Apple', unit: 'pc', instock: '450', img: 'watch' },
  { code: 'PT005', name: 'Amazon Echo Dot', category: 'Electronics', brand: 'Amazon', unit: 'pc', instock: '320', img: 'speaker' },
  { code: 'PT006', name: 'Sanford Chair Sofa', category: 'Furniture', brand: 'Modern Wave', unit: 'pc', instock: '650', img: 'chair' },
  { code: 'PT007', name: 'Red Premium Satchel', category: 'Bags', brand: 'Dior', unit: 'pc', instock: '700', img: 'bag' },
];

export default function InventoryReport() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Inventory Report</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Inventory Report</span>
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
          <label className="text-sm font-medium text-gray-700">Store</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Brand</label>
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
          <h3 className="font-bold text-gray-900 text-lg">Inventory Report</h3>
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
                <th className="p-4 font-bold">Code ↑↓</th>
                <th className="p-4 font-bold">Product Name</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Brand</th>
                <th className="p-4 font-bold">Unit</th>
                <th className="p-4 font-bold">Instock Qty ↑↓</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-gray-500">{row.code}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.category}</td>
                  <td className="p-4 text-gray-500">{row.brand}</td>
                  <td className="p-4 text-gray-500">{row.unit}</td>
                  <td className="p-4 text-gray-500 font-medium">{row.instock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
