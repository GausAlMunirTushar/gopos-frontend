'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Category {
  name: string;
  items: string;
  icon: React.ReactNode;
}

interface PosCategoriesProps {
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (name: string) => void;
}

export function PosCategories({ categories, activeCategory, onSelectCategory }: PosCategoriesProps) {
  return (
    <div className="mb-4 shrink-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Categories</h3>
        <div className="hidden sm:flex gap-1">
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"><ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /></button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"><ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" /></button>
        </div>
      </div>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto custom-scrollbar pb-2 snap-x">
        {categories.map((cat, i) => (
          <div
            key={i}
            onClick={() => onSelectCategory(cat.name)}
            className={`flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 shrink-0 rounded-xl cursor-pointer transition-all border-2 snap-center ${activeCategory === cat.name ? 'border-orange-500 bg-white' : 'border-transparent bg-white hover:border-orange-200'}`}
          >
            <div className="scale-75 sm:scale-100">{cat.icon}</div>
            <p className="font-bold text-xs sm:text-sm text-gray-900 mt-1 sm:mt-2 text-center px-1 truncate w-full">{cat.name}</p>
            <p className="text-[10px] sm:text-xs text-gray-400">{cat.items}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
