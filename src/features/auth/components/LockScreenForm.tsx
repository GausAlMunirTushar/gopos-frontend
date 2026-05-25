'use client';

import React from 'react';
import NextLink from 'next/link';
import { EyeOff, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LockScreenForm() {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl p-8 relative z-10 mx-4">
      <div className="text-center mb-6">
        <h2 className="text-lg font-medium text-gray-700 mb-6">Welcome back!</h2>
        <div className="w-24 h-24 rounded-full border-4 border-gray-100 mx-auto overflow-hidden mb-4">
          <img 
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Jeffry Jordan</h1>
      </div>

      <form className="space-y-6">
        <div className="relative">
          <Input 
            type="password" 
            placeholder="Enter your password" 
            className="pr-10 bg-white border-gray-200 h-12 rounded-xl text-center placeholder:text-gray-400"
          />
          <EyeOff className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 cursor-pointer" />
        </div>

        <Button className="w-full bg-[#FF9F43] hover:bg-orange-500 text-white h-12 rounded-xl text-md font-medium transition-colors">
          Log In
        </Button>
      </form>
    </div>
  );
}
