import React, { useState, useEffect, useMemo } from "react";
import BookCard from "./BookCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ArrowUpDown, BookX, Heart, RefreshCw, Radio } from "lucide-react";
import { useCart } from "../context/CartContext";

// Offline Fallback Books Data
const FALLBACK_BOOKS = [
  {
    id: "1098127463",
    title: "Security as Code",
    subtitle: "DevSecOps Patterns with AWS",
    author: "BK Sarthak Das, Virginia Chu",
    price: 14.99,
    category: "Technology",
    rating: 4.8,
    reviewsCount: 310,
    year: 2023,
    pages: 340,
    coverUrl: "https://www.dbooks.org/img/books/1098127463s.jpg",
    url: "https://www.dbooks.org/security-as-code-1098127463/",
    description: "Learn how to automate cloud security controls using infrastructure as code and DevSecOps pipelines on AWS."
  },
  {
    id: "164200233X",
    title: "ASP.NET Core 6 Succinctly",
    subtitle: "Modern Web Development",
    author: "Dirk Strauss",
    price: 12.50,
    category: "Technology",
    rating: 4.7,
    reviewsCount: 220,
    year: 2022,
    pages: 190,
    coverUrl: "https://www.dbooks.org/img/books/164200233Xs.jpg",
    url: "https://www.dbooks.org/aspnet-core-6-succinctly-164200233x/",
    description: "A concise guide to building high-performance web applications and APIs with Microsoft ASP.NET Core 6."
  },
  {
    id: "1642002305",
    title: "Svelte Succinctly",
    subtitle: "Reactive Web Interfaces",
    author: "Ed Freitas",
    price: 11.99,
    category: "Technology",
    rating: 4.9,
    reviewsCount: 450,
    year: 2022,
    pages: 165,
    coverUrl: "https://www.dbooks.org/img/books/1642002305s.jpg",
    url: "https://www.dbooks.org/svelte-succinctly-1642002305/",
    description: "Discover Svelte's revolutionary compiler-driven approach to constructing ultra-fast reactive user interfaces."
  },
  {
    id: "111954601X",
    title: "Blockchain For Dummies",
    subtitle: "Distributed Ledgers Explained",
    author: "Manav Gupta",
    price: 16.99,
    category: "Business",
    rating: 4.6,
    reviewsCount: 540,
    year: 2021,
    pages: 360,
    coverUrl: "https://www.dbooks.org/img/books/111954601Xs.jpg",
    url: "https://www.dbooks.org/blockchain-for-dummies-111954601x/",
    description: "A clear, accessible introduction to distributed ledger technology, smart contracts, and cryptographic networks."
  }
];

// Infer category from book title & authors
const inferCategory = (title = "", authors = "") => {
  const text = (title + " " + authors).toLowerCase();
  if (text.match(/code|aws|asp|svelte|bot|c &|raspberry|cloud|kubernetes|programming|devops|magazine|hackspace/)) {
    return "Technology";
  }
  if (text.match(/algebra|mathematics|systems|engineering|modelling|biology/)) {
    return "Science & Math";
  }
  if (text.match(/investment|debt|pay for play|social media|financing|money|industry|management/)) {
    return "Business";
  }
  return "General Literature";
};

// Generate deterministic price based on string ID
const generatePrice = (id = "") => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash << 5) - hash + id.charCodeAt(i);
  }
  const base = 9 + (Math.abs(hash) % 11); // $9 to $19
  const cents = [0.49, 0.75, 0.99, 0.50, 0.25][Math.abs(hash) % 5];
  return base + cents;
};

// Generate deterministic rating
const generateRating = (id = "") => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash += id.charCodeAt(i);
  }
  const ratings = [4.5, 4.6, 4.7, 4.8, 4.9, 5.0];
  return ratings[hash % ratings.length];
};

