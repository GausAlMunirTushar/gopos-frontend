'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, FileText, RefreshCcw, ChevronUp, 
  Edit, Trash2, ChevronLeft, ChevronRight, ChevronDown,
  FileSpreadsheet, Mail
} from 'lucide-react';

const lowStockData = [
  { warehouse: 'Lavish Warehouse', store: 'Electro Mart', img: 'laptop', name: 'Lenovo IdeaPad 3', category: 'Computers', sku: 'PT001', qty: 20, qtyAlert: 15 },
  { warehouse: 'Quaint Warehouse', store: 'Quantum Gadgets', img: 'headphones', name: 'Beats Pro', category: 'Electronics', sku: 'PT002', qty: 25, qtyAlert: 20 },
  { warehouse: 'Traditional Warehouse', store: 'Prime Bazaar', img: 'shoe', name: 'Nike Jordan', category: 'Shoe', sku: 'PT003', qty: 40, qtyAlert: 35 },
  { warehouse: 'Cool Warehouse', store: 'Gadget World', img: 'watch', name: 'Apple Series 5 Watch', category: 'Electronics', sku: 'PT004', qty: 50, qtyAlert: 45 },
  { warehouse: 'Overflow Warehouse', store: 'Volt Vault', img: 'speaker', name: 'Amazon Echo Dot', category: 'Electronics', sku: 'PT005', qty: 30, qtyAlert: 25 },
  { warehouse: 'Nova Storage Hub', store: 'Elite Retail', img: 'sofa', name: 'Sanford Chair Sofa', category: 'Furniture', sku: 'PT006', qty: 10, qtyAlert: 8 },
  { warehouse: 'Retail Supply Hub', store: 'Prime Mart', img: 'bag', name: 'Red Premium Satchel', category: 'Bags', sku: 'PT007', qty: 70, qtyAlert: 60 },
  { warehouse: 'EdgeWare Solutions', store: 'NeoTech Store', img: 'phone', name: 'Iphone 14 Pro', category: 'Phone', sku: 'PT008', qty: 35, qtyAlert: 30 },
  { warehouse: 'North Zone Warehouse', store: 'Urban Mart', img: 'chair', name: 'Gaming Chair', category: 'Furniture', sku: 'PT009', qty: 15, qtyAlert: 10 },
  { warehouse: 'Fulfillment Hub', store: 'Travel Mart', img: 'backpack', name: 'Borealis Backpack', category: 'Bags', sku: 'PT010', qty: 45, qtyAlert: 40 },
];

export default function LowStocksPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Low Stocks</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Low Stocks</span>
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
          
          <button className="flex items-center gap-2 px-4 py-2 bg-[#1A2C42] hover:bg-[#111e2f] text-white rounded-lg font-medium transition-colors">
            <Mail className="w-4 h-4" /> Send Email
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-100 p-4 gap-4">
            <div className="flex gap-4">
                <button className="px-4 py-2 rounded-lg bg-orange-100 text-orange-500 font-medium text-sm">Low Stocks</button>
                <button className="px-4 py-2 rounded-lg text-gray-500 hover:bg-gray-50 font-medium text-sm transition-colors">Out of Stocks</button>
            </div>
            <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-900">Notify</span>
                <button className="w-11 h-6 bg-green-500 rounded-full relative shadow-inner">
                    <span className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></span>
                </button>
            </div>
        </div>

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
                <option>Category</option>
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
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">SKU ↑↓</th>
                <th className="p-4 font-bold">Qty</th>
                <th className="p-4 font-bold">Qty Alert</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {lowStockData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                  <td className="p-4 text-gray-500">{row.warehouse}</td>
                  <td className="p-4 text-gray-500">{row.store}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.category}</td>
                  <td className="p-4 text-gray-500">{row.sku}</td>
                  <td className="p-4 text-gray-500">{row.qty}</td>
                  <td className="p-4 text-gray-500">{row.qtyAlert}</td>
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
