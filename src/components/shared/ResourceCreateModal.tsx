'use client';

import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { useCreateApiResource } from '@/hooks/api/useApiResource';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Modal, type ModalSize } from '@/components/ui/modal';

type FieldType = 'text' | 'email' | 'number' | 'select' | 'textarea' | 'checkbox' | 'hidden';

export interface ResourceField {
  name: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string | number | boolean;
  options?: { label: string; value: string }[];
}

interface ResourceCreateModalProps {
  resource: string;
  title: string;
  description?: string;
  size?: ModalSize;
  fields: ResourceField[];
  children: ReactNode;
  buttonClassName?: string;
}

const normalizeValue = (field: ResourceField, formData: FormData) => {
  if (field.type === 'checkbox') return formData.get(field.name) === 'on';

  const value = formData.get(field.name);
  if (value === null) return undefined;

  const stringValue = String(value).trim();
  if (stringValue === '') return undefined;
  if (field.name === 'values') {
    return stringValue
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);
  }
  if (field.type === 'number') return Number(stringValue);
  return stringValue;
};

/**
 * Standardized responsive modal for creating and updating API resources.
 */
export function ResourceCreateModal({
  resource,
  title,
  description,
  size = '2xl',
  fields,
  children,
  buttonClassName,
}: ResourceCreateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const createResource = useCreateApiResource<Record<string, unknown>, unknown>(resource);

  const visibleFields = useMemo(() => fields.filter((field) => field.type !== 'hidden'), [fields]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload = fields.reduce<Record<string, unknown>>((accumulator, field) => {
      const value = normalizeValue(field, formData);
      if (value !== undefined) accumulator[field.name] = value;
      return accumulator;
    }, {});

    try {
      await createResource.mutateAsync(payload);
      event.currentTarget.reset();
      setIsOpen(false);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Unable to create record');
    }
  };

  return (
    <>
      <button type="button" className={buttonClassName} onClick={() => setIsOpen(true)}>
        {children}
      </button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
        description={description}
        size={size}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields
            .filter((field) => field.type === 'hidden')
            .map((field) => (
              <input key={field.name} type="hidden" name={field.name} value={String(field.defaultValue ?? '')} />
            ))}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleFields.map((field) => (
              <label
                key={field.name}
                className={field.type === 'textarea' || field.type === 'checkbox' ? 'md:col-span-2' : ''}
              >
                <span className="mb-1.5 block text-sm font-semibold text-gray-700">
                  {field.label}
                  {field.required && <span className="text-red-500"> *</span>}
                </span>

                {field.type === 'select' ? (
                  <Select
                    name={field.name}
                    required={field.required}
                    defaultValue={String(field.defaultValue ?? '')}
                  >
                    <option value="">Select {field.label}</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                ) : field.type === 'textarea' ? (
                  <textarea
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    defaultValue={String(field.defaultValue ?? '')}
                    className="min-h-24 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:outline-none focus:ring-0 focus:border-[#FF9F43] transition-colors"
                  />
                ) : field.type === 'checkbox' ? (
                  <span className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      name={field.name}
                      defaultChecked={Boolean(field.defaultValue)}
                      className="h-4 w-4 rounded border-gray-300 text-[#FF9F43] focus:ring-[#FF9F43]"
                    />
                    {field.placeholder ?? field.label}
                  </span>
                ) : (
                  <Input
                    type={field.type ?? 'text'}
                    name={field.name}
                    required={field.required}
                    placeholder={field.placeholder}
                    defaultValue={String(field.defaultValue ?? '')}
                  />
                )}
              </label>
            ))}
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
            <Button
              type="submit"
              disabled={createResource.isPending}
              className="bg-[#FF9F43] hover:bg-[#ff9021] text-white px-5 rounded-xl font-medium shadow-xs"
            >
              {createResource.isPending ? 'Saving...' : 'Save Record'}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
