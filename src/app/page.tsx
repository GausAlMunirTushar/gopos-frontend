import React from 'react';
import { 
  Navbar, 
  HeroSection, 
  StatsBar, 
  HardwareIntegration, 
  PricingSection, 
  TestimonialsSection, 
  FaqSection, 
  CtaBanner, 
  Footer 
} from '@/components/landing';

export const metadata = {
  title: 'goPOS - Next-Gen Cloud POS & Multi-Store Inventory ERP',
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
