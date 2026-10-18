'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { SuperAdminHeader } from './SuperAdminHeader';

export function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className="h-screen w-full bg-[#F3F4F6] flex text-gray-800 font-sans overflow-hidden">
      {/* Super Admin Dedicated Sidebar */}
      <SuperAdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        {/* Super Admin Dedicated Header */}
        <SuperAdminHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Dynamic Super Admin Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-[#F8F9FA] relative">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
