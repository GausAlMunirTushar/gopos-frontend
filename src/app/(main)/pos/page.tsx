'use client';

import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, CreditCard, Banknote, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

// Dummy data
const categories = ['All', 'Coffee', 'Tea', 'Pastries', 'Sandwiches', 'Cold Drinks'];

const products = [
  { id: 1, name: 'Espresso', category: 'Coffee', price: 3.50, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80', stock: 50 },
  { id: 2, name: 'Cappuccino', category: 'Coffee', price: 4.50, image: 'https://images.unsplash.com/photo-1517701550927-30cfcb64db10?w=500&q=80', stock: 40 },
  { id: 3, name: 'Green Tea', category: 'Tea', price: 3.00, image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?w=500&q=80', stock: 30 },
  { id: 4, name: 'Croissant', category: 'Pastries', price: 4.00, image: 'https://images.unsplash.com/photo-1555507036-ab1f40ce88cb?w=500&q=80', stock: 25 },
  { id: 5, name: 'Latte', category: 'Coffee', price: 4.75, image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=500&q=80', stock: 45 },
  { id: 6, name: 'Iced Coffee', category: 'Cold Drinks', price: 4.25, image: 'https://images.unsplash.com/photo-1461023058943-07cb1ce919d7?w=500&q=80', stock: 60 },
  { id: 7, name: 'Blueberry Muffin', category: 'Pastries', price: 3.75, image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=500&q=80', stock: 15 },
  { id: 8, name: 'Club Sandwich', category: 'Sandwiches', price: 8.50, image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=500&q=80', stock: 20 },
];

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{product: any, quantity: number}[]>([]);

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)] gap-6">
      
      {/* Left Area - Products */}
      <div className="flex-1 flex flex-col min-h-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header & Search */}
        <div className="p-4 border-b border-gray-100 space-y-4">
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-[#FF9F43] focus-within:bg-white transition-colors">
            <Search className="w-5 h-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products by name or SKU..." 
              className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                  activeCategory === category 
                    ? 'bg-[#092C4C] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {filteredProducts.map(product => (
              <Card 
                key={product.id} 
                className="cursor-pointer hover:border-[#FF9F43] transition-colors group overflow-hidden"
                onClick={() => addToCart(product)}
              >
                <div className="aspect-square relative overflow-hidden bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="p-3">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{product.stock} in stock</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Area - Cart */}
      <div className="w-full lg:w-96 flex flex-col min-h-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden shrink-0">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Current Order</h2>
          <span className="bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
            {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
          </span>
        </div>

        <div className="p-4 border-b border-gray-100">
          <button className="w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:text-[#FF9F43] hover:border-[#FF9F43] hover:bg-orange-50 transition-colors">
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Add Customer</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <ShoppingCart className="w-12 h-12 mb-3 text-gray-300" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="flex gap-3">
                <img src={item.product.image} alt={item.product.name} className="w-16 h-16 rounded-xl object-cover border border-gray-100" />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                    <button 
                      onClick={() => removeFromCart(item.product.id)}
                      className="text-red-400 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="font-semibold text-[#FF9F43] text-sm mt-0.5">
                    ${item.product.price.toFixed(2)}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-white text-gray-600 shadow-sm"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md bg-[#FF9F43] text-white shadow-sm"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-sm font-bold text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-gray-50 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Tax (10%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <Button variant="outline" className="h-12 bg-white flex flex-col items-center justify-center gap-1">
              <Banknote className="w-5 h-5 text-green-600" />
              <span className="text-xs">Cash</span>
            </Button>
            <Button variant="outline" className="h-12 bg-white flex flex-col items-center justify-center gap-1">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="text-xs">Card</span>
            </Button>
          </div>
          
          <Button className="w-full h-14 bg-[#FF9F43] hover:bg-orange-500 text-white text-lg font-bold rounded-xl" disabled={cart.length === 0}>
            Pay ${total.toFixed(2)}
          </Button>
        </div>
      </div>

    </div>
  );
}
