'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { 
  FileText, Package, Calendar, ChevronDown, 
  ShoppingCart, Users, UserCircle, Box, AlertCircle, 
  X, ArrowUpRight, ArrowDownRight, RefreshCcw, CornerDownLeft,
  ShieldCheck, TrendingUp, PieChart as PieChartIcon
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { DataTable } from '@/components/ui/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { useCurrency } from '@/hooks/useCurrency';

// Mock Data
const salesPurchaseData = [
  { name: 'Jan', purchase: 15, sales: 50 },
  { name: 'Feb', purchase: 22, sales: 35 },
  { name: 'Mar', purchase: 10, sales: 25 },
  { name: 'Apr', purchase: 15, sales: 55 },
  { name: 'May', purchase: 25, sales: 45 },
  { name: 'Jun', purchase: 15, sales: 50 },
  { name: 'July', purchase: 10, sales: 30 },
  { name: 'Aug', purchase: 20, sales: 45 },
  { name: 'Sep', purchase: 40, sales: 60 },
  { name: 'Oct', purchase: 15, sales: 35 },
  { name: 'Nov', purchase: 28, sales: 45 },
  { name: 'Dec', purchase: 10, sales: 30 },
];

const customerOverviewData = [
  { name: 'First Time', value: 5500, color: '#092C4C' },
  { name: 'Return', value: 3500, color: '#FF9F43' },
];

const salesStaticsData = [
  { name: 'Jan', revenue: 15, expense: -20 },
  { name: 'Feb', revenue: 25, expense: -10 },
  { name: 'Mar', revenue: 28, expense: -25 },
  { name: 'Apr', revenue: 25, expense: -15 },
  { name: 'May', revenue: 20, expense: -25 },
  { name: 'Jun', revenue: 25, expense: -20 },
  { name: 'Jul', revenue: 30, expense: -15 },
  { name: 'Aug', revenue: 25, expense: -20 },
  { name: 'Sep', revenue: 32, expense: -10 },
  { name: 'Oct', revenue: 20, expense: -25 },
  { name: 'Nov', revenue: 15, expense: -20 },
  { name: 'Dec', revenue: 28, expense: -15 },
];

const topCategoriesData = [
  { name: 'Electronics', value: 698, color: '#FF9F43' },
  { name: 'Sports', value: 545, color: '#092C4C' },
  { name: 'Lifestyles', value: 456, color: '#F3F4F6' },
];

interface Transaction {
  date: string;
  name: string;
  id: string;
  status: string;
  color: string;
  total: number;
}

const transactionData: Transaction[] = [
  { date: '24 May 2025', name: 'Andrea Willer', id: '#114589', status: 'Completed', color: 'bg-teal-500', total: 4560 },
  { date: '23 May 2025', name: 'Timothy Sands', id: '#114589', status: 'Completed', color: 'bg-teal-500', total: 3569 },
  { date: '22 May 2025', name: 'Bonnie Rodrigues', id: '#114589', status: 'Draft', color: 'bg-pink-500', total: 2659 },
  { date: '21 May 2025', name: 'Randy McCree', id: '#114589', status: 'Completed', color: 'bg-teal-500', total: 2155 },
];

