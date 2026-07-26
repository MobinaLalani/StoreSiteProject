"use client";

import { ReactNode, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;

  title?: string;

  children: ReactNode;

  footer?: ReactNode;

  size?: "sm" | "md" | "lg" | "xl";

  closeOnOverlay?: boolean;

  onClose: () => void;
}

export default function Modal({
  open,
  title,
  children,
  footer,
  size = "md",
  closeOnOverlay = true,
  onClose,
}: ModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose]);

  const width = {
    sm: "max-w-md",
    md: "max-w-xl",
    lg: "max-w-3xl",
    xl: "max-w-5xl",
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              if (closeOnOverlay) {
                onClose();
              }
            }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 30,
              }}
              transition={{
                duration: 0.2,
              }}
              onClick={(e) => e.stopPropagation()}
              className={`
                w-full
                ${width[size]}
                overflow-hidden
                rounded-2xl
                bg-white
                shadow-2xl
              `}
            >
              {(title ) && (
                <div className="flex items-center justify-between border-b px-6 py-5">
                  <h2 className="text-lg font-semibold">{title}</h2>

                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 transition hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
              )}

              <div className="max-h-[70vh] overflow-y-auto p-6">{children}</div>

              {footer && (
                <div className="border-t bg-gray-50 px-6 py-4">{footer}</div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
