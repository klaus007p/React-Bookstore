import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, AlertCircle, CheckCircle } from "lucide-react";

const PaymentModal = ({ isOpen, onClose, amount, orderId, customerEmail, customerName }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // "success", "failed", null
  const [errorMessage, setErrorMessage] = useState("");

  const handleRazorpayPayment = async () => {
    setIsProcessing(true);
    setErrorMessage("");

    try {
      // Load Razorpay script
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;

      script.onload = async () => {
        // Create order on your backend (you'll need to implement this endpoint)
        const response = await fetch("/api/create-razorpay-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency: "INR",
            receipt: orderId,
            customer_email: customerEmail,
            customer_name: customerName,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to create order");
        }

        const { id: razorpayOrderId, key_id } = await response.json();

        // Razorpay checkout options
        // Key ID should come from backend for security
        const options = {
          key: key_id, // Backend returns the key_id (recommended approach)
          amount: Math.round(amount * 100),
          currency: "INR",
          name: "Lumina Books",
          description: `Order #${orderId}`,
          order_id: razorpayOrderId,
          customer_id: customerEmail,
          prefill: {
            name: customerName,
            email: customerEmail,
          },
          theme: {
            color: "#6366f1",
          },
          handler: async (response) => {
            try {
              // Verify payment on backend
              const verifyResponse = await fetch("/api/verify-razorpay-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  order_id: orderId,
                }),
              });

              if (verifyResponse.ok) {
                setPaymentStatus("success");
                setTimeout(() => {
                  onClose();
                  setPaymentStatus(null);
                }, 2500);
              } else {
                throw new Error("Payment verification failed");
              }
            } catch (error) {
              setPaymentStatus("failed");
              setErrorMessage(error.message);
            }
          },
          modal: {
            ondismiss: () => {
              setIsProcessing(false);
              setErrorMessage("Payment cancelled by user");
            },
          },
        };

        // Open Razorpay checkout
        const razorpay = new window.Razorpay(options);
        razorpay.on("payment.failed", (response) => {
          setPaymentStatus("failed");
          setErrorMessage(response.error.description);
          setIsProcessing(false);
        });
        razorpay.open();
      };

      script.onerror = () => {
        setErrorMessage("Failed to load Razorpay. Please try again.");
        setIsProcessing(false);
      };

      document.body.appendChild(script);
    } catch (error) {
      setErrorMessage(error.message || "An error occurred. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content payment-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close payment modal"
              disabled={isProcessing}
            >
              <X size={20} />
            </button>

            {paymentStatus === "success" ? (
              <div className="payment-success-view">
                <CheckCircle size={64} color="#22c55e" className="payment-success-icon" />
                <h2>Payment Successful! 🎉</h2>
                <p>Thank you for your purchase. Your order has been confirmed.</p>
                <p className="order-id-text">Order ID: {orderId}</p>
              </div>
            ) : paymentStatus === "failed" ? (
              <div className="payment-failed-view">
                <AlertCircle size={64} color="#ef4444" />
                <h2>Payment Failed</h2>
                <p>{errorMessage}</p>
                <button
                  className="retry-payment-btn"
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? <Loader2 size={16} /> : "Retry Payment"}
                </button>
              </div>
            ) : (
              <div className="payment-form-view">
                <div className="payment-header">
                  <h2>Secure Payment</h2>
                  <p>Complete your purchase with Razorpay</p>
                </div>

                <div className="payment-summary">
                  <div className="summary-row">
                    <span>Order ID:</span>
                    <strong>{orderId}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Customer:</span>
                    <strong>{customerName}</strong>
                  </div>
                  <div className="summary-row">
                    <span>Email:</span>
                    <strong>{customerEmail}</strong>
                  </div>
                  <div className="summary-row total">
                    <span>Amount to Pay:</span>
                    <strong className="amount">₹{amount.toFixed(2)}</strong>
                  </div>
                </div>

                {errorMessage && (
                  <div className="payment-error-box">
                    <AlertCircle size={16} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  className="pay-now-btn"
                  onClick={handleRazorpayPayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={18} className="spin-icon" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Pay ₹{amount.toFixed(2)}</span>
                    </>
                  )}
                </button>

                <p className="payment-security-info">
                  Secured by Razorpay | Your payment information is encrypted
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
