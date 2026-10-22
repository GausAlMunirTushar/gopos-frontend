'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Play, 
  BookOpen, 
  Printer, 
  HelpCircle, 
  Search, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  ExternalLink,
  Laptop,
  Cpu,
  Layers,
  FileText,
  ShieldCheck,
  Video,
  ChevronDown
} from 'lucide-react';
import { Navbar, Footer, DownloadSection } from '@/components/landing';

interface TutorialVideo {
  id: string;
  title: string;
  category: 'Cashier & Billing' | 'Hardware & Printers' | 'Multi-Branch Inventory' | 'VAT & Accounting';
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnailUrl: string;
  description: string;
  bullets: string[];
}

const TUTORIAL_VIDEOS: TutorialVideo[] = [
  {
    id: 'tut-1',
    title: 'Complete Retail POS Billing & Checkout in 60 Seconds',
    category: 'Cashier & Billing',
    duration: '3:45',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
    description: 'Master fast touch scanning, hotkeys (F1-F12), customer search, discounts, and split cash/card payments.',
    bullets: ['Hotkeys for express billing', 'Adding quick customers', 'Discount & VAT calculation'],
  },
  {
    id: 'tut-2',
    title: 'Setting Up 80mm ESC/POS Thermal Printers & Cash Drawer',
    category: 'Hardware & Printers',
    duration: '4:20',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800&auto=format&fit=crop',
    description: 'Step-by-step driver setup for Epson, Xprinter, and USB thermal receipt printers with automatic cash drawer kick.',
    bullets: ['Selecting ESC/POS device', 'Configuring paper size (80mm vs 58mm)', 'Testing RJ11 cash drawer solenoid'],
  },
  {
    id: 'tut-3',
    title: 'Barcode Scanner Calibration & Bulk Product Excel Import',
    category: 'Cashier & Billing',
    duration: '5:15',
    level: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    description: 'Learn how to batch upload thousands of SKUs via Excel/CSV and configure 1D & 2D handheld USB barcode scanners.',
    bullets: ['Sample CSV catalog template', 'Handling barcodes & variants', 'Low stock minimum thresholds'],
  },
  {
    id: 'tut-4',
    title: 'Multi-Branch Warehouse Transfers & Centralized Sync',
    category: 'Multi-Branch Inventory',
    duration: '6:30',
    level: 'Advanced',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800&auto=format&fit=crop',
    description: 'Manage central warehouse dispatch, branch receiving, transfer discrepancies, and consolidated inventory valuation.',
    bullets: ['Dispatch transfer orders', 'Branch stock intake verification', 'Warehouse movement audit trail'],
  },
  {
    id: 'tut-5',
    title: 'End-of-Day Cashier Shift Closing & Z-Report Printing',
    category: 'VAT & Accounting',
    duration: '3:10',
    level: 'Beginner',
    thumbnailUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800&auto=format&fit=crop',
    description: 'Reconcile opening cash float against actual drawer count, detect cash shortages, and print daily Z-Audit slips.',
    bullets: ['Shift cash count verification', 'Handling card & bKash totals', 'Printing official thermal Z-Report'],
  },
  {
    id: 'tut-6',
    title: 'Configuring bKash, Nagad QR & Bank Card Payments',
    category: 'Cashier & Billing',
    duration: '4:40',
    level: 'Intermediate',
    thumbnailUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop',
    description: 'Enable dynamic QR code generation for bKash and Nagad merchant accounts directly on the cashier screen.',
    bullets: ['Merchant API credential entry', 'Customer QR scanning on screen', 'Instant transaction auto-reconciliation'],
  },
];

