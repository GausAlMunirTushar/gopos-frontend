'use client';

import NextLink from 'next/link';
import { Search, Plus, Globe, Maximize, Mail, Bell, Settings, ChevronDown, Monitor } from 'lucide-react';
import { useCurrency } from '@/hooks/useCurrency';
import { Select } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface AppHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AppHeader({ sidebarOpen, setSidebarOpen }: AppHeaderProps) {
  const { currency, setCurrency } = useCurrency();

  return (
    <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-40 shrink-0 transition-all">
      <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-8 h-8 flex shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
        </button>

        {/* Search - Smaller and Responsive */}
        <div className="flex flex-1 md:flex-none items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-full md:w-48 lg:w-64 focus-within:border-[#FF9F43] focus-within:ring-1 focus-within:ring-[#FF9F43] transition-all">
          <Search className="w-4 h-4 text-gray-400 shrink-0" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none shadow-none focus-visible:ring-0 px-0 h-auto w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
          <div className="hidden md:flex items-center gap-1 bg-white px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-400 border border-gray-200 shrink-0">
            <span>⌘</span>K
          </div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 lg:gap-3">
        <div className="w-[100px]">
          <Select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as 'USD' | 'BDT')}
            className="font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors shadow-sm"
          >
            <option value="USD">USD ($)</option>
            <option value="BDT">BDT (৳)</option>
          </Select>
        </div>

        <NextLink href="/inventory/products/create">
          <button className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff942a] text-white rounded-lg text-sm font-medium transition-colors">
            <Plus className="w-4 h-4" /> Add New
          </button>
        </NextLink>

        <NextLink href="/pos">
          <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg text-sm font-medium transition-colors ">
            <Monitor className="w-4 h-4" /> POS
          </button>
        </NextLink>

        <div className="h-8 w-px bg-gray-200 mx-1 hidden lg:block"></div>

        {/* Icons */}
        <div className="flex items-center gap-1">
          <button className="hidden xl:flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Globe className="w-5 h-5" />
          </button>
          <button className="hidden xl:flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors relative">
            <Mail className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">01</span>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>

        {/* Profile */}
        <button className="flex items-center gap-2 ml-1 lg:ml-2 pl-2 border-l border-gray-100">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Profile" className="w-9 h-9 rounded-full border border-gray-200 object-cover" />
        </button>
      </div>

      {/* Mobile Right Side (Simplified) */}
      <div className="flex md:hidden items-center gap-3">
        <NextLink href="/pos">
          <button className="flex items-center justify-center w-8 h-8 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg transition-colors">
            <Monitor className="w-4 h-4" />
          </button>
        </NextLink>
        <button className="flex items-center">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 object-cover" />
        </button>
      </div>
    </header>
  );
}
