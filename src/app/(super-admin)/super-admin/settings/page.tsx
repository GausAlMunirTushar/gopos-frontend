'use client';

import React, { useState } from 'react';
import { 
  Settings, Save, Globe, CreditCard, Mail, 
  MessageSquare, Shield, CheckCircle2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PlatformSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'payment' | 'email' | 'sms'>('general');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight">Platform Global Settings</h1>
          <p className="text-gray-500 text-sm mt-0.5">Configure platform branding, payment gateways, mail servers, and notifications.</p>
        </div>

        <Button 
          onClick={handleSave}
          className="bg-[#FF9F43] hover:bg-[#ff942a] text-white flex items-center gap-2 rounded-xl shadow-xs"
        >
          <Save className="w-4 h-4" /> Save Settings
        </Button>
      </div>

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Platform settings updated successfully!</span>
        </div>
      )}

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Settings Navigation */}
        <div className="space-y-1">
          {[
            { id: 'general', label: 'General & Brand', icon: Globe },
            { id: 'payment', label: 'Payment Gateways', icon: CreditCard },
            { id: 'email', label: 'SMTP Mail Server', icon: Mail },
            { id: 'sms', label: 'SMS Gateway', icon: MessageSquare },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all text-left ${
                  isActive
                    ? 'bg-[#092C4C] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF9F43]' : 'text-gray-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-3">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
            
            {activeTab === 'general' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">General Platform Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Platform SaaS Name</label>
                    <Input defaultValue="BikriPOS Cloud Suite" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Master Root Domain</label>
                    <Input defaultValue="bikripos.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Support / Billing Email</label>
                    <Input defaultValue="support@bikripos.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Default Currency</label>
                    <Input defaultValue="USD ($)" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-base mb-1">Subscription Payment Gateways</h3>
                  <p className="text-xs text-gray-500">Tenants pay their monthly / yearly subscription fee via these gateways.</p>
                </div>

                {/* bKash Merchant */}
                <div className="p-4 border border-gray-100 rounded-xl bg-pink-50/20 space-y-3">
                  <span className="text-xs font-bold text-pink-700 block">bKash Merchant Tokenized Gateway</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input placeholder="bKash App Key" defaultValue="bkash_app_key_prod_891" />
                    <Input placeholder="bKash App Secret" type="password" defaultValue="••••••••••••••••" />
                  </div>
                </div>

                {/* Stripe */}
                <div className="p-4 border border-gray-100 rounded-xl bg-indigo-50/20 space-y-3">
                  <span className="text-xs font-bold text-indigo-700 block">Stripe Card Billing</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Input placeholder="Stripe Publishable Key" defaultValue="pk_live_51M..." />
                    <Input placeholder="Stripe Secret Key" type="password" defaultValue="••••••••••••••••" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">SMTP Mail Server (System Emails)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">SMTP Host</label>
                    <Input defaultValue="smtp.mailgun.org" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">SMTP Port</label>
                    <Input defaultValue="587" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Sender Email</label>
                    <Input defaultValue="no-reply@bikripos.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">SMTP Password</label>
                    <Input type="password" defaultValue="••••••••••••••••" />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sms' && (
              <div className="space-y-4">
                <h3 className="font-bold text-gray-900 text-base">SMS Gateway Configuration</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Provider</label>
                    <Input defaultValue="Alpha SMS / Twilio" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">Sender ID</label>
                    <Input defaultValue="BIKRIPOS" />
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-gray-700">API Key / Token</label>
                    <Input type="password" defaultValue="••••••••••••••••" />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
