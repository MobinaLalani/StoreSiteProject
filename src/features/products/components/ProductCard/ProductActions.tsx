"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { PhoneCall, X } from "lucide-react";

export default function ProductActions() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-500 py-4 font-semibold text-white transition hover:bg-red-600"
      >
        <PhoneCall size={20} />
        استعلام قیمت
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                className="fixed inset-0 z-[9999] flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />

                {/* Modal */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 w-[90%] max-w-md rounded-3xl bg-white p-6 shadow-2xl"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-bold">
                      اطلاعات تماس
                    </h2>

                    <button
                      onClick={() => setOpen(false)}
                      className="rounded-full p-2 hover:bg-gray-100"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <p className="mb-6 text-sm text-gray-500">
                    برای اطلاع از قیمت روز با شماره‌های زیر تماس بگیرید.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="tel:02112345678"
                      className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50"
                    >
                      <PhoneCall className="text-red-500" />
                      <span>021-12345678</span>
                    </a>

                    <a
                      href="tel:09121234567"
                      className="flex items-center gap-3 rounded-xl border p-4 transition hover:bg-gray-50"
                    >
                      <PhoneCall className="text-red-500" />
                      <span>0912-123-4567</span>
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}