export default function ResourcesPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideoModal, setActiveVideoModal] = useState<TutorialVideo | null>(null);

  const categories = [
    'All',
    'Cashier & Billing',
    'Hardware & Printers',
    'Multi-Branch Inventory',
    'VAT & Accounting'
  ];

  const filteredVideos = TUTORIAL_VIDEOS.filter((video) => {
    const matchesCategory = activeCategory === 'All' || video.category === activeCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const hardwareGuides = [
    {
      brand: 'Xprinter / Posiflex',
      model: 'XP-N160II / XP-80C',
      type: '80mm USB & LAN Thermal Printer',
      status: 'Plug & Play Verified',
      baudRate: '9600 - 115200 bps',
    },
    {
      brand: 'Epson',
      model: 'TM-T82X / TM-T20III',
      type: '80mm ESC/POS Thermal Receipt',
      status: 'Native Driver Supported',
      baudRate: 'Auto-Negotiated',
    },
    {
      brand: 'Sunmi',
      model: 'V2s / T2s / D2s',
      type: 'Android POS & Dual Screen Terminal',
      status: 'Direct SDK Integrated',
      baudRate: 'Internal Thermal Port',
    },
    {
      brand: 'Honeywell / Zebra',
      model: 'Voyager 1250g / DS2208',
      type: '1D/2D Laser & QR Barcode Scanner',
      status: 'Instant USB Keyboard Wedge',
      baudRate: 'Standard HID Mode',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-orange-50/70 via-slate-50 to-white border-b border-slate-200/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-800 text-xs sm:text-sm font-semibold mb-6">
            <Video className="w-4 h-4 text-orange-600" />
            <span>Learning Hub &amp; Video Tutorials</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Everything You Need to Master{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              BikriPOS in Minutes
            </span>
          </h1>

          <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Watch step-by-step video tutorials, learn hardware setup for thermal receipt printers, and train your cashier staff for high-speed retail checkout.
          </p>

          {/* Search Box */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutorials (e.g. thermal printer, barcode, bKash, Z-report)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200 shadow-md text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
            />
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
          </div>

          {/* Quick Filter Tabs */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-orange-500 text-white shadow-sm shadow-orange-500/20'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Video Tutorials Grid */}
      <section id="tutorials" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Video Masterclasses &amp; Step-by-Step Guides
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Showing {filteredVideos.length} tutorials
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all group flex flex-col justify-between"
            >
              {/* Thumbnail with Play Overlay */}
              <div 
                onClick={() => setActiveVideoModal(video)}
                className="relative h-48 w-full bg-slate-900 cursor-pointer overflow-hidden"
              >
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                {/* Duration Badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-black/70 text-white text-[11px] font-mono font-semibold flex items-center gap-1 backdrop-blur-xs">
                  <Clock className="w-3 h-3 text-orange-400" />
                  <span>{video.duration}</span>
                </div>

                {/* Level Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-orange-500/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  {video.level}
                </div>

                {/* Big Center Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-orange-600 transition-all">
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Video Content Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md border border-orange-100">
                    {video.category}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors leading-snug">
                    {video.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {video.description}
                  </p>

                  <ul className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                    {video.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[11px] font-medium text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => setActiveVideoModal(video)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Watch Tutorial</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] text-slate-400">Full HD Video</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Hardware Setup & Compatibility Matrix */}
      <section id="hardware" className="py-16 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mb-3">
              <Printer className="w-3.5 h-3.5" />
              <span>Certified Hardware Matrix</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Plug-and-Play Hardware Integration
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              BikriPOS connects directly to industry-standard thermal printers, cash drawers, and barcode scanners without expensive proprietary hardware.
            </p>
          </div>

          <div className="bg-slate-50 rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-4 px-6">Hardware Brand</th>
                    <th className="py-4 px-6">Model Verified</th>
                    <th className="py-4 px-6">Type &amp; Connection</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6">Communication Speed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/70">
                  {hardwareGuides.map((hw, idx) => (
                    <tr key={idx} className="hover:bg-white transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900">{hw.brand}</td>
                      <td className="py-4 px-6 font-semibold text-slate-700">{hw.model}</td>
                      <td className="py-4 px-6 text-slate-600">{hw.type}</td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-[11px]">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{hw.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-6 font-mono text-slate-500 text-xs">{hw.baudRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-6 bg-slate-100/50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Printer className="w-4 h-4 text-orange-500" />
                <span>Need on-site printer installation in Dhaka or Chittagong? Our technicians can assist.</span>
              </div>
              <Link
                href="/contact"
                className="font-bold text-orange-600 hover:underline flex items-center gap-1"
              >
                <span>Request Hardware Setup Assistance</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Downloadable Catalog Templates & Guides */}
      <section id="guides" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Free Downloadable Starter Guides &amp; Excel Templates
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Accelerate your store launch with pre-formatted inventory templates and training cheat sheets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Bulk Product Catalog Excel Template</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Pre-formatted `.xlsx` template with columns for Barcode, SKU, Purchase Price, Selling Price, Category, and Minimum Reorder Threshold.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert('Sample Excel catalog format is downloaded inside merchant dashboard under Products > Import CSV.'); }}
                className="text-xs font-bold text-orange-600 flex items-center gap-1.5 hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Sample Template</span>
              </a>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">Cashier Training &amp; Hotkeys Cheat Sheet</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Printable 1-page PDF guide covering F1-F12 hotkeys, barcode scanning tips, drawer closing, and refund policy procedures.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <a
                href="#download"
                onClick={(e) => { e.preventDefault(); alert('Hotkey Cheat Sheet: F1=Cash, F2=Card, F3=bKash, F4=Clear, F7=Custom Item, F8=Barcode, F10=Lock, F12=Complete Sale.'); }}
                className="text-xs font-bold text-blue-600 flex items-center gap-1.5 hover:underline"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Hotkeys PDF</span>
              </a>
            </div>
          </div>

          <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">NBR VAT &amp; Audit Compliance Checklist</h4>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Step-by-step checklist to ensure your thermal receipts display company BIN, address, Mushak-6.3 VAT breakdowns accurately.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100">
              <Link
                href="/contact"
                className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Consult Our NBR Tax Team</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Official App & Installer Downloads Section */}
      <section id="downloads" className="py-8 bg-slate-50 border-t border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold mb-3">
            <Download className="w-4 h-4 text-[#FF9F43]" />
            <span>Multi-Device POS Apps</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Download BikriPOS Apps
          </h2>
          <p className="text-sm text-slate-500 max-w-lg mx-auto mt-1">
            Install the desktop software for retail shops or manage transactions on the go with Android &amp; Web app.
          </p>
        </div>
        <DownloadSection showHero={false} showHelpGuide={true} />
      </section>

      {/* Video Modal Player */}
      {activeVideoModal && (
        <div 
          onClick={() => setActiveVideoModal(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200"
          >
            <div className="relative aspect-video bg-black flex items-center justify-center">
              <img
                src={activeVideoModal.thumbnailUrl}
                alt={activeVideoModal.title}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center mb-4 shadow-xl">
                  <Play className="w-8 h-8 fill-white ml-1" />
                </div>
                <h3 className="text-xl font-bold max-w-lg mb-2">{activeVideoModal.title}</h3>
                <p className="text-xs text-slate-300 max-w-md">
                  Interactive video player session. Full HD video streaming with Bangla &amp; English audio commentary.
                </p>
              </div>
            </div>

            <div className="p-6 flex items-center justify-between bg-slate-50">
              <div>
                <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
                  {activeVideoModal.category}
                </span>
                <p className="text-xs text-slate-500 mt-0.5">Duration: {activeVideoModal.duration} • Level: {activeVideoModal.level}</p>
              </div>
              <button
                onClick={() => setActiveVideoModal(null)}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Close Player
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Need on-site training for your retail staff in Dhaka?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Our retail specialists provide hands-on cashier training, printer calibration, and warehouse inventory migration.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              Book Staff Training Session
            </Link>
            <Link
              href="/pricing"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200 transition-all"
            >
              View Subscription Plans
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
