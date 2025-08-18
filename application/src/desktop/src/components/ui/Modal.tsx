import React, { useEffect } from "react";
import { Button, PrimaryButton, SecondaryButton } from "./Button";

// Interface base para todos os modais
export interface ModalBaseProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

// Componente base Modal seguindo Single Responsibility Principle
export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  ...props
}: ModalBaseProps & React.HTMLAttributes<HTMLDivElement>) {
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-2xl",
    lg: "max-w-4xl",
    xl: "max-w-6xl",
    full: "max-w-full mx-4"
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
        {...props}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {title && (
              <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            )}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {children}
        </div>
      </div>
    </div>
  );
}

// Modal com confirmação
export const ConfirmModal = ({
  isOpen,
  onClose,
  title = "Confirmar ação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  variant = "primary",
  ...props
}: Omit<ModalBaseProps, "children"> & {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "primary" | "danger";
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="sm"
      {...props}
    >
      <div className="space-y-6">
        <p className="text-gray-600">{message}</p>
        
        <div className="flex justify-end gap-3">
          <SecondaryButton onClick={onClose}>
            {cancelText}
          </SecondaryButton>
          {variant === "danger" ? (
            <Button variant="danger" onClick={handleConfirm}>
              {confirmText}
            </Button>
          ) : (
            <PrimaryButton onClick={handleConfirm}>
              {confirmText}
            </PrimaryButton>
          )}
        </div>
      </div>
    </Modal>
  );
};

// Modal de formulário
export const FormModal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  submitText = "Salvar",
  cancelText = "Cancelar",
  loading = false,
  ...props
}: Omit<ModalBaseProps, "children"> & {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  submitText?: string;
  cancelText?: string;
  loading?: boolean;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      {...props}
    >
      <form onSubmit={onSubmit} className="space-y-6">
        {children}
        
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <SecondaryButton type="button" onClick={onClose}>
            {cancelText}
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Salvando..." : submitText}
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  );
};
