'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  Search, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  FileText, FileSpreadsheet, Eye, Power, Printer
} from 'lucide-react';

export default function PrintQrCodePage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Print QR Code</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Print QR Code</span>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white">
             <ChevronUp className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse <span className="text-red-500">*</span></label>
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                        <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Store <span className="text-red-500">*</span></label>
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                        <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
            </div>
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product <span className="text-red-500">*</span></label>
            <div className="relative w-full">
                <input 
                    type="text" 
                    placeholder="Search Product by Code" 
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
        </div>

        {/* Empty Table */}
        <div className="border border-gray-100 rounded-lg overflow-hidden mb-6">
            <div className="bg-gray-50/50 p-4 grid grid-cols-5 gap-4 text-sm font-bold text-gray-700 border-b border-gray-100">
                <div>Product</div>
                <div>SKU</div>
                <div>Code</div>
                <div>Reference Number</div>
                <div>Qty</div>
            </div>
            <div className="p-8 flex flex-col items-center justify-center text-gray-400 gap-2">
                <FileText className="w-6 h-6" />
                <span>No Data Available</span>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end mb-8 border-b border-gray-100 pb-8">
            <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Paper Size <span className="text-red-500">*</span></label>
                <div className="relative">
                    <select className="w-full appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2.5 pr-10 focus:outline-none focus:border-orange-500 text-gray-700">
                        <option>Select</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3.5 pointer-events-none" />
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-gray-700">Reference Number</span>
                    <button className="w-11 h-6 bg-green-500 rounded-full relative">
                        <span className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></span>
                    </button>
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-4">
            <button className="px-6 py-2.5 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Eye className="w-4 h-4" /> Generate QR Code
            </button>
            <button className="px-6 py-2.5 bg-[#1A2C42] hover:bg-[#111e2f] text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Power className="w-4 h-4" /> Reset Barcode
            </button>
            <button className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2">
                <Printer className="w-4 h-4" /> Print Barcode
            </button>
        </div>

      </div>

    </div>
  );
}
