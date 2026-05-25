'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  Edit, Trash2, ChevronLeft, FileSpreadsheet, Plus, Eye
} from 'lucide-react';

const warehouseData = [
  { warehouse: 'Lavish Warehouse', person: 'Chad Taylor', phone: '+12498345785', products: 10, stock: 600, qty: 80, created: '24 Dec 2024', status: 'Active' },
  { warehouse: 'Quaint Warehouse', person: 'Jenny Ellis', phone: '+13178964582', products: 15, stock: 300, qty: 85, created: '10 Dec 2024', status: 'Active' },
  { warehouse: 'Traditional Warehouse', person: 'Leon Baxter', phone: '+12796183487', products: 12, stock: 400, qty: 70, created: '27 Nov 2024', status: 'Active' },
  { warehouse: 'Cool Warehouse', person: 'Karen Flores', phone: '+17538647943', products: 20, stock: 320, qty: 65, created: '18 Nov 2024', status: 'Active' },
  { warehouse: 'Overflow Warehouse', person: 'Michael Dawson', phone: '+13798132475', products: 8, stock: 170, qty: 80, created: '06 Nov 2024', status: 'Active' },
  { warehouse: 'Nova Storage Hub', person: 'Karen Galvan', phone: '+17596341894', products: 13, stock: 220, qty: 75, created: '25 Oct 2024', status: 'Active' },
  { warehouse: 'Retail Supply Hub', person: 'Thomas Ward', phone: '+12973548678', products: 17, stock: 310, qty: 60, created: '14 Oct 2024', status: 'Active' },
  { warehouse: 'EdgeWare Solutions', person: 'Aliza Duncan', phone: '+13147858357', products: 22, stock: 450, qty: 50, created: '03 Oct 2024', status: 'Active' },
  { warehouse: 'North Zone Warehouse', person: 'James Higham', phone: '+11978348626', products: 24, stock: 270, qty: 70, created: '20 Sep 2024', status: 'Active' },
  { warehouse: 'Fulfillment Hub', person: 'Jada Robinson', phone: '+12678934561', products: 14, stock: 300, qty: 45, created: '10 Sep 2024', status: 'Active' },
];

export default function WarehouseList() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Warehouses</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Warehouses</span>
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
            <Plus className="w-4 h-4" /> Add Warehouse
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
          
          <div className="flex gap-2">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                <option>Status</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 w-12"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></th>
                <th className="p-4 font-bold">Warehouse</th>
                <th className="p-4 font-bold">Contact Person</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold">Total Products ↑↓</th>
                <th className="p-4 font-bold">Stock ↑↓</th>
                <th className="p-4 font-bold">Qty ↑↓</th>
                <th className="p-4 font-bold">Created On ↑↓</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {warehouseData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                  <td className="p-4 text-gray-500">{row.warehouse}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/100?img=${i+30}`} alt={row.person} className="w-8 h-8 rounded-full object-cover" />
                      <span className="font-medium text-gray-900">{row.person}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.phone}</td>
                  <td className="p-4 text-gray-500">{row.products}</td>
                  <td className="p-4 text-gray-500">{row.stock}</td>
                  <td className="p-4 text-gray-500">{row.qty}</td>
                  <td className="p-4 text-gray-500">{row.created}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-green-50 text-green-600 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2 justify-end">
                      <button className="p-1.5 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 hover:text-blue-500 transition-colors"><Eye className="w-4 h-4" /></button>
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
