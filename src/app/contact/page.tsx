'use client';

import React, { useState } from 'react';
import { Navbar, Footer } from '@/components/landing';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  Headphones, 
  Building, 
  Sparkles,
  ShieldAlert
} from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    businessType: 'Supermarket & Grocery',
    outlets: '1-3 Outlets',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="pt-32 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100/80 text-orange-700 text-xs font-semibold mb-6 border border-orange-200">
          <Headphones className="w-3.5 h-3.5 text-orange-600" />
          <span>24/7 Dedicated Support &amp; Solutions Consulting</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight max-w-3xl mx-auto">
          Let&apos;s Discuss How <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">BikriPOS</span> Can Power Your Outlets
        </h1>

        <p className="mt-4 text-slate-600 text-base max-w-2xl mx-auto">
          Whether you need a live demo for your retail chain, custom hardware integration, or technical support — our Dhaka-based engineering and retail specialists are ready to help.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Contact Details & Dhaka Office */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Dhaka Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">Headquarters (Dhaka)</h3>
                  <p className="text-xs text-slate-500">BikriPOS Technologies Inc. / ZivoTech</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Banani Corporate Office:</span>
                    <span>Level 7, ZivoTech Tower, Road 11, Block D, Banani, Dhaka-1213, Bangladesh</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Direct Hotlines:</span>
                    <span>+880 9612-467670 (Toll Free IP Phone)</span>
                    <span className="block text-slate-500">+880 1700-123456 / +880 1800-654321</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Email Inquiries:</span>
                    <span>sales@bikripos.com.bd (Enterprise Demos)</span>
                    <span className="block text-slate-500">support@bikripos.com.bd (Technical Help)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Office &amp; Support Hours:</span>
                    <span>Saturday – Thursday: 9:00 AM – 8:00 PM</span>
                    <span className="block text-emerald-600 font-semibold mt-0.5">24/7 Emergency Hotline for Active Store Outlets</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp CTA */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/8801700123456"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-500/20 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp (+880 1700-123456)</span>
                </a>
              </div>
            </div>

            {/* Quick Guarantees Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>What to Expect</span>
              </div>
              <ul className="text-xs text-slate-300 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>Prompt response within 30 minutes during business hours.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>Live 1-on-1 virtual or on-site demonstration of POS hardware.</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span>Free data migration support from legacy Excel or old POS software.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
                </div>
                <h3 className="text-2xl font-black text-slate-900">Thank You for Reaching Out!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Your inquiry has been received. One of our retail solutions specialists will contact you at <span className="font-semibold text-slate-900">{formData.phone || formData.email}</span> shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        company: '',
                        businessType: 'Supermarket & Grocery',
                        outlets: '1-3 Outlets',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-slate-100 pb-4">
                  <h3 className="text-xl font-black text-slate-900">Send us a Message</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill in your store details and our team will prepare a tailored demonstration.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="tanvir@yourstore.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone / WhatsApp Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 1712-345678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {/* Company */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Business / Store Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dhaka Gourmet Supermarket"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none"
                    />
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Industry / Store Category</label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none bg-white"
                    >
                      <option>Supermarket &amp; Grocery</option>
                      <option>Fashion, Clothing &amp; Boutique</option>
                      <option>Restaurant, Cafe &amp; Fast Food</option>
                      <option>Pharmacy &amp; Healthcare</option>
                      <option>Electronics &amp; Gadgets</option>
                      <option>Wholesale &amp; Distribution</option>
                      <option>Other Retail</option>
                    </select>
                  </div>

                  {/* Number of Outlets */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Number of Outlets</label>
                    <select
                      value={formData.outlets}
                      onChange={(e) => setFormData({ ...formData, outlets: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none bg-white"
                    >
                      <option>1 Outlet (Single Store)</option>
                      <option>2 - 5 Outlets</option>
                      <option>6 - 15 Outlets</option>
                      <option>16+ Outlets (Enterprise Chain)</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">How Can We Help You? (Requirements)</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your current challenges, POS hardware needs, barcode setup, or preferred demo time..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 text-xs text-slate-900 outline-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold rounded-xl text-sm shadow-md shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry for Free Consultation</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  We respect your privacy. Your information is 100% confidential and never shared with third parties.
                </p>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
