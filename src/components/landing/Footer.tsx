import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

interface SocialLink {
  name: string;
  href: string;
  icon: IconType;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'Facebook',
    href: 'https://facebook.com/bikripos',
    icon: FaFacebookF,
  },
  {
    name: 'X (Twitter)',
    href: 'https://x.com/bikripos',
    icon: FaXTwitter,
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/bikripos',
    icon: FaInstagram,
  },
  {
    name: 'YouTube',
    href: 'https://youtube.com/@bikripos',
    icon: FaYoutube,
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          
          {/* Col 1: Brand Info (2 Cols on desktop) */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <Image
                src="/logo.svg"
                alt="BikriPOS Logo"
                width={36}
                height={36}
                className="w-9 h-9 rounded-xl shadow-xs object-contain"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-slate-900 leading-none">
                  Bikri<span className="text-orange-500">POS</span>
                </span>
                <span className="text-[9px] font-semibold tracking-wider text-slate-500 uppercase">
                  Enterprise Cloud
                </span>
              </div>
            </Link>

            <p className="text-slate-600 text-xs leading-relaxed max-w-sm">
              The modern point of sale and cloud inventory management system built to empower retail stores, supermarkets, restaurants, and multi-location chains worldwide.
            </p>

            {/* Social Media Links from react-icons */}
            <div className="pt-2">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2.5">
                Connect With Us
              </div>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.name}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50/50 hover:scale-105 transition-all shadow-xs"
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </div>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link href="/pricing" className="hover:text-orange-600 transition-colors">Pricing Plans</Link></li>
              <li><Link href="/about" className="hover:text-orange-600 transition-colors">About BikriPOS</Link></li>
              <li><Link href="/resources" className="hover:text-orange-600 transition-colors">Resources &amp; Tutorials</Link></li>
              <li><Link href="/download" className="hover:text-orange-600 transition-colors">Download Apps</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact Sales</Link></li>
            </ul>
          </div>

          {/* Col 3: Resources & Learn */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Resources &amp; Learn
            </div>
            <ul className="space-y-2">
              <li><Link href="/resources#tutorials" className="hover:text-orange-600 transition-colors">Video Tutorials</Link></li>
              <li><Link href="/resources#hardware" className="hover:text-orange-600 transition-colors">Hardware Setup (80mm ESC/POS)</Link></li>
              <li><Link href="/resources#guides" className="hover:text-orange-600 transition-colors">Multi-Branch Inventory Guide</Link></li>
              <li><Link href="/resources#faq" className="hover:text-orange-600 transition-colors">Frequently Asked Questions</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Book a Live Demo</Link></li>
            </ul>
          </div>

          {/* Col 4: Solutions */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Solutions
            </div>
            <ul className="space-y-2">
              <li><Link href="/pricing" className="hover:text-orange-600 transition-colors">Supermarkets &amp; Groceries</Link></li>
              <li><Link href="/pricing" className="hover:text-orange-600 transition-colors">Restaurants &amp; Cafes</Link></li>
              <li><Link href="/pricing" className="hover:text-orange-600 transition-colors">Fashion &amp; Apparel</Link></li>
              <li><Link href="/pricing" className="hover:text-orange-600 transition-colors">Pharmacy &amp; Healthcare</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Multi-Store Chains</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} BikriPOS Technologies Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-slate-700 transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-slate-700 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-700 transition-colors">Security &amp; Support</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
