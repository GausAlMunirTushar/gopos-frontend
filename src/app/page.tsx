import React from 'react';
import { 
  Navbar, 
  HeroSection, 
  StatsBar, 
  HardwareIntegration, 
  DownloadSection,
  PricingSection, 
  TestimonialsSection, 
  FaqSection, 
  CtaBanner, 
  Footer 
} from '@/components/landing';

export const metadata = {
  title: 'BikriPOS - Next-Gen Cloud POS & Multi-Store Inventory ERP',
  description: 'Ultra-fast checkout, real-time stock sync, offline resilience, and built-in accounting for retail stores, supermarkets, and restaurants.',
};

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Sticky Header / Navbar */}
      <Navbar />

      {/* Hero Section with Conversion CTA & Visual Terminal */}
      <HeroSection />

      {/* Social Proof & Metrics Stats Bar */}
      <StatsBar />

      {/* Hardware & Peripherals Compatibility */}
      <HardwareIntegration />

      {/* Official Download Options (Windows, Android & Web App) */}
      <DownloadSection showHero={true} showHelpGuide={false} className="bg-slate-50/50 border-y border-slate-100" />

      {/* Transparent Pricing Plans & Billing Toggle */}
      <PricingSection />

      {/* Customer Testimonials & Case Studies */}
      <TestimonialsSection />

      {/* Interactive Accordion FAQ */}
      <FaqSection />

      {/* High-Impact Bottom CTA Banner */}
      <CtaBanner />

      {/* SaaS Footer */}
      <Footer />
    </main>
  );
}
