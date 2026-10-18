'use client';

import React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  ShieldCheck, Store, ArrowUpRight, Check 
} from 'lucide-react';
import { SUPER_ADMIN_MENU_ITEMS } from '@/data/super-admin-menu';

interface SuperAdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export function SuperAdminSidebar({ sidebarOpen, setSidebarOpen }: SuperAdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Super Admin Light Sidebar */}
      <aside className={`fixed inset-y-0 left-0 md:relative md:translate-x-0 z-50 bg-white border-r border-gray-100 transition-all duration-300 flex flex-col shrink-0 select-none shadow-[2px_0_12px_rgba(0,0,0,0.02)] ${
        sidebarOpen 
          ? 'w-64 translate-x-0' 
          : '-translate-x-full md:translate-x-0 md:w-20'
      }`}>
        
        {/* Logo Area */}
        <div className="h-18 flex items-center px-5 border-b border-gray-100 shrink-0">
          <NextLink href="/super-admin" className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-[#FF9F43] shadow-xs">
              <ShieldCheck className="w-5 h-5 text-[#FF9F43]" strokeWidth={2.5} />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#092C4C] rounded-full border-2 border-white"></div>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h1 className="text-xl font-black text-[#092C4C] tracking-tight leading-none">
                    go<span className="text-[#FF9F43]">pos</span>
                  </h1>
                  <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-1.5 py-0.2 rounded border border-orange-200 uppercase">
                    Admin
                  </span>
                </div>
                <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase mt-0.5">
                  Super Admin Panel
                </span>
              </div>
            )}
          </NextLink>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
          {sidebarOpen && (
            <div className="px-3 pt-2 pb-1.5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
              Menu
            </div>
          )}

          {SUPER_ADMIN_MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/super-admin' && pathname.startsWith(item.href));

            return (
              <div key={item.href} className="relative group mb-1">
                <NextLink
                  href={item.href}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-orange-50/80 text-[#FF9F43] font-semibold shadow-xs'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-orange-100/60 text-[#FF9F43]' 
                        : 'text-gray-400 group-hover:text-gray-700 group-hover:bg-gray-100/80'
                    }`}>
                      <Icon className="w-4 h-4 shrink-0" strokeWidth={isActive ? 2.5 : 2} />
                    </div>
                    {sidebarOpen && (
                      <span className="text-[13.5px] truncate">{item.title}</span>
                    )}
                  </div>

                  {sidebarOpen && item.badge && (
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                </NextLink>

                {/* Collapsed Tooltip */}
                {!sidebarOpen && (
                  <div className="hidden md:group-hover:block absolute left-full top-0 ml-3 min-w-36 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <span className="font-semibold text-xs text-gray-800">{item.title}</span>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom Switch to POS Button */}
        <div className="p-3 border-t border-gray-100">
          <NextLink href="/dashboard" className="block">
            <button className={`w-full py-2.5 px-3 bg-gray-50 hover:bg-orange-50 text-gray-700 hover:text-[#FF9F43] rounded-xl text-xs font-semibold transition-all flex items-center justify-between cursor-pointer border border-gray-200/80 ${
              !sidebarOpen && 'justify-center p-2'
            }`}>
              <div className="flex items-center gap-2">
                <Store className="w-4 h-4 text-[#FF9F43]" />
                {sidebarOpen && <span>Go to Store POS</span>}
              </div>
              {sidebarOpen && <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />}
            </button>
          </NextLink>
        </div>

      </aside>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #E5E7EB;
          border-radius: 20px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #D1D5DB;
        }
      `}</style>
    </>
  );
}
