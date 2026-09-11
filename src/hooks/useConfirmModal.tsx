'use client';

import React, { useState, useCallback } from 'react';
import { ConfirmDialog, type ConfirmDialogProps } from '@/components/ui/confirm-dialog';

export interface ConfirmOptions {
  title?: string;
  description?: string;
  itemName?: string;
  confirmText?: string;
  confirmLabel?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => Promise<void> | void;
}

export function useConfirmModal() {
  const [dialogState, setDialogState] = useState<ConfirmOptions | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const confirm = useCallback((options: ConfirmOptions) => {
    setDialogState(options);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setDialogState(null), 200);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (dialogState?.onConfirm) {
      await dialogState.onConfirm();
    }
  }, [dialogState]);

  const ConfirmDialogComponent = useCallback(() => {
    if (!dialogState) return null;

    return (
      <ConfirmDialog
        isOpen={isOpen}
        onClose={close}
        onConfirm={handleConfirm}
        title={dialogState.title}
        description={dialogState.description}
        itemName={dialogState.itemName}
        confirmText={dialogState.confirmText || dialogState.confirmLabel}
        cancelText={dialogState.cancelText}
        variant={dialogState.variant}
      />
    );
  }, [dialogState, isOpen, close, handleConfirm]);

  return {
    confirm,
    close,
    isOpen,
    ConfirmDialogComponent,
  };
}
