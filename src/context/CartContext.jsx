import React, { createContext, useContext, useState, useEffect, useRef } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const toastTimerRef = useRef(null);
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("bookstore_cart");
      const parsed = saved ? JSON.parse(saved) : [];
      if (!Array.isArray(parsed)) return [];

      return parsed.map((item) => ({
        ...item,
        book: item?.book
          ? { ...item.book, id: String(item.book.id) }
          : item.book,
      }));
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("bookstore_wishlist");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed.map((id) => String(id)) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [toast, setToast] = useState(null);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("bookstore_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("bookstore_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = "info") => {
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    setToast({ message, type, id: Date.now() });
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (book, quantity = 1) => {
    const normalizedBookId = String(book.id);
    const normalizedBook = { ...book, id: normalizedBookId };

    setCartItems((prev) => {
      const existing = prev.find((item) => String(item.book.id) === normalizedBookId);
      if (existing) {
        return prev.map((item) =>
          String(item.book.id) === normalizedBookId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book: normalizedBook, quantity }];
    });
    showToast(`Added "${book.title}" to cart!`, "success");
  };

  const removeFromCart = (bookId) => {
    const normalizedBookId = String(bookId);
    setCartItems((prev) => prev.filter((item) => String(item.book.id) !== normalizedBookId));
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (bookId, delta) => {
    const normalizedBookId = String(bookId);
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (String(item.book.id) === normalizedBookId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleWishlist = (book) => {
    const normalizedBookId = String(book.id);

    setWishlist((prev) => {
      const exists = prev.some((bId) => String(bId) === normalizedBookId);
      if (exists) {
        showToast(`Removed "${book.title}" from wishlist`, "info");
        return prev.filter((bId) => String(bId) !== normalizedBookId);
      } else {
        showToast(`Added "${book.title}" to wishlist!`, "success");
        return [...prev, normalizedBookId];
      }
    });
  };

  const isWishlisted = (bookId) => wishlist.includes(String(bookId));

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.book.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        isCartOpen,
        setIsCartOpen,
        quickViewBook,
        setQuickViewBook,
        toast,
        showToast,
        isPaymentOpen,
        setIsPaymentOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
