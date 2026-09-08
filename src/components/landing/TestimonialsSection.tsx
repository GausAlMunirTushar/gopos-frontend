import React from 'react';
import { Star, Quote, Sparkles, Building, Store, Coffee } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Marcus Vance',
      role: 'Owner & Founder',
      company: 'Vance Artisanal Coffee (4 Outlets)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
      content: 'goPOS completely eliminated our morning peak rush queues. The speed is unbelievable—our baristas process orders and send receipts to WhatsApp in 3 seconds. Managing 4 branches in real time from my phone is effortless.',
      metric: '65% Faster Morning Queues',
      rating: 5,
    },
    {
      name: 'Elena Rostova',
      role: 'Operations Director',
      company: 'Urban Threads Boutique Chain',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop',
      content: 'The variant management (size/color/material) and instant barcode generation saved our team over 15 hours every single week. We transferred 8,000 SKUs from our old system in less than an hour.',
      metric: '15 Hrs/Week Saved on Stock',
      rating: 5,
    },
    {
      name: 'Dr. Tariq Al-Mansoor',
      role: 'Managing Pharmacist',
      company: 'CarePlus Supermarket & Pharmacy',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
      content: 'The automated batch expiration alerts and digital weighing scale compatibility made goPOS the only logical choice for our hybrid grocery and healthcare setup. Offline mode gave us true peace of mind.',
      metric: 'Zero Downtime in 2 Years',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Loved by Fast-Growing Store Owners
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            See how retailers, cafes, and multi-branch chains use goPOS to simplify daily store operations and boost bottom-line profits.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col justify-between relative group"
            >
              <div>
                {/* Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  "{item.content}"
                </p>
              </div>

              <div>
                {/* Key ROI Badge */}
                <div className="mb-4 inline-block px-3 py-1 rounded-lg bg-orange-100 text-orange-800 text-xs font-bold">
                  {item.metric}
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-orange-400"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900">{item.name}</div>
                    <div className="text-xs text-slate-500">{item.role}</div>
                    <div className="text-[11px] font-semibold text-orange-600">{item.company}</div>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
