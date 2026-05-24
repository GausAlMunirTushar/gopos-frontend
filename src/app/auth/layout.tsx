import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex w-full bg-white">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 relative">
        {/* Header / Logo */}
        <div className="flex justify-center pt-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-900 rounded-md flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="text-2xl font-bold text-blue-900">
              Dreams<span className="text-orange-500">POS</span>
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-md mx-auto w-full py-12">
          {children}
        </div>

        {/* Footer */}
        <div className="py-4 text-center text-sm text-gray-500">
          Copyrights © 2025 - DreamsPOS
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="hidden lg:block w-1/2 relative bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1974&auto=format&fit=crop" 
          alt="Coffee shop POS" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/5" />
      </div>
    </div>
  );
}
