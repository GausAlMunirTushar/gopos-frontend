'use client';

import { FormEvent, useState } from 'react';
import { ArrowLeftRight, Plus } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { useApiResource, useCreateApiResource } from '@/hooks/api/useApiResource';
import { apiEndpoints } from '@/lib/api/endpoints';

interface BankRecord {
  id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  currentBalance: number;
}

export function TransferMoneyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const createTransfer = useCreateApiResource<Record<string, unknown>, unknown>(
    apiEndpoints.finance.transfers,
  );
  const banksQuery = useApiResource<BankRecord>(apiEndpoints.finance.banks, { limit: 100 });
  const banks = banksQuery.data?.data ?? [];

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);
    const formData = new FormData(event.currentTarget);

    const fromBankAccountId = String(formData.get('fromBankAccountId') ?? '');
    const toBankAccountId = String(formData.get('toBankAccountId') ?? '');
    const amount = Number(formData.get('amount') ?? 0);

    if (!fromBankAccountId || !toBankAccountId) {
      setFormError('Please select both source and destination accounts.');
      return;
    }
    if (fromBankAccountId === toBankAccountId) {
      setFormError('Source and destination accounts must be different.');
      return;
    }
    if (amount <= 0) {
      setFormError('Amount must be greater than zero.');
      return;
    }

    const payload = {
      fromBankAccountId,
      toBankAccountId,
      amount,
      reference: String(formData.get('reference') ?? '') || undefined,
      description: String(formData.get('description') ?? '') || undefined,
      transferDate: String(formData.get('transferDate') ?? new Date().toISOString().split('T')[0]),
    };

    try {
      await createTransfer.mutateAsync(payload);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [apiEndpoints.finance.transfers] }),
        queryClient.invalidateQueries({ queryKey: [apiEndpoints.finance.banks] }),
      ]);
      event.currentTarget.reset();
      setIsOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to complete transfer');
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-[#FF9F43] hover:bg-orange-500 text-white rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
      >
        <Plus className="w-4 h-4" /> New Transfer
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Inter-Account Money Transfer"
        description="Transfer funds between bank accounts or cash counters with atomic ledger updates."
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                From Account <span className="text-red-500">*</span>
              </span>
              <Select name="fromBankAccountId" required defaultValue="">
                <option value="">Select source account</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName} - {bank.accountName} (৳{Number(bank.currentBalance).toLocaleString()})
                  </option>
                ))}
              </Select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                To Account <span className="text-red-500">*</span>
              </span>
              <Select name="toBankAccountId" required defaultValue="">
                <option value="">Select destination account</option>
                {banks.map((bank) => (
                  <option key={bank.id} value={bank.id}>
                    {bank.bankName} - {bank.accountName} (৳{Number(bank.currentBalance).toLocaleString()})
                  </option>
                ))}
              </Select>
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">
                Transfer Amount (BDT ৳) <span className="text-red-500">*</span>
              </span>
              <Input
                type="number"
                name="amount"
                min="1"
                step="0.01"
                placeholder="e.g. 50000"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Transfer Date</span>
              <Input
                type="date"
                name="transferDate"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Reference / Voucher No</span>
              <Input
                type="text"
                name="reference"
                placeholder="e.g. TRF-202505-001 or Cheque number"
              />
            </label>

            <label className="block md:col-span-2">
              <span className="mb-1 block text-sm font-semibold text-gray-700">Description / Note</span>
              <textarea
                name="description"
                placeholder="Reason for transfer (e.g. Branch replenishment, Petty cash top-up)"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#FF9F43]"
                rows={2}
              />
            </label>
          </div>

          {formError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600">
              {formError}
            </div>
          )}

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTransfer.isPending}
              className="bg-[#FF9F43] hover:bg-orange-500 text-white font-medium shadow-xs"
            >
              {createTransfer.isPending ? 'Transferring...' : 'Execute Transfer'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
