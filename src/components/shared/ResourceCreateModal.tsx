'use client';

import { FormEvent, ReactNode, useMemo, useState } from 'react';
import { X } from 'lucide-react';

import { useCreateApiResource } from '@/hooks/api/useApiResource';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';

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
 * Small dependency-free modal for creating simple API resources.
 *
 * @param resource - Backend endpoint that receives the POST request.
 * @param title - Modal heading.
 * @param fields - Form field metadata used to build the payload.
 * @param children - Trigger button contents.
 * @returns A trigger button and modal form.
 */
export function ResourceCreateModal({
  resource,
  title,
  description,
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

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-gray-100 p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
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
                        className="min-h-24 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none ring-offset-background placeholder:text-gray-500 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {formError}
                </div>
              )}

              <div className="flex items-center justify-end gap-3 border-t border-gray-100 pt-5">
                <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={createResource.isPending}
                  className="bg-[#FF9F43] hover:bg-[#ff9021]"
                >
                  {createResource.isPending ? 'Saving...' : 'Save'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
