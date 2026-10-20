import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Award, 
  ShieldCheck, 
  Zap, 
  Globe2, 
  TrendingUp, 
  Store, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  HeartHandshake,
  Cpu,
  Layers,
  Headphones
} from 'lucide-react';
import { Navbar, Footer } from '@/components/landing';

export const metadata = {
  title: 'About BikriPOS - Next-Gen Retail & Inventory ERP',
  description: 'Learn about BikriPOS by ZivoTech: our mission, technology, Dhaka headquarters, and vision for empowering 50,000+ retail merchants.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Monthly GMV Processed', value: '৳250M+' },
    { label: 'Active Retail Outlets', value: '1,200+' },
    { label: 'System Uptime SLA', value: '99.99%' },
    { label: 'Average Checkout Speed', value: '< 2.5s' },
  ];

  const pillars = [
    {
      icon: Zap,
      title: 'Offline-First Resilience',
      desc: 'Local SQLite and IndexedDB caching ensure cashiers can scan, bill, and print receipts without any pause, even during internet blackouts.',
    },
    {
      icon: Cpu,
      title: 'Universal Hardware Compatibility',
      desc: 'Seamless ESC/POS direct thermal printing on 80mm/58mm printers (Epson, Xprinter, Sunmi), cash drawer kickers, and USB/Bluetooth 1D/2D barcode scanners.',
    },
    {
      icon: Layers,
      title: 'Multi-Branch ERP Power',
      desc: 'Centralized catalog management, branch-to-branch stock transfers, automated low-stock purchase orders, and real-time consolidated P&L accounts.',
    },
    {
      icon: ShieldCheck,
      title: 'Bank-Grade Security & Audit',
      desc: 'Role-based access control (RBAC), tamper-proof shift audit logs, cashier cash-drawer reconciliation, and NBR compliant VAT reporting.',
    },
  ];

  const milestones = [
    {
      year: '2023',
      title: 'Genesis at ZivoTech',
      desc: 'Engineered as an ultra-fast offline-first desktop POS to solve Dhaka supermarket internet drops and cashier bottleneck queues.',
    },
    {
      year: '2024',
      title: 'Cloud ERP & Multi-Store Release',
      desc: 'Expanded into full cloud SaaS with automated warehouse sync, supplier purchase orders, and integrated mobile bKash/Nagad checkout.',
    },
    {
      year: '2025',
      title: '1,000+ Stores Milestone',
      desc: 'Crossed 1,000 active merchant locations across Dhaka, Chittagong, Sylhet, and Khulna with 99.99% uptime record.',
    },
    {
      year: '2026',
      title: 'Next-Gen Cross-Platform Architecture',
      desc: 'Launched high-performance Desktop application (Electron + Rust/C++ backend) and AI-driven stock forecasting.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-orange-50/60 via-slate-50 to-white overflow-hidden border-b border-slate-200/60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100/80 border border-orange-200/80 text-orange-800 text-xs sm:text-sm font-semibold mb-6">
            <Sparkles className="w-4 h-4 text-orange-600" />
            <span>Powering the Modern Retail Economy</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight max-w-4xl mx-auto">
            Building the Operating System for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500">
              Modern Retail Commerce
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Headquartered in Dhaka, BikriPOS by <strong>ZivoTech</strong> is designed to solve the real challenges of retail: queue congestion, offline interruptions, stock shrinkage, and fragmented multi-branch reporting.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/pricing"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/35 transition-all flex items-center gap-2"
            >
              <span>Explore Plans &amp; Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-800 font-semibold text-sm shadow-xs hover:bg-slate-50 transition-all flex items-center gap-2"
            >
              <span>Meet Our Engineering Team</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Numerical Stats Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-xl grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((st) => (
            <div key={st.label} className="space-y-1">
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                {st.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-500">
                {st.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Our Mission</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Empowering merchants with tools once reserved only for multi-billion dollar retail giants.
            </h2>
            <p className="text-slate-600 leading-relaxed text-base">
              Traditional ERP systems are clunky, expensive, and fragile when internet connections drop. On the other hand, simple cash registers lack inventory tracking, purchase management, and multi-branch insights.
            </p>
            <p className="text-slate-600 leading-relaxed text-base">
              BikriPOS combines the tactile speed of an ultra-fast desktop cash register with the limitless scalability of a modern cloud inventory platform.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Zero vendor lock-in</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Local Bangla receipt printing</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>On-site technician setup in Dhaka</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm font-semibold text-slate-800">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Automatic daily cloud backups</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div className="bg-gradient-to-tr from-slate-900 to-[#092C4C] rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xl">
                B
              </div>
              <div>
                <h3 className="text-2xl font-black">Engineering Headquarters</h3>
                <p className="text-slate-400 text-sm mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-orange-400 shrink-0" />
                  <span>Dhanmondi, Dhaka-1205, Bangladesh</span>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Company:</span>
                  <strong className="text-white">ZivoTech Ltd.</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Specialization:</span>
                  <strong className="text-white">Retail ERP &amp; Cloud POS</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Support Hours:</span>
                  <strong className="text-emerald-400">24/7 Dedicated Helpline</strong>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Headphones className="w-4 h-4" />
                  <span>Contact Our Dhaka Team</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Technology Pillars */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Why 1,200+ Stores Rely on BikriPOS Every Single Day
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Architected with cutting-edge engineering principles for high-throughput retail checkout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil) => {
              const Icon = pil.icon;
              return (
                <div
                  key={pil.title}
                  className="bg-slate-50 hover:bg-orange-50/50 p-6 rounded-3xl border border-slate-200/90 hover:border-orange-300 transition-all group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-white group-hover:bg-orange-500 group-hover:text-white text-orange-600 shadow-sm border border-slate-200/60 flex items-center justify-center mb-5 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {pil.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {pil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Growth Journey & Milestones */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Our Journey &amp; Milestones
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Continuous evolution driven by direct feedback from supermarket managers, pharmacy owners, and cashiers.
          </p>
        </div>

        <div className="space-y-6">
          {milestones.map((ms, index) => (
            <div
              key={ms.year}
              className="flex items-start gap-5 p-5 rounded-2xl bg-white border border-slate-200 shadow-xs hover:border-orange-300 transition-all"
            >
              <div className="px-3.5 py-1.5 rounded-xl bg-orange-100 text-orange-700 font-black text-sm shrink-0">
                {ms.year}
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-slate-900">{ms.title}</h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{ms.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 bg-slate-50 border-t border-slate-200 text-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Ready to upgrade your store with BikriPOS?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Get started in 10 minutes with our 14-day free trial, or book a live on-site demo with our Dhaka retail consultants.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/register"
              className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm hover:from-orange-600 hover:to-amber-600 transition-all"
            >
              Start Free 14-Day Trial
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-800 font-semibold text-sm border border-slate-200 transition-all"
            >
              Talk to Sales &amp; Support
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
