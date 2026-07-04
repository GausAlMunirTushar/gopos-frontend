import type { ResourceField } from '@/components/shared/ResourceCreateModal';

export const actionButtonClassName =
  'flex items-center gap-2 px-4 py-2 bg-[#FF9F43] hover:bg-[#ff9021] text-white rounded-lg font-medium transition-colors';

export const contactFields = (type: 'CUSTOMER' | 'SUPPLIER' | 'BILLER'): ResourceField[] => [
  { name: 'type', label: 'Type', type: 'hidden', defaultValue: type },
  { name: 'code', label: 'Code', required: true, placeholder: `${type.slice(0, 2)}001` },
  { name: 'name', label: 'Name', required: true, placeholder: 'Contact name' },
  { name: 'companyName', label: 'Company', placeholder: 'Company name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'name@example.com' },
  { name: 'phone', label: 'Phone', placeholder: '+880...' },
  { name: 'country', label: 'Country', placeholder: 'Bangladesh' },
  { name: 'city', label: 'City', placeholder: 'Dhaka' },
  { name: 'openingBalance', label: 'Opening Balance', type: 'number', defaultValue: 0 },
  { name: 'creditLimit', label: 'Credit Limit', type: 'number' },
  { name: 'addressLine1', label: 'Address', type: 'textarea', placeholder: 'Street address' },
  { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Optional notes' },
];

export const locationFields = (type: 'STORE' | 'WAREHOUSE'): ResourceField[] => [
  { name: 'type', label: 'Type', type: 'hidden', defaultValue: type },
  { name: 'code', label: 'Code', required: true, placeholder: `${type.slice(0, 2)}001` },
  { name: 'name', label: 'Name', required: true, placeholder: `${type === 'STORE' ? 'Store' : 'Warehouse'} name` },
  { name: 'contactPerson', label: 'Contact Person', placeholder: 'Manager name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'location@example.com' },
  { name: 'phone', label: 'Phone', placeholder: '+880...' },
  { name: 'country', label: 'Country', placeholder: 'Bangladesh' },
  { name: 'city', label: 'City', placeholder: 'Dhaka' },
  { name: 'addressLine1', label: 'Address', type: 'textarea', placeholder: 'Location address' },
];

export const categoryFields: ResourceField[] = [
  { name: 'code', label: 'Code', placeholder: 'CAT001' },
  { name: 'name', label: 'Name', required: true, placeholder: 'Category name' },
  { name: 'slug', label: 'Slug', placeholder: 'category-name' },
  { name: 'sortOrder', label: 'Sort Order', type: 'number', defaultValue: 0 },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const brandFields: ResourceField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Brand name' },
  { name: 'slug', label: 'Slug', placeholder: 'brand-name' },
  { name: 'logoUrl', label: 'Logo URL', placeholder: 'https://...' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const unitFields: ResourceField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Pieces' },
  { name: 'shortName', label: 'Short Name', required: true, placeholder: 'pcs' },
  { name: 'allowDecimal', label: 'Allow Decimal', type: 'checkbox', placeholder: 'Allow fractional quantities' },
];

export const warrantyFields: ResourceField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Replacement Warranty' },
  { name: 'duration', label: 'Duration', type: 'number', required: true, defaultValue: 1 },
  {
    name: 'durationUnit',
    label: 'Duration Unit',
    type: 'select',
    required: true,
    defaultValue: 'YEARS',
    options: [
      { label: 'Days', value: 'DAYS' },
      { label: 'Months', value: 'MONTHS' },
      { label: 'Years', value: 'YEARS' },
    ],
  },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const variantFields: ResourceField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Color' },
  {
    name: 'values',
    label: 'Values',
    placeholder: 'Red, Blue, Green',
  },
];

export const bankFields: ResourceField[] = [
  { name: 'code', label: 'Code', required: true, placeholder: 'BNK001' },
  { name: 'bankName', label: 'Bank Name', required: true, placeholder: 'City Bank' },
  { name: 'accountName', label: 'Account Name', required: true, placeholder: 'Main Account' },
  { name: 'accountNumber', label: 'Account Number', required: true, placeholder: '1234567890' },
  { name: 'branchName', label: 'Branch', placeholder: 'Dhaka' },
  { name: 'openingBalance', label: 'Opening Balance', type: 'number', defaultValue: 0 },
  { name: 'currentBalance', label: 'Current Balance', type: 'number', defaultValue: 0 },
];

export const departmentFields: ResourceField[] = [
  { name: 'code', label: 'Code', required: true, placeholder: 'SLS' },
  { name: 'name', label: 'Name', required: true, placeholder: 'Sales' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const designationFields: ResourceField[] = [
  { name: 'name', label: 'Name', required: true, placeholder: 'Manager' },
  { name: 'description', label: 'Description', type: 'textarea' },
];

export const employeeFields: ResourceField[] = [
  { name: 'employeeNumber', label: 'Employee Number', required: true, placeholder: 'EMP001' },
  { name: 'name', label: 'Name', required: true, placeholder: 'Employee name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'employee@example.com' },
  { name: 'phone', label: 'Phone', placeholder: '+880...' },
  { name: 'joinedAt', label: 'Joined Date', type: 'text', placeholder: '2026-06-29' },
  { name: 'salary', label: 'Salary', type: 'number' },
  { name: 'address', label: 'Address', type: 'textarea' },
];
