'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Check, 
  Sparkles, 
  HelpCircle, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Starter',
      badge: 'Single Store',
      description: 'Ideal for pop-ups, small boutiques, coffee shops, and new retail startups.',
      monthlyPrice: 24,
      annualPrice: 19,
      features: [
        '1 Store / Outlet Location',
        '2 POS Register Devices',
        'Up to 2,000 Products / SKUs',
        '100% Offline Checkout Mode',
        'Thermal Receipt & Barcode Support',
        'Standard Sales & Tax Reports',
        'Email Support (24h response)',
      ],
      popular: false,
      cta: 'Start 14-Day Free Trial',
      ctaHref: '/register?plan=starter',
    },
    {
      name: 'Professional',
      badge: 'Most Popular',
      description: 'Built for growing stores requiring multi-register, stock transfers, and accounting.',
      monthlyPrice: 59,
      annualPrice: 47,
      features: [
        'Up to 3 Store Outlets',
        'Unlimited POS Register Devices',
        'Unlimited Products & Variant Matrix',
        'Multi-Warehouse Stock Sync & Transfers',
        'Complete Finance & Accounting Ledgers',
        'WhatsApp & SMS Digital Receipts',
        'Promos, Coupons & Loyalty Points',
        'Staff Shifts & Cash Drawer Audits',
        'Priority 24/7 Chat & Phone Support',
      ],
      popular: true,
      cta: 'Start Free 14-Day Trial',
      ctaHref: '/register?plan=professional',
    },
    {
      name: 'Enterprise',
      badge: 'Franchise & Chains',
      description: 'Comprehensive ERP suite for large retail chains, supermarkets, and franchises.',
      monthlyPrice: 119,
      annualPrice: 95,
      features: [
        'Unlimited Store Outlets & Warehouses',
        'Unlimited POS Registers & Cashiers',
        'Advanced Multi-Branch Stock Auto-Reorder',
        'Custom Roles & Fine-Grained Permissions',
        'Centralized Supplier & Purchase Order ERP',
        'Custom REST API & Webhook Access',
        '99.99% Uptime SLA Guarantee',
        'Dedicated Account Manager & Onsite Training',
      ],
      popular: false,
      cta: 'Talk to Sales / Enterprise',
      ctaHref: '/register?plan=enterprise',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Simple, Transparent Plans That Scale With You
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            No hidden setup fees. No surprise per-transaction commissions. Upgrade, downgrade, or cancel anytime with one click.
          </p>

          {/* Billing Interval Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 bg-slate-200 rounded-full p-1 transition-colors hover:bg-slate-300 focus:outline-none"
              aria-label="Toggle Annual Billing"
            >
              <div
                className={`w-6 h-6 rounded-full bg-orange-500 shadow-md transform transition-transform ${
                  isAnnual ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-sm font-semibold ${isAnnual ? 'text-slate-900' : 'text-slate-500'}`}>
                Annual Billing
              </span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                Save 20%
              </span>
            </div>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          {plans.map((plan, idx) => {
            const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
            return (
              <div
                key={idx}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  plan.popular
                    ? 'bg-white border-2 border-orange-500 shadow-2xl shadow-orange-500/15 scale-105 z-10'
                    : 'bg-white border border-slate-200 shadow-xs hover:shadow-xl hover:border-slate-300'
                }`}
              >
                {/* Popular Pill */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                      <span className="text-xs font-semibold text-slate-500">{plan.badge}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mb-6 min-h-[36px]">
                    {plan.description}
                  </p>

                  {/* Price display */}
                  <div className="pb-6 mb-6 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
                        ${price}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        / month {isAnnual ? '(billed yearly)' : ''}
                      </span>
                    </div>
                    {isAnnual && (
                      <div className="text-[11px] text-emerald-600 font-semibold mt-1">
                        Billed annually (${price * 12}/year)
                      </div>
                    )}
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3 mb-8">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      What's Included:
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action CTA */}
                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3.5 px-4 rounded-2xl text-center text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Pricing Guarantee Footer */}
        <div className="mt-16 text-center text-xs text-slate-500 flex flex-wrap items-center justify-center gap-6">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            14-Day Risk-Free Full Feature Trial
          </span>
          <span>&bull;</span>
          <span>No Credit Card Required</span>
          <span>&bull;</span>
          <span>Instant Migration Assist from Excel / Square / Lightspeed</span>
        </div>

      </div>
    </section>
  );
}
