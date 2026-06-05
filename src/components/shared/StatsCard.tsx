import React from 'react';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string;
  trend?: string;
  trendType?: 'up' | 'down';
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
}

export function StatsCard({ 
  label, 
  value, 
  trend, 
  trendType = 'up', 
  icon: Icon, 
  iconColor, 
  iconBg 
}: StatsCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col gap-2">
      <div className={`flex items-center gap-2 font-medium mb-2 ${iconColor}`}>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className="w-5 h-5" />
        </div>
        <span>{label}</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{value}</h2>
      {trend && (
        <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
          <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium ${
            trendType === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend} {trendType === 'up' ? <ArrowUpRight className="w-3 h-3 ml-0.5" /> : <ArrowDownRight className="w-3 h-3 ml-0.5" />}
          </span>
          From Last Month
        </div>
      )}
    </div>
  );
}
