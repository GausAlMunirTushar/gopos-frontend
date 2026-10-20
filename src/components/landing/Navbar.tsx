'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu, 
  X, 
  Sparkles, 
  ArrowRight, 
  Store, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [resourcesOpen, setResourcesOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { 
      label: 'Resources', 
      href: '/resources',
      hasDropdown: true,
      items: [
        { title: 'Video Tutorials', desc: 'Step-by-step video guides for cashier & billing', href: '/resources#tutorials' },
        { title: 'Hardware Setup', desc: '80mm ESC/POS thermal printers & scanner guide', href: '/resources#hardware' },
        { title: 'Knowledge Base', desc: 'Accounting, tax, and multi-branch inventory guides', href: '/resources#guides' },
        { title: 'Help & FAQs', desc: 'Answers to frequently asked questions', href: '/resources#faq' },
      ]
    },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-200/80 py-3' 
          : 'bg-white/80 backdrop-blur-xs py-4 border-b border-slate-100/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <Store className="w-5 h-5 text-white stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-slate-900 leading-none">
                go<span className="text-orange-500">POS</span>
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
                Enterprise Cloud
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60 shadow-inner">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setResourcesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setResourcesOpen(false)}
              >
                <Link
                  href={link.href}
                  className="px-4 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-full transition-all duration-200 inline-flex items-center gap-1"
                >
                  <span>{link.label}</span>
                  {link.hasDropdown && (
                    <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${resourcesOpen ? 'rotate-90' : ''}`} />
                  )}
                </Link>

                {link.hasDropdown && resourcesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    {link.items?.map((subItem) => (
                      <Link
                        key={subItem.title}
                        href={subItem.href}
                        onClick={() => setResourcesOpen(false)}
                        className="block p-2.5 rounded-xl hover:bg-orange-50/70 transition-colors group"
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
                        <span>View All Learning Resources &amp; Tutorials</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher variant="pill" />

            <Link
              href="/login"
              className="px-4 py-2 text-sm font-bold text-slate-700 hover:text-orange-600 transition-colors"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>14-Day Free Trial</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher variant="pill" />
            <Link
              href="/login"
              className="px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 rounded-lg hover:text-orange-600"
            >
              Login
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
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 text-base font-medium text-slate-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg flex items-center justify-between transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}
          </div>
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
              Login to goPOS
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Start Free 14-Day Trial</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