export default function Dashboard() {
  const [alertVisible, setAlertVisible] = useState(true);
  const { formatCurrency } = useCurrency();

  const transactionColumns: ColumnDef<Transaction>[] = [
    { accessorKey: 'date', header: 'Date' },
    {
      accessorKey: 'name',
      header: 'Customer',
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <img src={`https://i.pravatar.cc/150?u=${row.original.name}`} alt={row.original.name} className="w-8 h-8 rounded-full bg-gray-100" />
          <div>
            <p className="font-bold text-gray-900">{row.original.name}</p>
            <p className="text-xs text-orange-500">{row.original.id}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded flex items-center gap-1 w-max ${row.original.color}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
          {row.getValue('status')}
        </span>
      ),
    },
    {
      accessorKey: 'total',
      header: 'Total',
      cell: ({ row }) => <span className="font-bold text-gray-900 text-right block">{formatCurrency(row.original.total)}</span>,
    },
  ];

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

      {/* Alert Banner */}
      {alertVisible && (
        <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <AlertCircle className="w-4 h-4 text-orange-500" />
            <span className="text-gray-600">Your Product <span className="font-semibold text-orange-500">Apple iPhone 15 is running Low</span>, already below 5 Pcs., <a href="#" className="font-medium text-gray-900 hover:underline">Add Stock</a></span>
          </div>
          <button onClick={() => setAlertVisible(false)} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Primary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-linear-to-br from-[#FFAD61] to-[#FF9F43] rounded-2xl p-5 text-white flex gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Total Sales</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{formatCurrency(48988078)}</h3>
              <span className="flex items-center text-xs font-medium bg-white/20 px-1.5 py-0.5 rounded-md mb-1 text-white">
                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 22%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-[#061d33] to-[#092C4C] rounded-2xl p-5 text-white flex gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
            <CornerDownLeft className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Total Sales Return</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{formatCurrency(16478145)}</h3>
              <span className="flex items-center text-xs font-medium bg-white/10 px-1.5 py-0.5 rounded-md mb-1 text-white">
                <ArrowDownRight className="w-3 h-3 mr-0.5" /> 22%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-[#2DD4BF] to-[#14B8A6] rounded-2xl p-5 text-white flex gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Total Purchase</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{formatCurrency(24145789)}</h3>
              <span className="flex items-center text-xs font-medium bg-white/20 px-1.5 py-0.5 rounded-md mb-1 text-white">
                <ArrowDownRight className="w-3 h-3 mr-0.5" /> 22%
              </span>
            </div>
          </div>
        </div>

        <div className="bg-linear-to-br from-[#3B82F6] to-[#2563EB] rounded-2xl p-5 text-white flex gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">Total Purchase Return</p>
            <div className="flex items-end gap-2">
              <h3 className="text-2xl font-bold">{formatCurrency(18458747)}</h3>
              <span className="flex items-center text-xs font-medium bg-white/20 px-1.5 py-0.5 rounded-md mb-1 text-white">
                <ArrowDownRight className="w-3 h-3 mr-0.5" /> 22%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Profit', value: formatCurrency(8458798), trend: '+35%', icon: TrendingUp, color: 'text-[#14B8A6]', bg: 'bg-teal-50' },
          { label: 'Invoice Due', value: formatCurrency(4898878), trend: '-19%', icon: FileText, color: 'text-[#14B8A6]', bg: 'bg-teal-50' },
          { label: 'Total Expenses', value: formatCurrency(8980097), trend: '+41%', icon: RefreshCcw, color: 'text-orange-500', bg: 'bg-orange-50' },
          { label: 'Total Payment Returns', value: formatCurrency(78458798), trend: '-20%', icon: CornerDownLeft, color: 'text-purple-500', bg: 'bg-purple-50' },
        ].map((item, idx) => {
          const Icon = item.icon;
          const isPositive = item.trend.startsWith('+');
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{item.value}</h3>
                  <p className="text-sm font-medium text-gray-500">{item.label}</p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.bg} ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className={`flex items-center font-medium ${isPositive ? 'text-[#14B8A6]' : 'text-red-500'}`}>
                  {isPositive ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                  {item.trend} <span className="text-gray-400 font-normal ml-1">vs Last Month</span>
                </div>
                <a href="#" className="font-medium text-gray-900 hover:underline">View All</a>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales & Purchase Chart */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-[#FF9F43]" />
              Sales & Purchase
            </h3>
            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200 text-sm font-medium text-gray-500">
              {['1D', '1W', '1M', '3M', '6M', '1Y'].map(filter => (
                <button key={filter} className={`px-3 py-1 rounded-md transition-colors ${filter === '1Y' ? 'bg-[#FF9F43] text-white' : 'hover:bg-gray-100'}`}>
                  {filter}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <div className="w-3 h-3 rounded-full bg-[#FFE8D6]"></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Purchase</p>
                <p className="font-bold text-gray-900">49K</p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
              <div className="w-3 h-3 rounded-full bg-[#FF9F43]"></div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Total Sales</p>
                <p className="font-bold text-gray-900">38K</p>
              </div>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesPurchaseData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => `${val}K`} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', }} />
                <Bar dataKey="purchase" stackId="a" fill="#FFE8D6" radius={[0, 0, 4, 4]} barSize={32} />
                <Bar dataKey="sales" stackId="a" fill="#FF9F43" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Overall Information */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-6">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            Overall Information
          </h3>
          
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="border border-gray-100 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <Users className="w-5 h-5 text-blue-500 mb-2" />
              <p className="text-xs text-gray-500 font-medium mb-1">Suppliers</p>
              <p className="font-bold text-gray-900">6987</p>
            </div>
            <div className="border border-gray-100 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <UserCircle className="w-5 h-5 text-orange-500 mb-2" />
              <p className="text-xs text-gray-500 font-medium mb-1">Customer</p>
              <p className="font-bold text-gray-900">4896</p>
            </div>
            <div className="border border-gray-100 bg-gray-50 rounded-xl p-3 flex flex-col items-center justify-center text-center">
              <ShoppingCart className="w-5 h-5 text-teal-500 mb-2" />
              <p className="text-xs text-gray-500 font-medium mb-1">Orders</p>
              <p className="font-bold text-gray-900">487</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-gray-900">Customers Overview</h4>
              <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
                <Calendar className="w-3 h-3" /> Today <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center relative min-h-40">
              <div className="w-32 h-32 absolute left-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={customerOverviewData}
                      innerRadius={40}
                      outerRadius={55}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                      cornerRadius={4}
                    >
                      {customerOverviewData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="pl-36 w-full flex flex-col justify-center gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-0.5">5.5K</p>
                    <p className="text-xs text-[#092C4C] font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#092C4C]"></span> First Time</p>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> 25%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-0.5">3.5K</p>
                    <p className="text-xs text-[#FF9F43] font-medium flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#FF9F43]"></span> Return</p>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-1.5 py-0.5 rounded flex items-center">
                    <ArrowUpRight className="w-3 h-3 mr-0.5" /> 21%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 4: Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Package className="w-5 h-5 text-pink-500" /> Top Selling Products
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> Today <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Charger Cable - Lighting', price: '$187', sales: '247+', trend: '25%', img: 'https://images.unsplash.com/photo-1583863788434-e58a36340cf0?w=100' },
              { name: 'Yves Saint Eau De Parfum', price: '$145', sales: '289+', trend: '25%', img: 'https://images.unsplash.com/photo-1523293111678-efa15fee13b7?w=100' },
              { name: 'Apple Airpods 2', price: '$458', sales: '300+', trend: '25%', img: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=100' },
              { name: 'Vacuum Cleaner', price: '$139', sales: '225+', trend: '-21%', img: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=100' },
              { name: 'Samsung Galaxy S21 Fe 5g', price: '$898', sales: '365+', trend: '25%', img: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=100' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.price} • <span className="text-gray-400">{item.sales} Sales</span></p>
                  </div>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded ${item.trend.startsWith('-') ? 'text-red-500 bg-red-50' : 'text-teal-600 bg-teal-50'} flex items-center`}>
                  {item.trend.startsWith('-') ? <ArrowDownRight className="w-3 h-3 mr-0.5" /> : <ArrowUpRight className="w-3 h-3 mr-0.5" />}
                  {item.trend.replace('-', '')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" /> Low Stock Products
            </h3>
            <a href="#" className="text-xs font-medium text-gray-900 hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Vacuum Cleaner Robot', id: '#940004', stock: 21, img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=100' },
              { name: 'Dell XPS 13', id: '#665814', stock: '08', img: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=100' },
              { name: 'KitchenAid Stand Mixer', id: '#325569', stock: 14, img: 'https://images.unsplash.com/photo-1596207891316-248ea3cbbf10?w=100' },
              { name: 'Levi\'s Trucker Jacket', id: '#124588', stock: 12, img: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=100' },
              { name: 'Lay\'s Classic', id: '#365586', stock: 10, img: 'https://images.unsplash.com/photo-1566478989037-e924e526d8ee?w=100' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={item.img} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-400 font-medium">ID : {item.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium mb-1">Instock</p>
                  <p className="text-sm font-bold text-red-500">{item.stock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-blue-500" /> Recent Sales
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> Today <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Apple Watch Series 9', cat: 'Electronics', price: '$640', date: 'Today', status: 'Processing', color: 'bg-blue-500' },
              { name: 'Gold Bracelet', cat: 'Fashion', price: '$126', date: 'Today', status: 'Cancelled', color: 'bg-red-500' },
              { name: 'Parachute Down Duvet', cat: 'Health', price: '$89', date: '15 Jan 2025', status: 'Onhold', color: 'bg-blue-400' },
              { name: 'YETI Rambler Tumbler', cat: 'Sports', price: '$65', date: '12 Jan 2025', status: 'Processing', color: 'bg-purple-500' },
              { name: 'Osmo Genius Starter Kit', cat: 'Lifestyles', price: '$87.56', date: '11 Jan 2025', status: 'Completed', color: 'bg-teal-500' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={`https://source.unsplash.com/100x100/?${item.cat.toLowerCase()},product`} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{item.name}</h4>
                    <p className="text-xs text-gray-500 font-medium">{item.cat} • <span className="text-gray-900">{item.price}</span></p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end gap-1.5">
                  <span className="text-[11px] font-medium text-gray-500">{item.date}</span>
                  <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded-full flex items-center gap-1 ${item.color}`}>
                    <span className="w-1 h-1 rounded-full bg-white/70"></span>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 5: Statics and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Statics */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" /> Sales Statics
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> 2025 <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex gap-4 mb-8">
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-xl flex-1">
              <p className="text-xs text-gray-500 font-medium mb-1">Revenue</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-teal-600">$48,988,078</span>
                <span className="text-[10px] font-bold text-white bg-teal-500 px-1.5 py-0.5 rounded flex items-center">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" /> 25%
                </span>
              </div>
            </div>
            <div className="border border-gray-100 bg-gray-50 p-3 rounded-xl flex-1">
              <p className="text-xs text-gray-500 font-medium mb-1">Expense</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-orange-600">$12,189</span>
                <span className="text-[10px] font-bold text-white bg-red-500 px-1.5 py-0.5 rounded flex items-center">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" /> 59%
                </span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesStaticsData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} tickFormatter={(val) => `${val}K`} />
                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', }} />
                <Bar dataKey="revenue" fill="#14B8A6" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="expense" fill="#F97316" radius={[0, 0, 4, 4]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-red-500" /> Recent Transactions
            </h3>
            <a href="#" className="text-xs font-medium text-gray-900 hover:underline">View All</a>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-4 overflow-x-auto custom-scrollbar">
            {['Sale', 'Purchase', 'Quotation', 'Expenses', 'Invoices'].map((tab, idx) => (
              <button 
                key={tab} 
                className={`px-4 py-2 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${idx === 0 ? 'border-orange-500 text-orange-500' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-hidden">
            <DataTable 
              columns={transactionColumns} 
              data={transactionData} 
            />
          </div>
        </div>
      </div>

      {/* Row 6: Categories and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Customers */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-500" /> Top Customers
            </h3>
            <a href="#" className="text-xs font-medium text-gray-900 hover:underline">View All</a>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Carlos Curran', loc: 'USA', orders: 24, total: '$8965' },
              { name: 'Stan Gaunter', loc: 'UAE', orders: 22, total: '$6985' },
              { name: 'Richard Wilson', loc: 'Germany', orders: 14, total: '$5366' },
              { name: 'Mary Bronson', loc: 'Belgium', orders: 8, total: '$4569' },
              { name: 'Annie Tremblay', loc: 'Greenland', orders: 14, total: '$35,698' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img src={`https://i.pravatar.cc/150?u=${item.name}`} alt={item.name} className="w-10 h-10 rounded-full bg-gray-100" />
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-0.5">{item.name}</h4>
                    <p className="text-[11px] text-gray-500 font-medium flex items-center gap-1">
                      <span className="w-3 h-3 rounded-full bg-gray-200 inline-block overflow-hidden"><img src="https://flagcdn.com/w20/us.png" alt="flag" className="w-full h-full object-cover"/></span>
                      {item.loc} • {item.orders} Orders
                    </p>
                  </div>
                </div>
                <div className="font-bold text-gray-900 text-sm">
                  {item.total}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Categories */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <PieChartIcon className="w-5 h-5 text-pink-500" /> Top Categories
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> Weekly <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col justify-center gap-8">
            <div className="flex items-center justify-center gap-8">
              <div className="w-40 h-40 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={topCategoriesData}
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {topCategoriesData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-4">
                {topCategoriesData.map((cat, idx) => (
                  <div key={idx}>
                    <p className="text-xs text-gray-500 font-medium flex items-center gap-1.5 mb-1">
                      <span className="w-1.5 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      {cat.name}
                    </p>
                    <p className="font-bold text-gray-900 text-sm">{cat.value} <span className="text-gray-400 font-normal">Sales</span></p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Total Number Of Categories
                </p>
                <p className="font-bold text-gray-900">698</p>
              </div>
              <div className="flex justify-between items-center text-sm">
                <p className="text-gray-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span> Total Number Of Products
                </p>
                <p className="font-bold text-gray-900">7899</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Statistics Heatmap Placeholder */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <Box className="w-5 h-5 text-blue-500" /> Order Statistics
            </h3>
            <button className="flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-50 px-2 py-1 rounded border border-gray-200">
              <Calendar className="w-3 h-3" /> Weekly <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            <div className="flex">
              <div className="flex flex-col justify-between text-[10px] text-gray-400 font-medium pr-2 pb-4 h-50">
                <span>12 mp</span>
                <span>12 pm</span>
                <span>02 pm</span>
                <span>12 am</span>
                <span>10 am</span>
                <span>8 am</span>
                <span>6 am</span>
                <span>4 am</span>
                <span>2 am</span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-7 gap-1 h-50">
                  {Array.from({ length: 7 * 9 }).map((_, i) => {
                    const intensity = ((i * 13 + 7) % 10) / 10;
                    let bg = 'bg-[#FFE8D6]';
                    if (intensity > 0.8) bg = 'bg-[#092C4C]';
                    else if (intensity > 0.5) bg = 'bg-[#FF9F43]';
                    else if (intensity > 0.3) bg = 'bg-[#FFAD61]';
                    
                    return <div key={i} className={`rounded-sm ${bg} hover:opacity-80 transition-opacity cursor-pointer`}></div>
                  })}
                </div>
                <div className="grid grid-cols-7 gap-1 mt-2 text-[10px] text-center text-gray-400 font-medium">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thur</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
