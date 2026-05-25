'use client';

import React, { useState, useEffect } from 'react';
import NextLink from 'next/link';
import { 
  ShoppingBag, Search, ShoppingCart, X, Calculator, Maximize, Camera, Printer, RotateCcw,
  BarChart2, Settings, ListOrdered, RefreshCcw, DollarSign, ChevronLeft, ChevronRight,
  Headphones, MonitorSmartphone, Watch, Laptop, Coffee, ChevronDown, CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const categories = [
  { name: 'All Categories', items: '54 Items', icon: <div className="w-8 h-8 grid grid-cols-2 gap-1"><div className="border-2 border-[#FF9F43] rounded-full"></div><div className="border-2 border-[#FF9F43] rounded-full"></div><div className="border-2 border-[#FF9F43] rounded-full"></div><div className="border-2 border-[#FF9F43] rounded-full"></div></div>, active: true },
  { name: 'Headphones', items: '4 Items', icon: <Headphones className="w-8 h-8 text-gray-700" />, active: false },
  { name: 'Shoes', items: '14 Items', icon: <div className="text-2xl">👟</div>, active: false },
  { name: 'Mobiles', items: '7 Items', icon: <MonitorSmartphone className="w-8 h-8 text-gray-700" />, active: false },
  { name: 'Watches', items: '16 Items', icon: <Watch className="w-8 h-8 text-gray-700" />, active: false },
  { name: 'Laptops', items: '18 Items', icon: <Laptop className="w-8 h-8 text-gray-700" />, active: false },
  { name: 'Home Needs', items: '12 Items', icon: <Coffee className="w-8 h-8 text-gray-700" />, active: false },
];

const products = [
  { name: 'IPhone 14 64GB', cat: 'Mobiles', stock: 30, price: '$15800', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
  { name: 'MacBook Pro', cat: 'Computer', stock: 140, price: '$1000', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200' },
  { name: 'Rolex Tribute V3', cat: 'Watches', stock: 220, price: '$6800', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200' },
  { name: 'Red Nike Angelo', cat: 'Shoes', stock: 220, price: '78 Pcs', priceColor: 'text-red-500', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  { name: 'Airpod 2', cat: 'Headphones', stock: 47, price: '$5478', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200' },
  { name: 'Blue White OGR', cat: 'Shoes', stock: 30, price: '$987', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200' },
  { name: 'IdeaPad Slim 5 Gen 7', cat: 'Computer', stock: 74, price: '$1454', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200' },
  { name: 'SWAGME', cat: 'Headphones', stock: 14, price: '$6587', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
  { name: 'Red Nike Angelo', cat: 'Shoes', stock: 220, price: '$1457', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  { name: 'Tablet 1.02 inch', cat: 'Computer', stock: 47, price: '$4744', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200' },
  { name: 'Fossil Pair Of 3 in 1', cat: 'Watches', stock: 40, price: '$789', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200' },
  { name: 'Green Nike Fe', cat: 'Shoes', stock: 78, price: '$1454', img: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?w=200' },
];

export default function POSPage() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FA] overflow-hidden font-sans text-gray-800">
      
      {/* Top Navigation Bar */}
      <header className="h-[72px] bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
        
        {/* Left: Logo & Time */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-[#092C4C]" strokeWidth={2.5} />
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#FF9F43] rounded-full border-2 border-white"></div>
            </div>
            <h1 className="text-2xl font-bold text-[#092C4C] tracking-tight">
              Dreams<span className="text-[#FF9F43] text-xs font-bold align-top uppercase leading-none mt-1 inline-block">pos</span>
            </h1>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-teal-500 text-white px-4 py-2 rounded-lg font-medium text-sm">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
            {currentTime || '00:00:00'}
          </div>
        </div>

        {/* Center: Store & Actions */}
        <div className="flex items-center gap-3">
          <NextLink href="/dashboard">
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors">
              <BarChart2 className="w-4 h-4" /> Dashboard
            </button>
          </NextLink>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors bg-white">
            <img src="https://ui-avatars.com/api/?name=Freshmart&background=092C4C&color=fff&rounded=true" alt="Store" className="w-5 h-5 rounded-full" />
            <span className="text-sm font-medium text-gray-700">Freshmart</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Right: Tools & Profile */}
        <div className="flex items-center gap-2">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-colors">
            <Calculator className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Maximize className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Camera className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Printer className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
            <Settings className="w-5 h-5" />
          </button>
          <button className="flex items-center gap-2 ml-2">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=100" alt="Profile" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
          </button>
        </div>
      </header>

      {/* Main Content Split */}
      <div className="flex-1 flex min-h-0">
        
        {/* Left Pane (Products) */}
        <div className="flex-[0.65] flex flex-col p-4 overflow-hidden border-r border-gray-200">
          
          {/* Top Actions */}
          <div className="flex gap-2 mb-4 shrink-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-sm font-medium">
              <ListOrdered className="w-4 h-4" /> View Orders
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium">
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
              <DollarSign className="w-4 h-4" /> Transaction
            </button>
          </div>

          {/* Categories Horizontal Scroll */}
          <div className="mb-4 shrink-0">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-gray-900 text-lg">Categories</h3>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50"><ChevronLeft className="w-5 h-5" /></button>
                <button className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-auto custom-scrollbar pb-2">
              {categories.map((cat, i) => (
                <div key={i} className={`flex flex-col items-center justify-center w-28 h-28 shrink-0 rounded-xl cursor-pointer transition-all border-2 ${cat.active ? 'border-orange-500 bg-white' : 'border-transparent bg-white hover:border-orange-200'}`}>
                   {cat.icon}
                   <p className="font-bold text-sm text-gray-900 mt-2">{cat.name}</p>
                   <p className="text-xs text-gray-400">{cat.items}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h3 className="font-bold text-gray-900 text-lg">Products</h3>
              <div className="relative w-72">
                <Input type="text" placeholder="Search Product" className="pl-10 bg-white border-gray-200" />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p, i) => (
                  <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 hover:border-orange-500 hover:shadow-md transition-all cursor-pointer group flex flex-col">
                    <div className="w-full h-32 bg-gray-50 rounded-lg mb-3 flex items-center justify-center p-2 overflow-hidden">
                      <img src={p.img} alt={p.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1 flex flex-col justify-end">
                      <p className="text-[11px] text-gray-500 mb-0.5">{p.cat}</p>
                      <h4 className="font-bold text-gray-900 text-sm mb-2 leading-tight">{p.name}</h4>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xs font-bold text-pink-500">{p.stock} Pcs</span>
                        <span className={`text-sm font-bold ${p.priceColor || 'text-teal-600'}`}>{p.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Pane (Cart) */}
        <div className="flex-[0.35] bg-white flex flex-col min-w-[350px]">
          
          {/* Cart Header */}
          <div className="p-4 border-b border-gray-100 shrink-0">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Order List</h3>
                <p className="text-xs text-gray-500">Id : #0</p>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-gray-900 text-sm">Customer Information</h4>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <select className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm appearance-none focus:outline-none focus:border-orange-500">
                    <option>Walk In Customer</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                </div>
                <button className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 hover:bg-orange-600">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
                </button>
              </div>
              <div className="relative">
                <Input type="text" placeholder="Search Products" className="w-full bg-white border-gray-200" />
                <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
              </div>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 flex flex-col p-4 overflow-hidden relative border-b border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
                Product Added <span className="bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">0</span>
              </h4>
              <button className="text-red-500 font-bold text-xs flex items-center gap-1 hover:underline">
                <X className="w-3 h-3" strokeWidth={3} /> Clear all
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center text-gray-400 pb-10">
              <ShoppingCart className="w-12 h-12 mb-3 stroke-1" />
              <p className="font-medium">No Products Selected</p>
            </div>
          </div>

          {/* Cart Footer */}
          <div className="p-4 shrink-0">
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div>
                <p className="text-xs font-bold text-gray-700 mb-1.5">Order Tax</p>
                <div className="relative">
                  <select className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm appearance-none">
                    <option>Choose</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700 mb-1.5">Shipping</p>
                <div className="relative">
                  <select className="w-full h-10 px-3 bg-white border border-gray-200 rounded-lg text-sm appearance-none">
                    <option>0</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-gray-400 absolute right-2 top-3 pointer-events-none" />
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-gray-700 mb-1.5">Discount</p>
                <div className="relative flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white h-10">
                  <select className="pl-3 pr-6 text-sm appearance-none bg-transparent outline-none h-full border-r border-gray-100">
                    <option>%</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-gray-400 absolute left-[30px] pointer-events-none" />
                  <input type="text" defaultValue="0" className="w-full pl-3 text-sm outline-none" />
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-bold text-gray-900 mb-2">Payment Method</p>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center justify-center p-2 rounded-lg border-2 border-orange-500 bg-orange-50 text-orange-500">
                  <DollarSign className="w-5 h-5 mb-1" />
                  <span className="text-[11px] font-bold">Cash</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                  <CreditCard className="w-5 h-5 mb-1" />
                  <span className="text-[11px] font-bold">Debit Card</span>
                </button>
                <button className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
                  <QrCode className="w-5 h-5 mb-1" />
                  <span className="text-[11px] font-bold">Scan</span>
                </button>
              </div>
            </div>

            <div className="bg-[#092C4C] rounded-lg p-4 mb-4 text-center">
              <p className="text-white font-bold text-lg">Grand Total : $0.00</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-3 text-sm font-bold flex items-center justify-center gap-1.5">
                 <RefreshCcw className="w-4 h-4" /> Hold
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white rounded-lg py-3 text-sm font-bold flex items-center justify-center gap-1.5">
                 <X className="w-4 h-4" /> Void
              </button>
              <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg py-3 text-sm font-bold flex items-center justify-center gap-1.5">
                 <DollarSign className="w-4 h-4" /> Payment
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
// Add QrCode icon import manually above
import { QrCode } from 'lucide-react';
