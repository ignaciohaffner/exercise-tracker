import type React from "react";
import type { ReactNode } from "react";
import type { Theme } from "../types";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  theme: Theme;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, theme }) => {
  if (!isOpen) return null;

  const { colors } = theme;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
      onClick={onClose}
    >
      <div
        className="p-6 rounded-lg max-w-md w-full"
        style={{ backgroundColor: colors.surface }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
