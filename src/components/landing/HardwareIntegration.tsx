import React from 'react';
import { 
  Monitor, 
  Tablet, 
  Printer, 
  QrCode, 
  CreditCard, 
  Scale, 
  Cpu, 
  CheckCircle2, 
  Zap 
} from 'lucide-react';

export function HardwareIntegration() {
  const hardwareCategories = [
    {
      title: 'Tablets & Touch Terminals',
      icon: Tablet,
      desc: 'iPad (iOS), Android Tablets, Sunmi, PAX, Elo Touch & POS All-in-One devices.',
      badge: 'Zero Driver Setup',
    },
    {
      title: 'Thermal Receipt Printers',
      icon: Printer,
      desc: 'Supports standard 80mm & 58mm ESC/POS thermal printers via USB, Bluetooth, or LAN.',
      badge: 'USB / Bluetooth / LAN',
    },
    {
      title: 'Barcode & 2D QR Scanners',
      icon: QrCode,
      desc: 'Plug-and-play USB and wireless Bluetooth 1D/2D barcode scanners for lightning fast reads.',
      badge: 'Wireless & Corded',
    },
    {
      title: 'RJ11 Cash Drawers & Scales',
      icon: Scale,
      desc: 'Auto-kick RJ11 electronic cash drawers and digital weighing scale RS232/USB sync.',
      badge: 'Auto Kick-out',
    },
    {
      title: 'Card Payment Terminals',
      icon: CreditCard,
      desc: 'Process credit/debit cards, contactless NFC Apple Pay/Google Pay, and QR code payments.',
      badge: 'EMV & NFC Ready',
    },
    {
      title: 'Customer-Facing Displays',
      icon: Monitor,
      desc: 'Secondary screen mirror showing live line items, discounts, and payment QR codes to shoppers.',
      badge: 'Dual-Screen',
    },
  ];

  return (
    <section id="hardware" className="py-24 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 text-orange-600 text-xs font-semibold uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hardware Agnostic</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Works with the Hardware You Already Own
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            No expensive proprietary locked-in hardware required. Run BikriPOS on any browser, tablet, PC, or Android terminal, and connect your existing peripherals seamlessly.
          </p>
        </div>

        {/* Hardware Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {hardwareCategories.map((hw, idx) => {
            const Icon = hw.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-7 hover:border-orange-500/60 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200">
                      {hw.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {hw.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {hw.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Plug &amp; Play Verified</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hardware Guarantee Banner */}
        <div className="mt-12 bg-slate-50 rounded-2xl p-6 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">Unsure if your existing thermal printer or scanner will work?</div>
              <div className="text-xs text-slate-500">Our hardware team provides free compatibility assistance and plug-and-play drivers.</div>
            </div>
          </div>
          <a
            href="#faq"
            className="px-4 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors whitespace-nowrap shadow-sm"
          >
            Check Hardware Guide
          </a>
        </div>

      </div>
    </section>
  );
}
