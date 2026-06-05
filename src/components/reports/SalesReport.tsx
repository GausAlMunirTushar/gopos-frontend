'use client';

import { 
  Search, FileText, RefreshCcw, ChevronUp, ChevronRight, ChevronDown,
  FileSpreadsheet, Calendar, TrendingUp, Users, Package
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';

const salesData = [
  { sku: 'PT001', name: 'Lenovo IdeaPad 3', brand: 'Lenovo', category: 'Computers', soldQty: '05', soldAmount: '$3000', instock: '100', img: 'laptop' },
  { sku: 'PT002', name: 'Beats Pro', brand: 'Beats', category: 'Electronics', soldQty: '10', soldAmount: '$1600', instock: '140', img: 'headphones' },
  { sku: 'PT003', name: 'Nike Jordan', brand: 'Nike', category: 'Shoe', soldQty: '08', soldAmount: '$880', instock: '300', img: 'shoes' },
  { sku: 'PT004', name: 'Apple Series 5 Watch', brand: 'Apple', category: 'Electronics', soldQty: '10', soldAmount: '$1200', instock: '450', img: 'watch' },
  { sku: 'PT005', name: 'Amazon Echo Dot', brand: 'Amazon', category: 'Electronics', soldQty: '05', soldAmount: '$400', instock: '320', img: 'speaker' },
  { sku: 'PT006', name: 'Sanford Chair Sofa', brand: 'Modern Wave', category: 'Furniture', soldQty: '07', soldAmount: '$2240', instock: '650', img: 'chair' },
  { sku: 'PT007', name: 'Red Premium Satchel', brand: 'Dior', category: 'Bags', soldQty: '15', soldAmount: '$900', instock: '700', img: 'bag' },
];

export default function SalesReport() {
  return (
    <div className="space-y-6">
      
      <PageHeader 
        title="Sales Report" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reports', href: '/reports' },
          { label: 'Sales Report' }
        ]}
        actions={
          <>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white transition-colors">
               <RefreshCcw className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white transition-colors">
               <ChevronUp className="w-5 h-5" />
            </button>
          </>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="New Sales" 
          value="$40,565,000" 
          trend="25.5%" 
          trendType="up"
          icon={TrendingUp}
          iconColor="text-teal-600"
          iconBg="bg-teal-50"
        />
        <StatsCard 
          label="Total Orders" 
          value="8,690" 
          trend="12.2%" 
          trendType="up"
          icon={Package}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard 
          label="Total Customers" 
          value="4,558" 
          trend="16.3%" 
          trendType="up"
          icon={Users}
          iconColor="text-pink-600"
          iconBg="bg-pink-50"
        />
        <StatsCard 
          label="Units Sold" 
          value="865" 
          trend="12.2%" 
          trendType="down"
          icon={Package}
          iconColor="text-orange-500"
          iconBg="bg-orange-50"
        />
      </div>

      {/* Filters Form */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 flex flex-col md:flex-row gap-6">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Choose Date</label>
          <div className="relative">
            <input type="text" placeholder="01-Jan-2025 - 12-Dec-2025" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500" />
            <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
          </div>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Store</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Products</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500">
            <option>All</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="px-6 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors h-10">
            Generate Report
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-gray-200 rounded-2xl">
        
        {/* Table Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Sales Report</h3>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-red-500 hover:bg-gray-50 bg-white">
              <FileText className="w-4 h-4" />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-green-600 hover:bg-gray-50 bg-white">
              <FileSpreadsheet className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold">SKU ↑↓</th>
                <th className="p-4 font-bold">Product Name</th>
                <th className="p-4 font-bold">Brand</th>
                <th className="p-4 font-bold">Category</th>
                <th className="p-4 font-bold">Sold Qty ↑↓</th>
                <th className="p-4 font-bold">Sold Amount ↑↓</th>
                <th className="p-4 font-bold">Instock Qty ↑↓</th>
              </tr>
            </thead>
            <tbody>
              {salesData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-gray-500">{row.sku}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://source.unsplash.com/100x100/?${row.img}&sig=${i}`} alt={row.name} className="w-8 h-8 rounded-md object-cover bg-gray-100" />
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.brand}</td>
                  <td className="p-4 text-gray-500">{row.category}</td>
                  <td className="p-4 text-gray-500">{row.soldQty}</td>
                  <td className="p-4 text-gray-500">{row.soldAmount}</td>
                  <td className="p-4 text-gray-500">{row.instock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
