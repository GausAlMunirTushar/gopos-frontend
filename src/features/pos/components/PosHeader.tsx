'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { 
  ShoppingBag, Calculator, Maximize, Minimize, Camera, Printer, RotateCcw,
  BarChart2, Settings, ChevronDown, Clock
} from 'lucide-react';

export function PosHeader() {
  const [currentTime, setCurrentTime] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      // Set to Asia/Dhaka timezone (+6) and format as digital clock
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setCurrentTime(formatter.format(now));
    }, 1000);
    
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      clearInterval(timer);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header className="h-18 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 shrink-0 z-10 sticky top-0">
      
      {/* Left: Logo & Time */}
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-[#092C4C]" strokeWidth={2.5} />
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#FF9F43] rounded-full border-2 border-white"></div>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#092C4C] tracking-tight">
            go<span className="text-[#FF9F43] text-[10px] sm:text-xs font-bold align-top uppercase leading-none mt-1 inline-block">pos</span>
          </h1>
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-lg font-medium text-sm tracking-wider">
          <Clock className="w-4 h-4" />
          {currentTime || '00:00:00 --'}
        </div>
      </div>

      {/* Center: Store & Actions */}
      <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end sm:justify-center">
        <NextLink href="/dashboard" className="hidden sm:block">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
            <BarChart2 className="w-4 h-4" /> <span className="hidden sm:inline">Dashboard</span>
          </button>
        </NextLink>

        <button className="flex items-center gap-2 px-2 sm:px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white">
          <img src="https://ui-avatars.com/api/?name=Freshmart&background=092C4C&color=fff&rounded=true" alt="Store" className="w-5 h-5 rounded-full" />
          <span className="text-xs sm:text-sm font-medium text-gray-700 hidden xs:inline">Freshmart</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
        </button>
      </div>

      {/* Right: Tools & Profile */}
      <div className="flex items-center gap-1 sm:gap-2 ml-2 sm:ml-0">
        <button className="hidden sm:flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors">
          <Calculator className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button 
          onClick={toggleFullScreen}
          className="flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <button className="hidden lg:flex w-10 h-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <Camera className="w-5 h-5" />
        </button>
        <button className="hidden lg:flex w-10 h-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <Printer className="w-5 h-5" />
        </button>
        <button className="hidden xl:flex w-10 h-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <RotateCcw className="w-5 h-5" />
        </button>
        <button className="hidden xl:flex w-10 h-10 items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
          <Settings className="w-5 h-5" />
        </button>
        <button className="flex items-center gap-2 ml-1 sm:ml-2">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Profile" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-200 object-cover" />
        </button>
      </div>
    </header>
  );
}
