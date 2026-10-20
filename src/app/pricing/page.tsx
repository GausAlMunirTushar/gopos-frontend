'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar, Footer, CtaBanner } from '@/components/landing';
import { 
  Check, 
  X, 
  Sparkles, 
  ArrowRight, 
  HelpCircle, 
  ShieldCheck, 
  Zap, 
  Store, 
  Building2, 
  Headphones,
  CreditCard,
  Layers
} from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter POS',
      tagline: 'Ideal for single retail shops, corner groceries, boutiques & fashion outlets.',
      priceMonthly: 990,
      priceYearly: 790,
      badge: null,
      highlight: false,
      popular: false,
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/register?plan=starter',
      features: [
        '1 Active Store Outlet',
        '1 POS Cashier Terminal',
        'Up to 1,500 Products & SKUs',
        'Standard Barcode Scanning & Thermal Receipts',
        'Real-time Cash & Stock Register',
        'Basic Sales & Daily Revenue Reports',
        'bKash, Nagad & Cash Payment Recording',
        'Offline Billing Resilience (Auto Sync)',
        'Standard Email & Ticket Support'
      ],
      notIncluded: [
        'Multi-Outlet Stock Transfers',
        'Purchase Orders & Batch Expiry Tracking',
        'Advanced General Ledger & Double-Entry Accounting',
        'Custom SMS Marketing Campaigns',
        'Dedicated Account Manager & 24/7 Hotline'
      ]
    },
    {
      id: 'growth',
      name: 'Growth Chain',
      tagline: 'For fast-growing retail businesses, supermarkets, restaurants & multi-branch chains.',
      priceMonthly: 2490,
      priceYearly: 1990,
      badge: 'MOST POPULAR',
      highlight: true,
      popular: true,
      ctaText: 'Start 14-Day Free Trial',
      ctaHref: '/register?plan=growth',
      features: [
        'Up to 3 Store Outlets / Warehouses',
        'Unlimited POS Terminals per store',
        'Unlimited Products, Variants & Batches',
        'Multi-Location Real-time Stock Transfer',
        'Automated Purchase Orders & Low Stock Alerts',
        'Customer Loyalty Points, Coupons & Gift Cards',
        'Full Double-Entry Accounting & Trial Balance',
        'HRM: Staff Shifts, Attendance & Commission',
        'Bangladeshi SMS Gateway Integration',
        'Priority Phone & WhatsApp Support'
      ],
      notIncluded: [
        'Custom ERP Integrations & API Access',
        'Dedicated Server Infrastructure & SLA Guarantee'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise ERP',
      tagline: 'For nationwide supermarket chains, wholesale distributors & enterprise franchises.',
      priceMonthly: 5990,
      priceYearly: 4790,
      badge: 'ENTERPRISE SUITE',
      highlight: false,
      popular: false,
      ctaText: 'Contact Enterprise Sales',
      ctaHref: '/contact?inquiry=enterprise',
      features: [
        'Unlimited Outlets & Centralized Warehouses',
        'Unlimited High-Speed POS Terminals',
        'Comprehensive Multi-Entity ERP Architecture',
        'Lot & Batch Tracking with Expiry Automation',
        'Advanced Finance: Balance Sheet & Cash Flow Matrix',
        'Automated Tax / VAT Submissions (NBR Compatible)',
        'Custom Branded Receipts & Barcode Label Layouts',
        'Direct REST API & Webhooks Access',
        '99.99% Guaranteed SLA Uptime',
        'Dedicated Solutions Architect & 24/7 On-Site Support'
      ],
      notIncluded: []
    }
  ];

  const comparisonCategories = [
    {
      name: 'POS & Billing Terminal',
      items: [
        { feature: 'High-speed touch POS terminal', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
        { feature: 'Barcode scanner & thermal printer support', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
        { feature: 'Offline checkout & local database sync', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
        { feature: 'Hold order, cart parking & split bills', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
        { feature: 'Integrated bKash / Nagad / Card recording', starter: 'Yes', growth: 'Yes', enterprise: 'Yes' },
        { feature: 'Customizable receipt template with logo', starter: 'Basic', growth: 'Advanced', enterprise: 'Fully Custom' },
      ]
    },
    {
      name: 'Inventory & Supply Chain',
      items: [
        { feature: 'Product variants (Sizes, Colors, Units)', starter: '100', growth: 'Unlimited', enterprise: 'Unlimited' },
        { feature: 'Batch & Expiry Date tracking', starter: false, growth: true, enterprise: true },
        { feature: 'Multi-warehouse inter-branch transfer', starter: false, growth: true, enterprise: true },
        { feature: 'Purchase orders & supplier receiving', starter: 'Basic', growth: 'Full', enterprise: 'Advanced Multi-lot' },
        { feature: 'Stock adjustments & damage write-off', starter: true, growth: true, enterprise: true },
        { feature: 'Automated low stock reorder alerts', starter: 'Email only', growth: 'Email + SMS', enterprise: 'Omni-channel' },
      ]
    },
    {
      name: 'Finance & Accounting',
      items: [
        { feature: 'Cash drawer & daily shift closing', starter: true, growth: true, enterprise: true },
        { feature: 'Bank accounts & internal fund transfers', starter: false, growth: true, enterprise: true },
        { feature: 'Income & expense categorization', starter: 'Basic', growth: 'Full', enterprise: 'Advanced GL' },
        { feature: 'Trial Balance & Balance Sheet generation', starter: false, growth: true, enterprise: true },
        { feature: 'Cash Flow statements (Operating/Financing)', starter: false, growth: true, enterprise: true },
        { feature: 'Supplier payables & Customer receivables', starter: true, growth: true, enterprise: true },
      ]
    },
    {
      name: 'Security, Support & SLA',
      items: [
        { feature: 'Role-based access permissions', starter: '3 Roles', growth: 'Custom Roles', enterprise: 'Granular Matrix' },
        { feature: 'Automated hourly cloud backups', starter: 'Daily', growth: 'Hourly', enterprise: 'Real-time Redundant' },
        { feature: 'Uptime SLA guarantee', starter: '99.9%', growth: '99.95%', enterprise: '99.99% SLA' },
        { feature: 'Customer Support channels', starter: 'Email & Tickets', growth: 'Phone & WhatsApp', enterprise: 'Dedicated 24/7 VIP' },
        { feature: 'On-site onboarding & staff training', starter: false, growth: 'Remote', enterprise: 'On-site (Dhaka & CTG)' },
      ]
    }
  ];

  const pricingFaqs = [
    {
      q: 'Can I start with a free trial without adding a credit card?',
      a: 'Yes! You can try BikriPOS completely free for 14 days with full features. No credit card or advance payment is required.'
    },
    {
      q: 'Which payment methods do you accept for subscription billing in Bangladesh?',
      a: 'We accept bKash Merchant, Nagad, Rocket, Bank Transfer (City Bank, BRAC Bank, Eastern Bank, Dutch-Bangla), Visa, MasterCard, and AMEX.'
    },
    {
      q: 'Does BikriPOS work when the internet is disconnected?',
      a: 'Absolutely. BikriPOS includes an offline-first POS engine that lets you scan barcodes, process customer checkouts, and print receipts without internet. When connection restores, all sales sync instantly.'
    },
    {
      q: 'Can I upgrade or downgrade my plan at any time?',
      a: 'Yes, you can upgrade instantly from your store dashboard as your business expands. Any unused credit will automatically be prorated.'
    },
    {
      q: 'Do you provide hardware like thermal printers, barcode scanners, and cash drawers?',
      a: 'BikriPOS is compatible with standard POS hardware (Epson, Xprinter, Sunmi, Honeywell, TSC). We also partner with local hardware distributors to provide plug-and-play complete bundles.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold mb-6 border border-orange-200">
          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
          <span>Transparent Pricing &bull; No Hidden Hardware Lock-in</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto">
          Scale Your Retail Operations with <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Predictable Pricing</span>
        </h1>

        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          Choose the right plan for your single store or multi-outlet retail empire. All plans include automated cloud backups and offline capability.
        </p>

        {/* Billing Switcher */}
        <div className="mt-10 inline-flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
              billingCycle === 'monthly'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all ${
              billingCycle === 'yearly'
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Annual Billing</span>
            <span className="text-[10px] uppercase font-black tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const price = billingCycle === 'yearly' ? plan.priceYearly : plan.priceMonthly;
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-8 transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-white border-2 border-orange-500 shadow-2xl shadow-orange-500/10 scale-102 lg:-translate-y-2'
                    : 'bg-white border border-slate-200/90 shadow-sm hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-black text-slate-900">{plan.name}</h3>
                    {plan.id === 'starter' && <Store className="w-6 h-6 text-slate-400" />}
                    {plan.id === 'growth' && <Zap className="w-6 h-6 text-orange-500" />}
                    {plan.id === 'enterprise' && <Building2 className="w-6 h-6 text-slate-800" />}
                  </div>

                  <p className="mt-2 text-xs text-slate-500 min-h-[36px]">{plan.tagline}</p>

                  {/* Price Tag */}
                  <div className="mt-6 pb-6 border-b border-slate-100 flex items-baseline gap-1.5">
                    <span className="text-4xl sm:text-5xl font-black text-slate-900">
                      ৳{price.toLocaleString()}
                    </span>
                    <span className="text-slate-500 text-sm font-medium">
                      / month {billingCycle === 'yearly' && <span className="text-xs text-orange-600 font-semibold block sm:inline">(billed annually)</span>}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="mt-6 space-y-3">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
                      What&apos;s Included:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                      {plan.notIncluded.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5 text-xs text-slate-400">
                          <div className="w-4 h-4 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center shrink-0 mt-0.5">
                            <X className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <Link
                    href={plan.ctaHref}
                    className={`w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:-translate-y-0.5'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <p className="text-[11px] text-center text-slate-400 mt-2">
                    No setup fee &bull; 14-day risk free
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Deep Feature Comparison Matrix */}
      <section className="bg-white py-20 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
              <Layers className="w-3.5 h-3.5 text-slate-600" />
              <span>Comprehensive Feature Matrix</span>
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">
              Compare All Plans &amp; Capabilities Side-by-Side
            </h2>
            <p className="mt-3 text-slate-600 text-sm">
              Detailed technical specifications to help you make an informed decision for your business.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="py-4 px-6 text-sm font-black text-slate-900 w-1/3">Feature Details</th>
                  <th className="py-4 px-6 text-sm font-black text-slate-900 text-center w-1/5">Starter POS</th>
                  <th className="py-4 px-6 text-sm font-black text-orange-600 text-center w-1/5 bg-orange-50/50 rounded-t-xl">Growth Chain</th>
                  <th className="py-4 px-6 text-sm font-black text-slate-900 text-center w-1/5">Enterprise ERP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {comparisonCategories.map((cat) => (
                  <React.Fragment key={cat.name}>
                    <tr className="bg-slate-50">
                      <td colSpan={4} className="py-3 px-6 text-xs font-bold uppercase tracking-wider text-slate-700">
                        {cat.name}
                      </td>
                    </tr>
                    {cat.items.map((row) => (
                      <tr key={row.feature} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3.5 px-6 text-xs font-medium text-slate-800">
                          {row.feature}
                        </td>
                        <td className="py-3.5 px-6 text-xs text-center text-slate-600">
                          {typeof row.starter === 'boolean' ? (
                            row.starter ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 mx-auto" />
                            )
                          ) : (
                            row.starter
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-xs text-center font-semibold text-slate-900 bg-orange-50/30">
                          {typeof row.growth === 'boolean' ? (
                            row.growth ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 mx-auto" />
                            )
                          ) : (
                            row.growth
                          )}
                        </td>
                        <td className="py-3.5 px-6 text-xs text-center font-semibold text-slate-900">
                          {typeof row.enterprise === 'boolean' ? (
                            row.enterprise ? (
                              <Check className="w-4 h-4 text-emerald-500 mx-auto stroke-[3]" />
                            ) : (
                              <X className="w-4 h-4 text-slate-300 mx-auto" />
                            )
                          ) : (
                            row.enterprise
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
            <span>Pricing FAQs</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {pricingFaqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="text-orange-500">Q:</span> {faq.q}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <CtaBanner />

      {/* Footer */}
      <Footer />
    </div>
  );
}
