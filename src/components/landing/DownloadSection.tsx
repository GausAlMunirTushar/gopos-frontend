'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Laptop, 
  Smartphone, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  Printer, 
  ScanBarcode, 
  Sliders, 
  Store,
  ChevronRight,
  FileText,
  HelpCircle,
  TrendingUp
} from 'lucide-react';

interface DownloadSectionProps {
  showHero?: boolean;
  showHelpGuide?: boolean;
  className?: string;
}

export function DownloadSection({ 
  showHero = true, 
  showHelpGuide = true, 
  className = '' 
}: DownloadSectionProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  return (
    <section className={`relative overflow-hidden ${className}`}>
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-orange-100/40 via-amber-50/20 to-transparent pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* ========================================================================= */}
        {/* HERO SECTION                                                             */}
        {/* ========================================================================= */}
        {showHero && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 sm:mb-20">
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Official Download Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF4EB] border border-orange-200 text-[#FF9F43] text-xs sm:text-sm font-bold shadow-2xs">
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Official Downloads</span>
              </div>

              {/* Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Download <span className="text-[#FF9F43]">BikriPOS</span>
                </h1>
                <p className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight">
                  Your shop. Every device.
                </p>
              </div>

              {/* Subtitle */}
              <p className="text-slate-600 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
                Use BikriPOS on Windows, Android or any browser. Download the right version for your business and start selling smarter today.
              </p>

              {/* 4 Feature Checkmark Badges */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 pt-2">
                {[
                  'Secure & Official',
                  'Regular Updates',
                  'Easy Installation',
                  'Bangla Support',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-[#FF9F43] text-white flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Hero Visual Devices Showcase (Matching Image) */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
                {/* Ambient Soft Glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/40 via-amber-100/30 to-transparent rounded-full blur-2xl -z-10" />

                {/* Main Laptop Mockup */}
                <div className="relative w-[85%] rounded-2xl bg-slate-900 p-2.5 shadow-2xl border-2 border-slate-700">
                  {/* Laptop Top Bezel with Camera */}
                  <div className="flex items-center justify-center pb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 block" />
                  </div>
                  {/* Laptop Screen (POS Interface) */}
                  <div className="bg-white rounded-lg p-2.5 text-slate-800 space-y-2 select-none overflow-hidden">
                    {/* POS Screen Header */}
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-100">
                      <div className="flex items-center gap-1">
                        <span className="text-[10px] font-black text-[#FF9F43]">BikriPOS</span>
                        <span className="text-[8px] bg-orange-50 text-orange-600 px-1 rounded font-bold">Cloud</span>
                      </div>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600">
                        <span>Today&apos;s Sales: ৳ 12,430</span>
                        <span className="text-[8px] bg-emerald-50 px-1 rounded">↑ 12%</span>
                      </div>
                    </div>
                    {/* POS Screen Mini Bar Chart */}
                    <div className="flex items-end gap-1 h-12 pt-2 px-1 justify-between">
                      {[35, 55, 40, 75, 50, 85, 90, 70, 95, 60].map((h, i) => (
                        <div
                          key={i}
                          style={{ height: `${h}%` }}
                          className={`w-2 rounded-t-xs ${i === 8 || i === 6 ? 'bg-[#FF9F43]' : 'bg-slate-200'}`}
                        />
                      ))}
                    </div>
                    {/* Mini Stats 3 boxes */}
                    <div className="grid grid-cols-3 gap-1 pt-1">
                      <div className="bg-slate-50 p-1 rounded text-center">
                        <span className="text-[7px] text-slate-400 block font-medium">Products</span>
                        <span className="text-[9px] font-bold text-slate-800">1,245</span>
                      </div>
                      <div className="bg-slate-50 p-1 rounded text-center">
                        <span className="text-[7px] text-slate-400 block font-medium">Customers</span>
                        <span className="text-[9px] font-bold text-slate-800">892</span>
                      </div>
                      <div className="bg-slate-50 p-1 rounded text-center">
                        <span className="text-[7px] text-slate-400 block font-medium">Orders</span>
                        <span className="text-[9px] font-bold text-[#FF9F43]">320</span>
                      </div>
                    </div>
                  </div>
                  {/* Laptop Base Bottom Lip */}
                  <div className="h-1.5 bg-slate-800 rounded-b-md mt-1 w-full" />
                </div>

                {/* Overlaid Smartphone Standing in Front Left */}
                <div className="absolute -left-2 -bottom-4 w-32 sm:w-36 rounded-2xl bg-slate-900 p-1.5 shadow-2xl border border-slate-700 z-20">
                  <div className="bg-white rounded-xl p-2 space-y-1.5 select-none">
                    <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                      <span className="text-[8px] font-black text-[#FF9F43]">BikriPOS</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </div>
                    <div className="bg-orange-50/70 p-1.5 rounded-lg text-center">
                      <span className="text-[7px] text-slate-400 block">Today&apos;s Sales</span>
                      <span className="text-[10px] font-black text-slate-900">৳ 12,430</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 pt-0.5">
                      <div className="bg-slate-50 p-1 rounded text-[7px] font-bold text-slate-700 text-center">
                        New Sale
                      </div>
                      <div className="bg-slate-50 p-1 rounded text-[7px] font-bold text-slate-700 text-center">
                        Products
                      </div>
                      <div className="bg-slate-50 p-1 rounded text-[7px] font-bold text-slate-700 text-center">
                        Inventory
                      </div>
                      <div className="bg-slate-50 p-1 rounded text-[7px] font-bold text-slate-700 text-center">
                        Reports
                      </div>
                    </div>
                  </div>
                </div>

                {/* Thermal Printer with Receipt Slip (Right Front) */}
                <div className="absolute -right-2 sm:-right-4 -bottom-6 w-32 sm:w-36 bg-slate-800 rounded-xl p-2 shadow-2xl border border-slate-700 z-10">
                  {/* Paper receipt coming out */}
                  <div className="bg-white rounded-t p-1.5 shadow-sm text-center font-mono text-[7px] text-slate-700 space-y-0.5 border-b border-dashed border-slate-300">
                    <span className="font-bold text-[#FF9F43] block">BikriPOS</span>
                    <span className="text-[6px] text-slate-400 block">Thank You!</span>
                    <span className="text-[6px] text-slate-400 block">Inv #2026-9812</span>
                  </div>
                  {/* Printer Front Panel */}
                  <div className="pt-1.5 flex items-center justify-between text-white text-[8px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[7px] text-slate-400 font-mono">80mm Ready</span>
                  </div>
                </div>

                {/* Barcode Scanner Gun Beside */}
                <div className="absolute -right-6 top-6 hidden sm:flex flex-col items-center rotate-12 z-20 pointer-events-none">
                  <div className="w-8 h-12 bg-slate-900 rounded-t-lg border border-slate-700 flex items-center justify-center shadow-lg">
                    <div className="w-5 h-1 bg-red-500 rounded-full shadow-[0_0_8px_red]" />
                  </div>
                  <div className="w-3.5 h-10 bg-slate-800 rounded-b-md border-t border-slate-700" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3 DOWNLOAD CARDS (GRID)                                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 sm:mb-20">
          
          {/* ---------------- CARD 1: DESKTOP (WINDOWS) ---------------- */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-orange-200/90 shadow-sm hover:shadow-xl hover:border-[#FF9F43] transition-all duration-200 flex flex-col justify-between">
            {/* Recommended Badge on top */}
            <div className="absolute -top-3.5 left-6">
              <span className="px-3 py-1 rounded-full bg-[#FF9F43] text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                Recommended
              </span>
            </div>

            <div className="pt-1 space-y-4">
              {/* Header: Windows Logo + Title */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs">
                  {/* Official Windows 4-Square Logo */}
                  <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                    <span className="bg-[#0078D4] rounded-xs block" />
                    <span className="bg-[#0078D4] rounded-xs block" />
                    <span className="bg-[#0078D4] rounded-xs block" />
                    <span className="bg-[#0078D4] rounded-xs block" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">BikriPOS Desktop</h3>
                  <p className="text-xs font-semibold text-slate-500">For Windows 10/11 (64-bit)</p>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
                Best for retail shops with barcode scanner and receipt printer support.
              </p>

              {/* Mockup Preview */}
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-center my-2">
                <div className="w-48 bg-white border border-slate-300 rounded-lg p-2 shadow-xs space-y-1.5">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <span className="text-[9px] font-bold text-[#FF9F43]">BikriPOS Windows</span>
                    <span className="text-[7px] text-emerald-600 font-bold">Offline Ready</span>
                  </div>
                  <div className="flex items-end gap-1 h-8 justify-between px-1">
                    {[40, 65, 30, 85, 50, 75, 90].map((h, i) => (
                      <div key={i} style={{ height: `${h}%` }} className="w-2.5 bg-orange-400 rounded-t-xs" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {[
                  'Full POS & Inventory',
                  'Works offline',
                  'Printer & barcode support',
                  'Auto updates',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-orange-100 text-[#FF9F43] flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Meta */}
            <div className="pt-6 space-y-3">
              <a
                href="/downloads/BikriPOS-Setup-1.0.0.exe"
                download="BikriPOS-Setup-1.0.0.exe"
                className="w-full h-12 rounded-xl bg-[#FF9F43] hover:bg-[#ff942a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20 hover:shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4 stroke-[2.5]" />
                <span>Download for Windows</span>
              </a>

              {/* Meta Specs */}
              <div className="text-center text-[11px] text-slate-400 font-medium">
                v1.0.0 | 85 MB | Windows 10/11 (64-bit)
              </div>

              {/* Secondary links */}
              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                <Link href="/resources" className="hover:text-[#FF9F43] transition-colors flex items-center gap-1">
                  <span>Release Notes</span> →
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/resources#hardware" className="hover:text-[#FF9F43] transition-colors flex items-center gap-1">
                  <span>Installation Guide</span> →
                </Link>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 2: MOBILE (ANDROID) ---------------- */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-300 transition-all duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header: Android Logo + Title */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 shadow-2xs">
                  {/* Android Robot Head */}
                  <svg className="w-6 h-6 text-[#3DDC84]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.6 9.48l1.84-3.18a.5.5 0 00-.86-.5l-1.87 3.24A11.37 11.37 0 0012 8.5c-1.63 0-3.17.36-4.71 1.04L5.42 6.3a.5.5 0 00-.86.5l1.84 3.18C3.88 11.45 2.5 13.9 2.5 16.7h19c0-2.8-1.38-5.25-3.9-7.22zM7 14c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm10 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">BikriPOS Mobile</h3>
                  <p className="text-xs font-semibold text-slate-500">For Android Devices</p>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
                Manage your shop on the go. Scan products, make sales and check reports anytime.
              </p>

              {/* Mockup Preview */}
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-center my-2">
                <div className="w-32 bg-white border border-slate-300 rounded-xl p-2 shadow-xs space-y-1">
                  <div className="flex items-center justify-between pb-0.5 border-b border-slate-100">
                    <span className="text-[8px] font-bold text-emerald-600">BikriPOS App</span>
                    <span className="text-[7px] text-slate-400">৳ 12,430</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1 pt-1">
                    <div className="bg-orange-50 p-1 rounded text-[7px] font-bold text-orange-600 text-center">Scan</div>
                    <div className="bg-slate-100 p-1 rounded text-[7px] font-bold text-slate-600 text-center">Orders</div>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {[
                  'POS & Inventory',
                  'Barcode & QR Scan',
                  'Works online & offline',
                  'Fast and lightweight',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Meta */}
            <div className="pt-6 space-y-3">
              {/* Official Google Play Badge */}
              <a
                href="https://play.google.com"
                target="_blank"
                rel="noreferrer"
                className="w-full h-12 rounded-xl bg-black hover:bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg cursor-pointer px-4"
              >
                {/* Google Play Triangle Color Icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M3.6 1.8L13.8 12 3.6 22.2C3.2 21.8 3 21.1 3 20.3V3.7c0-.8.2-1.5.6-1.9z" />
                  <path fill="#34A853" d="M17.3 8.5L13.8 12l3.5 3.5 4.3-2.5c.9-.5.9-1.5 0-2l-4.3-2.5z" />
                  <path fill="#FBBC04" d="M3.6 1.8l10.2 10.2 3.5-3.5L4.7.7c-.5-.3-.9-.2-1.1 1.1z" />
                  <path fill="#EA4335" d="M3.6 22.2l13.7-7.7-3.5-3.5-10.2 10.2c.2 1.2.6 1.3 1.1 1z" />
                </svg>
                <div className="text-left leading-none">
                  <span className="text-[9px] uppercase font-semibold text-slate-300 block tracking-wider">GET IT ON</span>
                  <span className="text-sm font-bold text-white tracking-tight">Google Play</span>
                </div>
              </a>

              {/* Meta Specs */}
              <div className="text-center text-[11px] text-slate-400 font-medium">
                Version 1.0.0 | Android 7.0+
              </div>

              {/* Secondary links */}
              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                <a href="https://play.google.com" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span>Play Store</span> →
                </a>
                <span className="text-slate-300">•</span>
                <a href="#apk-download" onClick={(e) => { e.preventDefault(); alert('Direct APK v1.0.0 is coming soon. Please use Google Play Store or Web App.'); }} className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                  <span>APK (Alternative)</span> →
                </a>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 3: WEB APP (BROWSER) ---------------- */}
          <div className="relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-300 transition-all duration-200 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Header: Globe Icon + Title */}
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center shrink-0 shadow-2xs">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight">BikriPOS Web App</h3>
                  <p className="text-xs font-semibold text-slate-500">Use in any modern browser</p>
                </div>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[40px]">
                Access your dashboard from anywhere without installation.
              </p>

              {/* Mockup Preview */}
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-center my-2">
                <div className="w-48 bg-white border border-slate-300 rounded-lg p-2 shadow-xs space-y-1">
                  {/* Browser window dots */}
                  <div className="flex items-center gap-1 pb-1 border-b border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[7px] text-slate-400 font-mono ml-1">app.bikripos.com</span>
                  </div>
                  <div className="flex items-center justify-between text-[8px] text-slate-700 font-bold px-1 pt-1">
                    <span>Cloud Cashier</span>
                    <span className="text-[#FF9F43]">Online</span>
                  </div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="space-y-2.5 pt-1">
                {[
                  'No installation required',
                  'Real-time sync',
                  'Works on all devices',
                  'Always up to date',
                ].map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700">
                    <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shrink-0">
                      <svg className="w-2.5 h-2.5 stroke-[3]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA & Meta */}
            <div className="pt-6 space-y-3">
              <Link
                href="/login"
                className="w-full h-12 rounded-xl bg-white hover:bg-orange-50/70 border-2 border-[#FF9F43] text-[#FF9F43] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                <span>Open Web App</span>
              </Link>

              {/* Meta Specs */}
              <div className="text-center text-[11px] text-slate-400 font-medium">
                Works on Chrome, Edge, Firefox, Safari
              </div>

              {/* Secondary links */}
              <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 pt-1">
                <Link href="/resources#hardware" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                  <span>System Requirements</span> →
                </Link>
                <span className="text-slate-300">•</span>
                <Link href="/resources" className="hover:text-purple-600 transition-colors flex items-center gap-1">
                  <span>User Guide</span> →
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* NEED HELP? GET STARTED EASILY (4-STEP WALKTHROUGH)                        */}
        {/* ========================================================================= */}
        {showHelpGuide && (
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Heading & Button */}
              <div className="lg:col-span-4 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                  Need Help?<br />
                  <span className="text-[#FF9F43]">Get Started Easily</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Follow our step-by-step guides to install and set up BikriPOS on your device.
                </p>
                <div className="pt-2">
                  <Link
                    href="/resources"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#FFF4EB] hover:bg-orange-100 text-[#FF9F43] font-bold text-xs sm:text-sm transition-colors"
                  >
                    <span>View All Guides</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Right Column: 4 Steps */}
              <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  {
                    step: 1,
                    title: 'Download',
                    desc: 'Get the latest version for your device',
                    icon: (
                      <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#FF9F43]">
                        <Download className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ),
                  },
                  {
                    step: 2,
                    title: 'Install',
                    desc: 'Follow the easy installation steps',
                    icon: (
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                        <Sliders className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ),
                  },
                  {
                    step: 3,
                    title: 'Connect Devices',
                    desc: 'Set up printer, barcode scanner and more',
                    icon: (
                      <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                        <ScanBarcode className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ),
                  },
                  {
                    step: 4,
                    title: 'Start Selling',
                    desc: 'Sign in and start managing your shop',
                    icon: (
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                        <Store className="w-6 h-6 stroke-[2.2]" />
                      </div>
                    ),
                  },
                ].map((item) => (
                  <div key={item.step} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between space-y-3 relative group hover:bg-white hover:border-orange-200 transition-all">
                    {/* Step Number Tag */}
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 font-bold text-xs flex items-center justify-center">
                        {item.step}
                      </span>
                    </div>

                    {/* Icon */}
                    <div>
                      {item.icon}
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                      <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
