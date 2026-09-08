'use client';

import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Percent, 
  Receipt, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  DollarSign, 
  CreditCard, 
  Smartphone,
  Search,
  Tag,
  Share2
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  badge?: string;
  color: string;
}

interface CartItem extends Product {
  quantity: number;
}

const SAMPLE_PRODUCTS: Product[] = [
  { id: '1', name: 'Cold Brew Nitro', category: 'drinks', price: 4.50, stock: 45, badge: 'Popular', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { id: '2', name: 'Almond Croissant', category: 'bakery', price: 3.80, stock: 18, color: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
  { id: '3', name: 'Organic Cotton Tee', category: 'apparel', price: 28.00, stock: 32, badge: 'Variant M/L', color: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
  { id: '4', name: 'Caramel Macchiato', category: 'drinks', price: 5.20, stock: 60, color: 'bg-amber-500/10 text-amber-500 border-amber-500/20' },
  { id: '5', name: 'Artisan Sourdough', category: 'bakery', price: 6.50, stock: 14, color: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
  { id: '6', name: 'Slim Leather Wallet', category: 'apparel', price: 35.00, stock: 22, badge: 'RFID Safe', color: 'bg-purple-500/10 text-purple-500 border-purple-500/20' },
  { id: '7', name: 'Matcha Iced Latte', category: 'drinks', price: 5.50, stock: 29, color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' },
  { id: '8', name: 'Bluetooth Earbuds', category: 'gadgets', price: 49.00, stock: 15, badge: 'Hot', color: 'bg-rose-500/10 text-rose-500 border-rose-500/20' },
];

export function InteractivePOSSimulator() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [cart, setCart] = useState<CartItem[]>([
    { ...SAMPLE_PRODUCTS[0], quantity: 2 },
    { ...SAMPLE_PRODUCTS[1], quantity: 1 },
  ]);
  const [discountPercent, setDiscountPercent] = useState<number>(10);
  const [completedOrder, setCompletedOrder] = useState<any>(null);

  const filteredProducts = SAMPLE_PRODUCTS.filter(p => {
    const matchCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const tax = taxableAmount * 0.05; // 5% tax
  const total = taxableAmount + tax;

  const handleCompleteSale = (method: string) => {
    if (cart.length === 0) return;
    setCompletedOrder({
      id: `INV-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      tax,
      total,
      method,
      time: new Date().toLocaleTimeString(),
    });
  };

  const resetDemo = () => {
    setCompletedOrder(null);
    setCart([
      { ...SAMPLE_PRODUCTS[0], quantity: 2 },
      { ...SAMPLE_PRODUCTS[1], quantity: 1 },
    ]);
    setDiscountPercent(10);
  };

  return (
    <section id="demo" className="py-20 bg-slate-900 text-slate-100 relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/15 border border-orange-500/30 text-orange-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Try It Live</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Experience the 0.2s Checkout in Action
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Test drive our real-time POS simulator right now. Click any product to add to cart, adjust quantities, apply discounts, and complete a simulated sale!
          </p>
        </div>

        {/* The Interactive Simulator Terminal Container */}
        <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden p-4 sm:p-6 lg:p-8">
          
          {/* Simulator Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-sm font-semibold text-white">Live Terminal Demo Mode</span>
              <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                Store #01 - Front Register
              </span>
            </div>
            
            <button
              onClick={resetDemo}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Simulator</span>
            </button>
          </div>

          {/* Simulator Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            {/* Products Selection Catalog (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Category Pills & Search */}
              <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
                  {[
                    { id: 'all', label: 'All Items' },
                    { id: 'drinks', label: 'Coffee & Drinks' },
                    { id: 'bakery', label: 'Bakery' },
                    { id: 'apparel', label: 'Apparel' },
                    { id: 'gadgets', label: 'Gadgets' },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-all ${
                        activeCategory === cat.id
                          ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search product..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-44 bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Product Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredProducts.map(product => (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    className="group text-left p-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-orange-500/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex flex-col justify-between h-32 relative overflow-hidden shadow-xs"
                  >
                    <div>
                      {product.badge && (
                        <span className="inline-block text-[10px] font-bold px-1.5 py-0.5 rounded bg-orange-500/20 text-orange-400 mb-1 border border-orange-500/30">
                          {product.badge}
                        </span>
                      )}
                      <div className="text-xs font-semibold text-slate-200 group-hover:text-white line-clamp-1">
                        {product.name}
                      </div>
                      <div className="text-[10px] text-slate-500 capitalize">
                        {product.category}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                      <span className="text-sm font-bold text-orange-400">
                        ${product.price.toFixed(2)}
                      </span>
                      <div className="w-6 h-6 rounded-lg bg-slate-800 group-hover:bg-orange-500 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="p-3 bg-slate-900/50 rounded-xl border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <Tag className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Tip: Click any item above to see instant cart calculation and receipt generation.</span>
              </div>
            </div>

            {/* Current Order Cart (5 Cols) */}
            <div className="lg:col-span-5 bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4 text-orange-400" />
                    <span className="text-sm font-bold text-white">Current Cart</span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {cart.reduce((s, i) => s + i.quantity, 0)} Items
                  </span>
                </div>

                {/* Cart Items List */}
                <div className="py-3 space-y-2.5 max-h-56 overflow-y-auto pr-1">
                  {cart.length === 0 ? (
                    <div className="py-8 text-center text-slate-500 text-xs">
                      Cart is empty. Click items on the left to add!
                    </div>
                  ) : (
                    cart.map(item => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-slate-200 truncate">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400">
                            ${item.price.toFixed(2)} each
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded-lg border border-slate-800">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="text-slate-400 hover:text-white p-0.5"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold text-white w-4 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="text-slate-400 hover:text-white p-0.5"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right min-w-14">
                          <div className="text-xs font-bold text-white">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Quick Promo Discounts */}
                <div className="pt-2 pb-3 border-t border-slate-800">
                  <div className="text-[11px] font-semibold text-slate-400 mb-1.5 flex items-center justify-between">
                    <span>Apply Quick Discount:</span>
                    <span className="text-orange-400 font-bold">{discountPercent}% Applied</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[0, 5, 10, 20].map(pct => (
                      <button
                        key={pct}
                        onClick={() => setDiscountPercent(pct)}
                        className={`py-1 text-xs rounded-lg font-semibold transition-all ${
                          discountPercent === pct
                            ? 'bg-orange-500 text-white shadow-xs'
                            : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {pct === 0 ? 'None' : `${pct}%`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Calculations & Checkout Action */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="text-slate-200 font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between text-emerald-400">
                      <span>Discount ({discountPercent}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Sales Tax (5%):</span>
                    <span className="text-slate-200 font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-base font-extrabold text-white pt-1.5 border-t border-slate-800">
                    <span>Total Amount:</span>
                    <span className="text-orange-400">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Trigger Buttons */}
                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    disabled={cart.length === 0}
                    onClick={() => handleCompleteSale('Cash')}
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-900/30 active:scale-98 cursor-pointer"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Pay Cash</span>
                  </button>
                  <button
                    disabled={cart.length === 0}
                    onClick={() => handleCompleteSale('Card / POS')}
                    className="py-2.5 px-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-orange-500/25 active:scale-98 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Pay Card</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Modal / Overlay when Sale is Completed */}
        {completedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white text-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Sale Completed!</h3>
                <p className="text-xs text-slate-500">
                  Transaction processed in <strong>0.18s</strong> &bull; Receipt #{completedOrder.id}
                </p>
              </div>

              {/* Mini Receipt Body */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 font-mono text-xs space-y-2">
                <div className="text-center font-bold pb-2 border-b border-dashed border-slate-300">
                  goPOS Demo Store
                  <div className="text-[10px] font-normal text-slate-500">Paid with {completedOrder.method} at {completedOrder.time}</div>
                </div>

                <div className="space-y-1 py-1 max-h-32 overflow-y-auto">
                  {completedOrder.items.map((it: CartItem, i: number) => (
                    <div key={i} className="flex justify-between text-slate-700">
                      <span>{it.quantity}x {it.name}</span>
                      <span>${(it.price * it.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-dashed border-slate-300 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Subtotal:</span>
                    <span>${completedOrder.subtotal.toFixed(2)}</span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span>-${completedOrder.discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-500">
                    <span>Tax (5%):</span>
                    <span>${completedOrder.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-slate-900 text-sm pt-1">
                    <span>Total Paid:</span>
                    <span className="text-orange-600">${completedOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setCompletedOrder(null)}
                    className="py-2.5 px-3 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Receipt className="w-3.5 h-3.5 text-slate-500" />
                    <span>Print Thermal</span>
                  </button>
                  <button
                    onClick={() => setCompletedOrder(null)}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>WhatsApp Receipt</span>
                  </button>
                </div>

                <button
                  onClick={() => setCompletedOrder(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
                >
                  Start Next Transaction
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
