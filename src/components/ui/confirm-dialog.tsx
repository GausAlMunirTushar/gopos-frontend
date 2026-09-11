'use client';

import React, { useState } from 'react';
import { AlertTriangle, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { Modal } from './modal';
import { Button } from './button';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void> | void;
  title?: string;
  description?: string;
  itemName?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Confirmation',
  description = 'Are you sure you want to delete this item? This action cannot be undone and will permanently remove the record from the database.',
  itemName,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  variant = 'danger',
  isLoading: externalLoading,
}: ConfirmDialogProps) {
  const [internalLoading, setInternalLoading] = useState(false);
  const isLoading = externalLoading ?? internalLoading;

  const handleConfirm = async () => {
    try {
      setInternalLoading(true);
      await onConfirm();
      onClose();
    } catch (err) {
      console.error('Action failed:', err);
    } finally {
      setInternalLoading(false);
    }
  };

  const isDanger = variant === 'danger';

  return (
    <Modal
      isOpen={isOpen}
      onClose={isLoading ? () => {} : onClose}
      size="md"
      showCloseButton={!isLoading}
      closeOnOverlayClick={!isLoading}
      closeOnEsc={!isLoading}
      className="p-0"
    >
      <div className="flex flex-col items-center text-center p-6 pt-7">
        {/* Icon Badge */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform animate-in zoom-in-50 duration-200 shadow-sm ${
            isDanger
              ? 'bg-red-50 text-red-600 border border-red-100 ring-4 ring-red-50/50'
              : variant === 'warning'
              ? 'bg-amber-50 text-amber-600 border border-amber-100 ring-4 ring-amber-50/50'
              : 'bg-blue-50 text-blue-600 border border-blue-100 ring-4 ring-blue-50/50'
          }`}
        >
          {isDanger ? (
            <Trash2 className="w-7 h-7 stroke-[2.2]" />
          ) : variant === 'warning' ? (
            <AlertTriangle className="w-7 h-7 stroke-[2.2]" />
          ) : (
            <AlertCircle className="w-7 h-7 stroke-[2.2]" />
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>

        {/* Description */}
        <p className="text-sm text-gray-500 max-w-sm mb-4 leading-relaxed">
          {description}
        </p>

        {/* Item Highlight Callout */}
        {itemName && (
          <div className="w-full bg-gray-50 border border-gray-200/80 rounded-xl px-4 py-2.5 mb-5 text-sm font-semibold text-gray-800 break-words flex items-center justify-center gap-2">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">Target:</span>
            <span className="text-gray-900 font-mono">{itemName}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 w-full mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full h-11 rounded-xl text-sm font-semibold border-gray-200 hover:bg-gray-100 transition-colors"
          >
            {cancelText}
          </Button>

          <button
            type="button"
            onClick={handleConfirm}
            disabled={isLoading}
            className={`w-full h-11 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all shadow-sm ${
              isDanger
                ? 'bg-red-600 hover:bg-red-700 active:bg-red-800 shadow-red-600/20 hover:shadow-md'
                : variant === 'warning'
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
            } disabled:opacity-50 disabled:pointer-events-none cursor-pointer`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <span>{confirmText}</span>
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
}
