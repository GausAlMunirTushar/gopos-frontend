'use client';

import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Stock Transfer"
        description="Transfer stock between two stores or warehouses atomically with real-time balance updates."
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">From Location *</span>
              <Select name="sourceLocationId" required>
                <option value="">Select source location</option>
                {locations.data?.data.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </Select>
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">To Location *</span>
              <Select name="destinationLocationId" required>
                <option value="">Select destination location</option>
                {locations.data?.data.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </Select>
            </label>
            <label className="md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product Variant *</span>
              <Select name="variantId" required>
                <option value="">Select product variant</option>
                {variants.data?.data.map((variant) => (
                  <option key={variant.id} value={variant.id}>{variantLabel(variant)}</option>
                ))}
              </Select>
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Quantity *</span>
              <Input name="quantity" type="number" min="0.0001" step="0.0001" placeholder="Quantity" required />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Reference / Transfer #</span>
              <Input name="reference" placeholder="Auto-generated if empty" />
            </label>
            <label className="md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Note / Reason</span>
              <textarea
                name="note"
                rows={2}
                placeholder="Additional notes..."
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-[#FF9F43] transition-colors"
              />
            </label>
            {error && (
              <div className="md:col-span-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-200">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={mutation.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021] text-white px-5 rounded-xl font-medium shadow-xs">
              {mutation.isPending ? 'Posting...' : 'Post Transfer'}
            </Button>
          </div>
        </form>
      </Modal>
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

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Stock Adjustment"
        description="Set the physical counted quantity for a product lot at a specific warehouse or store location."
        size="xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Physical Counted Qty *</span>
              <Input name="countedQty" type="number" min="0" step="0.0001" placeholder="Actual quantity" required />
            </label>
            <label className="md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product Variant *</span>
              <Select name="variantId" required>
                <option value="">Select product variant</option>
                {variants.data?.data.map((variant) => (
                  <option key={variant.id} value={variant.id}>{variantLabel(variant)}</option>
                ))}
              </Select>
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Reference / Document</span>
              <Input name="reference" placeholder="Auto-generated if empty" />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Adjustment Reason</span>
              <Input name="reason" placeholder="e.g. Annual Audit, Damaged Stock" />
            </label>
            {error && (
              <div className="md:col-span-2 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600 border border-red-200">
                {error}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button type="submit" disabled={mutation.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021] text-white px-5 rounded-xl font-medium shadow-xs">
              {mutation.isPending ? 'Posting...' : 'Post Adjustment'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
