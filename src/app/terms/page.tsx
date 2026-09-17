'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar, Footer } from '@/components/landing';
import { FileText, Shield, Scale, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

export default function TermsPage() {
  const lastUpdated = 'September 17, 2026';

  const sections = [
    { id: 'acceptance', title: '1. Acceptance of Terms' },
    { id: 'services', title: '2. Description of Cloud POS & ERP Services' },
    { id: 'accounts', title: '3. Merchant Accounts & Security' },
    { id: 'billing', title: '4. Subscription Fees, BDT Billing & Taxes' },
    { id: 'data', title: '5. Data Ownership & Privacy' },
    { id: 'offline', title: '6. Offline Synchronization & Hardware' },
    { id: 'sla', title: '7. Service Availability & SLA' },
    { id: 'termination', title: '8. Cancellation & Termination' },
    { id: 'liability', title: '9. Limitation of Liability' },
    { id: 'governing', title: '10. Governing Law (Bangladesh Jurisdiction)' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 text-slate-700 text-xs font-semibold mb-4">
          <Scale className="w-3.5 h-3.5 text-orange-600" />
          <span>Legal Agreement &bull; Effective {lastUpdated}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Terms &amp; Conditions of Service
        </h1>

        <p className="mt-3 text-slate-600 text-sm max-w-2xl mx-auto">
          Please read these terms carefully before creating an account or operating goPOS software at your retail outlets.
        </p>
      </section>

      {/* Main Legal Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Table of Contents */}
          <div className="hidden lg:block lg:col-span-4 sticky top-28 bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Table of Contents
            </div>
            <nav className="space-y-1.5">
              {sections.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  className="block text-xs font-medium text-slate-600 hover:text-orange-600 hover:bg-orange-50/60 px-2.5 py-1.5 rounded-lg transition-colors"
                >
                  {sec.title}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
              Need clarification? <Link href="/contact" className="text-orange-600 font-semibold hover:underline">Contact our legal team</Link>.
            </div>
          </div>

          {/* Right Detailed Clauses */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-10 text-xs sm:text-sm text-slate-700 leading-relaxed">
            
            <section id="acceptance" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
              <p>
                By registering for an account, accessing, or utilizing the <strong>goPOS</strong> Point of Sale, ERP, Inventory, and Accounting platform (collectively the &quot;Service&quot;), provided by <strong>goPOS Technologies Inc. / ZivoTech</strong> (&quot;goPOS&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you (&quot;Merchant&quot;, &quot;Subscriber&quot;, or &quot;User&quot;) agree to be bound by these Terms and Conditions. If you are entering into this agreement on behalf of a company, retail business, or partnership, you represent that you have the authority to bind such entity.
              </p>
            </section>

            <section id="services" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">2. Description of Cloud POS &amp; ERP Services</h2>
              <p>
                goPOS is a Software-as-a-Service (SaaS) platform providing digital point of sale checkout, inventory control, purchase order tracking, HRM/payroll, double-entry financial reporting, and customer loyalty management. We reserve the right to improve, update, or modify features of the platform to deliver higher speed, security, and stability.
              </p>
            </section>

            <section id="accounts" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">3. Merchant Accounts &amp; Security</h2>
              <p>
                Merchants are responsible for maintaining the confidentiality of login credentials, employee PIN codes, and API keys. Any action taken under your tenant workspace shall be considered authorized by your organization. You agree to notify goPOS immediately of any unauthorized access or breach of security.
              </p>
            </section>

            <section id="billing" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">4. Subscription Fees, BDT Billing &amp; Taxes</h2>
              <p>
                All plan subscription prices are quoted in Bangladeshi Taka (BDT ৳) unless specified otherwise. Subscription fees are billed in advance on a monthly or annual basis via bKash, Nagad, bank transfer, or major credit cards.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li><strong>Free Trial:</strong> New accounts receive a 14-day free trial. Upon expiration, access to cashier terminals requires an active subscription.</li>
                <li><strong>VAT / NBR Compliance:</strong> Invoiced subscription amounts may be subject to prevailing Value Added Tax (VAT) as mandated by the National Board of Revenue (NBR) Bangladesh.</li>
                <li><strong>Refunds:</strong> Subscription fees are non-refundable once billed, but cancellation takes effect immediately at the end of the billing cycle without penalties.</li>
              </ul>
            </section>

            <section id="data" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">5. Data Ownership &amp; Privacy</h2>
              <p>
                <strong>You retain 100% full ownership</strong> of all business data, customer lists, inventory balances, pricing, and sales transactions entered into your goPOS store. goPOS will never sell, rent, or commercialize your transactional data to third parties. We enforce strict database isolation, tenant-level security keys, and encrypted backups.
              </p>
            </section>

            <section id="offline" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">6. Offline Synchronization &amp; Hardware</h2>
              <p>
                goPOS includes offline caching technology enabling local sales processing during temporary internet disruptions. The Merchant acknowledges that offline transactions must be synchronized with the cloud server as soon as connectivity resumes to ensure accurate centralized stock counts across multi-store branches.
              </p>
            </section>

            <section id="sla" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">7. Service Availability &amp; SLA</h2>
              <p>
                We strive to maintain a <strong>99.9% uptime SLA</strong> for cloud databases and API infrastructure. Scheduled maintenance windows will be notified in advance via email or the in-app notification center during off-peak retail hours (1:00 AM to 5:00 AM BD Time).
              </p>
            </section>

            <section id="termination" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">8. Cancellation &amp; Termination</h2>
              <p>
                You may cancel your subscription at any time directly through your store settings. Upon cancellation, you will have 30 days to export all sales records, inventory balances, and ledger reports in Excel/CSV format prior to permanent archival.
              </p>
            </section>

            <section id="liability" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, goPOS Technologies shall not be liable for indirect, incidental, or consequential damages resulting from store hardware malfunctions, power surges, or local internet outages.
              </p>
            </section>

            <section id="governing" className="scroll-mt-28 space-y-3">
              <h2 className="text-xl font-bold text-slate-900">10. Governing Law (Bangladesh Jurisdiction)</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of Bangladesh. Any dispute arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Dhaka, Bangladesh.
              </p>
            </section>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
