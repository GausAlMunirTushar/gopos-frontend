import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Store } from 'lucide-react';

export function CtaBanner() {
  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-orange-600 via-amber-500 to-orange-500 rounded-3xl p-8 sm:p-14 text-white relative overflow-hidden">
          
          {/* Subtle patterned overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />

          <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Get Started in 5 Minutes</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Modernize Your Checkout Counter &amp; Inventory?
            </h2>

            <p className="text-orange-50 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Join thousands of retail stores, supermarkets, and cafes running their day-to-day operations seamlessly on BikriPOS.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-extrabold text-orange-600 bg-white hover:bg-orange-50 rounded-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Start Free 14-Day Trial</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold text-white bg-white/15 hover:bg-white/25 border border-white/30 rounded-2xl transition-all"
              >
                <span>Login to Account</span>
              </Link>
            </div>

            {/* Trust List */}
            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-orange-100">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Instant Cloud Provisioning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-white" />
                <span>Free Data Migration Support</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
