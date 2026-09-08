'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: 'Does goPOS really work 100% offline when the internet drops?',
    answer: 'Yes! Our offline-first architecture allows cashiers to continue scanning barcodes, adding discounts, taking cash or local card payments, and printing receipts even if the internet goes down. When your internet connection is restored, all offline sales and stock edits automatically sync back to the cloud in the background with zero data loss.',
  },
  {
    question: 'Can I use my existing receipt printer, cash drawer, and barcode scanner?',
    answer: 'Absolutely. goPOS supports standard ESC/POS 80mm and 58mm thermal printers (USB, Bluetooth, LAN/Ethernet), standard 1D/2D USB/Bluetooth barcode scanners, and RJ11 automatic kick-out cash drawers. You do not need to purchase expensive proprietary hardware.',
  },
  {
    question: 'How easy is it to import my products and customer database from Excel or another POS?',
    answer: 'You can import tens of thousands of products, categories, suppliers, and customer lists in minutes using our 1-click CSV/Excel import wizard. We provide pre-formatted templates and automatic column mapping.',
  },
  {
    question: 'How does multi-outlet stock transfer and central inventory sync work?',
    answer: 'From your master administrative dashboard, you can view inventory levels across all branches in real-time. You can initiate stock transfers between warehouses or stores, issue dispatch manifests, track transit status, and approve stock arrival with full audit trails.',
  },
  {
    question: 'Can I restrict cashier permissions and track cash drawer openings?',
    answer: 'Yes. goPOS features comprehensive Role-Based Access Control (RBAC). You can define whether a cashier is allowed to view cost prices, issue refunds, or apply manual discounts. Shift open/close reconciliation ensures cash drawer balances match physical counts with blind drawer audit options.',
  },
  {
    question: 'Is there any lock-in contract or cancellation fee?',
    answer: 'No contracts and no hidden cancellation fees. You can subscribe month-to-month or annually. If you ever choose to cancel, you can export all your historical sales, invoices, and accounting data in standard formats anytime.',
  },
];

export function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Everything you need to know about setting up, hardware compatibility, and running goPOS.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden transition-all duration-200 shadow-xs hover:border-orange-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg hover:text-orange-600 transition-colors"
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-orange-100 text-orange-600' : 'text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center p-8 bg-white rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-lg font-bold text-slate-900">Have a custom question or need hardware consultation?</h3>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            Our POS engineering team is available 24/7 to review your store setup, peripheral devices, and workflow.
          </p>
          <div className="pt-2">
            <a
              href="mailto:support@gopos.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
            >
              <span>Contact Dedicated Support Team</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
