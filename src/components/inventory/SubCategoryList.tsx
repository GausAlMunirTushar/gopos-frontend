'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, Plus, FileText, RefreshCcw, ChevronUp, 
  Edit, Trash2, ChevronLeft, ChevronRight, ChevronDown,
  FileSpreadsheet
} from 'lucide-react';

const subCategoryData = [
  { img: 'laptop', name: 'Laptop', cat: 'Computers', code: 'CT001', desc: 'Efficient Productivity', status: 'Active' },
  { img: 'desktop', name: 'Desktop', cat: 'Computers', code: 'CT002', desc: 'Compact Design', status: 'Active' },
  { img: 'shoe', name: 'Sneakers', cat: 'Shoe', code: 'CT003', desc: 'Dynamic Grip', status: 'Active' },
  { img: 'formals', name: 'Formals', cat: 'Shoe', code: 'CT004', desc: 'Stylish Comfort', status: 'Active' },
  { img: 'headphones', name: 'Wearables', cat: 'Electronics', code: 'CT005', desc: 'Seamless Connectivity', status: 'Active' },
  { img: 'speaker', name: 'Speakers', cat: 'Electronics', code: 'CT006', desc: 'Reliable Sound', status: 'Active' },
  { img: 'bag', name: 'Handbags', cat: 'Bags', code: 'CT007', desc: 'Compact Carry', status: 'Active' },
  { img: 'travel', name: 'Travel', cat: 'Bags', code: 'CT008', desc: 'Travel Ready', status: 'Active' },
  { img: 'sofa', name: 'Sofa', cat: 'Furniture', code: 'CT009', desc: 'Cozy Comfort', status: 'Active' },
  { img: 'chair', name: 'Chair', cat: 'Furniture', code: 'CT010', desc: 'Stylish Comfort', status: 'Active' },
];

export default function SubCategoryPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sub Category</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Sub Category</span>
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
            <Plus className="w-4 h-4" /> Add Sub Category
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl">
        
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
                <option>Category</option>
              </select>
              <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
            </div>
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
                <th className="p-4 font-bold">Image</th>
                <th className="p-4 font-bold">Sub Category</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Category Code ↑↓</th>
                <th className="p-4 font-bold">Description</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {subCategoryData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                  <td className="p-4">
                    <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                  </td>
                  <td className="p-4 text-gray-900">{row.name}</td>
                  <td className="p-4 text-gray-500">{row.cat}</td>
                  <td className="p-4 text-gray-500">{row.code}</td>
                  <td className="p-4 text-gray-500">{row.desc}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 flex items-center w-fit gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span> {row.status}
                    </span>
                  </td>
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
