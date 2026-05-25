'use client';

import React from 'react';
import { 
  Calendar, ArrowUpRight, ArrowDownRight, 
  Building2, Users, CreditCard, DollarSign,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const companiesData = [
  { name: 'M', value: 40 },
  { name: 'T', value: 65 },
  { name: 'W', value: 30 },
  { name: 'T', value: 85 },
  { name: 'F', value: 50 },
  { name: 'S', value: 60 },
  { name: 'S', value: 60 },
];

const revenueData = [
  { name: 'Jan', value: 45 },
  { name: 'Feb', value: 38 },
  { name: 'Mar', value: 48 },
  { name: 'Apr', value: 35 },
  { name: 'May', value: 65 },
  { name: 'Jun', value: 75 },
  { name: 'Jul', value: 68 },
  { name: 'Aug', value: 78 },
  { name: 'Sep', value: 80 },
  { name: 'Oct', value: 82 },
  { name: 'Nov', value: 28 },
  { name: 'Dec', value: 78 },
];

const plansData = [
  { name: 'Basic', value: 60, color: '#FF9F43' },
  { name: 'Premium', value: 20, color: '#FCD34D' },
  { name: 'Enterprise', value: 20, color: '#3B82F6' },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, Admin</h1>
          <p className="text-gray-500 text-sm">You have <span className="text-[#FF9F43] font-semibold">200+</span> Orders, Today</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
          <Calendar className="w-4 h-4 text-gray-500" />
          <span>01 Jan 2024 - 07 Jan 2024</span>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#FF9F43] via-[#FFAD61] to-[#FF8C1A] rounded-2xl p-8 flex flex-col md:flex-row md:items-center justify-between text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
           {/* Abstract bubbles */}
           <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
           <div className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-lg"></div>
           <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-xl"></div>
        </div>
        
        <div className="relative z-10 mb-6 md:mb-0">
          <h2 className="text-3xl font-bold mb-2">Welcome Back, Adrian</h2>
          <p className="text-white/90 text-lg font-medium">14 New Companies Subscribed Today !!!</p>
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          <button className="px-6 py-2.5 bg-[#092C4C] hover:bg-[#061d33] text-white rounded-lg font-medium transition-colors">
            Companies
          </button>
          <button className="px-6 py-2.5 bg-white text-gray-900 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            All Packages
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Companies', value: '5468', trend: '+19.01%', color: 'text-teal-600', bg: 'bg-teal-50', iconBg: 'bg-[#092C4C]', icon: Building2, chartColor: '#FF9F43' },
          { label: 'Active Companies', value: '4598', trend: '-12%', color: 'text-red-500', bg: 'bg-red-50', iconBg: 'bg-[#092C4C]', icon: CreditCard, chartColor: '#8B5CF6' },
          { label: 'Total Subscribers', value: '3698', trend: '+6%', color: 'text-teal-600', bg: 'bg-teal-50', iconBg: 'bg-[#092C4C]', icon: Users, chartColor: '#0EA5E9' },
          { label: 'Total Earnings', value: '$89,878,58', trend: '-16%', color: 'text-red-500', bg: 'bg-red-50', iconBg: 'bg-[#092C4C]', icon: DollarSign, chartColor: '#10B981' },
        ].map((item, idx) => {
          const Icon = item.icon;
          const isPositive = item.trend.startsWith('+');
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded flex items-center ${item.color} ${item.bg}`}>
                  {item.trend}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{item.value}</h3>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-500">{item.label}</p>
                  
                  {/* Mock mini bar chart */}
                  <div className="flex items-end gap-1 h-8">
                    {[40, 70, 45, 90, 60, 80].map((h, i) => (
                      <div key={i} className="w-1.5 rounded-t-sm" style={{ height: `${h}%`, backgroundColor: item.chartColor }}></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Companies Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Companies</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> This Week <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="h-64 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={companiesData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                 <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', }} />
                 <Bar dataKey="value" fill="#092C4C" radius={[4, 4, 4, 4]} barSize={16}>
                    {
                      companiesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === 3 ? '#FF9F43' : '#092C4C'} />
                      ))
                    }
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2">
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded flex items-center">
              +6%
            </span>
            <span className="text-sm text-gray-500 font-medium">5 Companies from last month</span>
          </div>
        </div>

        {/* Revenue Chart */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Revenue</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> 2025 <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="mb-4">
             <h3 className="text-xl font-bold text-gray-900 mb-1">$45787</h3>
             <p className="text-xs font-medium text-gray-500 flex items-center gap-1">
               <span className="text-teal-500 font-bold">+40%</span> increased from last year
             </p>
          </div>
          <div className="h-56 w-full relative">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={revenueData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                 <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 10 }} dy={10} />
                 <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', }} />
                 <Bar dataKey="value" fill="#FF9F43" radius={[4, 4, 4, 4]} barSize={12} background={{ fill: '#F3F4F6', radius: 4 }} />
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Top Plans */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Top Plans</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> This Month <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="w-48 h-48 mx-auto relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={plansData}
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {plansData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                 <span className="text-xs font-bold text-gray-500">60%</span>
              </div>
            </div>
            
            <div className="space-y-3">
              {plansData.map((plan, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <p className="text-gray-500 font-medium flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: plan.color }}></span> {plan.name}
                  </p>
                  <p className="font-bold text-gray-900">{plan.value}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Transactions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3>
            <a href="#" className="text-xs font-medium text-gray-900 hover:underline">View All</a>
          </div>
          <div className="space-y-5">
            {[
              { name: 'Stellar Dynamics', id: '#12457', date: '14 Jan 2025', plan: 'Basic', amount: '+$245', icon: 'S', color: 'bg-green-100 text-green-600' },
              { name: 'Quantum Nexus', id: '#65974', date: '10 Jan 2025', plan: 'Enterprise', amount: '+$395', icon: 'Q', color: 'bg-blue-100 text-blue-600' },
              { name: 'Aurora Technologies', id: '#22457', date: '08 Jan 2025', plan: 'Advanced', amount: '+$145', icon: 'A', color: 'bg-purple-100 text-purple-600' },
              { name: 'TerraFusion Energy', id: '#43412', date: '06 Jan 2025', plan: 'Enterprise', amount: '+$758', icon: 'T', color: 'bg-orange-100 text-orange-600' },
              { name: 'Epicurean Delights', id: '#43567', date: '03 Jan 2025', plan: 'Premium', amount: '+$977', icon: 'E', color: 'bg-indigo-100 text-indigo-600' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${item.color}`}>
                     {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</h4>
                    <p className="text-xs text-blue-500 font-medium">{item.id} <span className="text-gray-400">• {item.date}</span></p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 mb-0.5">{item.amount}</p>
                  <p className="text-xs text-gray-500 font-medium">{item.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Registered */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Recently Registered</h3>
            <a href="#" className="text-xs font-medium text-gray-900 hover:underline">View All</a>
          </div>
          <div className="space-y-5">
            {[
              { name: 'Pitch', plan: 'Basic (Monthly)', users: '150 Users', icon: 'https://ui-avatars.com/api/?name=Pitch&background=000&color=fff' },
              { name: 'Initech', plan: 'Enterprise (Yearly)', users: '200 Users', icon: 'https://ui-avatars.com/api/?name=Initech&background=5B21B6&color=fff' },
              { name: 'Umbrella Corp', plan: 'Advanced (Monthly)', users: '108 Users', icon: 'https://ui-avatars.com/api/?name=Umbrella&background=DC2626&color=fff' },
              { name: 'Capital Partners', plan: 'Enterprise (Monthly)', users: '110 Users', icon: 'https://ui-avatars.com/api/?name=Capital&background=EA580C&color=fff' },
              { name: 'Massive Dynamic', plan: 'Premium (Yearly)', users: '120 Users', icon: 'https://ui-avatars.com/api/?name=Massive&background=1F2937&color=fff' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.plan}</p>
                  </div>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  {item.users}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Plan Expired */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Recent Plan Expired</h3>
            <a href="#" className="text-xs font-medium text-gray-900 hover:underline">View All</a>
          </div>
          <div className="space-y-5">
            {[
              { name: 'Silicon Corp', exp: 'Expired : 10 Apr 2025', icon: 'https://ui-avatars.com/api/?name=Silicon&background=F3F4F6&color=4B5563' },
              { name: 'Hubspot', exp: 'Expired : 12 Jun 2025', icon: 'https://ui-avatars.com/api/?name=Hubspot&background=FFF7ED&color=EA580C' },
              { name: 'Licon Industries', exp: 'Expired : 16 Jun 2025', icon: 'https://ui-avatars.com/api/?name=Licon&background=EFF6FF&color=2563EB' },
              { name: 'TerraFusion Energy', exp: 'Expired : 12 May 2025', icon: 'https://ui-avatars.com/api/?name=Terra&background=FEF2F2&color=DC2626' },
              { name: 'Epicurean Delights', exp: 'Expired : 15 May 2025', icon: 'https://ui-avatars.com/api/?name=Epicurean&background=F5F3FF&color=7C3AED' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={item.icon} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.exp}</p>
                  </div>
                </div>
                <div>
                  <button className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">
                    Send Reminder
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
