'use client';

import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  full: 'max-w-[95vw] sm:max-w-[92vw] h-[92vh]',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = 'md',
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
}: ModalProps) {
  // ESC key listener
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    },
    [closeOnEsc, onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={closeOnOverlayClick ? onClose : undefined}
      />

      {/* Modal Container */}
      <div
        className={cn(
          'relative w-full bg-white rounded-2xl shadow-2xl border border-gray-100/80 flex flex-col max-h-[90vh] overflow-hidden z-10 transition-all animate-in fade-in zoom-in-95 duration-200',
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div
            className={cn(
              'flex items-center justify-between px-5 sm:px-6 py-4 border-b border-gray-100 bg-white shrink-0',
              headerClassName
            )}
          >
            <div className="flex items-center gap-3 pr-6">
              {icon && <div className="shrink-0">{icon}</div>}
              <div>
                {typeof title === 'string' ? (
                  <h3 className="text-lg font-bold text-gray-900 leading-6">{title}</h3>
                ) : (
                  title
                )}
                {description && (
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{description}</p>
                )}
              </div>
            </div>

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                aria-label="Close"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            )}
          </div>
        )}

        {/* Body Content */}
        <div className={cn('p-5 sm:p-6 overflow-y-auto flex-1 custom-scrollbar text-sm text-gray-700', bodyClassName)}>
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              'flex items-center justify-end gap-3 px-5 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/70 shrink-0',
              footerClassName
            )}
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
