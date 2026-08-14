import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("bookstore_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("bookstore_wishlist");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewBook, setQuickViewBook] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem("bookstore_cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("bookstore_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (message, type = "info") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const addToCart = (book, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.book.id === book.id);
      if (existing) {
        return prev.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { book, quantity }];
    });
    showToast(`Added "${book.title}" to cart!`, "success");
  };

  const removeFromCart = (bookId) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId));
    showToast("Item removed from cart", "info");
  };

  const updateQuantity = (bookId, delta) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.book.id === bookId) {
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
    setWishlist((prev) => {
      const exists = prev.some((bId) => bId === book.id);
      if (exists) {
        showToast(`Removed "${book.title}" from wishlist`, "info");
        return prev.filter((bId) => bId !== book.id);
      } else {
        showToast(`Added "${book.title}" to wishlist!`, "success");
        return [...prev, book.id];
      }
    });
  };

  const isWishlisted = (bookId) => wishlist.includes(bookId);

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
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
