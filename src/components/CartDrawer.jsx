import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle, Truck } from "lucide-react";
import { useCart } from "../context/CartContext";

const FREE_SHIPPING_THRESHOLD = 50.0;

const CartDrawer = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
  } = useCart();

  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const tax = subtotal * 0.08;
  const shipping = subtotal > FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.99;
  const total = subtotal + tax + shipping;
  const freeShippingDiff = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      clearCart();
      setCheckoutSuccess(false);
      setIsCartOpen(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="cart-backdrop" onClick={() => setIsCartOpen(false)}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-header">
              <div className="cart-title-row">
                <ShoppingBag size={22} className="cart-header-icon" />
                <h3>Your Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
              </div>
              <button
                className="cart-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                <X size={20} />
              </button>
            </div>

            {/* Free Shipping Progress */}
            {cartItems.length > 0 && (
              <div className="shipping-banner">
                <div className="shipping-text">
                  <Truck size={16} />
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span><strong>Free Shipping</strong> unlocked! 🎉</span>
                  ) : (
                    <span>
                      Add <strong>${freeShippingDiff.toFixed(2)}</strong> more for <strong>Free Shipping</strong>
                    </span>
                  )}
                </div>
                <div className="shipping-progress-bar">
                  <div
                    className="shipping-progress-fill"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Cart Content */}
            <div className="cart-body">
              {checkoutSuccess ? (
                <div className="checkout-success-view">
                  <CheckCircle size={64} color="#22c55e" className="success-animated-icon" />
                  <h3>Order Placed Successfully!</h3>
                  <p>Thank you for buying from Lumina Books. A confirmation email has been sent.</p>
                </div>
              ) : cartItems.length === 0 ? (
                <div className="empty-cart-view">
                  <ShoppingBag size={64} className="empty-cart-icon" />
                  <h4>Your cart is empty</h4>
                  <p>Discover something awesome to add to your reading list!</p>
                  <button className="continue-btn" onClick={() => setIsCartOpen(false)}>
                    Browse Books
                  </button>
                </div>
              ) : (
                <div className="cart-items-list">
                  {cartItems.map(({ book, quantity }) => (
                    <motion.div
                      layout
                      key={book.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="cart-item-card"
                    >
                      <div
                        className="cart-item-thumb"
                        style={{ background: book.coverBg || 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' }}
                      >
                        {book.title.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="cart-item-info">
                        <h4 className="cart-item-title">{book.title}</h4>
                        <p className="cart-item-author">{book.author}</p>
                        <div className="cart-item-price">${book.price.toFixed(2)}</div>
                      </div>
                      <div className="cart-item-controls">
                        <div className="qty-picker">
                          <button onClick={() => updateQuantity(book.id, -1)}>
                            <Minus size={14} />
                          </button>
                          <span>{quantity}</span>
                          <button onClick={() => updateQuantity(book.id, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                        <button
                          className="remove-item-btn"
                          onClick={() => removeFromCart(book.id)}
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer Summary */}
            {cartItems.length > 0 && !checkoutSuccess && (
              <div className="cart-footer">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Est. Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? <strong style={{ color: '#22c55e' }}>FREE</strong> : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="summary-total-row">
                  <span>Total</span>
                  <span className="total-amount">${total.toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
