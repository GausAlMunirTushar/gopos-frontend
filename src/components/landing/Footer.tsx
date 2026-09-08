import React from 'react';
import Link from 'next/link';
import { Store, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-900">
          
          {/* Col 1: Brand Info (2 Cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
                <Store className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-white leading-none">
                  go<span className="text-orange-500">POS</span>
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase">
                  Enterprise Cloud
                </span>
              </div>
            </Link>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The modern point of sale and cloud inventory management system built to empower retail stores, supermarkets, restaurants, and multi-location chains worldwide.
            </p>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational &bull; 99.99% Uptime</span>
            </div>
          </div>

          {/* Col 2: Product Features */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Product &amp; Features
            </div>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-white transition-colors">Touch POS Terminal</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Inventory &amp; Stock Sync</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Offline-First Engine</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Finance &amp; Ledgers</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Promos &amp; Gift Cards</a></li>
              <li><Link href="/pos" className="text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1">Live POS App <ArrowUpRight className="w-3 h-3" /></Link></li>
            </ul>
          </div>

          {/* Col 3: Industry Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Solutions
            </div>
            <ul className="space-y-2">
              <li><a href="#solutions" className="hover:text-white transition-colors">Supermarkets &amp; Grocery</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Cafes &amp; Restaurants</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Fashion &amp; Boutiques</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Pharmacies &amp; Clinics</a></li>
              <li><a href="#solutions" className="hover:text-white transition-colors">Wholesale &amp; Distributors</a></li>
              <li><a href="#hardware" className="hover:text-white transition-colors">Hardware Compatibility</a></li>
            </ul>
          </div>

          {/* Col 4: Account & Support */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">
              Account &amp; Support
            </div>
            <ul className="space-y-2">
              <li><Link href="/login" className="hover:text-white transition-colors">Sign In to Store</Link></li>
              <li><Link href="/register" className="hover:text-white transition-colors">Start 14-Day Free Trial</Link></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing Plans</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Frequently Asked Questions</a></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} goPOS Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security &amp; Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
