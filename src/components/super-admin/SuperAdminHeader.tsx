'use client';

import React from 'react';
import NextLink from 'next/link';
import { Search, Bell, Store, ExternalLink } from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

interface SuperAdminHeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function SuperAdminHeader({ sidebarOpen, setSidebarOpen }: SuperAdminHeaderProps) {
  return (
    <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 z-40 shrink-0 gap-4 select-none">
      
      {/* Left: Sidebar Toggle & Clean Search */}
      <div className="flex items-center gap-3 sm:gap-4 flex-1 max-w-md">
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

        {/* Clean Search Bar */}
        <div className="group relative flex items-center gap-2.5 bg-gray-50/80 hover:bg-gray-100/60 focus-within:bg-white border border-gray-200/90 focus-within:border-[#FF9F43] rounded-xl px-3.5 py-2 w-full transition-all duration-200">
          <Search className="w-4 h-4 text-gray-400 group-focus-within:text-[#FF9F43] shrink-0 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-transparent border-none outline-none focus:outline-none p-0 w-full text-sm text-gray-800 placeholder:text-gray-400"
          />
          <div className="hidden sm:flex items-center gap-0.5 bg-white px-1.5 py-0.5 rounded-md text-[11px] font-medium text-gray-400 border border-gray-200/80 shrink-0 shadow-2xs">
            <span>⌘</span>K
          </div>
        </div>
      </div>

      {/* Right: Actions & Profile */}
      <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
        
        {/* Language Switcher */}
        <LanguageSwitcher variant="pill" />

        {/* Switch to Store POS Button */}
        <NextLink href="/dashboard">
          <button className="flex items-center gap-2 px-3.5 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-xl text-xs sm:text-sm font-medium transition-all shadow-xs hover:shadow-sm cursor-pointer">
            <Store className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Store POS</span>
          </button>
        </NextLink>

        {/* Notifications */}
        <button 
          title="Notifications"
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors relative cursor-pointer"
        >
          <Bell className="w-4.5 h-4.5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white"></span>
        </button>

        {/* Super Admin Profile */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-gray-100">
          <div className="w-9 h-9 rounded-full bg-[#092C4C] text-white flex items-center justify-center font-bold text-xs">
            SA
          </div>
          <div className="hidden md:flex flex-col text-left">
            <span className="text-xs font-bold text-gray-900 leading-tight">Admin</span>
            <span className="text-[10px] text-gray-400 font-medium">Super Admin</span>
          </div>
        </div>

      </div>
    </header>
  );
}
