import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";

const ToastNotification = () => {
  const { toast } = useCart();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className={`toast-notification ${toast.type}`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 size={18} className="toast-icon" />
          ) : toast.type === "warning" ? (
            <AlertCircle size={18} className="toast-icon" />
          ) : (
            <Info size={18} className="toast-icon" />
          )}
          <span>{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToastNotification;
