'use client';

import React, { useState } from 'react';
import { 
  Store, 
  Coffee, 
  Shirt, 
  Pill, 
  Truck, 
  Check, 
  ArrowRight,
  Sparkles,
  Layers
} from 'lucide-react';
import Link from 'next/link';

interface Industry {
  id: string;
  name: string;
  icon: any;
  title: string;
  description: string;
  features: string[];
  metrics: { label: string; value: string }[];
  accentColor: string;
}

const INDUSTRIES: Industry[] = [
  {
    id: 'supermarket',
    name: 'Supermarkets & Grocery',
    icon: Store,
    title: 'High-speed checkout for fast queues and fresh produce',
    description: 'Handle thousands of daily transactions effortlessly. Integrated weighing scales, rapid barcode scanning, and automatic expiry date tracking keep your grocery business flowing.',
    features: [
      'Digital Weighing Scale Integration (kg / g / lb)',
      'Barcode & QR Label Generator & Printing',
      'Batch Expiry Date Alerts & FIFO Inventory',
      'Quick Cashier Switch & Multi-Counter Support',
    ],
    metrics: [
      { label: 'Avg. Checkout Speed', value: '< 2.5s' },
      { label: 'Inventory Accuracy', value: '99.8%' },
    ],
    accentColor: 'from-orange-500 to-amber-500',
  },
  {
    id: 'cafe',
    name: 'Cafes & Restaurants',
    icon: Coffee,
    title: 'Streamlined dine-in, takeaway, and kitchen tickets',
    description: 'Optimize order taking with customizable food modifiers (milk types, sugar level, extras), instant kitchen display routing (KOT), and split bill payments for large dining tables.',
    features: [
      'Table Layout & Reservation Status Tracker',
      'Kitchen Order Ticket (KOT) & Display System',
      'Food Modifiers & Add-ons (e.g. Extra Shot, Less Ice)',
      'Split Bill by Item or Custom Percentages',
    ],
    metrics: [
      { label: 'Table Turnaround', value: '+35%' },
      { label: 'Order Error Reduction', value: '88%' },
    ],
    accentColor: 'from-amber-600 to-yellow-500',
  },
  {
    id: 'fashion',
    name: 'Fashion & Boutiques',
    icon: Shirt,
    title: 'Variant matrix for styles, colors, and sizes',
    description: 'Manage complex apparel matrices with ease. Create size & color variants in one click, print custom price tags, and offer seasonal promo discounts and loyalty rewards.',
    features: [
      'Multi-Dimensional Variants (Size, Color, Material)',
      'Custom Hangtag & Clothing Barcode Printing',
      'Customer Purchase History & Style Notes',
      'Loyalty Points & VIP Member Discounts',
    ],
    metrics: [
      { label: 'Repeat Visits', value: '+42%' },
      { label: 'Stock Lookup Time', value: 'Instant' },
    ],
    accentColor: 'from-rose-500 to-pink-500',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacies & Healthcare',
    icon: Pill,
    title: 'Batch tracking, expiry prevention, and doctor notes',
    description: 'Comply with healthcare regulations. Track batches, restrict near-expiry medicines, record prescribing doctor info, and search by generic salt names.',
    features: [
      'Batch Number & Expiration Date Enforcement',
      'Generic Molecule / Salt Composition Search',
      'Doctor & Patient Prescription Records',
      'Automated Low-Stock Reorder Triggers',
    ],
    metrics: [
      { label: 'Expired Stock Waste', value: '-75%' },
      { label: 'Regulatory Compliance', value: '100%' },
    ],
    accentColor: 'from-emerald-500 to-teal-500',
  },
  {
    id: 'wholesale',
    name: 'Wholesale & B2B',
    icon: Truck,
    title: 'Bulk tier pricing, customer credit, and purchase orders',
    description: 'Built for high-volume trading. Manage customer ledger accounts with credit limits, issue formal quotations, process purchase returns, and transfer stock across central depots.',
    features: [
      'Tiered Wholesale Pricing by Quantity (B2B)',
      'Customer Due / Credit Balance Ledger Tracking',
      'Purchase Orders (PO) & Supplier Invoicing',
      'Multi-Warehouse Logistics & Inter-Branch Transfers',
    ],
    metrics: [
      { label: 'B2B Invoice Collection', value: '2x Faster' },
      { label: 'Logistics Efficiency', value: '+50%' },
    ],
    accentColor: 'from-blue-600 to-indigo-600',
  },
];

export function IndustrySolutions() {
  const [activeTab, setActiveTab] = useState<string>('supermarket');
  const activeIndustry = INDUSTRIES.find(i => i.id === activeTab) || INDUSTRIES[0];

  return (
    <section id="solutions" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-orange-500" />
            <span>Tailored Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Built for Your Specific Industry Workflow
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Choose your business type to see how BikriPOS customizes menus, barcode logic, and inventory for your day-to-day operations.
          </p>
        </div>

        {/* Industry Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto pb-2 scrollbar-none">
          <div className="inline-flex p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200/80 gap-1.5">
            {INDUSTRIES.map(ind => {
              const Icon = ind.icon;
              const isSelected = activeTab === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActiveTab(ind.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-white text-slate-900 shadow-md shadow-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-orange-500' : 'text-slate-400'}`} />
                  <span>{ind.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Industry Showcase Card */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Details & Features */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Custom Industry Profile</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
                {activeIndustry.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeIndustry.description}
              </p>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeIndustry.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 border border-emerald-500/30">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/register"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-white hover:bg-orange-50 rounded-xl transition-all shadow-md"
                >
                  <span>Launch for {activeIndustry.name}</span>
                  <ArrowRight className="w-4 h-4 text-orange-600" />
                </Link>
                <Link
                  href="/login"
                  className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4"
                >
                  View demo store dataset &rarr;
                </Link>
              </div>
            </div>

            {/* Right Column: Metric Badges & Snapshot */}
            <div className="lg:col-span-5 bg-slate-950/80 rounded-2xl p-6 border border-slate-800 space-y-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 pb-3 border-b border-slate-800">
                Performance Benchmark
              </div>

              <div className="grid grid-cols-2 gap-4">
                {activeIndustry.metrics.map((metric, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center">
                    <div className="text-2xl sm:text-3xl font-black text-orange-400 mb-1">
                      {metric.value}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {metric.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-500/20 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-orange-300 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  Pre-Configured Setup Wizard Included
                </div>
                <div className="text-[11px] text-slate-400">
                  Select "{activeIndustry.name}" during onboarding and BikriPOS will automatically preload relevant tax rates, units of measurement, and sample categories.
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
