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
  UsersRound, Briefcase, Award, ChevronDown, Search, Plus, Globe, Maximize, Mail, Bell, Settings
} from 'lucide-react';

// Menu definition matching the mockups
const MENU_SECTIONS = [
  {
    title: 'Main',
    items: [
      { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, hasSub: true },
      { name: 'Super Admin', href: '/super-admin', icon: UserCircle, hasSub: true },
    ]
  },
  {
    title: 'Inventory',
    items: [
      { name: 'Products', href: '/inventory/products', icon: Package },
      { name: 'Create Product', href: '/inventory/products/create', icon: Plus },
      { name: 'Expired Products', href: '/inventory/expired', icon: AlertCircle },
      { name: 'Low Stocks', href: '/inventory/low-stock', icon: TrendingDown },
      { name: 'Category', href: '/inventory/category', icon: Layers },
      { name: 'Sub Category', href: '/inventory/sub-category', icon: List },
      { name: 'Brands', href: '/inventory/brands', icon: Tag },
      { name: 'Units', href: '/inventory/units', icon: Scale },
      { name: 'Variant Attributes', href: '/inventory/variants', icon: SlidersHorizontal },
      { name: 'Warranties', href: '/inventory/warranties', icon: ShieldCheck },
      { name: 'Print Barcode', href: '/inventory/barcode', icon: Barcode },
      { name: 'Print QR Code', href: '/inventory/qrcode', icon: QrCode },
    ]
  },
  {
    title: 'Stock',
    items: [
      { name: 'Manage Stock', href: '/stock/manage', icon: Box },
      { name: 'Stock Adjustment', href: '/stock/adjustment', icon: Settings2 },
      { name: 'Stock Transfer', href: '/stock/transfer', icon: ArrowRightLeft },
    ]
  },
  {
    title: 'Sales',
    items: [
      { name: 'Sales', href: '/sales', icon: ShoppingCart, hasSub: true },
      { name: 'Invoices', href: '/sales/invoices', icon: FileText },
      { name: 'Sales Return', href: '/sales/returns', icon: CornerDownLeft },
      { name: 'Quotation', href: '/sales/quotation', icon: FileSignature },
      { name: 'POS', href: '/pos', icon: Monitor, hasSub: true },
    ]
  },
  {
    title: 'Promo',
    items: [
      { name: 'Coupons', href: '/promo/coupons', icon: Ticket },
      { name: 'Gift Card', href: '/promo/gift-cards', icon: Gift },
      { name: 'Discount', href: '/promo/discount', icon: Percent, hasSub: true },
    ]
  },
  {
    title: 'Purchases',
    items: [
      { name: 'Purchases', href: '/purchases', icon: ShoppingBasket },
      { name: 'Purchase Order', href: '/purchases/orders', icon: ClipboardList },
      { name: 'Purchase Return', href: '/purchases/returns', icon: RefreshCcw },
    ]
  },
  {
    title: 'Finance & Accounts',
    items: [
      { name: 'Expenses', href: '/finance/expenses', icon: DollarSign, hasSub: true },
      { name: 'Income', href: '/finance/income', icon: Wallet, hasSub: true },
      { name: 'Bank Accounts', href: '/finance/banks', icon: Building2 },
      { name: 'Money Transfer', href: '/finance/transfer', icon: ArrowLeftRight },
      { name: 'Balance Sheet', href: '/finance/balance-sheet', icon: FileBarChart },
      { name: 'Trial Balance', href: '/finance/trial-balance', icon: Scale },
      { name: 'Cash Flow', href: '/finance/cash-flow', icon: Banknote },
      { name: 'Account Statement', href: '/finance/statement', icon: Landmark },
    ]
  },
  {
    title: 'Peoples',
    items: [
      { name: 'Customers', href: '/customers', icon: Users },
      { name: 'Billers', href: '/peoples/billers', icon: UserCircle },
      { name: 'Suppliers', href: '/peoples/suppliers', icon: Users2 },
      { name: 'Stores', href: '/peoples/stores', icon: Store },
      { name: 'Warehouses', href: '/peoples/warehouses', icon: Warehouse },
    ]
  },
  {
    title: 'HRM',
    items: [
      { name: 'Employees', href: '/hrm/employees', icon: UsersRound },
      { name: 'Departments', href: '/hrm/departments', icon: Briefcase },
      { name: 'Designation', href: '/hrm/designation', icon: Award },
    ]
  }
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-gray-800 font-sans">
      
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-all duration-300 flex flex-col shrink-0 ${sidebarOpen ? 'w-[260px]' : 'w-[80px]'}`}>
        
        {/* Logo Area */}
        <div className="h-[72px] flex items-center px-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-[#092C4C]" strokeWidth={2.5} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#FF9F43] rounded-full border-2 border-white"></div>
            </div>
            {sidebarOpen && (
              <h1 className="text-2xl font-bold text-[#092C4C] tracking-tight">
                Dreams<span className="text-[#FF9F43] text-xs font-bold align-top uppercase leading-none mt-1 inline-block">pos</span>
              </h1>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-6 custom-scrollbar">
          {MENU_SECTIONS.map((section, idx) => (
            <div key={idx}>
              {sidebarOpen && (
                <h3 className="text-xs font-bold text-[#092C4C] uppercase tracking-wider mb-3 px-2">
                  {section.title}
                </h3>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname.startsWith(item.href) || (item.name === 'Dashboard' && pathname === '/');
                  return (
                    <NextLink 
                      key={item.name} 
                      href={item.href}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        isActive 
                          ? 'bg-[#FF9F43]/10 text-[#FF9F43] font-semibold' 
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-[#FF9F43]' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={2} />
                        {sidebarOpen && <span className="text-[13px]">{item.name}</span>}
                      </div>
                      {sidebarOpen && item.hasSub && (
                        <ChevronDown className={`w-4 h-4 ${isActive ? 'text-[#FF9F43]' : 'text-gray-400'}`} />
                      )}
                    </NextLink>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0 overflow-hidden w-full relative">
        
        {/* Header */}
        <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-6 sticky top-0 z-40 shrink-0">
          
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8F9FA]">
          {children}
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
