'use client';

import React from 'react';
import { 
  Search, Eye, Edit, Trash2, Plus, Briefcase
} from 'lucide-react';
import { PageHeader } from '@/components/shared/PageHeader';
import { Input } from '@/components/ui/input';

const departmentData = [
  { id: 'DPT001', name: 'Sales', code: 'SLS', employeeCount: 24, status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DPT002', name: 'Inventory', code: 'INV', employeeCount: 15, status: 'Active', color: 'bg-green-100 text-green-600' },
  { id: 'DPT003', name: 'HR', code: 'HRM', employeeCount: 5, status: 'Active', color: 'bg-green-100 text-green-600' },
];

export default function DepartmentList() {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Departments" 
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'HRM', href: '/hrm/employees' },
          { label: 'Departments' }
        ]}
        actions={
          <button className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Plus className="w-4 h-4" /> Add Department
          </button>
        }
      />

      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-900 text-lg">Departments</h3>
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
                <th className="p-4 font-bold">Dept ID</th>
                <th className="p-4 font-bold">Name</th>
                <th className="p-4 font-bold">Code</th>
                <th className="p-4 font-bold">Employees</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {departmentData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 text-[#FF9F43] font-medium">{row.id}</td>
                  <td className="p-4 font-bold text-gray-900">{row.name}</td>
                  <td className="p-4 text-gray-500">{row.code}</td>
                  <td className="p-4 text-gray-500">{row.employeeCount}</td>
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
