'use client';

import React, { useState } from 'react';
import { 
  Layers, Plus, Check, Edit2, Trash2, 
  Store, Users, Package, Globe, Shield, Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Plan {
  id: string;
  name: string;
  badge?: string;
  monthlyPrice: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  storesLimit: number | 'Unlimited';
  usersLimit: number | 'Unlimited';
  productsLimit: number | 'Unlimited';
  customDomain: boolean;
  activeSubscribers: number;
  isPopular?: boolean;
}

const mockPlans: Plan[] = [
  {
    id: 'basic',
    name: 'Starter / Basic',
    monthlyPrice: 19,
    yearlyPrice: 190,
    description: 'Perfect for small single-store retailers and local boutiques.',
    storesLimit: 1,
    usersLimit: 2,
    productsLimit: 1000,
    customDomain: false,
    activeSubscribers: 2540,
    features: [
      '1 Store / Outlet included',
      'Up to 2 Cashier users',
      '1,000 Product catalog limit',
      'Standard barcode & QR printing',
      'Daily sales reports',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Professional POS',
    badge: 'Most Popular',
    isPopular: true,
    monthlyPrice: 49,
    yearlyPrice: 490,
    description: 'Designed for growing multi-outlet chains and busy supermarkets.',
    storesLimit: 5,
    usersLimit: 10,
    productsLimit: 20000,
    customDomain: true,
    activeSubscribers: 1420,
    features: [
      'Up to 5 Outlets / Warehouses',
      'Up to 10 Cashiers & Staff',
      '20,000 Product catalog limit',
      'Custom Domain (yourname.com)',
      'Advanced Inventory transfer & HRM',
      'SMS invoice receipts',
      'Priority 24/7 support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Cloud',
    badge: 'High Scale',
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: 'For large supermarket enterprises requiring custom scale and APIs.',
    storesLimit: 'Unlimited',
    usersLimit: 'Unlimited',
    productsLimit: 'Unlimited',
    customDomain: true,
    activeSubscribers: 638,
    features: [
      'Unlimited Outlets & Warehouses',
      'Unlimited Cashier & Staff accounts',
      'Unlimited Product inventory',
      'Custom Domain with automatic SSL',
      'Direct REST API & Webhook access',
      'Dedicated Account Manager',
      '99.99% SLA guarantee',
    ],
  },
];

export default function PackagesPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Subscription Packages</h1>
          <p className="text-gray-500 text-sm mt-0.5">Configure SaaS pricing tiers, feature limits, and store quotas.</p>
        </div>

        <Button className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-2 rounded-xl shadow-xs">
          <Plus className="w-4 h-4" /> Create New Package
        </Button>
      </div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center my-6">
        <div className="inline-flex items-center p-1 bg-white border border-gray-200 rounded-2xl shadow-2xs">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
              billingCycle === 'monthly'
                ? 'bg-[#092C4C] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#092C4C] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span>Yearly Billing</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPlans.map((plan) => {
          const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
          const period = billingCycle === 'monthly' ? '/ month' : '/ year';

          return (
            <div 
              key={plan.id}
              className={`bg-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 relative border ${
                plan.isPopular 
                  ? 'border-orange-400 ring-2 ring-orange-400/20 shadow-lg' 
                  : 'border-gray-200/90 shadow-xs hover:shadow-md'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#FF9F43] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Title & Description */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-black text-gray-900 tracking-tight">{plan.name}</h3>
                  <div className="flex items-center gap-1">
                    <button className="p-1 text-gray-400 hover:text-gray-700 rounded-lg">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed min-h-[36px]">{plan.description}</p>

                {/* Price Display */}
                <div className="my-5 pb-5 border-b border-gray-100">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-gray-900">${price}</span>
                    <span className="text-xs text-gray-400 font-medium">{period}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {plan.activeSubscribers.toLocaleString()} Businesses Subscribed
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-gray-900 uppercase tracking-wider block">Features & Quotas</span>
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700">
                      <div className="w-4 h-4 rounded-full bg-orange-50 text-[#FF9F43] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-4 border-t border-gray-100">
                <Button 
                  className={`w-full rounded-xl font-bold text-xs h-10 ${
                    plan.isPopular
                      ? 'bg-[#FF9F43] hover:bg-[#ff942a] text-white shadow-xs'
                      : 'bg-[#092C4C] hover:bg-[#061d33] text-white'
                  }`}
                >
                  Edit Package & Limits
                </Button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
