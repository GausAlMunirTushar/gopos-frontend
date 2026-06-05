'use client';

import React, { useState, useMemo } from 'react';
import { 
  ListOrdered, RefreshCcw, DollarSign, Headphones, MonitorSmartphone, Watch, Laptop, Coffee
} from 'lucide-react';
import { PosHeader } from '@/features/pos/components/PosHeader';
import { PosCategories } from '@/features/pos/components/PosCategories';
import { PosProductGrid } from '@/features/pos/components/PosProductGrid';
import { PosCart, CartItem } from '@/features/pos/components/PosCart';

const categories = [
  { name: 'All Categories', items: '54 Items', icon: <div className="w-8 h-8 grid grid-cols-2 gap-1"><div className="border-2 border-[#FF9F43] rounded-full"></div><div className="border-2 border-[#FF9F43] rounded-full"></div><div className="border-2 border-[#FF9F43] rounded-full"></div><div className="border-2 border-[#FF9F43] rounded-full"></div></div> },
  { name: 'Headphones', items: '4 Items', icon: <Headphones className="w-8 h-8 text-gray-700" /> },
  { name: 'Shoes', items: '14 Items', icon: <div className="text-2xl">👟</div> },
  { name: 'Mobiles', items: '7 Items', icon: <MonitorSmartphone className="w-8 h-8 text-gray-700" /> },
  { name: 'Watches', items: '16 Items', icon: <Watch className="w-8 h-8 text-gray-700" /> },
  { name: 'Laptops', items: '18 Items', icon: <Laptop className="w-8 h-8 text-gray-700" /> },
  { name: 'Home Needs', items: '12 Items', icon: <Coffee className="w-8 h-8 text-gray-700" /> },
];

const products = [
  { name: 'IPhone 14 64GB', cat: 'Mobiles', stock: 30, price: '$1580.00', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200' },
  { name: 'MacBook Pro', cat: 'Laptops', stock: 140, price: '$1000.00', img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200' },
  { name: 'Rolex Tribute V3', cat: 'Watches', stock: 220, price: '$6800.00', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200' },
  { name: 'Red Nike Angelo', cat: 'Shoes', stock: 10, price: '$120.00', priceColor: 'text-red-500', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200' },
  { name: 'Airpod 2', cat: 'Headphones', stock: 47, price: '$54.78', img: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200' },
  { name: 'Blue White OGR', cat: 'Shoes', stock: 30, price: '$98.00', img: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200' },
  { name: 'IdeaPad Slim 5 Gen 7', cat: 'Laptops', stock: 74, price: '$1454.00', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=200' },
  { name: 'SWAGME', cat: 'Headphones', stock: 14, price: '$65.87', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200' },
  { name: 'Tablet 1.02 inch', cat: 'Laptops', stock: 47, price: '$474.40', img: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200' },
  { name: 'Fossil Pair Of 3 in 1', cat: 'Watches', stock: 40, price: '$78.90', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200' },
  { name: 'Green Nike Fe', cat: 'Shoes', stock: 78, price: '$145.40', img: 'https://images.unsplash.com/photo-1552346154-21d32810baa3?w=200' },
];

export default function POSPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'cart'>('products');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    let filtered = products;
    if (activeCategory !== 'All Categories') {
      filtered = filtered.filter(p => p.cat === activeCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        return prev.map(item => 
          item.name === product.name ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { 
        id: Math.random().toString(36).substring(7), 
        name: product.name, 
        price: parseFloat(product.price.replace('$', '')), 
        qty: 1, 
        img: product.img 
      }];
    });
  };

  const handleUpdateQty = (id: string, newQty: number) => {
    if (newQty < 1) return;
    setCartItems(prev => prev.map(item => item.id === id ? { ...item, qty: newQty } : item));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const subtotal = useMemo(() => cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0), [cartItems]);
  const tax = useMemo(() => subtotal * 0.05, [subtotal]); // Assuming 5% default tax
  const discount = 0; // Default 0
  const total = subtotal + tax - discount;

  return (
    <div className="h-[100dvh] flex flex-col bg-[#F8F9FA] overflow-hidden font-sans text-gray-800">
      
      <PosHeader />

      {/* Mobile View Tabs Toggle */}
      <div className="lg:hidden flex bg-white border-b border-gray-100 shrink-0 z-10 relative">
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors ${activeTab === 'products' ? 'border-orange-500 text-orange-500 bg-orange-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Products Catalog
        </button>
        <button 
          onClick={() => setActiveTab('cart')}
          className={`flex-1 py-3 text-center text-sm font-bold border-b-2 transition-colors relative ${activeTab === 'cart' ? 'border-orange-500 text-orange-500 bg-orange-50/50' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
        >
          Order List (Cart)
          <span className="absolute top-2 right-4 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cartItems.length}</span>
        </button>
      </div>

      {/* Main Content Split */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 relative">
        
        {/* Left Pane (Products) */}
        <div className={`flex-1 lg:flex-[0.6] xl:flex-[0.65] flex flex-col p-3 sm:p-4 overflow-hidden lg:border-r border-gray-200 ${activeTab === 'products' ? 'flex' : 'hidden lg:flex'}`}>
          
          {/* Top Actions */}
          <div className="flex flex-wrap gap-2 mb-4 shrink-0">
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95">
              <ListOrdered className="w-4 h-4" /> <span className="hidden xs:inline">View Orders</span>
            </button>
            <button onClick={handleClearCart} className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95">
              <RefreshCcw className="w-4 h-4" /> <span className="hidden xs:inline">Reset</span>
            </button>
            <button className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-medium transition-colors active:scale-95">
              <DollarSign className="w-4 h-4" /> <span className="hidden xs:inline">Transaction</span>
            </button>
          </div>

          <PosCategories 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelectCategory={setActiveCategory} 
          />
          <PosProductGrid 
            products={filteredProducts} 
            onAddToCart={handleAddToCart}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

        </div>

        {/* Right Pane (Cart) - Uses Absolute Positioning on Mobile to cover screen */}
        <PosCart 
          activeTab={activeTab} 
          cartItems={cartItems}
          onUpdateQty={handleUpdateQty}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
          subtotal={subtotal}
          tax={tax}
          discount={discount}
          total={total}
        />

      </div>

    </div>
  );
}
