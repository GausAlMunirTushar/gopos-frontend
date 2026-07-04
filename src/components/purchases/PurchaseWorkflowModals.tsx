'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useApiResource, useCreateApiResource } from '@/hooks/api/useApiResource';
import { apiEndpoints } from '@/lib/api/endpoints';

interface OptionRecord {
  id: string;
  name?: string;
  bankName?: string;
  accountName?: string;
  sku?: string;
  product?: { name?: string };
}

interface PurchaseWorkflowModalProps {
  mode: 'PURCHASE' | 'ORDER';
}

const toNumber = (value: FormDataEntryValue | null) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

/** Creates a purchase or purchase order with one line item through domain endpoints. */
export function PurchaseWorkflowModal({ mode }: PurchaseWorkflowModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const endpoint =
    mode === 'PURCHASE'
      ? apiEndpoints.purchasing.purchases
      : apiEndpoints.purchasing.purchaseOrders;
  const createDocument = useCreateApiResource<Record<string, unknown>, unknown>(endpoint);
  const suppliersQuery = useApiResource<OptionRecord>(apiEndpoints.people.suppliers, { limit: 100 });
  const storesQuery = useApiResource<OptionRecord>(apiEndpoints.people.stores, { limit: 100 });
  const warehousesQuery = useApiResource<OptionRecord>(apiEndpoints.people.warehouses, { limit: 100 });
  const productsQuery = useApiResource<OptionRecord>(apiEndpoints.sales.posProducts, { limit: 100 });
  const banksQuery = useApiResource<OptionRecord>(apiEndpoints.finance.banks, { limit: 100 });

  const locations = useMemo(
    () => [...(storesQuery.data?.data ?? []), ...(warehousesQuery.data?.data ?? [])],
    [storesQuery.data?.data, warehousesQuery.data?.data],
  );
  const suppliers = suppliersQuery.data?.data ?? [];
  const products = productsQuery.data?.data ?? [];
  const banks = banksQuery.data?.data ?? [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const formData = new FormData(event.currentTarget);
    const quantity = toNumber(formData.get('quantity'));
    const unitCost = toNumber(formData.get('unitCost'));
    const discount = toNumber(formData.get('discount'));
    const tax = toNumber(formData.get('tax'));
    const commonPayload = {
      supplierId: String(formData.get('supplierId') ?? ''),
      locationId: String(formData.get('locationId') ?? ''),
      discountTotal: 0,
      taxTotal: 0,
      shippingTotal: toNumber(formData.get('shippingTotal')),
      note: String(formData.get('note') ?? '') || undefined,
      items: [
        {
          variantId: String(formData.get('variantId') ?? ''),
          quantity,
          unitCost,
          discount,
          tax,
          batchNumber: String(formData.get('batchNumber') ?? '') || undefined,
          expiresAt: String(formData.get('expiresAt') ?? '') || undefined,
        },
      ],
    };
    const payload =
      mode === 'PURCHASE'
        ? {
            ...commonPayload,
            supplierInvoice: String(formData.get('supplierInvoice') ?? '') || undefined,
            purchaseDate: String(formData.get('documentDate') ?? ''),
            status: 'RECEIVED',
            payments: toNumber(formData.get('paymentAmount')) > 0
              ? [
                  {
                    method: String(formData.get('paymentMethod') ?? 'CASH'),
                    amount: toNumber(formData.get('paymentAmount')),
                    bankAccountId: String(formData.get('bankAccountId') ?? '') || undefined,
                  },
                ]
              : [],
          }
        : {
            ...commonPayload,
            orderDate: String(formData.get('documentDate') ?? ''),
            expectedAt: String(formData.get('expectedAt') ?? '') || undefined,
            status: 'SENT',
          };

    try {
      await createDocument.mutateAsync(payload);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [endpoint] }),
        queryClient.invalidateQueries({ queryKey: [apiEndpoints.inventory.balances] }),
        queryClient.invalidateQueries({ queryKey: [apiEndpoints.sales.posProducts] }),
      ]);
      event.currentTarget.reset();
      setIsOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to save purchase document');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" /> {mode === 'PURCHASE' ? 'Add Purchase' : 'Create Order'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {mode === 'PURCHASE' ? 'Receive Purchase' : 'Create Purchase Order'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {mode === 'PURCHASE'
                    ? 'Received purchases immediately increase stock.'
                    : 'Purchase orders do not change stock until converted.'}
                </p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-gray-400 hover:bg-gray-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Supplier *</span>
                  <Select name="supplierId" required>
                    <option value="">Select supplier</option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                    ))}
                  </Select>
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Location *</span>
                  <Select name="locationId" required>
                    <option value="">Select location</option>
                    {locations.map((location) => (
                      <option key={location.id} value={location.id}>{location.name}</option>
                    ))}
                  </Select>
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Date *</span>
                  <Input name="documentDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
                </label>
                {mode === 'ORDER' ? (
                  <label>
                    <span className="mb-1.5 block text-sm font-semibold text-gray-700">Expected Date</span>
                    <Input name="expectedAt" type="date" />
                  </label>
                ) : (
                  <label>
                    <span className="mb-1.5 block text-sm font-semibold text-gray-700">Supplier Invoice</span>
                    <Input name="supplierInvoice" placeholder="Invoice/reference" />
                  </label>
                )}
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product Variant *</span>
                  <Select name="variantId" required>
                    <option value="">Select product</option>
                    {products.map((variant) => (
                      <option key={variant.id} value={variant.id}>
                        {variant.product?.name ?? 'Product'} {variant.sku ? `(${variant.sku})` : ''}
                      </option>
                    ))}
                  </Select>
                </label>
                <Input name="quantity" type="number" min="0.01" step="0.01" placeholder="Quantity" required />
                <Input name="unitCost" type="number" min="0" step="0.01" placeholder="Unit cost" required />
                <Input name="discount" type="number" min="0" step="0.01" placeholder="Line discount" defaultValue="0" />
                <Input name="tax" type="number" min="0" step="0.01" placeholder="Line tax" defaultValue="0" />
                <Input name="batchNumber" placeholder="Batch number" />
                <Input name="expiresAt" type="date" />
                <Input name="shippingTotal" type="number" min="0" step="0.01" placeholder="Shipping" defaultValue="0" />
                {mode === 'PURCHASE' && (
                  <>
                    <Select name="paymentMethod" defaultValue="CASH">
                      <option value="CASH">Cash</option>
                      <option value="CARD">Card</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                      <option value="MOBILE_BANKING">Mobile Banking</option>
                    </Select>
                    <Input name="paymentAmount" type="number" min="0" step="0.01" placeholder="Payment amount" defaultValue="0" />
                    <Select name="bankAccountId">
                      <option value="">No bank account</option>
                      {banks.map((bank) => (
                        <option key={bank.id} value={bank.id}>{bank.bankName} - {bank.accountName}</option>
                      ))}
                    </Select>
                  </>
                )}
                <label className="md:col-span-2">
                  <textarea name="note" placeholder="Note" className="min-h-20 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
                </label>
              </div>

              {formError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{formError}</div>}

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button type="submit" disabled={createDocument.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021]">
                  {createDocument.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
