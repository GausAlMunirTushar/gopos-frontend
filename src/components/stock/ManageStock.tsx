'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  Edit, Trash2, ChevronLeft, FileSpreadsheet, Plus
} from 'lucide-react';

const stockData = [
  { warehouse: 'Lavish Warehouse', store: 'Electro Mart', product: 'Lenovo IdeaPad 3', date: '24 Dec 2024', person: 'James Kirwin', qty: 100, img: 'laptop' },
  { warehouse: 'Quaint Warehouse', store: 'Quantum Gadgets', product: 'Beats Pro', date: '10 Dec 2024', person: 'Francis Chang', qty: 140, img: 'headphones' },
  { warehouse: 'Traditional Warehouse', store: 'Prime Bazaar', product: 'Nike Jordan', date: '27 Nov 2024', person: 'Antonio Engle', qty: 300, img: 'shoe' },
  { warehouse: 'Cool Warehouse', store: 'Gadget World', product: 'Apple Series 5 Watch', date: '18 Nov 2024', person: 'Leo Kelly', qty: 450, img: 'watch' },
  { warehouse: 'Overflow Warehouse', store: 'Volt Vault', product: 'Amazon Echo Dot', date: '06 Nov 2024', person: 'Annette Walker', qty: 320, img: 'speaker' },
  { warehouse: 'Nova Storage Hub', store: 'Elite Retail', product: 'Sanford Chair Sofa', date: '25 Oct 2024', person: 'John Weaver', qty: 650, img: 'sofa' },
  { warehouse: 'Retail Supply Hub', store: 'Prime Mart', product: 'Red Premium Satchel', date: '14 Oct 2024', person: 'Gary Hennessy', qty: 700, img: 'bag' },
  { warehouse: 'EdgeWare Solutions', store: 'NeoTech Store', product: 'Iphone 14 Pro', date: '03 Oct 2024', person: 'Eleanor Panek', qty: 630, img: 'phone' },
  { warehouse: 'North Zone Warehouse', store: 'Urban Mart', product: 'Gaming Chair', date: '20 Sep 2024', person: 'William Levy', qty: 410, img: 'chair' },
  { warehouse: 'Fulfillment Hub', store: 'Travel Mart', product: 'Borealis Backpack', date: '10 Sep 2024', person: 'Charlotte Klotz', qty: 550, img: 'backpack' },
];

export default function ManageStock() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Manage Stock</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Manage Stock</span>
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
            <Plus className="w-4 h-4" /> Add Stock
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
          
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                <option>Warehouse</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                <option>Store</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
            <div className="relative">
              <select className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                <option>Product</option>
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
                <th className="p-4 font-bold">Store</th>
                <th className="p-4 font-bold">Product Name</th>
                <th className="p-4 font-bold">Date ↑↓</th>
                <th className="p-4 font-bold">Person</th>
                <th className="p-4 font-bold">Qty</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                  <td className="p-4 text-gray-500">{row.warehouse}</td>
                  <td className="p-4 text-gray-500">{row.store}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.product} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                      <span className="font-medium text-gray-900">{row.product}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.date}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt={row.person} className="w-6 h-6 rounded-full object-cover" />
                      {row.person}
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.qty}</td>
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
