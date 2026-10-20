'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar, Footer } from '@/components/landing';
import { ShieldCheck, Lock, Eye, Database, Server, UserCheck, ArrowRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'October 20, 2026';

  const sections = [
    { id: 'collection', title: '1. Information We Collect' },
    { id: 'usage', title: '2. How We Use Your Information' },
    { id: 'isolation', title: '3. Multi-Tenant Isolation & Encryption' },
    { id: 'payments', title: '4. Payment Security & MFS Gateways' },
    { id: 'cookies', title: '5. Cookies & Local Storage Policy' },
    { id: 'retention', title: '6. Data Retention & Export Rights' },
    { id: 'disclosure', title: '7. Third-Party Disclosures' },
    { id: 'contact', title: '8. Contact our Data Protection Team' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-4 border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Enterprise Data Privacy &bull; Updated {lastUpdated}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Privacy Policy
        </h1>

        <p className="mt-3 text-slate-600 text-sm max-w-2xl mx-auto leading-relaxed">
          At BikriPOS, we believe your commercial store data is strictly yours. Learn how our cloud infrastructure protects, isolates, and encrypts your confidential business records.
        </p>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Navigation */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 bg-white rounded-2xl p-6 border border-slate-200">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Sections
            </div>
            <nav className="space-y-1.5">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block text-xs font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/70 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  {sec.title}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Have security questions?{' '}
              <Link href="/contact" className="text-emerald-600 font-semibold hover:underline">
                Contact our DPO
              </Link>.
            </div>
          </div>

          {/* Right Detailed Privacy Clauses */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 space-y-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
            
            <section id="collection" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. Information We Collect</h2>
              <p>
                When you create an account, configure stores, and execute transactions using <strong>BikriPOS</strong>, we collect only the necessary information required to operate the multi-branch cloud POS &amp; inventory service:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Account Information:</strong> Merchant name, company name, trade license number, business email, phone numbers, and outlet physical addresses.</li>
                <li><strong>Catalog &amp; Inventory Records:</strong> Product names, SKUs, barcode numbers, batch numbers, supplier contacts, and purchase prices.</li>
                <li><strong>Sales &amp; POS Transactions:</strong> Invoice records, quantities sold, timestamped cashier IDs, customer phone numbers (for SMS receipts/loyalty), and payment methods.</li>
                <li><strong>Device &amp; Telemetry Data:</strong> IP addresses, browser versions, thermal printer connection status, and offline sync logs.</li>
              </ul>
            </section>

            <section id="usage" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">2. How We Use Your Information</h2>
              <p>
                We use collected information exclusively to provide, maintain, and optimize BikriPOS cloud services:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Generating real-time financial statements, trial balances, and inventory valuation reports.</li>
                <li>Executing multi-warehouse stock replenishment orders and automated low-stock notifications.</li>
                <li>Transmitting digital SMS invoices and loyalty points updates to your retail customers.</li>
                <li>Troubleshooting cashier hardware issues and delivering 24/7 technical customer support.</li>
              </ul>
            </section>

            <section id="isolation" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">3. Multi-Tenant Isolation &amp; Encryption</h2>
              <p>
                BikriPOS utilizes a robust multi-tenant cloud architecture where each Merchant&apos;s data is strictly partitioned by unique organizational identifiers (`organizationId`).
              </p>
              <p>
                All data in transit is encrypted using <strong>TLS 1.3 / SSL</strong>, and all database volumes and automated backups are encrypted at rest using industry-standard <strong>AES-256</strong> protocols.
              </p>
            </section>

            <section id="payments" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">4. Payment Security &amp; MFS Gateways</h2>
              <p>
                For subscription billing and integrated POS payments (bKash, Nagad, Visa, MasterCard), BikriPOS never stores raw bank PINs, CVV codes, or credit card numbers. All electronic payment transactions are tokenized through Bangladesh Bank licensed, PCI-DSS compliant payment gateways.
              </p>
            </section>

            <section id="cookies" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">5. Cookies &amp; Local Storage Policy</h2>
              <p>
                BikriPOS uses minimal first-party cookies and browser local storage for essential application operation:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>`NEXT_LOCALE`:</strong> Remembers your chosen interface language preference (English 🇬🇧 or Bangla 🇧🇩).</li>
                <li><strong>Session &amp; Auth Tokens:</strong> Secure HTTP-only cookies to keep your cashier terminal authenticated safely.</li>
                <li><strong>IndexedDB / Local Storage:</strong> Temporary offline product catalog cache to enable rapid barcode scanning when offline.</li>
              </ul>
            </section>

            <section id="retention" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">6. Data Retention &amp; Export Rights</h2>
              <p>
                You maintain complete control over your commercial records. You may export full datasets (Invoices, Customers, Stock Balances, Financial Ledgers) in Excel/CSV format at any time. Upon account termination, you may request complete data purging from our production databases.
              </p>
            </section>

            <section id="disclosure" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">7. Third-Party Disclosures</h2>
              <p>
                <strong>We do not sell, rent, or trade your commercial data.</strong> We only share minimal metadata with trusted infrastructure providers (such as cloud hosting and SMS gateway aggregators in Bangladesh) strictly necessary to deliver the service.
              </p>
            </section>

            <section id="contact" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">8. Contact our Data Protection Team</h2>
              <p>
                If you have questions about this Privacy Policy or wish to make an inquiry regarding your store data, please reach out to our Data Protection Officer:
              </p>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
                <p className="font-bold text-slate-900">Data Protection Office — BikriPOS Technologies Inc.</p>
                <p>Email: <a href="mailto:privacy@bikripos.com.bd" className="text-emerald-600 underline">privacy@bikripos.com.bd</a></p>
                <p>Address: Level 7, ZivoTech Tower, Road 11, Banani, Dhaka-1213, Bangladesh</p>
              </div>
            </section>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
