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
  type?: 'INCOME' | 'EXPENSE';
}

interface FinanceEntryModalProps {
  type: 'INCOME' | 'EXPENSE';
}

const toNumber = (value: FormDataEntryValue | null) => {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
};

/** Creates income/expense entries through the domain finance endpoints. */
export function FinanceEntryModal({ type }: FinanceEntryModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const endpoint = type === 'INCOME' ? apiEndpoints.finance.income : apiEndpoints.finance.expenses;
  const createEntry = useCreateApiResource<Record<string, unknown>, unknown>(endpoint);
  const categoriesQuery = useApiResource<OptionRecord>(apiEndpoints.finance.categories, {
    type,
    limit: 100,
  });
  const banksQuery = useApiResource<OptionRecord>(apiEndpoints.finance.banks, { limit: 100 });

  const categories = useMemo(
    () => categoriesQuery.data?.data.filter((category) => category.type === type) ?? [],
    [categoriesQuery.data?.data, type],
  );
  const banks = banksQuery.data?.data ?? [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const formData = new FormData(event.currentTarget);
    const payload = {
      categoryId: String(formData.get('categoryId') ?? ''),
      bankAccountId: String(formData.get('bankAccountId') ?? '') || undefined,
      amount: toNumber(formData.get('amount')),
      status: String(formData.get('status') ?? (type === 'INCOME' ? 'RECEIVED' : 'PAID')),
      entryDate: String(formData.get('entryDate') ?? ''),
      source: String(formData.get('source') ?? '') || undefined,
      reference: String(formData.get('reference') ?? '') || undefined,
      description: String(formData.get('description') ?? '') || undefined,
    };

    try {
      await createEntry.mutateAsync(payload);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [endpoint] }),
        queryClient.invalidateQueries({ queryKey: [apiEndpoints.finance.banks] }),
      ]);
      event.currentTarget.reset();
      setIsOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to save finance entry');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
      >
        <Plus className="w-4 h-4" /> Add {type === 'INCOME' ? 'Income' : 'Expense'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Add {type === 'INCOME' ? 'Income' : 'Expense'}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Posted entries update selected bank account balances safely.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Category *</span>
                  <Select name="categoryId" required disabled={categoriesQuery.isLoading}>
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Bank Account</span>
                  <Select name="bankAccountId" disabled={banksQuery.isLoading}>
                    <option value="">No bank account</option>
                    {banks.map((bank) => (
                      <option key={bank.id} value={bank.id}>
                        {bank.bankName} - {bank.accountName}
                      </option>
                    ))}
                  </Select>
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Amount *</span>
                  <Input name="amount" type="number" min="0.01" step="0.01" required />
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Status *</span>
                  <Select name="status" defaultValue={type === 'INCOME' ? 'RECEIVED' : 'PAID'} required>
                    <option value="PENDING">Pending</option>
                    <option value={type === 'INCOME' ? 'RECEIVED' : 'PAID'}>
                      {type === 'INCOME' ? 'Received' : 'Paid'}
                    </option>
                  </Select>
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Entry Date *</span>
                  <Input name="entryDate" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required />
                </label>
                <label>
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Reference</span>
                  <Input name="reference" placeholder="Optional reference" />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Source</span>
                  <Input name="source" placeholder={type === 'INCOME' ? 'Product sales' : 'Office rent'} />
                </label>
                <label className="md:col-span-2">
                  <span className="mb-1.5 block text-sm font-semibold text-gray-700">Description</span>
                  <textarea
                    name="description"
                    className="min-h-24 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </label>
              </div>

              {formError && <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{formError}</div>}

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={createEntry.isPending} className="bg-[#FF9F43] hover:bg-[#ff9021]">
                  {createEntry.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
