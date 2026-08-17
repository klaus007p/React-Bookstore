import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ShoppingBag, Heart, BookOpen, Calendar, Layers, ExternalLink } from "lucide-react";
import { useCart } from "../context/CartContext";

const QuickViewModal = () => {
  const { quickViewBook, setQuickViewBook, addToCart, isWishlisted, toggleWishlist } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (quickViewBook) setQty(1);
  }, [quickViewBook]);

  const closeModal = () => {
    setQuickViewBook(null);
    setQty(1);
  };

  const favorited = quickViewBook ? isWishlisted(quickViewBook.id) : false;

  const handleAddToCart = () => {
    if (quickViewBook) {
      addToCart(quickViewBook, qty);
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {quickViewBook && (
        <div className="modal-backdrop" onClick={closeModal}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={closeModal}
              aria-label="Close details"
            >
              <X size={20} />
            </button>

            <div className="modal-body">
              <div className="modal-cover-wrapper" style={{ background: quickViewBook.coverBg || 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
                {quickViewBook.coverUrl ? (
                  <img src={quickViewBook.coverUrl} alt={quickViewBook.title} className="modal-cover-img" />
                ) : (
                  <div className="modal-cover-graphic">
                    <BookOpen size={64} color="rgba(255,255,255,0.85)" />
                    <span className="cover-title-text">{quickViewBook.title}</span>
                  </div>
                )}
                {quickViewBook.badge && (
                  <span className="modal-badge">{quickViewBook.badge}</span>
                )}
              </div>

              <div className="modal-details">
                <div className="modal-category-tag">{quickViewBook.category || "General"}</div>
                <h2 className="modal-title">{quickViewBook.title}</h2>
                <p className="modal-author">by <strong>{quickViewBook.author}</strong></p>

                <div className="modal-rating-row">
                  <div className="rating-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(quickViewBook.rating || 4.5) ? "#f59e0b" : "none"}
                        color="#f59e0b"
                      />
                    ))}
                  </div>
                  <span className="rating-score">{quickViewBook.rating || 4.8}</span>
                  <span className="reviews-count">({quickViewBook.reviewsCount || 128} reviews)</span>
                </div>

                <div className="modal-price-row">
                  <span className="modal-price">${quickViewBook.price.toFixed(2)}</span>
                  {quickViewBook.originalPrice && (
                    <span className="modal-original-price">${quickViewBook.originalPrice.toFixed(2)}</span>
                  )}
                  <span className="stock-badge">In Stock</span>
                </div>

                <p className="modal-description">
                  {quickViewBook.description ||
                    "An engaging and profound reading experience that captures the imagination. Perfectly formatted with pristine print details and engaging storyline."}
                </p>

                <div className="modal-specs">
                  <div className="spec-item">
                    <Layers size={16} />
                    <span>{quickViewBook.pages || 320} Pages</span>
                  </div>
                  <div className="spec-item">
                    <Calendar size={16} />
                    <span>Published {quickViewBook.year || 2023}</span>
                  </div>

                  {quickViewBook.url && (
                    <a
                      href={quickViewBook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="external-book-link"
                    >
                      <ExternalLink size={14} /> E-Book Source
                    </a>
                  )}
                </div>

                <div className="modal-actions">
                  <div className="qty-selector">
                    <button onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                    <span>{qty}</span>
                    <button onClick={() => setQty((q) => q + 1)}>+</button>
                  </div>

                  <button className="add-cart-btn" onClick={handleAddToCart}>
                    <ShoppingBag size={18} />
                    <span>Add to Cart - ${(quickViewBook.price * qty).toFixed(2)}</span>
                  </button>

                  <button
                    className={`wishlist-btn ${favorited ? "active" : ""}`}
                    onClick={() => toggleWishlist(quickViewBook)}
                    title={favorited ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={20} fill={favorited ? "#ef4444" : "none"} color={favorited ? "#ef4444" : "currentColor"} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default QuickViewModal;
