'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { AppHeader } from './AppHeader';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, ShoppingBag, Package, Box, ShoppingCart,
  Percent, ShoppingBasket, DollarSign, FileBarChart, Users,
  Briefcase, Settings, ChevronDown
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth >= 768) {
      const timer = setTimeout(() => setSidebarOpen(true), 0);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      const timer = setTimeout(() => setSidebarOpen(false), 0);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Auto-expand menu section if the current path matches any of its children
  useEffect(() => {
    MENU_ITEMS.forEach((section) => {
      if (section.items?.some(item => pathname === item.href || pathname.startsWith(item.href))) {
        setOpenMenus(prev => ({ ...prev, [section.title]: true }));
      }
    });
  }, [pathname]);

  const toggleMenu = (title: string) => {
    setOpenMenus(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="h-screen w-full bg-[#F8F9FA] flex text-gray-800 font-sans overflow-hidden">
      
      {/* Mobile Sidebar Backdrop Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 md:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 md:relative md:translate-x-0 z-50 bg-white border-r border-gray-100 transition-all duration-300 flex flex-col shrink-0 select-none shadow-[2px_0_12px_rgba(0,0,0,0.02)] ${
        sidebarOpen 
          ? 'w-64 translate-x-0' 
          : '-translate-x-full md:translate-x-0 md:w-20'
      }`}>
        
        {/* Logo Area */}
        <div className="h-18 flex items-center px-5 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 text-[#FF9F43] shadow-xs">
              <ShoppingBag className="w-5 h-5 text-[#FF9F43]" strokeWidth={2.5} />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#092C4C] rounded-full border-2 border-white"></div>
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <h1 className="text-xl font-black text-[#092C4C] tracking-tight leading-none">
                  go<span className="text-[#FF9F43]">pos</span>
                </h1>
                <span className="text-[10px] font-medium text-gray-400 tracking-wider uppercase mt-0.5">Inventory & POS</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-1 custom-scrollbar">
          {MENU_ITEMS.map((section) => {
            const Icon = section.icon;
            const hasItems = section.items && section.items.length > 0;
            const isOpen = !!openMenus[section.title];
            
            // Check if any child item is active
            const isChildActive = hasItems 
              ? section.items!.some(item => pathname === item.href || pathname.startsWith(item.href))
              : false;
            
            const isActiveParent = hasItems 
              ? isChildActive 
              : pathname === section.href || pathname.startsWith(section.href || '/_none');

            return (
              <div key={section.title} className="relative group mb-1">
                {hasItems ? (
                  <button 
                    onClick={() => {
                      if (!sidebarOpen) setSidebarOpen(true);
                      toggleMenu(section.title);
                    }}
                    className={`w-full group/btn flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${ 
                      isActiveParent 
                        ? 'bg-orange-50/80 text-[#FF9F43] font-semibold shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-50/90 hover:text-gray-900' 
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isActiveParent ? 'bg-orange-100/60 text-[#FF9F43]' : 'text-gray-400 group-hover/btn:text-gray-700 group-hover/btn:bg-gray-100/80'
                      }`}>
                        <Icon className="w-4 h-4" strokeWidth={isActiveParent ? 2.5 : 2} />
                      </div>
                      {sidebarOpen && (
                        <span className="text-[13.5px] truncate font-medium">{section.title}</span>
                      )}
                    </div>
                    {sidebarOpen && (
                      <div className="flex items-center gap-1.5 shrink-0 ml-1">
                        {isChildActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43]"></span>
                        )}
                        <ChevronDown 
                          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-gray-500' : 'text-gray-400 group-hover/btn:text-gray-600'}`} 
                        />
                      </div>
                    )}
                  </button>
                ) : (
                  <NextLink 
                    href={section.href!}
                    className={`w-full group/btn flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer ${ 
                      isActiveParent 
                        ? 'bg-orange-50/80 text-[#FF9F43] font-semibold shadow-xs' 
                        : 'text-gray-600 hover:bg-gray-50/90 hover:text-gray-900' 
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        isActiveParent ? 'bg-orange-100/60 text-[#FF9F43]' : 'text-gray-400 group-hover/btn:text-gray-700 group-hover/btn:bg-gray-100/80'
                      }`}>
                        <Icon className="w-4 h-4" strokeWidth={isActiveParent ? 2.5 : 2} />
                      </div>
                      {sidebarOpen && (
                        <span className="text-[13.5px] truncate font-medium">{section.title}</span>
                      )}
                    </div>
                  </NextLink>
                )}

                {/* Submenu in Expanded Sidebar Mode */}
                {sidebarOpen && hasItems && (
                  <div 
                    className={`grid transition-[grid-template-rows,opacity] duration-250 ease-in-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-1 pl-6 space-y-0.5">
                        {section.items!.map((item) => {
                          const isActive = pathname === item.href || (item.href !== '/sales' && item.href !== '/purchases' && pathname.startsWith(item.href));
                          return (
                            <NextLink 
                              key={item.name} 
                              href={item.href}
                              className={`group/sub relative flex items-center justify-between px-3 py-2 rounded-xl transition-all duration-150 text-[13px] ${ 
                                isActive 
                                  ? 'text-[#FF9F43] font-semibold bg-orange-50/70 shadow-xs' 
                                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50/80 hover:translate-x-0.5' 
                              }`}
                            >
                              <div className="flex items-center gap-2.5 min-w-0">
                                <span 
                                  className={`shrink-0 rounded-full transition-all duration-200 ${
                                    isActive 
                                      ? 'w-2 h-2 bg-[#FF9F43] shadow-[0_0_6px_rgba(255,159,67,0.8)] ring-2 ring-orange-200' 
                                      : 'w-1.5 h-1.5 bg-gray-300 group-hover/sub:bg-[#FF9F43] group-hover/sub:scale-125'
                                  }`} 
                                />
                                <span className="truncate">{item.name}</span>
                              </div>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FF9F43] shrink-0"></span>
                              )}
                            </NextLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Floating Flyout Submenu in Collapsed Sidebar Mode */}
                {!sidebarOpen && hasItems && (
                  <div className="hidden md:group-hover:block absolute left-full top-0 ml-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50 py-2.5 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 pb-2 mb-1.5 border-b border-gray-100 flex items-center justify-between">
                      <span className="font-bold text-xs text-gray-800 tracking-wide uppercase">{section.title}</span>
                      <span className="text-[10px] bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded-full font-semibold">{section.items!.length}</span>
                    </div>
                    <div className="space-y-0.5 max-h-72 overflow-y-auto custom-scrollbar">
                      {section.items!.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/sales' && item.href !== '/purchases' && pathname.startsWith(item.href));
                        return (
                          <NextLink
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[13px] transition-all duration-150 ${
                              isActive 
                                ? 'bg-orange-50 text-[#FF9F43] font-semibold' 
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all ${isActive ? 'bg-[#FF9F43] ring-2 ring-orange-200' : 'bg-gray-300'}`} />
                            <span className="truncate">{item.name}</span>
                          </NextLink>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        
        <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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

