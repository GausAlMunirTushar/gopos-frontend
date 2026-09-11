'use client';

import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  variantId: string;
  name: string;
  cat: string;
  stock: number;
  price: number;
  unitCost: number;
  priceColor?: string;
  img: string;
}

interface PosProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function PosProductGrid({ products, onAddToCart, searchQuery, onSearchChange }: PosProductGridProps) {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 shrink-0">
        <h3 className="font-bold text-gray-900 text-base sm:text-lg">Products</h3>
        <div className="relative w-full sm:w-72">
          <Input 
            type="text" 
            placeholder="Search Product..." 
            className="pl-9 h-10 bg-white border-gray-200" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 sm:pr-2 pb-20 lg:pb-0">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p>No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4">
            {products.map((p) => (
              <div 
                key={p.variantId || p.id} 
                onClick={() => onAddToCart(p)}
                className="bg-white rounded-xl p-2 sm:p-3 border border-gray-100 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group flex flex-col h-full active:scale-95 duration-150"
              >
                <div className="w-full h-24 sm:h-32 bg-gray-50/80 rounded-lg mb-2 sm:mb-3 flex items-center justify-center p-2 overflow-hidden relative">
                  <img src={p.img} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300" />
                  {p.stock <= 20 && (
                    <span className="absolute top-1 left-1 bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded">Low Stock</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-end">
                  <p className="text-[10px] sm:text-[11px] text-gray-500 mb-0.5 truncate">{p.cat}</p>
                  <h4 className="font-bold text-gray-900 text-xs sm:text-sm mb-2 leading-tight line-clamp-2">{p.name}</h4>
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <span className="text-[10px] sm:text-xs font-bold text-pink-500">{p.stock} Pcs</span>
                    <span className={`text-xs sm:text-sm font-bold ${p.priceColor || 'text-teal-600'}`}>
                      ৳{p.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
