'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { 
  Menu, 
  X, 
  ArrowRight, 
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
    { label: isBn ? 'ডাউনলোড' : 'Download', href: '/download' },
    { label: isBn ? 'আমাদের সম্পর্কে' : 'About', href: '/about' },
    { 
      label: isBn ? 'রিসোর্স' : 'Resources', 
      href: '/resources',
      hasDropdown: true,
      items: [
        { title: isBn ? 'ডাউনলোড সেন্টার' : 'Download Apps', desc: isBn ? 'উইন্ডোজ, অ্যান্ড্রয়েড ও ওয়েব' : 'Windows, Android & Web App', href: '/download' },
        { title: isBn ? 'ভিডিও টিউটোরিয়াল' : 'Video Tutorials', desc: isBn ? 'বিলিং ও ক্যাশিয়ার ট্রেইনিং' : 'Cashier & billing training videos', href: '/resources#tutorials' },
        { title: isBn ? 'হার্ডওয়্যার সেটআপ' : 'Hardware Setup', desc: isBn ? '৮০মিমি থার্মাল প্রিন্টার গাইড' : '80mm ESC/POS thermal printers guide', href: '/resources#hardware' },
        { title: isBn ? 'ক্যাটালগ ও গাইড' : 'Starter Guides', desc: isBn ? 'এক্সেল ইমপোর্ট ও ভ্যাট গাইড' : 'Product Excel templates & tax guides', href: '/resources#guides' },
        { title: isBn ? 'সাধারণ জিজ্ঞাসা' : 'Help & FAQs', desc: isBn ? 'প্রশ্ন ও সমাধান' : 'Answers to common questions', href: '/resources#faq' },
      ]
    },
    { label: isBn ? 'যোগাযোগ' : 'Contact', href: '/contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5 sm:py-4 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Brand Logo (BikriPOS Orange/Amber Primary) */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <Image
              src="/logo.svg"
              alt="BikriPOS Logo"
              width={40}
              height={40}
              className="w-10 h-10 rounded-xl group-hover:scale-105 transition-transform shadow-xs object-contain"
              priority
            />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                Bikri<span className="text-orange-500">POS</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                {isBn ? 'ক্লাউড পিওএস' : 'Enterprise Cloud'}
              </span>
            </div>
          </Link>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
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
                    className={`px-4 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 inline-flex items-center gap-1 cursor-pointer ${
                      isActive
                        ? 'bg-white text-orange-600 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown && (
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-90 text-orange-500' : 'text-slate-400'}`} />
                    )}
                  </Link>

                  {link.hasDropdown && resourcesOpen && (
                    <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 p-2 z-50">
                      {link.items?.map((subItem) => (
                        <Link
                          key={subItem.title}
                          href={subItem.href}
                          onClick={() => setResourcesOpen(false)}
                          className="block p-2 rounded-xl hover:bg-orange-50/70 transition-colors group"
                        >
                          <div className="text-xs font-bold text-slate-800 group-hover:text-orange-600">
                            {subItem.title}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {subItem.desc}
                          </div>
                        </Link>
                      ))}
                      <div className="mt-1 pt-1 border-t border-slate-100 text-center">
                        <Link
                          href="/resources"
                          onClick={() => setResourcesOpen(false)}
                          className="text-[11px] font-bold text-orange-600 hover:underline inline-flex items-center gap-1 py-1"
                        >
                          <span>{isBn ? 'সকল রিসোর্স দেখুন' : 'View All Resources'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right: Language Switcher (agar motoy), Login, & Primary CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher variant="pill" />

            <Link
              href="/login"
              className="px-3.5 py-2 text-sm font-semibold text-slate-700 hover:text-orange-600 transition-colors"
            >
              {isBn ? 'লগইন' : 'Login'}
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isBn ? '১৪ দিনের ফ্রি ট্রায়াল' : '14-Day Free Trial'}</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher variant="pill" />
            <Link
              href="/login"
              className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-lg hover:text-orange-600"
            >
              {isBn ? 'লগইন' : 'Login'}
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2.5 text-base font-medium rounded-lg flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'text-slate-700 hover:text-orange-500 hover:bg-orange-50'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center gap-1.5"
            >
              <span>{isBn ? '১৪ দিনের ফ্রি ট্রায়াল' : 'Start Free 14-Day Trial'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
