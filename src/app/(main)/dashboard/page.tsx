'use client';

import React from 'react';
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const salesData = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3400 },
  { name: 'Apr', total: 2900 },
  { name: 'May', total: 4500 },
  { name: 'Jun', total: 5800 },
  { name: 'Jul', total: 5100 },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'John Doe', date: 'Today, 10:23 AM', status: 'Completed', amount: '$120.00' },
  { id: '#ORD-002', customer: 'Sarah Smith', date: 'Today, 09:45 AM', status: 'Pending', amount: '$45.50' },
  { id: '#ORD-003', customer: 'Michael Brown', date: 'Yesterday', status: 'Completed', amount: '$230.00' },
  { id: '#ORD-004', customer: 'Emily White', date: 'Yesterday', status: 'Cancelled', amount: '$15.00' },
  { id: '#ORD-005', customer: 'James Wilson', date: 'Oct 24, 2023', status: 'Completed', amount: '$85.00' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back, here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">Export Report</Button>
          <Button className="bg-[#FF9F43] hover:bg-orange-500 text-white">Add New Sale</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF9F43]">
                <DollarSign className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-4 h-4" />
                12.5%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">$24,500.00</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-4 h-4" />
                8.2%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">1,245</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-500">
                <Package className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-red-600 text-sm font-medium bg-red-50 px-2 py-1 rounded-full">
                <ArrowDownRight className="w-4 h-4" />
                3.1%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">8,432</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-500">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-1 text-green-600 text-sm font-medium bg-green-50 px-2 py-1 rounded-full">
                <ArrowUpRight className="w-4 h-4" />
                15.3%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-500">New Customers</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-1">345</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF9F43" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FF9F43" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dx={-10} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="#FF9F43" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Recent Orders</CardTitle>
            <Button variant="link" className="text-[#FF9F43] p-0 h-auto">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{order.customer}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-500">{order.id}</span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500">{order.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900 text-sm">{order.amount}</p>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      order.status === 'Completed' ? 'bg-green-50 text-green-600' :
                      order.status === 'Pending' ? 'bg-orange-50 text-orange-600' :
                      'bg-red-50 text-red-600'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
