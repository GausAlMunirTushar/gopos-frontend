'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Tag, 
  Users, 
  BarChart2, 
  Settings,
  Menu,
  Bell,
  Search,
  LogOut
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const NAV_ITEMS = [
  { name: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'pos', href: '/pos', icon: ShoppingCart },
  { name: 'inventory', href: '/inventory', icon: Package },
  { name: 'products', href: '/products', icon: Tag },
  { name: 'customers', href: '/customers', icon: Users },
  { name: 'reports', href: '/reports', icon: BarChart2 },
  { name: 'settings', href: '/settings', icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const t = useTranslations('navigation');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen z-20">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#092C4C] rounded-md flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-xl font-bold text-[#092C4C]">
              Dreams<span className="text-[#FF9F43]">POS</span>
            </span>
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);
            return (
              <NextLink 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#FF9F43]/10 text-[#FF9F43] font-medium' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF9F43]' : 'text-gray-400'}`} />
                {t(item.name)}
              </NextLink>
            )
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors">
            <LogOut className="w-5 h-5 text-gray-400" />
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#092C4C] rounded-md flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-500 rounded-full bg-gray-50">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#FF9F43] text-white flex items-center justify-center font-semibold text-sm">
            JD
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        
        {/* Desktop Header */}
        <header className="hidden md:flex h-16 bg-white border-b border-gray-200 items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-xl w-96 border border-gray-200 focus-within:border-[#FF9F43] focus-within:bg-white transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search anything..." 
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 text-gray-500 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-gray-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer p-1.5 rounded-full hover:bg-gray-50 pr-4 transition-colors">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF9F43] to-orange-300 text-white flex items-center justify-center font-semibold shadow-sm">
                JD
              </div>
              <div className="hidden lg:block">
                <p className="text-sm font-semibold text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex items-center justify-around h-16 px-2 z-30 pb-safe">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);
          return (
            <NextLink 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl ${isActive ? 'text-[#FF9F43]' : 'text-gray-500'}`}
            >
              <div className={`p-1.5 rounded-full ${isActive ? 'bg-[#FF9F43]/10' : ''}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-medium">{t(item.name)}</span>
            </NextLink>
          )
        })}
      </nav>
    </div>
  );
}
