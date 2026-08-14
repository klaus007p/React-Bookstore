import React, { useState } from "react";
import { Star, ShoppingBag, Eye, Heart, BookOpen } from "lucide-react";
import { useCart } from "../context/CartContext";

function BookCard({ book }) {
  const { addToCart, isWishlisted, toggleWishlist, setQuickViewBook } = useCart();
  const [added, setAdded] = useState(false);

  const favorited = isWishlisted(book.id);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(book);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(book);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setQuickViewBook(book);
  };

  return (
    <div className="book-card" onClick={() => setQuickViewBook(book)}>
      {/* Cover Image Header */}
      <div
        className="book-cover-container"
        style={{
          background: book.coverBg || "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
        }}
      >
        {book.coverUrl ? (
          <img src={book.coverUrl} alt={book.title} className="book-cover-image" />
        ) : (
          <div className="book-cover-placeholder">
            <BookOpen size={48} color="rgba(255,255,255,0.85)" />
            <span className="cover-title-preview">{book.title}</span>
          </div>
        )}

        {/* Category Pill */}
        <span className="book-category-pill">{book.category || "Fiction"}</span>

        {/* Wishlist Button */}
        <button
          className={`card-wishlist-btn ${favorited ? "active" : ""}`}
          onClick={handleToggleWishlist}
          aria-label={favorited ? "Remove from wishlist" : "Add to wishlist"}
          title={favorited ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={18} fill={favorited ? "#ef4444" : "none"} color={favorited ? "#ef4444" : "currentColor"} />
        </button>

        {/* Hover Action Overlay */}
        <div className="cover-hover-overlay">
          <button className="quick-view-overlay-btn" onClick={handleQuickView}>
            <Eye size={16} /> Quick View
          </button>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="book-card-content">
        <div className="book-rating-row">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                fill={i < Math.floor(book.rating || 4.5) ? "#f59e0b" : "none"}
                color="#f59e0b"
              />
            ))}
          </div>
          <span className="rating-num">{book.rating || 4.8}</span>
        </div>

        <h3 className="book-title" title={book.title}>{book.title}</h3>
        <p className="book-author">by {book.author}</p>

        <div className="book-card-footer">
          <div className="book-price-box">
            <span className="book-price">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="book-original-price">${book.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <button
            className={`add-to-cart-btn ${added ? "added" : ""}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
            <span>{added ? "Added!" : "Add"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;