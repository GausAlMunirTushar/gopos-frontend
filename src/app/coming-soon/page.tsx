'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ComingSoonPage() {
  const [timeLeft, setTimeLeft] = useState({
    days: 54,
    hours: 10,
    minutes: 47,
    seconds: 0
  });

  // Simple countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900 p-4">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2000")' }}
      ></div>
      
      {/* Card Content */}
      <div className="relative z-10 w-full max-w-3xl bg-white/95 backdrop-blur-md rounded-[2rem] p-8 md:p-16 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-[#092C4C] rounded-2xl flex items-center justify-center relative">
            <ShoppingBag className="w-8 h-8 text-white" />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#FF9F43] rounded-full flex items-center justify-center border-4 border-white">
              <span className="text-white font-bold text-xs">D</span>
            </div>
          </div>
        </div>

        <h2 className="text-xl md:text-2xl font-medium text-gray-500 mb-2">
          Our Website is
        </h2>
        <h1 className="text-5xl md:text-7xl font-black mb-6">
          <span className="text-[#FF9F43]">COMING</span> <span className="text-[#092C4C]">SOON</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-lg mx-auto mb-12 leading-relaxed">
          Please check back later, We are working hard to get everything just right.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-2 md:gap-6 mb-12">
          {[
            { label: 'Days', value: timeLeft.days },
            { label: 'Hrs', value: timeLeft.hours },
            { label: 'Min', value: timeLeft.minutes },
            { label: 'Sec', value: timeLeft.seconds }
          ].map((item, index) => (
            <React.Fragment key={item.label}>
              <div className="bg-white border border-gray-100 rounded-2xl w-20 h-24 md:w-28 md:h-32 flex flex-col items-center justify-center">
                <span className="text-3xl md:text-5xl font-bold text-gray-900 mb-1">{item.value.toString().padStart(2, '0')}</span>
                <span className="text-xs md:text-sm text-gray-400 font-medium">{item.label}</span>
              </div>
              {index < 3 && <div className="text-2xl font-bold text-gray-300 pb-6">:</div>}
            </React.Fragment>
          ))}
        </div>

        {/* Subscription */}
        <div className="max-w-md mx-auto">
          <p className="text-sm font-semibold text-gray-700 mb-4">Subscribe to get notified!</p>
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200">
            <Input 
              type="email" 
              placeholder="Enter Your Email" 
              className="border-0 focus-visible:ring-0 px-4 bg-transparent"
            />
            <Button className="bg-[#FF9F43] hover:bg-orange-500 text-white rounded-xl px-6 h-11 shrink-0 font-medium">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {['f', 'ig', 'tw', 'p', 'in'].map((social) => (
            <button key={social} className="w-10 h-10 bg-[#092C4C] text-white rounded-lg flex items-center justify-center hover:bg-opacity-90 transition-all">
              <span className="text-sm font-bold capitalize">{social.charAt(0)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
