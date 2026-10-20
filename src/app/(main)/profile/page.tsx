'use client';

import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, Save, Camera, 
  ShieldCheck, Store, CheckCircle2 
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <PageHeader 
        title="My Profile & Security"
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Profile' },
        ]}
      />

      {saved && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Profile Overview Card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs">
        <div className="relative group">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[#092C4C] to-[#041729] text-white flex items-center justify-center font-black text-2xl border-2 border-orange-100 shadow-md">
            AD
          </div>
          <button className="absolute -bottom-1 -right-1 p-2 rounded-xl bg-[#FF9F43] text-white shadow-md hover:bg-orange-600 transition-colors cursor-pointer">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-xl font-bold text-gray-900">Store Administrator</h2>
          <p className="text-xs text-gray-500">Store Owner • Main Branch (Dhanmondi)</p>
          <div className="flex flex-wrap gap-2 pt-2 justify-center sm:justify-start">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold border border-orange-100">
              Store Admin
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 font-bold border border-emerald-100">
              Verified & Active
            </span>
          </div>
        </div>
      </div>

      {/* Profile Edit Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-7 shadow-xs space-y-6">
        <div>
          <h3 className="font-bold text-gray-900 text-base">Personal Contact Details</h3>
          <p className="text-xs text-gray-400">Update your account information, notification phone, and email.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Full Name</label>
            <Input defaultValue="Admin Operator" className="rounded-xl h-10" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Email Address</label>
            <Input defaultValue="admin@bikripos.com" type="email" className="rounded-xl h-10" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Phone Number</label>
            <Input defaultValue="+880 1711-000222" className="rounded-xl h-10" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700">Branch Name</label>
            <Input defaultValue="Main Branch (Dhanmondi)" className="rounded-xl h-10" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="font-bold text-gray-900 text-base mb-1">Security & Password</h3>
          <p className="text-xs text-gray-400 mb-4">Leave password fields blank if you do not wish to update your login password.</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">New Password</label>
              <Input type="password" placeholder="••••••••" className="rounded-xl h-10" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700">Confirm Password</label>
              <Input type="password" placeholder="••••••••" className="rounded-xl h-10" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <Button type="submit" className="bg-[#FF9F43] hover:bg-orange-600 text-white rounded-xl font-bold flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Profile Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
