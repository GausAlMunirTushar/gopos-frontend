'use client';

import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChevronRight, RefreshCcw, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';

interface OptionRecord {
  id: string;
  name: string;
  shortName?: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const toNumber = (value: FormDataEntryValue | null, fallback = 0) => {
  const numeric = Number(value ?? fallback);
  return Number.isFinite(numeric) ? numeric : fallback;
};

const useOptions = (key: string, endpoint: string) =>
  useQuery({
    queryKey: [key],
    queryFn: async () =>
      apiClient.get<OptionRecord[]>(endpoint, {
        page: 1,
        limit: 100,
        sortBy: 'name',
        sortOrder: 'asc',
      }),
  });

export default function CreateProductPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');

  const categoriesQuery = useOptions('product-categories', apiEndpoints.inventory.categories);
  const brandsQuery = useOptions('product-brands', apiEndpoints.inventory.brands);
  const unitsQuery = useOptions('product-units', apiEndpoints.inventory.units);
  const warrantiesQuery = useOptions('product-warranties', apiEndpoints.inventory.warranties);

  const generatedSlug = useMemo(() => slugify(name), [name]);

  const createProduct = useMutation({
    mutationFn: async (payload: Record<string, unknown>) =>
      apiClient.post(apiEndpoints.inventory.products, payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.products] });
      router.push('/inventory/products');
    },
    onError: (caught) => {
      setError(caught instanceof Error ? caught.message : 'Unable to create product');
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const unitId = String(formData.get('unitId') ?? '');
    const productName = String(formData.get('name') ?? '').trim();

    if (!unitId) {
      setError('Unit is required before creating a product.');
      return;
    }
    if (!productName) {
      setError('Product name is required.');
      return;
    }

    const payload = {
      name: productName,
      slug: String(formData.get('slug') || slugify(productName)),
      categoryId: String(formData.get('categoryId') || '') || undefined,
      brandId: String(formData.get('brandId') || '') || undefined,
      unitId,
      warrantyId: String(formData.get('warrantyId') || '') || undefined,
      productType: formData.get('productType') || 'STANDARD',
      description: String(formData.get('description') || '') || undefined,
      manufacturer: String(formData.get('manufacturer') || '') || undefined,
      imageUrls: [],
      taxType: formData.get('taxType') || 'EXCLUSIVE',
      taxRate: toNumber(formData.get('taxRate')),
      discountType: String(formData.get('discountType') || '') || undefined,
      discountValue: toNumber(formData.get('discountValue')),
      reorderLevel: toNumber(formData.get('reorderLevel')),
      trackInventory: formData.get('trackInventory') === 'on',
      trackExpiry: formData.get('trackExpiry') === 'on',
      status: 'ACTIVE',
      sku: String(formData.get('sku') || `SKU-${Date.now()}`),
      barcode: String(formData.get('barcode') || '') || undefined,
      purchasePrice: toNumber(formData.get('purchasePrice')),
      sellingPrice: toNumber(formData.get('sellingPrice')),
      wholesalePrice: toNumber(formData.get('wholesalePrice')),
    };

    createProduct.mutate(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Product</h1>
          <div className="text-sm text-gray-500 flex items-center gap-2">
            <NextLink href="/dashboard" className="hover:text-orange-500 transition-colors">
              Dashboard
            </NextLink>
            <ChevronRight className="w-3 h-3" />
            <NextLink href="/inventory/products" className="hover:text-orange-500 transition-colors">
              Products
            </NextLink>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-900 font-medium">Create Product</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="reset"
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white"
          >
            <RefreshCcw className="w-5 h-5" />
          </button>
          <NextLink href="/inventory/products">
            <Button type="button" variant="outline">Back to Products</Button>
          </NextLink>
        </div>
      </div>

      {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">{error}</div>}

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-bold text-gray-900">Product Information</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Product Name *</span>
            <Input
              name="name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                if (!sku) setSku(`SKU-${slugify(event.target.value).toUpperCase().slice(0, 16)}`);
              }}
              required
            />
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Slug</span>
            <Input name="slug" defaultValue={generatedSlug} key={generatedSlug} />
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">SKU *</span>
            <Input name="sku" value={sku} onChange={(event) => setSku(event.target.value)} required />
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Barcode</span>
            <Input name="barcode" />
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Category</span>
            <Select name="categoryId">
              <option value="">Select category</option>
              {categoriesQuery.data?.data.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Select>
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Brand</span>
            <Select name="brandId">
              <option value="">Select brand</option>
              {brandsQuery.data?.data.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </Select>
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Unit *</span>
            <Select name="unitId" required>
              <option value="">Select unit</option>
              {unitsQuery.data?.data.map((unit) => (
                <option key={unit.id} value={unit.id}>
                  {unit.name}{unit.shortName ? ` (${unit.shortName})` : ''}
                </option>
              ))}
            </Select>
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Warranty</span>
            <Select name="warrantyId">
              <option value="">No warranty</option>
              {warrantiesQuery.data?.data.map((warranty) => (
                <option key={warranty.id} value={warranty.id}>{warranty.name}</option>
              ))}
            </Select>
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Product Type</span>
            <Select name="productType" defaultValue="STANDARD">
              <option value="STANDARD">Standard</option>
              <option value="VARIABLE">Variable</option>
              <option value="SERVICE">Service</option>
            </Select>
          </label>

          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Manufacturer</span>
            <Input name="manufacturer" />
          </label>

          <label className="md:col-span-2">
            <span className="block text-sm font-medium text-gray-700 mb-2">Description</span>
            <textarea
              name="description"
              className="min-h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#FF9F43]"
            />
          </label>
        </div>
      </section>

      <section className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
        <div className="border-b border-gray-100 p-4">
          <h3 className="font-bold text-gray-900">Pricing, Tax & Inventory</h3>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</span>
            <Input name="purchasePrice" type="number" min="0" step="0.01" defaultValue="0" />
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Selling Price *</span>
            <Input name="sellingPrice" type="number" min="0" step="0.01" defaultValue="0" required />
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Wholesale Price</span>
            <Input name="wholesalePrice" type="number" min="0" step="0.01" />
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Tax Type</span>
            <Select name="taxType" defaultValue="EXCLUSIVE">
              <option value="EXCLUSIVE">Exclusive</option>
              <option value="INCLUSIVE">Inclusive</option>
            </Select>
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Tax Rate %</span>
            <Input name="taxRate" type="number" min="0" max="100" step="0.01" defaultValue="0" />
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Reorder Level</span>
            <Input name="reorderLevel" type="number" min="0" step="0.01" defaultValue="0" />
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Discount Type</span>
            <Select name="discountType">
              <option value="">No discount</option>
              <option value="FIXED">Fixed</option>
              <option value="PERCENTAGE">Percentage</option>
            </Select>
          </label>
          <label>
            <span className="block text-sm font-medium text-gray-700 mb-2">Discount Value</span>
            <Input name="discountValue" type="number" min="0" step="0.01" defaultValue="0" />
          </label>
          <div className="flex flex-col justify-end gap-3">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input name="trackInventory" type="checkbox" defaultChecked className="accent-orange-500" />
              Track inventory
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input name="trackExpiry" type="checkbox" className="accent-orange-500" />
              Track expiry
            </label>
          </div>
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white border-t border-gray-200 p-4 z-10 flex justify-end gap-3">
        <NextLink href="/inventory/products">
          <Button type="button" variant="outline">Cancel</Button>
        </NextLink>
        <Button
          type="submit"
          disabled={createProduct.isPending}
          className="bg-[#FF9F43] hover:bg-[#ff9021] text-white"
        >
          <Save className="mr-2 h-4 w-4" />
          {createProduct.isPending ? 'Saving...' : 'Add Product'}
        </Button>
      </div>
    </form>
  );
}
