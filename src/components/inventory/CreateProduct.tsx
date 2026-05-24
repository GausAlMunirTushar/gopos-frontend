'use client';

import React from 'react';
import NextLink from 'next/link';
import { 
  ChevronRight, RefreshCcw, ChevronUp, ChevronDown, Plus,
  Info, Target, Image as ImageIcon, List, Bold, Italic, Underline,
  Strikethrough, Link2, ListOrdered, List as ListIcon, Quote, Code,
  Paperclip, Smile, Trash2, Send
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Product</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <NextLink href="/dashboard" className="hover:text-orange-500 transition-colors">Dashboard</NextLink>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Create Product</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white shadow-sm">
             <RefreshCcw className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white shadow-sm">
             <ChevronUp className="w-5 h-5" />
          </button>
          <NextLink href="/products">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg font-medium transition-colors shadow-sm">
              <ChevronLeft className="w-4 h-4" /> Back to Products
            </button>
          </NextLink>
        </div>
      </div>

      <div className="space-y-6 pb-20">
        
        {/* Product Information Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
               <Info className="w-5 h-5 text-[#FF9F43]" /> Product Information
             </h3>
             <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Store <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Warehouse <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name <span className="text-red-500">*</span></label>
              <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Slug <span className="text-red-500">*</span></label>
              <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">SKU <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43] pr-24" />
                <button className="absolute right-1.5 bg-[#FF9F43] text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-[#ff9021] transition-colors">
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Selling Type <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Category <span className="text-red-500">*</span></label>
                <button className="text-[#FF9F43] text-xs font-medium flex items-center gap-1 hover:underline">
                  <Plus className="w-3 h-3" /> Add New
                </button>
              </div>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sub Category <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Code <span className="text-red-500">*</span></label>
              <div className="relative flex items-center">
                <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43] pr-24" />
                <button className="absolute right-1.5 bg-[#FF9F43] text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-[#ff9021] transition-colors">
                  Generate
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Barcode Symbology <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
                <div className="flex items-center gap-1 p-2 border-b border-gray-100 bg-gray-50 flex-wrap">
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Bold className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Italic className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Underline className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Strikethrough className="w-4 h-4" /></button>
                  <div className="w-px h-4 bg-gray-300 mx-1"></div>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Link2 className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><ListIcon className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><ListOrdered className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Quote className="w-4 h-4" /></button>
                  <button className="p-1.5 hover:bg-gray-200 rounded text-gray-600"><Code className="w-4 h-4" /></button>
                </div>
                <textarea 
                  className="w-full p-4 h-32 focus:outline-none text-sm resize-none" 
                  placeholder="Type your message"
                ></textarea>
                <div className="flex items-center justify-between p-2 border-t border-gray-100 bg-gray-50 text-gray-500">
                  <div className="flex gap-2">
                    <button className="p-1 hover:text-gray-700"><Paperclip className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-gray-700"><Smile className="w-4 h-4" /></button>
                    <button className="p-1 hover:text-gray-700"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs">Maximum 60 Words</span>
                    <button className="flex items-center gap-1 text-xs font-bold text-[#FF9F43]">
                       <Send className="w-3 h-3" /> <ChevronDown className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Pricing & Stocks Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
               <Target className="w-5 h-5 text-[#FF9F43]" /> Pricing & Stocks
             </h3>
             <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <label className="block text-sm font-medium text-gray-700 mb-3">Product Type <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="productType" className="w-4 h-4 text-[#FF9F43] focus:ring-[#FF9F43] border-gray-300" defaultChecked />
                  <span className="text-sm font-medium text-gray-900">Single Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="productType" className="w-4 h-4 text-[#FF9F43] focus:ring-[#FF9F43] border-gray-300" />
                  <span className="text-sm font-medium text-gray-500">Variable Product</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity <span className="text-red-500">*</span></label>
              <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price <span className="text-red-500">*</span></label>
              <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tax Type <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Type <span className="text-red-500">*</span></label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                  <option>Select</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Value <span className="text-red-500">*</span></label>
              <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Quantity Alert <span className="text-red-500">*</span></label>
              <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
            </div>
          </div>
        </div>

        {/* Images Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
               <ImageIcon className="w-5 h-5 text-[#FF9F43]" /> Images
             </h3>
             <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          <div className="p-6">
            <div className="w-32 h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:border-[#FF9F43] hover:text-[#FF9F43] cursor-pointer transition-colors bg-gray-50/50">
               <Plus className="w-6 h-6 mb-2" />
               <span className="text-xs font-medium">Add Image</span>
            </div>
          </div>
        </div>

        {/* Custom Fields Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-white">
             <h3 className="font-bold text-gray-900 flex items-center gap-2">
               <List className="w-5 h-5 text-[#FF9F43]" /> Custom Fields
             </h3>
             <ChevronDown className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="p-6">
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-6 mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#FF9F43] rounded border-gray-300 focus:ring-[#FF9F43]" defaultChecked />
                <span className="text-sm font-medium text-gray-700">Warranties</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#FF9F43] rounded border-gray-300 focus:ring-[#FF9F43]" defaultChecked />
                <span className="text-sm font-medium text-gray-700">Manufacturer</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#FF9F43] rounded border-gray-300 focus:ring-[#FF9F43]" defaultChecked />
                <span className="text-sm font-medium text-gray-700">Expiry</span>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Warranty <span className="text-red-500">*</span></label>
                <div className="relative">
                  <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-[#FF9F43]">
                    <option>Select</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-4 top-3.5 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manufacturer <span className="text-red-500">*</span></label>
                <Input className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Manufactured Date <span className="text-red-500">*</span></label>
                <Input type="date" className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry On <span className="text-red-500">*</span></label>
                <Input type="date" className="h-11 border-gray-200 focus-visible:ring-[#FF9F43]" />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-gray-200 p-4 z-10 flex justify-end gap-3 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)]">
         <button className="px-6 py-2.5 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg font-medium transition-colors">
           Cancel
         </button>
         <button className="px-6 py-2.5 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors shadow-sm">
           Add Product
         </button>
      </div>

    </div>
  );
}
// Add ChevronLeft to import manually above
import { ChevronLeft } from 'lucide-react';