function BookList({ searchItem, showWishlistOnly, setShowWishlistOnly }) {
  const { wishlist } = useCart();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const fetchLiveBooks = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.dbooks.org/api/recent");
      if (!response.ok) throw new Error("API network response was not ok");
      const data = await response.json();

      if (data.status === "ok" && Array.isArray(data.books)) {
        const transformed = data.books.map((b) => ({
          id: b.id,
          title: b.title,
          subtitle: b.subtitle,
          author: b.authors || "Unknown Author",
          coverUrl: b.image,
          url: b.url,
          price: generatePrice(b.id),
          originalPrice: generatePrice(b.id) + 4,
          rating: generateRating(b.id),
          reviewsCount: Math.floor(100 + (parseInt(b.id.substring(0, 4), 10) || 120) % 400),
          category: inferCategory(b.title, b.authors),
          description: b.subtitle
            ? `${b.title}: ${b.subtitle}`
            : `Discover ${b.title} by ${b.authors || "renowned experts"}. Available for online reading and download.`,
          year: 2023,
          pages: 250 + (parseInt(b.id.substring(0, 3), 10) || 50) % 200,
        }));

        setBooks(transformed);
        setIsLiveApi(true);
      } else {
        throw new Error("Invalid API format");
      }
    } catch (error) {
      console.warn("dbooks.org API fetch failed, using fallback data:", error);
      setBooks(FALLBACK_BOOKS);
      setIsLiveApi(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveBooks();
  }, []);

  // Get unique categories dynamically
  const categories = useMemo(() => {
    const set = new Set(books.map((b) => b.category));
    return ["All", ...Array.from(set)];
  }, [books]);

  // Filtering & Sorting
  const filteredBooks = useMemo(() => {
    return books
      .filter((book) => {
        const matchesSearch =
          book.title.toLowerCase().includes(searchItem.toLowerCase()) ||
          book.author.toLowerCase().includes(searchItem.toLowerCase()) ||
          book.category.toLowerCase().includes(searchItem.toLowerCase());

        const matchesCategory =
          selectedCategory === "All" || book.category === selectedCategory;

        const matchesWishlist =
          !showWishlistOnly || wishlist.includes(book.id);

        return matchesSearch && matchesCategory && matchesWishlist;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [books, searchItem, selectedCategory, showWishlistOnly, wishlist, sortBy]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSortBy("featured");
    if (setShowWishlistOnly) setShowWishlistOnly(false);
  };

  return (
    <section className="book-section">
      {/* Category Pills & Sort Bar */}
      <div className="filter-toolbar">
        <div className="category-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCategory === cat && !showWishlistOnly ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                if (showWishlistOnly && setShowWishlistOnly) setShowWishlistOnly(false);
              }}
            >
              {cat}
            </button>
          ))}

          <button
            className={`category-pill wishlist-pill ${showWishlistOnly ? "active" : ""}`}
            onClick={() => setShowWishlistOnly && setShowWishlistOnly(!showWishlistOnly)}
          >
            <Heart size={14} fill={showWishlistOnly ? "#ef4444" : "none"} color={showWishlistOnly ? "#ef4444" : "currentColor"} />
            <span>Favorites ({wishlist.length})</span>
          </button>
        </div>

        <div className="toolbar-right-controls">
          <div className="api-status-badge" title={isLiveApi ? "Connected to dbooks.org API" : "Using cached fallback data"}>
            <Radio size={14} className={`status-pulse-icon ${isLiveApi ? "online" : "offline"}`} />
            <span>{isLiveApi ? "dbooks API Live" : "Offline Data"}</span>
            <button className="refresh-api-btn" onClick={fetchLiveBooks} title="Refresh API data">
              <RefreshCw size={12} className={loading ? "spin" : ""} />
            </button>
          </div>

          <div className="sort-dropdown-wrapper">
            <ArrowUpDown size={15} className="sort-icon" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
              aria-label="Sort books"
            >
              <option value="featured">Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="title">Title: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Status */}
      <div className="results-status-row">
        <span className="results-count">
          Showing <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? "book" : "books"}
          {showWishlistOnly && " in your Favorites"}
          {selectedCategory !== "All" && ` under ${selectedCategory}`}
          {searchItem && ` matching "${searchItem}"`}
        </span>

        {(selectedCategory !== "All" || showWishlistOnly || searchItem || sortBy !== "featured") && (
          <button className="reset-filters-btn" onClick={clearAllFilters}>
            Reset filters
          </button>
        )}
      </div>

      {/* Book Grid / Loading Skeletons */}
      {loading ? (
        <div className="book-grid">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="book-skeleton-card">
              <div className="skeleton-cover shimmer" />
              <div className="skeleton-body">
                <div className="skeleton-line shimmer short" />
                <div className="skeleton-line shimmer title" />
                <div className="skeleton-line shimmer author" />
                <div className="skeleton-footer shimmer" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div layout className="book-grid">
          <AnimatePresence mode="popLayout">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <motion.div
                  key={book.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 15 }}
                  transition={{ duration: 0.25 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))
            ) : (
              <motion.div
                key="no-books"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="empty-state-box"
              >
                <BookX size={56} className="empty-icon" />
                <h3>No Books Found</h3>
                <p>We couldn't find any books matching your search or filters.</p>
                <button className="clear-search-btn" onClick={clearAllFilters}>
                  View All Books
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

export default BookList;