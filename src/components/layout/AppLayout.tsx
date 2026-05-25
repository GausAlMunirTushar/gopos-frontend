'use client';

import React, { useState } from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, Package, AlertCircle, TrendingDown,
  Layers, List, Tag, Scale, SlidersHorizontal, ShieldCheck, Barcode, QrCode,
  Box, Settings2, ArrowRightLeft, ShoppingCart, FileText, CornerDownLeft, FileSignature, Monitor,
  Ticket, Gift, Percent, ShoppingBasket, ClipboardList, RefreshCcw, DollarSign, Wallet, Building2,
  Banknote, ArrowLeftRight, FileBarChart, PieChart, Landmark, Users, UserCircle, Users2, Store, Warehouse,
  UsersRound, Briefcase, Award, ChevronDown, Search, Plus, Globe, Maximize, Mail, Bell, Settings, PackageSearch
} from 'lucide-react';

// Menu definition matching the mockups
const MENU_ITEMS = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Inventory',
    icon: Package,
    items: [
      { name: 'Products', href: '/inventory/products' },
      { name: 'Create Product', href: '/inventory/products/create' },
      { name: 'Expired Products', href: '/inventory/expired' },
      { name: 'Low Stocks', href: '/inventory/low-stock' },
      { name: 'Category', href: '/inventory/category' },
      { name: 'Sub Category', href: '/inventory/sub-category' },
      { name: 'Brands', href: '/inventory/brands' },
      { name: 'Units', href: '/inventory/units' },
      { name: 'Variant Attributes', href: '/inventory/variants' },
      { name: 'Warranties', href: '/inventory/warranties' },
      { name: 'Print Barcode', href: '/inventory/barcode' },
      { name: 'Print QR Code', href: '/inventory/qrcode' },
    ]
  },
  {
    title: 'Stock',
    icon: Box,
    items: [
      { name: 'Manage Stock', href: '/stock/manage' },
      { name: 'Stock Adjustment', href: '/stock/adjustment' },
      { name: 'Stock Transfer', href: '/stock/transfer' },
    ]
  },
  {
    title: 'Sales',
    icon: ShoppingCart,
    items: [
      { name: 'Sales', href: '/sales' },
      { name: 'Invoices', href: '/sales/invoices' },
      { name: 'Sales Return', href: '/sales/returns' },
      { name: 'Quotation', href: '/sales/quotation' },
      { name: 'POS', href: '/pos' },
    ]
  },
  {
    title: 'Promo',
    icon: Percent,
    items: [
      { name: 'Coupons', href: '/promo/coupons' },
      { name: 'Gift Card', href: '/promo/gift-cards' },
      { name: 'Discount', href: '/promo/discount' },
    ]
  },
  {
    title: 'Purchases',
    icon: ShoppingBasket,
    items: [
      { name: 'Purchases', href: '/purchases' },
      { name: 'Purchase Order', href: '/purchases/orders' },
      { name: 'Purchase Return', href: '/purchases/returns' },
    ]
  },
  {
    title: 'Finance & Accounts',
    icon: DollarSign,
    items: [
      { name: 'Expenses', href: '/finance/expenses' },
      { name: 'Income', href: '/finance/income' },
      { name: 'Bank Accounts', href: '/finance/banks' },
      { name: 'Money Transfer', href: '/finance/transfer' },
      { name: 'Balance Sheet', href: '/finance/balance-sheet' },
      { name: 'Trial Balance', href: '/finance/trial-balance' },
      { name: 'Cash Flow', href: '/finance/cash-flow' },
      { name: 'Account Statement', href: '/finance/statement' },
    ]
  },
  {
    title: 'Reports',
    icon: FileBarChart,
    items: [
      { name: 'Sales Report', href: '/reports/sales' },
      { name: 'Inventory Report', href: '/reports/inventory' },
      { name: 'Customer Report', href: '/reports/customer' },
      { name: 'Invoice Report', href: '/reports/invoice' },
      { name: 'Product Report', href: '/reports/product' },
      { name: 'Purchase Report', href: '/reports/purchase' },
      { name: 'Supplier Report', href: '/reports/supplier' },
    ]
  },
  {
    title: 'Peoples',
    icon: Users,
    items: [
      { name: 'Customers', href: '/customers' },
      { name: 'Billers', href: '/peoples/billers' },
      { name: 'Suppliers', href: '/peoples/suppliers' },
      { name: 'Stores', href: '/peoples/stores' },
      { name: 'Warehouses', href: '/peoples/warehouses' },
    ]
  },
  {
    title: 'HRM',
    icon: Briefcase,
    items: [
      { name: 'Employees', href: '/hrm/employees' },
      { name: 'Departments', href: '/hrm/departments' },
      { name: 'Designation', href: '/hrm/designation' },
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
  }
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="h-screen w-full bg-[#F8F9FA] flex text-gray-800 font-sans overflow-hidden">
      
      {/* Sidebar */}
      <aside className={`h-full bg-white border-r border-gray-200 z-50 transition-all duration-300 flex flex-col shrink-0 ${sidebarOpen ? 'w-65' : 'w-20'}`}>
        
        {/* Logo Area */}
        <div className="h-18 flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-[#092C4C]" strokeWidth={2.5} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#FF9F43] rounded-full border-2 border-white"></div>
            </div>
            {sidebarOpen && (
              <h1 className="text-2xl font-bold text-[#092C4C] tracking-tight">
                go<span className="text-[#FF9F43] text-xs font-bold align-top uppercase leading-none mt-1 inline-block">pos</span>
              </h1>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
          {MENU_ITEMS.map((section) => {
            const Icon = section.icon;
            const hasItems = section.items && section.items.length > 0;
            const isOpen = openMenus[section.title];
            
            // Check if any child item is active
            const isActiveParent = hasItems 
              ? section.items!.some(item => pathname.startsWith(item.href))
              : pathname === section.href || pathname.startsWith(section.href || '/_none');

            return (
              <div key={section.title} className="mb-1">
                {hasItems ? (
                  <button 
                    onClick={() => {
                      if (!sidebarOpen) setSidebarOpen(true);
                      toggleMenu(section.title);
                    }}
                    className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${ isActiveParent ? 'bg-[#FF9F43]/10 text-[#FF9F43] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActiveParent ? 'text-[#FF9F43]' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={2} />
                      {sidebarOpen && <span className="text-[14px]">{section.title}</span>}
                    </div>
                    {sidebarOpen && (
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${isActiveParent ? 'text-[#FF9F43]' : 'text-gray-400'}`} />
                    )}
                  </button>
                ) : (
                  <NextLink 
                    href={section.href!}
                    className={`w-full group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${ isActiveParent ? 'bg-[#FF9F43]/10 text-[#FF9F43] font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900' }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 ${isActiveParent ? 'text-[#FF9F43]' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={2} />
                      {sidebarOpen && <span className="text-[14px]">{section.title}</span>}
                    </div>
                  </NextLink>
                )}

                {/* Submenu */}
                {sidebarOpen && hasItems && isOpen && (
                  <div className="mt-1 ml-4 pl-4 border-l border-gray-100 space-y-1">
                    {section.items!.map((item) => {
                      const isActive = pathname === item.href || pathname.startsWith(item.href);
                      return (
                        <NextLink 
                          key={item.name} 
                          href={item.href}
                          className={`flex items-center px-3 py-2 rounded-lg transition-all duration-200 text-[13px] ${ isActive ? 'text-[#FF9F43] font-medium bg-orange-50/50' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50' }`}
                        >
                          {item.name}
                        </NextLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        {/* Header */}
        <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-6 z-40 shrink-0">
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 hover:bg-orange-200 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
            </button>

            <div className="hidden md:flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 w-80 focus-within:border-[#FF9F43] focus-within:ring-1 focus-within:ring-[#FF9F43] transition-all">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
              />
              <div className="flex items-center gap-1 bg-white px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-400 border border-gray-200">
                <span className="text-xs">⌘</span>K
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Store Selector */}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <img src="https://ui-avatars.com/api/?name=Freshmart&background=092C4C&color=fff&rounded=true" alt="Store" className="w-5 h-5 rounded-full" />
              <span className="text-sm font-medium text-gray-700">Freshmart</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            <NextLink href="/inventory/products/create">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </NextLink>

            <NextLink href="/pos">
              <button className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg text-sm font-medium transition-colors">
                <Monitor className="w-4 h-4" /> POS
              </button>
            </NextLink>

            <div className="h-8 w-px bg-gray-200 mx-1"></div>

            {/* Icons */}
            <div className="flex items-center gap-1">
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <Globe className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <Maximize className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors relative">
                <Mail className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">01</span>
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Profile */}
            <button className="flex items-center gap-2 ml-2">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Profile" className="w-9 h-9 rounded-full border border-gray-200 object-cover" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8F9FA] relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

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
    </div>
  );
}
