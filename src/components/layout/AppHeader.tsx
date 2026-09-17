'use client';

import NextLink from 'next/link';
import { Search, Plus, Maximize, Mail, Bell, Settings, Monitor } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

interface AppHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function AppHeader({ sidebarOpen, setSidebarOpen }: AppHeaderProps) {
  return (
    <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-40 shrink-0 gap-4 select-none">
      
      {/* Left Area: Toggle & Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-xl">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-9 h-9 flex shrink-0 items-center justify-center rounded-xl bg-orange-50 text-[#FF9F43] hover:bg-orange-100 transition-colors cursor-pointer"
          title={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        >
          <svg 
            width="18" 
            height="18" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            className={`transition-transform duration-200 ${sidebarOpen ? '' : 'rotate-180'}`}
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        {/* Enhanced Responsive Search Bar */}
        <div className="group relative flex items-center gap-2.5 bg-gray-50/80 hover:bg-gray-100/60 focus-within:bg-white border border-gray-200/90 focus-within:border-[#FF9F43] focus-within:ring-0 rounded-xl px-3.5 py-2 w-full sm:w-72 md:w-80 lg:w-96 transition-all duration-200">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF9F43] shrink-0 transition-colors" />
          <input 
            type="text" 
            placeholder="Search products, orders, customers..." 
            className="bg-transparent border-none outline-none focus:outline-none shadow-none p-0 w-full text-sm text-gray-800 placeholder:text-gray-400 focus:ring-0"
          />
          <div className="hidden sm:flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded-md text-[11px] font-medium text-gray-400 border border-gray-200/80 shrink-0 shadow-2xs">
            <span>⌘</span>K
          </div>
        </div>
      </div>

      {/* Right Area: Action Buttons, Quick Tools & Profile */}
      <div className="hidden md:flex items-center gap-2.5 lg:gap-3 shrink-0">
        
        {/* Language Switcher */}
        <LanguageSwitcher variant="pill" />

        <NextLink href="/inventory/products/create">
          <button className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FF9F43] hover:bg-[#ff942a] text-white rounded-xl text-sm font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer">
            <Plus className="w-4 h-4" strokeWidth={2.5} /> 
            <span>Add New</span>
          </button>
        </NextLink>

        <NextLink href="/pos">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-xl text-sm font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer">
            <Monitor className="w-4 h-4 text-orange-400" /> 
            <span>POS</span>
          </button>
        </NextLink>

        <div className="h-6 w-px bg-gray-200 mx-1 hidden lg:block"></div>

        {/* Action Icons */}
        <div className="flex items-center gap-1">
          <button className="hidden xl:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
            <Maximize className="w-4.5 h-4.5" />
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors relative cursor-pointer">
            <Mail className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors relative cursor-pointer">
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
          </button>
          <button className="hidden lg:flex w-9 h-9 items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
            <Settings className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 ml-1 pl-2 border-l border-gray-100">
          <button className="flex items-center gap-2 p-0.5 rounded-full hover:ring-2 hover:ring-orange-200 transition-all cursor-pointer">
            <img 
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" 
              alt="Profile" 
              className="w-9 h-9 rounded-full border border-gray-200 object-cover" 
            />
          </button>
        </div>
      </div>

      {/* Mobile Right Side */}
      <div className="flex md:hidden items-center gap-2">
        <LanguageSwitcher variant="compact" />
        <NextLink href="/pos">
          <button className="flex items-center justify-center w-8.5 h-8.5 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-xl transition-colors shadow-xs">
            <Monitor className="w-4 h-4 text-orange-400" />
          </button>
        </NextLink>
        <button className="flex items-center">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" 
            alt="Profile" 
            className="w-8.5 h-8.5 rounded-full border border-gray-200 object-cover" 
          />
        </button>
      </div>
    </header>
  );
}

