'use client';

import React from 'react';
import { 
  Search, RefreshCcw, Eye, Edit, Trash2, Plus, Users, Briefcase
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatsCard } from '@/components/shared/StatsCard';
import { FilterCard } from '@/components/shared/FilterCard';
import { Input } from '@/components/ui/input';

const employeeData = [
  { id: 'EMP001', name: 'Mitchael Clerk', email: 'mitchael@example.com', phone: '+12163547758', department: 'Sales', designation: 'Manager', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'EMP002', name: 'Janet Stem', email: 'janet@example.com', phone: '+11367529510', department: 'Inventory', designation: 'Supervisor', status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'EMP003', name: 'Robert Lamon', email: 'robert@example.com', phone: '+15362789414', department: 'HR', designation: 'Admin', status: 'Inactive', color: 'bg-red-100 text-red-600' },
];

export default function EmployeeList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employees" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM' },
          { label: 'Employees' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Employee
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
          label="Total Employees" 
          value="124" 
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
        />
        <StatsCard 
          label="Departments" 
          value="8" 
          icon={Briefcase}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50"
        />
        <StatsCard 
          label="Active Staff" 
          value="118" 
          icon={Users}
          iconColor="text-green-600"
          iconBg="bg-green-50"
        />
      </div>

      <FilterCard onGenerate={() => {}} buttonLabel="Filter">
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Department</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Departments</option>
            <option>Sales</option>
            <option>Inventory</option>
            <option>HR</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-sm font-medium text-gray-700">Status</label>
          <select className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-orange-500 h-10 bg-white">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </FilterCard>

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Employee Directory</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Input placeholder="Search..." className="pl-10 h-9" />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-700 bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="p-4 font-bold">Employee ID</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Department</th>
                <th className="p-4 font-bold">Designation</th>
                <th className="p-4 font-bold">Phone</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {employeeData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?u=${row.email}`} alt={row.name} className="w-8 h-8 rounded-full bg-gray-100" />
                      <div>
                        <p className="font-bold text-gray-900">{row.name}</p>
                        <p className="text-[11px] text-gray-500">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500">{row.department}</td>
                  <td className="p-4 text-gray-500">{row.designation}</td>
                  <td className="p-4 text-gray-500">{row.phone}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[11px] font-bold ${row.color}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-green-500 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
