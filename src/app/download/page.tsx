import React from 'react';
import { Navbar, Footer, DownloadSection } from '@/components/landing';

export const metadata = {
  title: 'Download BikriPOS - Your Shop. Every Device. (Windows, Android & Web)',
  description: 'Download official BikriPOS software for Windows 10/11 desktop, Android mobile devices, or launch directly in any modern web browser.',
};

export default function DownloadPage() {
  return (
    <main className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white pt-20">
      {/* Sticky Navbar */}
      <Navbar />

      {/* Official Download Showcase */}
      <DownloadSection showHero={true} showHelpGuide={true} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
