'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Smartphone, 
  CheckCircle2, 
  ShoppingCart,
  QrCode,
  DollarSign,
  Receipt,
  Play
} from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-radial from-orange-50/70 via-slate-50 to-white">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-10 left-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Grid Pattern Background Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Badge Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 shadow-xs text-orange-800 text-xs sm:text-sm font-medium hover:bg-orange-100 transition-colors animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-ping" />
            <span className="font-semibold text-orange-600">NEW:</span>
            <span>Multi-Branch Stock Sync & WhatsApp Receipts 2.0</span>
            <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
            Sell Faster, Sync Everywhere, &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 bg-clip-text text-transparent">
              Grow Your Retail Business
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The all-in-one cloud POS &amp; Inventory management system. Lightning-fast checkout, real-time stock sync across branches, offline resilience, and built-in accounting.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-2xl shadow-xl shadow-orange-500/25 hover:shadow-2xl hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5 text-amber-200" />
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/resources"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 text-base font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-2xl shadow-xs hover:border-slate-300 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>Watch Tutorials &amp; Demos</span>
            </Link>

            <Link
              href="/pos"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium text-slate-600 hover:text-orange-600 transition-colors"
            >
              <span>Launch POS App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 pt-4 text-xs sm:text-sm font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>10-Minute Setup</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>100% Offline Capable</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Cancel Anytime</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Terminal Visual Showcase */}
        <div className="mt-12 sm:mt-16 relative max-w-5xl mx-auto">
          {/* Main App Window Mockup */}
          <div className="relative rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-slate-200/80 via-slate-100/60 to-white border border-slate-300/80 shadow-2xl shadow-slate-900/15 backdrop-blur-xl">
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-inner">
              
              {/* Window Header */}
              <div className="bg-slate-950 px-4 py-3 flex items-center justify-between border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/90" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/90" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/90" />
                  <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline">
                    goPOS Enterprise Terminal v4.2 &bull; Main Branch
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Cloud Sync Online
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden md:inline">
                    Terminal #01 (Cashier: Alex)
                  </span>
                </div>
              </div>

              {/* Terminal Screen Preview Mock */}
              <div className="p-4 sm:p-6 bg-slate-900 grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 text-slate-100">
                
                {/* Left side: Product Quick Grid */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="relative flex-1">
                      <div className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-300 flex items-center justify-between">
                        <span>Scan Barcode or Search (F2)...</span>
                        <QrCode className="w-4 h-4 text-orange-400" />
                      </div>
                    </div>
                    <div className="flex gap-1.5 text-xs">
                      <span className="px-2.5 py-1.5 rounded-lg bg-orange-500 font-medium text-white shadow-xs">All Items</span>
                      <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer">Beverages</span>
                      <span className="px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer hidden sm:inline">Snacks</span>
                    </div>
                  </div>

                  {/* Grid of sample products */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { name: 'Cold Brew Latte', price: '$4.50', stock: '48 pcs', bg: 'from-amber-900/40 to-orange-950/40', border: 'border-amber-500/30' },
                      { name: 'Matcha Frappe', price: '$5.20', stock: '24 pcs', bg: 'from-emerald-900/40 to-teal-950/40', border: 'border-emerald-500/30' },
                      { name: 'Croissant Butter', price: '$3.00', stock: '19 pcs', bg: 'from-yellow-900/40 to-amber-950/40', border: 'border-yellow-500/30' },
                      { name: 'Organic Honey', price: '$12.00', stock: '12 pcs', bg: 'from-orange-900/40 to-red-950/40', border: 'border-orange-500/30' },
                      { name: 'Avocado Toast', price: '$7.50', stock: '15 pcs', bg: 'from-lime-900/40 to-green-950/40', border: 'border-lime-500/30' },
                      { name: 'Berry Smoothie', price: '$5.80', stock: '32 pcs', bg: 'from-purple-900/40 to-pink-950/40', border: 'border-purple-500/30' },
                    ].map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`p-3 rounded-xl bg-gradient-to-br ${item.bg} border ${item.border} hover:border-orange-400 hover:scale-[1.02] transition-all cursor-pointer group`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white">{item.name}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-orange-400">{item.price}</span>
                          <span className="text-[10px] text-slate-400">{item.stock}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Keyboard Shortcuts Hint Bar */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">F1</kbd> Quick Pay</span>
                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">F4</kbd> Hold Order</span>
                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">F7</kbd> Split Bill</span>
                    <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-800 rounded text-slate-300 font-mono">F9</kbd> Discount</span>
                  </div>
                </div>

                {/* Right side: Live Order Bill */}
                <div className="lg:col-span-5 bg-slate-950/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                      <div>
                        <div className="text-xs font-bold text-slate-200">Current Order #2048</div>
                        <div className="text-[10px] text-slate-400">Walk-in Customer</div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 text-[10px] font-semibold border border-orange-500/30">
                        3 Items
                      </span>
                    </div>

                    {/* Bill Item list */}
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        <div>
                          <div className="font-medium text-slate-200">2x Cold Brew Latte</div>
                          <div className="text-[10px] text-slate-400">Extra Oat Milk (+$0.50)</div>
                        </div>
                        <div className="font-semibold text-slate-100">$10.00</div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        <div>
                          <div className="font-medium text-slate-200">1x Butter Croissant</div>
                          <div className="text-[10px] text-slate-400">Warm &amp; Toasted</div>
                        </div>
                        <div className="font-semibold text-slate-100">$3.00</div>
                      </div>

                      <div className="flex justify-between items-center bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                        <div>
                          <div className="font-medium text-slate-200">1x Berry Smoothie</div>
                          <div className="text-[10px] text-slate-400">Regular 16oz</div>
                        </div>
                        <div className="font-semibold text-slate-100">$5.80</div>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Checkout Action */}
                  <div className="pt-3 border-t border-slate-800 space-y-2.5">
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="text-slate-200">$18.80</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT / Tax (5%):</span>
                        <span className="text-slate-200">$0.94</span>
                      </div>
                      <div className="flex justify-between text-emerald-400">
                        <span>VIP Coupon (10%):</span>
                        <span>-$1.88</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-slate-800">
                        <span>Total Due:</span>
                        <span className="text-orange-400 text-base">$17.86</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button className="py-2 px-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span>Cash ($20.00)</span>
                      </button>
                      <button className="py-2 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/30">
                        <Receipt className="w-3.5 h-3.5" />
                        <span>Card / POS</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Floating Feature Badges */}
          <div className="hidden md:flex absolute -bottom-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 animate-bounce-slow">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Today's Revenue</div>
              <div className="text-sm font-bold text-slate-900">$14,892.40 <span className="text-emerald-500 text-xs font-semibold">+23.5%</span></div>
            </div>
          </div>

          <div className="hidden md:flex absolute -top-6 -right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-slate-100 items-center gap-3 animate-bounce-slow delay-150">
            <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
              <Zap className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">Checkout Speed</div>
              <div className="text-sm font-bold text-slate-900">0.24 Seconds <span className="text-orange-500 text-xs font-semibold">Ultra Fast</span></div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
