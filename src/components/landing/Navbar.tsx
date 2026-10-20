'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Store, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export function Navbar() {
  const pathname = usePathname();
  const locale = useLocale();
  const isBn = locale === 'bn';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: isBn ? 'হোম' : 'Home', href: '/' },
    { label: isBn ? 'মূল্যতালিকা' : 'Pricing', href: '/pricing' },
    { label: isBn ? 'আমাদের সম্পর্কে' : 'About', href: '/about' },
    { 
      label: isBn ? 'রিসোর্স' : 'Resources', 
      href: '/resources',
      hasDropdown: true,
      items: [
        { title: isBn ? 'ভিডিও টিউটোরিয়াল' : 'Video Tutorials', desc: isBn ? 'বিলিং ও ক্যাশিয়ার ট্রেইনিং' : 'Cashier & billing training videos', href: '/resources#tutorials' },
        { title: isBn ? 'হার্ডওয়্যার সেটআপ' : 'Hardware Setup', desc: isBn ? '৮০মিমি থার্মাল প্রিন্টার গাইড' : '80mm ESC/POS thermal printers guide', href: '/resources#hardware' },
        { title: isBn ? 'ক্যাটালগ ও গাইড' : 'Starter Guides', desc: isBn ? 'এক্সেল ইমপোর্ট ও ভ্যাট গাইড' : 'Product Excel templates & tax guides', href: '/resources#guides' },
        { title: isBn ? 'সাধারণ জিজ্ঞাসা' : 'Help & FAQs', desc: isBn ? 'প্রশ্ন ও সমাধান' : 'Answers to common questions', href: '/resources#faq' },
      ]
    },
    { label: isBn ? 'যোগাযোগ' : 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-full px-5 sm:px-7 py-3.5 sm:py-4 shadow-xl shadow-slate-900/5 border border-slate-200/90 flex items-center justify-between pointer-events-auto transition-all">
        {/* Left: Brand Logo (GoPOS Original Orange/Amber Primary) */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
            <Store className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
              go<span className="text-orange-500">POS</span>
            </span>
            <span className="text-[9px] font-bold tracking-wider text-slate-400 uppercase">
              {isBn ? 'ক্লাউড পিওএস' : 'Enterprise Cloud'}
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));

            return (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setResourcesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setResourcesOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`text-sm transition-all duration-200 inline-flex items-center gap-1 cursor-pointer ${
                    isActive
                      ? 'px-4 py-1.5 font-bold bg-orange-50 text-orange-600 rounded-full shadow-2xs'
                      : 'px-3.5 py-1.5 font-semibold text-slate-700 hover:text-orange-600 rounded-full hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-90 text-orange-500' : 'text-slate-400'}`} />
                  )}
                </Link>

                {link.hasDropdown && resourcesOpen && (
                  <div className="absolute top-full left-0 mt-3 w-80 bg-white rounded-3xl shadow-xl border border-slate-100 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {link.items?.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setResourcesOpen(false)}
                        className="block p-2.5 rounded-2xl hover:bg-orange-50/70 transition-colors group"
                      >
                        <div className="text-xs font-bold text-slate-800 group-hover:text-orange-600">
                          {subItem.title}
                        </div>
                        <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                          {subItem.desc}
                        </div>
                      </Link>
                    ))}
                    <div className="mt-1.5 pt-1.5 border-t border-slate-100 text-center">
                      <Link
                        href="/resources"
                        onClick={() => setResourcesOpen(false)}
                        className="text-[11px] font-bold text-orange-600 hover:underline inline-flex items-center gap-1 py-1"
                      >
                        <span>{isBn ? 'সকল রিসোর্স ও টিউটোরিয়াল দেখুন' : 'View All Learning Resources'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right: Language Pill (Agar Motoy: English | বাংলা), Login, & Primary CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dual Pill Switcher (Agar motoy: [ English | বাংলা ]) */}
          <LanguageSwitcher variant="pill" />

          {/* Login text link */}
          <Link
            href="/login"
            className="px-3.5 py-2 text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
          >
            {isBn ? 'লগইন' : 'Login'}
          </Link>

          {/* GoPOS Primary Orange/Amber Gradient CTA Button */}
          <Link
            href="/register"
            className="inline-flex items-center gap-1.5 px-5 sm:px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-full shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{isBn ? '১৪ দিনের ফ্রি ট্রায়াল' : '14-Day Free Trial'}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile View Controls */}
        <div className="flex md:hidden items-center gap-2">
          <LanguageSwitcher variant="pill" />
          <Link
            href="/login"
            className="px-2.5 py-1 text-xs font-bold text-slate-800 bg-slate-100 rounded-full hover:text-orange-600"
          >
            {isBn ? 'লগইন' : 'Login'}
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl p-4 shadow-2xl pointer-events-auto animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2 text-sm font-semibold rounded-2xl flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 mt-2 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full shadow-md flex items-center justify-center gap-1.5"
            >
              <span>{isBn ? '১৪ দিনের ফ্রি ট্রায়াল' : 'Start Free Trial'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
