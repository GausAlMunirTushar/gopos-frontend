import React from 'react';
import { 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  Globe2, 
  Store, 
  Coffee, 
  Shirt, 
  Pill, 
  Laptop, 
  Truck 
} from 'lucide-react';

export function StatsBar() {
  const stats = [
    { label: 'Active POS Terminals', value: '25,000+', icon: Building2, desc: 'Across retail stores & chains' },
    { label: 'Transactions Processed', value: '$180M+', icon: CreditCard, desc: 'Processed smoothly each year' },
    { label: 'Platform Availability', value: '99.99%', icon: ShieldCheck, desc: 'Zero-downtime offline sync' },
    { label: 'Global Presence', value: '40+ Countries', icon: Globe2, desc: 'Multi-currency & tax ready' },
  ];

  const verticals = [
    { name: 'Supermarkets & Grocery', icon: Store },
    { name: 'Cafes & Restaurants', icon: Coffee },
    { name: 'Fashion & Boutiques', icon: Shirt },
    { name: 'Pharmacies & Clinics', icon: Pill },
    { name: 'Electronics & Gadgets', icon: Laptop },
    { name: 'Wholesale & Distributors', icon: Truck },
  ];

  return (
    <section className="py-12 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Metric Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-10 border-b border-slate-100">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-1">
                <div className="flex items-center gap-2 text-orange-500 mb-1">
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Verified Stat</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-slate-700">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trusted By Industry Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center md:text-left">
            Trusted by 5,000+ businesses across industries:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {verticals.map((v, idx) => {
              const Icon = v.icon;
              return (
                <div 
                  key={idx}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-700 text-xs font-semibold hover:border-orange-300 hover:text-orange-600 transition-colors shadow-2xs"
                >
                  <Icon className="w-4 h-4 text-orange-500" />
                  <span>{v.name}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
