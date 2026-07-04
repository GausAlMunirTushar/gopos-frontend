'use client';

import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { apiClient } from '@/lib/api/client';
import { apiEndpoints } from '@/lib/api/endpoints';

interface LocationOption {
  id: string;
  name: string;
}

interface VariantOption {
  id: string;
  sku: string;
  name?: string | null;
  product?: { name: string } | null;
}

interface StockModalProps {
  children: ReactNode;
  buttonClassName: string;
}

const toNumber = (value: FormDataEntryValue | null) => {
  const numeric = Number(value ?? 0);
  return Number.isFinite(numeric) ? numeric : 0;
};

const useStockOptions = () => {
  const locations = useQuery({
    queryKey: ['stock-form-locations'],
    queryFn: async () =>
      apiClient.get<LocationOption[]>('/locations', {
        page: 1,
        limit: 100,
        sortBy: 'name',
        sortOrder: 'asc',
      }),
  });
  const variants = useQuery({
    queryKey: ['stock-form-variants'],
    queryFn: async () =>
      apiClient.get<VariantOption[]>(apiEndpoints.sales.posProducts, {
        page: 1,
        limit: 200,
        sortBy: 'createdAt',
        sortOrder: 'desc',
      }),
  });

  return { locations, variants };
};

const variantLabel = (variant: VariantOption) =>
  `${variant.product?.name ?? variant.name ?? 'Product'} (${variant.sku})`;

export function StockTransferCreateModal({ children, buttonClassName }: StockModalProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { locations, variants } = useStockOptions();

  const mutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) =>
      apiClient.post(apiEndpoints.inventory.stockTransfers, payload),
    onSuccess: () => {
      setIsOpen(false);
      setError(null);
      void queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.stockTransfers] });
      void queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.balances] });
      void queryClient.invalidateQueries({ queryKey: ['pos-products'] });
    },
    onError: (caught) => setError(caught instanceof Error ? caught.message : 'Unable to post transfer'),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate({
      sourceLocationId: String(formData.get('sourceLocationId') ?? ''),
      destinationLocationId: String(formData.get('destinationLocationId') ?? ''),
      reference: String(formData.get('reference') || '') || undefined,
      note: String(formData.get('note') || '') || undefined,
      status: 'COMPLETED',
      items: [
        {
          variantId: String(formData.get('variantId') ?? ''),
          quantity: toNumber(formData.get('quantity')),
        },
      ],
    });
  };

  return (
    <>
      <button type="button" className={buttonClassName} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add Stock Transfer</h2>
                <p className="mt-1 text-sm text-gray-500">Transfer stock between two locations atomically.</p>
              </div>
              <button type="button" className="rounded-lg p-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">From Location *</span>
                <Select name="sourceLocationId" required>
                  <option value="">Select source</option>
                  {locations.data?.data.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </Select>
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">To Location *</span>
                <Select name="destinationLocationId" required>
                  <option value="">Select destination</option>
                  {locations.data?.data.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </Select>
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product Variant *</span>
                <Select name="variantId" required>
                  <option value="">Select product</option>
                  {variants.data?.data.map((variant) => (
                    <option key={variant.id} value={variant.id}>{variantLabel(variant)}</option>
                  ))}
                </Select>
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Quantity *</span>
                <Input name="quantity" type="number" min="0.0001" step="0.0001" required />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Reference</span>
                <Input name="reference" placeholder="Auto-generated if empty" />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Note</span>
                <textarea name="note" className="min-h-20 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
              </label>
              {error && <div className="md:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-100 p-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021]">
                {mutation.isPending ? 'Posting...' : 'Post Transfer'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export function StockAdjustmentCreateModal({ children, buttonClassName }: StockModalProps) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { locations, variants } = useStockOptions();

  const locationOptions = useMemo(() => locations.data?.data ?? [], [locations.data?.data]);

  const mutation = useMutation({
    mutationFn: async (payload: Record<string, unknown>) =>
      apiClient.post(apiEndpoints.inventory.stockAdjustments, payload),
    onSuccess: () => {
      setIsOpen(false);
      setError(null);
      void queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.stockAdjustments] });
      void queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.balances] });
      void queryClient.invalidateQueries({ queryKey: ['pos-products'] });
    },
    onError: (caught) =>
      setError(caught instanceof Error ? caught.message : 'Unable to post adjustment'),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    mutation.mutate({
      locationId: String(formData.get('locationId') ?? ''),
      reference: String(formData.get('reference') || '') || undefined,
      reason: String(formData.get('reason') || '') || undefined,
      status: 'POSTED',
      items: [
        {
          variantId: String(formData.get('variantId') ?? ''),
          countedQty: toNumber(formData.get('countedQty')),
        },
      ],
    });
  };

  return (
    <>
      <button type="button" className={buttonClassName} onClick={() => setIsOpen(true)}>
        {children}
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <form onSubmit={handleSubmit} className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Add Stock Adjustment</h2>
                <p className="mt-1 text-sm text-gray-500">Set the counted quantity for a product at a location.</p>
              </div>
              <button type="button" className="rounded-lg p-2 hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2">
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Location *</span>
                <Select name="locationId" required>
                  <option value="">Select location</option>
                  {locationOptions.map((location) => (
                    <option key={location.id} value={location.id}>{location.name}</option>
                  ))}
                </Select>
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Counted Qty *</span>
                <Input name="countedQty" type="number" min="0" step="0.0001" required />
              </label>
              <label className="md:col-span-2">
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product Variant *</span>
                <Select name="variantId" required>
                  <option value="">Select product</option>
                  {variants.data?.data.map((variant) => (
                    <option key={variant.id} value={variant.id}>{variantLabel(variant)}</option>
                  ))}
                </Select>
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Reference</span>
                <Input name="reference" placeholder="Auto-generated if empty" />
              </label>
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Reason</span>
                <Input name="reason" />
              </label>
              {error && <div className="md:col-span-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-100 p-6">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={mutation.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021]">
                {mutation.isPending ? 'Posting...' : 'Post Adjustment'}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
