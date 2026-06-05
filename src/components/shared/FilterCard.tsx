import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FilterCardProps {
  children: React.ReactNode;
  onGenerate?: () => void;
  buttonLabel?: string;
}

export function FilterCard({ children, onGenerate, buttonLabel = 'Generate Report' }: FilterCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row items-end gap-6 mb-6">
      {children}
      {onGenerate && (
        <div className="shrink-0">
          <button 
            onClick={onGenerate}
            className="px-6 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors h-10 flex items-center justify-center whitespace-nowrap"
          >
            {buttonLabel}
          </button>
        </div>
      )}
    </div>
  );
}
