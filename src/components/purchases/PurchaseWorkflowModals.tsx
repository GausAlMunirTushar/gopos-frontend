'use client';

import { FormEvent, useMemo, useState } from 'react';
import { Plus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
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
        className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-xs"
      >
        <Plus className="w-4 h-4" /> {mode === 'PURCHASE' ? 'Add Purchase' : 'Create Order'}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={mode === 'PURCHASE' ? 'Receive Goods & Purchase' : 'Create Purchase Order'}
        description={
          mode === 'PURCHASE'
            ? 'Received purchases immediately increase warehouse inventory.'
            : 'Purchase orders send vendor requisitions without changing current stock.'
        }
        size="3xl"
      >
        <form onSubmit={handleSubmit} className="space-y-5">
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
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Destination Location *</span>
              <Select name="locationId" required>
                <option value="">Select store or warehouse</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>{location.name}</option>
                ))}
              </Select>
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Document Date *</span>
              <Input name="documentDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
            </label>
            {mode === 'ORDER' ? (
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Expected Delivery Date</span>
                <Input name="expectedAt" type="date" />
              </label>
            ) : (
              <label>
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">Supplier Invoice No</span>
                <Input name="supplierInvoice" placeholder="e.g. INV-9921" />
              </label>
            )}
            <label className="md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Product Item *</span>
              <Select name="variantId" required>
                <option value="">Select catalog product</option>
                {products.map((variant) => (
                  <option key={variant.id} value={variant.id}>
                    {variant.product?.name ?? 'Product'} {variant.sku ? `(${variant.sku})` : ''}
                  </option>
                ))}
              </Select>
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Quantity *</span>
              <Input name="quantity" type="number" min="0.01" step="0.01" placeholder="Quantity" required />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Unit Cost (৳) *</span>
              <Input name="unitCost" type="number" min="0" step="0.01" placeholder="0.00" required />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Line Discount (৳)</span>
              <Input name="discount" type="number" min="0" step="0.01" placeholder="0.00" defaultValue="0" />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Tax Total (৳)</span>
              <Input name="tax" type="number" min="0" step="0.01" placeholder="0.00" defaultValue="0" />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Batch Number</span>
              <Input name="batchNumber" placeholder="e.g. BATCH-2025" />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Expiry Date</span>
              <Input name="expiresAt" type="date" />
            </label>
            <label>
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Shipping Cost (৳)</span>
              <Input name="shippingTotal" type="number" min="0" step="0.01" placeholder="0.00" defaultValue="0" />
            </label>
            {mode === 'PURCHASE' && (
              <>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Payment Method</span>
                  <Select name="paymentMethod" defaultValue="CASH">
                    <option value="CASH">Cash</option>
                    <option value="CARD">Card</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="MOBILE_BANKING">Mobile Banking (bKash/Nagad)</option>
                  </Select>
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Payment Amount (৳)</span>
                  <Input name="paymentAmount" type="number" min="0" step="0.01" placeholder="0.00" defaultValue="0" />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Bank Account</span>
                  <Select name="bankAccountId">
                    <option value="">No bank account (Cash / Petty)</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>{bank.bankName} - {bank.accountName}</option>
                    ))}
                  </Select>
                </label>
              </>
            )}
            <label className="md:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold text-gray-700">Notes / Instructions</span>
              <textarea
                name="note"
                rows={2}
                placeholder="Additional notes for order..."
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-[#FF9F43] transition-colors"
              />
            </label>
          </div>

          {formError && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {formError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5 mt-6">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createDocument.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021] text-white px-5 rounded-xl font-medium shadow-xs">
              {createDocument.isPending ? 'Saving...' : 'Confirm & Save'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
