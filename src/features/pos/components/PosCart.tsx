'use client';

import React from 'react';
import { 
  X, ShoppingCart, ChevronDown, DollarSign, CreditCard, QrCode, RefreshCcw, Minus, Plus, Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  img: string;
}

interface PosCartProps {
  activeTab: 'products' | 'cart';
  cartItems: CartItem[];
  onUpdateQty: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
}

export function PosCart({ 
  activeTab, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onClearCart,
  subtotal,
  tax,
  discount,
  total
}: PosCartProps) {
  return (
    <div className={`flex-1 lg:flex-[0.4] xl:flex-[0.35] bg-white flex flex-col border-l border-gray-200 z-20 h-full ${activeTab === 'cart' ? 'flex absolute inset-0 lg:static' : 'hidden lg:flex'}`}>
      
      {/* Cart Header */}
      <div className="p-4 border-b border-gray-100 shrink-0 bg-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-gray-900 text-lg">Order List</h3>
            <p className="text-xs text-gray-500">Id : #0</p>
          </div>
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
            <button className="w-10 h-10 rounded-lg bg-orange-500 text-white flex items-center justify-center shrink-0 hover:bg-orange-600 active:scale-95 transition-all">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="22" y1="11" x2="16" y2="11"/></svg>
            </button>
          </div>
          <div className="relative">
            <Input type="text" placeholder="Scan Barcode or Search Item..." className="w-full bg-white border-gray-200 h-10" />
            <SearchIcon className="w-4 h-4 text-gray-400 absolute right-3 top-3" />
          </div>
        </div>
      </div>

      {/* Cart Items (Scrollable Area) */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50/50 custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-bold text-gray-900 text-sm flex items-center gap-2">
            Product Added <span className="bg-orange-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{cartItems.length}</span>
          </h4>
          <button onClick={onClearCart} className="text-red-500 font-bold text-xs flex items-center gap-1 hover:underline px-2 py-1 hover:bg-red-50 rounded transition-colors disabled:opacity-50" disabled={cartItems.length === 0}>
            <X className="w-3 h-3" strokeWidth={3} /> Clear all
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400 h-full min-h-[150px]">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-3">
              <ShoppingCart className="w-8 h-8 text-gray-300" />
            </div>
            <p className="font-medium text-gray-500 text-sm">No Products Selected</p>
            <p className="text-[11px] text-gray-400 mt-1 text-center max-w-[200px]">Scan a barcode or click on products to add them to cart.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-3 bg-white p-3 rounded-xl border border-gray-100 relative group">
                <img src={item.img} alt={item.name} className="w-16 h-16 rounded-lg object-contain bg-gray-50" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between pr-6">
                    <h5 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h5>
                  </div>
                  <div className="flex justify-between items-end mt-2">
                    <span className="font-bold text-[#FF9F43]">${item.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1 border border-gray-100">
                      <button 
                        onClick={() => onUpdateQty(item.id, item.qty - 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Minus className="w-3 h-3" strokeWidth={3} />
                      </button>
                      <span className="font-bold text-xs w-4 text-center">{item.qty}</span>
                      <button 
                        onClick={() => onUpdateQty(item.id, item.qty + 1)}
                        className="w-6 h-6 flex items-center justify-center bg-white rounded text-gray-600 hover:text-orange-500 transition-colors"
                      >
                        <Plus className="w-3 h-3" strokeWidth={3} />
                      </button>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-2 right-2 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Cart Footer (Fixed at bottom) */}
      <div className="p-4 shrink-0 bg-white border-t border-gray-100">
        
        <div className="flex justify-between items-center mb-3 px-1">
          <span className="text-sm text-gray-500 font-medium">Subtotal</span>
          <span className="text-sm font-bold text-gray-900">${subtotal.toFixed(2)}</span>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-4">
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-700 mb-1">Order Tax</p>
            <div className="relative">
              <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded-md text-[11px] sm:text-xs appearance-none focus:border-orange-500 outline-none">
                <option>0%</option>
                <option>5%</option>
                <option>10%</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-3 pointer-events-none" />
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-700 mb-1">Shipping</p>
            <div className="relative">
              <select className="w-full h-9 px-2 bg-white border border-gray-200 rounded-md text-[11px] sm:text-xs appearance-none focus:border-orange-500 outline-none">
                <option>$0</option>
              </select>
              <ChevronDown className="w-3 h-3 text-gray-400 absolute right-1.5 top-3 pointer-events-none" />
            </div>
          </div>
          <div>
            <p className="text-[10px] sm:text-xs font-bold text-gray-700 mb-1">Discount</p>
            <div className="relative flex items-center border border-gray-200 rounded-md overflow-hidden bg-white h-9 focus-within:border-orange-500">
              <select className="pl-1.5 pr-4 text-[11px] sm:text-xs appearance-none bg-transparent outline-none h-full border-r border-gray-100 font-medium">
                <option>%</option>
                <option>$</option>
              </select>
              <ChevronDown className="w-2 h-2 text-gray-400 absolute left-6 pointer-events-none" />
              <input type="number" defaultValue="0" className="w-full pl-1.5 text-[11px] sm:text-xs outline-none font-medium text-gray-900" />
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-xs font-bold text-gray-900 mb-2">Payment Method</p>
          <div className="grid grid-cols-3 gap-2">
            <button className="flex flex-col items-center justify-center py-2 rounded-md border-2 border-orange-500 bg-orange-50 text-orange-600 transition-all active:scale-95">
              <DollarSign className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold">Cash</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
              <CreditCard className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold">Card</span>
            </button>
            <button className="flex flex-col items-center justify-center py-2 rounded-md border border-gray-200 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-95">
              <QrCode className="w-4 h-4 mb-0.5" />
              <span className="text-[10px] font-bold">Scan</span>
            </button>
          </div>
        </div>

        <div className="bg-[#092C4C] rounded-lg p-3 mb-4 text-center relative overflow-hidden flex justify-between items-center px-4">
          <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-bl-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 bg-white/5 rounded-tr-full pointer-events-none"></div>
          <p className="text-white/80 font-medium text-sm">Grand Total</p>
          <p className="text-white font-bold text-xl tracking-tight">${total.toFixed(2)}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md py-2 text-[11px] sm:text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 active:scale-95 transition-all">
             <RefreshCcw className="w-3 h-3 sm:w-4 sm:h-4" /> Hold
          </button>
          <button onClick={onClearCart} className="bg-red-500 hover:bg-red-600 text-white rounded-md py-2 text-[11px] sm:text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 active:scale-95 transition-all">
             <X className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} /> Void
          </button>
          <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-md py-2 text-[11px] sm:text-xs font-bold flex flex-col sm:flex-row items-center justify-center gap-1 active:scale-95 transition-all">
             <DollarSign className="w-3 h-3 sm:w-4 sm:h-4" strokeWidth={3} /> Pay
          </button>
        </div>
      </div>

    </div>
  );
}

function SearchIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}
