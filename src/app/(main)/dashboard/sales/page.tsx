'use client';

import React from 'react';
import { 
  Calendar, ArrowUpRight, CheckCircle2, XCircle, Clock, 
  MapPin, RefreshCcw, DollarSign, ShoppingBag, 
  ChevronDown
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';

const salesData = [
  { name: 'Jan', value: 25 },
  { name: 'Feb', value: 30 },
  { name: 'Mar', value: 18 },
  { name: 'Apr', value: 20 },
  { name: 'May', value: 21 },
  { name: 'Jun', value: 30 },
  { name: 'July', value: 20 },
  { name: 'Aug', value: 22 },
  { name: 'Sep', value: 18 },
];

interface SalesTransaction {
  id: number;
  name: string;
  time: string;
  method: string;
  tx: string;
  status: string;
  statusColor: string;
  amount: string;
  img: string;
}

const transactionData: SalesTransaction[] = [
  { id: 1, name: 'Lobar Handy', time: '15 Mins', method: 'Paypal', tx: '#416645453773', status: 'Success', statusColor: 'bg-teal-500', amount: '$1099.00', img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100' },
  { id: 2, name: 'Red Premium Handy', time: '15 Mins', method: 'Apple Pay', tx: '#147784454554', status: 'Cancelled', statusColor: 'bg-red-500', amount: '$600.55', img: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=100' },
  { id: 3, name: 'Iphone 14 Pro', time: '15 Mins', method: 'Stripe', tx: '#147784454554', status: 'Pending', statusColor: 'bg-blue-400', amount: '$200.10', img: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=100' },
  { id: 4, name: 'Black Slim 200', time: '15 Mins', method: 'PayU', tx: '#147784454554', status: 'Success', statusColor: 'bg-teal-500', amount: '$1569.00', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100' },
  { id: 5, name: 'Woodcraft Sandal', time: '15 Mins', method: 'Paytm', tx: '#147784454554', status: 'Success', statusColor: 'bg-teal-500', amount: '$1478.00', img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=100' },
];

export default function SalesDashboard() {
  const transactionColumns: ColumnDef<SalesTransaction>[] = [
    {
      accessorKey: 'id',
      header: '#',
      cell: ({ row }) => <span className="text-gray-500 font-medium">{row.getValue('id')}</span>,
    },
    {
      accessorKey: 'name',
      header: 'Order Details',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={row.original.img} alt={row.original.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
          <div>
            <p className="font-bold text-gray-900 mb-0.5">{row.original.name}</p>
            <p className="text-xs text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {row.original.time}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'method',
      header: 'Payment',
      cell: ({ row }) => (
        <div>
          <p className="font-bold text-gray-900 mb-0.5">{row.original.method}</p>
          <a href="#" className="text-xs text-blue-500 hover:underline">{row.original.tx}</a>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-[11px] font-bold text-white px-2.5 py-1 rounded-md flex items-center gap-1.5 w-max ${row.original.statusColor}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
      cell: ({ row }) => <span className="font-bold text-gray-900 text-right block">{row.getValue('amount')}</span>,
    },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-xl">
            👋
          </div>
          <div>
            <h1 className="text-xl font-medium text-gray-900">
              <span className="font-bold">Hi John Smilga,</span> here&apos;s what&apos;s happening with your store today.
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span>01 Jan 2024 - 07 Jan 2024</span>
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <RefreshCcw className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Row 1: Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex justify-between items-center relative overflow-hidden">
          <div className="z-10">
            <p className="text-[#FF9F43] font-medium mb-4">Weekly Earning</p>
            <h3 className="text-3xl font-bold text-[#092C4C] mb-2">$95000.45</h3>
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <span className="text-teal-500 font-bold flex items-center"><ArrowUpRight className="w-4 h-4" /> 48%</span> 
              increase compare to last week
            </p>
          </div>
          <div className="relative z-10">
             <img src="https://cdn3d.iconscout.com/3d/premium/thumb/money-bag-4993510-4161746.png" alt="Money" className="w-24 h-24 object-contain opacity-90 drop-" />
          </div>
        </div>

        <div className="bg-[#FF9F43] rounded-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="w-full flex justify-between items-start mb-6">
             <div className="w-12 h-12 border-2 border-white/30 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
             </div>
             <button className="text-white/80 hover:text-white"><RefreshCcw className="w-5 h-5" /></button>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1">10,000+</h3>
            <p className="text-white/80 font-medium text-sm">No of Total Sales</p>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

        <div className="bg-[#092C4C] rounded-2xl p-6 flex flex-col justify-between text-white relative overflow-hidden">
          <div className="w-full flex justify-between items-start mb-6">
             <div className="w-12 h-12 border-2 border-white/30 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
             </div>
             <button className="text-white/80 hover:text-white"><RefreshCcw className="w-5 h-5" /></button>
          </div>
          <div>
            <h3 className="text-3xl font-bold mb-1">800+</h3>
            <p className="text-white/80 font-medium text-sm">No of Purchased Goods</p>
          </div>
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>

      </div>

      {/* Row 2: Best Seller & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Best Seller */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Best Seller</h3>
            <button className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-5">
            {[
              { name: 'Lobar Handy', price: '$260', sales: '6547', img: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=100' },
              { name: 'Bold V3.2', price: '$1474', sales: '3474', img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=100' },
              { name: 'Lenovo 3rd Generation', price: '$8784', sales: '1478', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100' },
              { name: 'Apple Series 5 Watch', price: '$3240', sales: '987', img: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100' },
              { name: 'Lenovo 3rd Generation', price: '$597', sales: '784', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center p-2">
                     <img src={item.img} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.price}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium mb-0.5">Sales</p>
                  <p className="text-sm font-bold text-gray-900">{item.sales}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Table */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Recent Transactions</h3>
            <button className="text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">
              View All
            </button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <DataTable 
              columns={transactionColumns} 
              data={transactionData} 
            />
          </div>
        </div>
      </div>

      {/* Row 3: Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Analytics Area Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Sales Analytics</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
              <Calendar className="w-4 h-4 text-gray-400" /> 2023
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#FF9F43" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => `${val}K`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', }}
                  itemStyle={{ color: '#092C4C', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#FF9F43" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sales by Countries Map Placeholder */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 text-lg">Sales by Countries</h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-700 bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
              This Week <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="World Map" className="w-full h-auto opacity-20 filter grayscale" />
            
            {/* Mock Tooltip / Highlight over Africa */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="bg-white rounded-lg overflow-hidden text-center border border-gray-100">
                 <div className="bg-[#FF9F43] text-white font-bold text-sm py-1.5 px-6">Africa</div>
                 <div className="py-2 px-6 font-medium text-gray-700 text-sm">3455 Sales</div>
              </div>
              <div className="w-3 h-3 bg-white rotate-45 absolute -bottom-1.5 left-1/2 -translate-x-1/2 border-b border-r border-gray-100"></div>
            </div>
            
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
             <p className="text-sm text-gray-500 flex items-center justify-center gap-1">
              <span className="text-teal-500 font-bold flex items-center"><ArrowUpRight className="w-4 h-4" /> 48%</span> 
              increase compare to last week
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
