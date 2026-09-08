import React from 'react';
import { 
  Zap, 
  Boxes, 
  WifiOff, 
  Calculator, 
  Gift, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  QrCode, 
  Layers, 
  ArrowRight,
  TrendingUp,
  Receipt,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';

export function FeaturesBentoGrid() {
  return (
    <section id="features" className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineered for High-Volume Retail</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Run &amp; Scale Your Store
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Say goodbye to clunky legacy systems. goPOS connects your front checkout, back office stock, employee shifts, and financials into one cohesive cloud suite.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          
          {/* Card 1: Fast Touch Billing & Barcode (Large 7 Cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                <Zap className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-orange-50 text-orange-700 text-xs font-bold mb-2">
                0.2s Response Time
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Ultra-Fast Touch POS &amp; Smart Barcode Scanner
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Keep lines moving fast during peak hours. Scan barcodes, search products with hotkeys, hold &amp; recall carts, split payments (Cash, Card, Digital Wallet), and print or WhatsApp receipts in seconds.
              </p>
            </div>

            {/* Feature preview visual */}
            <div className="bg-slate-900 rounded-2xl p-4 text-slate-200 text-xs font-mono space-y-2 border border-slate-800">
              <div className="flex justify-between items-center text-slate-400 text-[11px] pb-2 border-b border-slate-800">
                <span className="flex items-center gap-1.5"><QrCode className="w-3.5 h-3.5 text-orange-400" /> Barcode Reader Connected</span>
                <span className="text-emerald-400 font-bold">READY</span>
              </div>
              <div className="flex justify-between">
                <span>[SCAN] 890123450912</span>
                <span className="text-orange-400">Matcha Frappe &bull; $5.20</span>
              </div>
              <div className="flex justify-between">
                <span>[SPLIT] $5.20 Split:</span>
                <span className="text-slate-300">50% Cash ($2.60) / 50% Card ($2.60)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Offline Resilience (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800 text-amber-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <WifiOff className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 text-xs font-bold mb-2">
                100% Offline First
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Zero Downtime: Keep Selling When Internet Drops
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Internet outages will never stop your revenue. All sales, discounts, and inventory edits queue securely on the local device and auto-sync to the cloud once reconnected.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                <span className="font-semibold text-slate-200">Offline Cache: 32 Sales Queued</span>
              </div>
              <span className="text-[10px] text-slate-400">Auto-sync Ready</span>
            </div>
          </div>

          {/* Card 3: Multi-Store & Real-Time Stock (5 Cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Multi-Store &amp; Warehouse Inventory Sync
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Track stock across multiple outlets in real-time. Transfer products between branches, set automatic low-stock alerts, track expiry dates, and manage product variants (Color/Size).
              </p>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-medium">
              <div className="flex justify-between items-center text-slate-600 bg-slate-50 p-2 rounded-lg">
                <span>Downtown Store</span>
                <span className="font-bold text-emerald-600">84 in stock</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 bg-slate-50 p-2 rounded-lg">
                <span>Uptown Mall Branch</span>
                <span className="font-bold text-orange-600">6 in stock (Low)</span>
              </div>
            </div>
          </div>

          {/* Card 4: Built-in Accounting & Cashflow (4 Cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Automated Finance &amp; Expense Ledgers
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                No need for external expensive accounting tools. Generate instant Balance Sheets, Trial Balance, Cashflow Statements, Tax / VAT reports, and bank transfers with one click.
              </p>
            </div>

            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-900">
              <span>Net Profit Margin:</span>
              <span className="text-emerald-700 text-sm">+28.4%</span>
            </div>
          </div>

          {/* Card 5: Customer Loyalty & Promos (3 Cols) */}
          <div className="lg:col-span-3 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Promos &amp; Loyalty
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Boost repeat visits with reward points, digital gift cards, discount coupons, and customer credit ledgers.
              </p>
            </div>

            <div className="p-2.5 rounded-lg bg-purple-50 text-purple-800 text-xs font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>+38% Customer Retention</span>
            </div>
          </div>

          {/* Card 6: Staff Shifts & Cash Drawer Security (12 Cols Footer Card) */}
          <div className="lg:col-span-12 bg-linear-to-r from-orange-500 via-amber-500 to-orange-600 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-orange-500/15 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-amber-100 text-xs font-bold uppercase tracking-wider">
                <Users className="w-4 h-4" />
                <span>Employee &amp; Shift Management</span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                Cash Drawer Audits, Staff Attendance &amp; Commissions
              </h3>
              <p className="text-orange-100 text-sm max-w-2xl">
                Prevent internal shrinkage with strict role-based cashier permissions, shift opening/closing cash balances, and automatic sales commission calculation.
              </p>
            </div>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-orange-600 font-bold text-sm hover:bg-orange-50 transition-all shadow-md shrink-0"
            >
              <span>Explore All 50+ Features</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
