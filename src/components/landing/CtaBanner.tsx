'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { ArrowRight, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

export function CtaBanner() {
  const locale = useLocale();
  const isBn = locale === 'bn';

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Modern Clean CTA Container */}
        <div className="relative rounded-3xl bg-slate-900 border border-slate-800/80 p-8 sm:p-14 lg:p-16 text-center overflow-hidden shadow-2xl shadow-slate-950/20">
          
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-64 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />
          
          {/* Subtle grid pattern background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '24px 24px',
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-orange-400" />
              <span>{isBn ? 'সহজ ও দ্রুত শুরু করুন' : 'Simple & Instant Setup'}</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {isBn 
                ? 'আপনার ব্যবসার সেলস ও ইনভেন্টরি আধুনিক করুন' 
                : 'Transform your retail checkout & inventory today'}
            </h2>

            {/* Subtitle */}
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
              {isBn
                ? 'BikriPOS এর মাধ্যমে সুপারশপ, রেস্তোরাঁ ও রিটেল বিজনেসের সেলস, স্টক এবং ক্লাউড অ্যাকাউন্টিং পরিচালনা করুন যেকোনো ডিভাইস থেকে।'
                : 'Empower your stores with ultra-fast billing, automatic barcode scanning, and multi-branch stock control with 99.9% uptime.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-sm sm:text-base font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{isBn ? '১৪ দিনের ফ্রি ট্রায়াল শুরু করুন' : 'Start 14-Day Free Trial'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-all"
              >
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>{isBn ? 'লাইভ ডেমো বুক করুন' : 'Book a Live Demo'}</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-5 text-xs font-medium text-slate-400 border-t border-slate-800/60 mt-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? 'ক্রেডিট কার্ড প্রয়োজন নেই' : 'No credit card required'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? '১০ মিনিটে লাইভ সেটআপ' : '10-minute instant deployment'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isBn ? 'যেকোনো সময় বাতিলযোগ্য' : 'Cancel anytime'}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
