import { useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import ThemeToggle from "./components/ThemeToggle";
import BookList from "./components/BookList";
import CartDrawer from "./components/CartDrawer";
import QuickViewModal from "./components/QuickViewModal";
import ToastNotification from "./components/ToastNotification";
import AuthModal from "./components/AuthModal";
import { CartProvider, useCart } from "./context/CartContext";
import { useAuth } from "./context/AuthContext";
import { BookOpen, ShoppingBag, Heart, Sparkles, ShieldCheck, Truck, Headphones, User, LogOut, ChevronDown } from "lucide-react";


// Function To Create the main layout navbar, hero section etc.. 

function MainLayout() {
  const [searchItem, setSearchItem] = useState("");  
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);  // State to check authentication
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { cartCount, wishlist, setIsCartOpen } = useCart();
  const { user, logout } = useAuth();  // Function To create login and logout

  return (
    <div className="app-container">
      {/* Top Glassmorphic Navigation Bar */}
      <header className="navbar">
        <button
          type="button"
          className="nav-brand"
          onClick={() => { setSearchItem(""); setShowWishlistOnly(false); }}
          aria-label="Reset filters and return to top"
        >
          <div className="brand-icon-box">
            <BookOpen size={24} color="#ffffff" />
          </div>
          <div className="brand-text">
            <span className="brand-title">Lumina<span className="brand-accent">Books</span></span>
            <span className="brand-tagline">Curated Literature</span>
          </div>
        </button>

        <div className="nav-actions">
          <button
            className={`nav-icon-btn wishlist-nav-btn ${showWishlistOnly ? "active" : ""}`}
            onClick={() => setShowWishlistOnly(!showWishlistOnly)}
            title="Wishlist / Favorites"
            aria-label="Wishlist"
          >
            <Heart size={20} fill={wishlist.length > 0 ? "#ef4444" : "none"} color={wishlist.length > 0 ? "#ef4444" : "currentColor"} />
            {wishlist.length > 0 && <span className="nav-badge">{wishlist.length}</span>}
          </button>

          <button
            className="nav-icon-btn cart-nav-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
            aria-label="Shopping Cart"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && <span className="nav-badge cart-badge-num">{cartCount}</span>}
          </button>

          <ThemeToggle />

          {/* User Auth Section */}
          {user ? (
            <div className="user-menu-wrapper">
              <button
                className="user-nav-btn"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                title="Account Menu"
              >
                <div className="user-avatar-pill">
                  {(user.name || user.email || "U")[0].toUpperCase()}
                </div>
                <span>{user.name || user.email.split("@")[0]}</span>
                <ChevronDown size={14} />
              </button>

              {isUserMenuOpen && (
                <div className="user-menu-dropdown" onClick={(e) => e.stopPropagation()}>
                  <div className="user-menu-header">
                    <strong>{user.name || "Reader Profile"}</strong>
                    <span>{user.email}</span>
                  </div>
                  <button
                    className="logout-menu-btn"
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="user-nav-btn"
              onClick={() => setIsAuthOpen(true)}
            >
              <User size={18} />
              <span>Log In</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero Banner Section */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>Discover Your Next Favorite Story</span>
          </div>
          <h1 className="hero-title">
            Immerse Yourself in World-Class Literature
          </h1>
          <p className="hero-subtitle">
            Explore hundreds of bestseller novels, classic masterpieces, sci-fi sagas, and transformative non-fiction.
          </p>

          <SearchBar searchItem={searchItem} onSearchChange={setSearchItem} />
        </div>
      </section>

      {/* Feature Highlights Bar */}
      <div className="features-bar">
        <div className="feature-item">
          <Truck size={20} className="feature-icon" />
          <div>
            <strong>Free Express Shipping</strong>
            <span>On all orders over $50</span>
          </div>
        </div>
        <div className="feature-item">
          <ShieldCheck size={20} className="feature-icon" />
          <div>
            <strong>Guaranteed Quality</strong>
            <span>Pristine collector prints</span>
          </div>
        </div>
        <div className="feature-item">
          <Headphones size={20} className="feature-icon" />
          <div>
            <strong>Dedicated Support</strong>
            <span>24/7 Reader assistance</span>
          </div>
        </div>
      </div>

      {/* Main Book Listing */}
      <main className="main-content">
        <BookList
          searchItem={searchItem}
          showWishlistOnly={showWishlistOnly}
          setShowWishlistOnly={setShowWishlistOnly}
        />
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="brand-title">Lumina<span className="brand-accent">Books</span></div>
            <p>Your premier online destination for curated books, classic novels, and literary masterpieces.</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>Quick Links</h4>
              <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}>Top Search</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowWishlistOnly(false); }}>All Categories</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setShowWishlistOnly(true); }}>My Favorites</a>
            </div>
            <div className="footer-col">
              <h4>Customer Care</h4>
              <a href="#shipping">Shipping Policy</a>
              <a href="#returns">Returns & Refunds</a>
              <a href="#faq">Reader FAQ</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Lumina Books Inc. Built with React & Framer Motion. All rights reserved.</p>
        </div>
      </footer>

      {/* Overlays & Modals */}
      <CartDrawer />
      <QuickViewModal />
      <ToastNotification />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}

export default App;
