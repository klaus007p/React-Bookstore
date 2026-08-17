import React, { useState, useEffect, useMemo } from "react";
import BookCard from "./BookCard";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpDown, BookX, Heart, RefreshCw, Radio, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "../context/CartContext";

// Offline Fallback Books Data (12 Curated Books across Technology, Classics, Science & Business)
// You can Use Mock or dummy data incase app crashes
const FALLBACK_BOOKS = [
  {
    id: "1098127463",
    title: "Security as Code",
    subtitle: "DevSecOps Patterns with AWS",
    author: "BK Sarthak Das, Virginia Chu",
    price: 14.99,
    originalPrice: 18.99,
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
    originalPrice: 16.50,
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
    originalPrice: 15.99,
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
    originalPrice: 21.99,
    category: "Business",
    rating: 4.6,
    reviewsCount: 540,
    year: 2021,
    pages: 360,
    coverUrl: "https://www.dbooks.org/img/books/111954601Xs.jpg",
    url: "https://www.dbooks.org/blockchain-for-dummies-111954601x/",
    description: "A clear, accessible introduction to distributed ledger technology, smart contracts, and cryptographic networks."
  },
  {
    id: "1342",
    title: "Pride and Prejudice",
    subtitle: "A Masterpiece of Romantic Fiction",
    author: "Jane Austen",
    price: 9.99,
    originalPrice: 13.99,
    category: "General Literature",
    rating: 4.9,
    reviewsCount: 890,
    year: 1813,
    pages: 432,
    coverUrl: "https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/1342",
    description: "The classic tale of Elizabeth Bennet and Mr. Darcy navigating class, marriage, and pride in 19th-century England."
  },
  {
    id: "84",
    title: "Frankenstein",
    subtitle: "The Modern Prometheus",
    author: "Mary Wollstonecraft Shelley",
    price: 10.99,
    originalPrice: 14.99,
    category: "General Literature",
    rating: 4.8,
    reviewsCount: 670,
    year: 1818,
    pages: 280,
    coverUrl: "https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/84",
    description: "A chilling gothic saga exploring creation, responsibility, ambition, and humanity through Victor Frankenstein and his creature."
  },
  {
    id: "11",
    title: "Alice's Adventures in Wonderland",
    subtitle: "Fantasy Classic",
    author: "Lewis Carroll",
    price: 8.99,
    originalPrice: 12.99,
    category: "General Literature",
    rating: 4.7,
    reviewsCount: 520,
    year: 1865,
    pages: 200,
    coverUrl: "https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/11",
    description: "Tumble down the rabbit hole with Alice into a whimsical world of Mad Hatters, Cheshire Cats, and Queen of Hearts."
  },
  {
    id: "1661",
    title: "The Adventures of Sherlock Holmes",
    subtitle: "Classic Mystery Stories",
    author: "Arthur Conan Doyle",
    price: 13.49,
    originalPrice: 17.49,
    category: "General Literature",
    rating: 4.9,
    reviewsCount: 940,
    year: 1892,
    pages: 307,
    coverUrl: "https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/1661",
    description: "Follow the master detective Sherlock Holmes and Dr. Watson as they solve London's most baffling mysteries."
  },
  {
    id: "345",
    title: "Dracula",
    subtitle: "Gothic Horror Classic",
    author: "Bram Stoker",
    price: 11.49,
    originalPrice: 15.49,
    category: "General Literature",
    rating: 4.8,
    reviewsCount: 780,
    year: 1897,
    pages: 418,
    coverUrl: "https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/345",
    description: "The iconic epistolary novel introducing Count Dracula's dark journey from Transylvania to Victorian London."
  },
  {
    id: "2701",
    title: "Moby Dick; Or, The Whale",
    subtitle: "Epic Nautical Adventure",
    author: "Herman Melville",
    price: 12.99,
    originalPrice: 16.99,
    category: "General Literature",
    rating: 4.6,
    reviewsCount: 430,
    year: 1851,
    pages: 635,
    coverUrl: "https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/2701",
    description: "Captain Ahab's obsessive quest for revenge against the legendary white whale, Moby Dick."
  },
  {
    id: "1513",
    title: "Romeo and Juliet",
    subtitle: "Tragic Masterpiece",
    author: "William Shakespeare",
    price: 9.49,
    originalPrice: 13.49,
    category: "General Literature",
    rating: 4.7,
    reviewsCount: 610,
    year: 1597,
    pages: 240,
    coverUrl: "https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/1513",
    description: "The immortal tragedy of star-crossed lovers from feud-torn Verona."
  },
  {
    id: "1952",
    title: "The Yellow Wallpaper",
    subtitle: "Psychological Fiction",
    author: "Charlotte Perkins Gilman",
    price: 7.99,
    originalPrice: 11.99,
    category: "Science & Math",
    rating: 4.8,
    reviewsCount: 390,
    year: 1892,
    pages: 120,
    coverUrl: "https://www.gutenberg.org/cache/epub/1952/pg1952.cover.medium.jpg",
    url: "https://www.gutenberg.org/ebooks/1952",
    description: "A haunting feminist classic detailing a woman's psychological confinement and isolation."
  }
];

// Infer category from book title & authors
const inferCategory = (title = "", authors = "") => {
  const text = (title + " " + authors).toLowerCase();
  if (text.match(/code|aws|asp|svelte|bot|c &|raspberry|cloud|kubernetes|programming|devops|magazine|hackspace|technology|computer/)) {
    return "Technology";
  }
  if (text.match(/algebra|mathematics|systems|engineering|modelling|biology|science|physics|psychology/)) {
    return "Science & Math";
  }
  if (text.match(/investment|debt|pay for play|social media|financing|money|industry|management|business/)) {
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

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // 8 items per page

  const fetchLiveBooks = async (signal, query = "") => {
    setLoading(true);
    try {
      const endpoint = query.trim()
        ? `https://gutendex.com/books/?search=${encodeURIComponent(query.trim())}`
        : `https://gutendex.com/books/`;

      const response = await fetch(endpoint, { signal });
      if (!response.ok) throw new Error("API network response was not ok");
      const data = await response.json();

      if (Array.isArray(data.results)) {
        const transformed = data.results.map((b) => {
          const authorNames = Array.isArray(b.authors) && b.authors.length
            ? b.authors.map((a) => a.name).join(", ")
            : "Unknown Author";

          const coverUrl = b.formats?.["image/jpeg"] || "";
          const readerUrl =
            b.formats?.["text/html"] ||
            b.formats?.["text/html; charset=utf-8"] ||
            b.formats?.["application/epub+zip"] ||
            "";

          const idStr = String(b.id);

          return {
            id: idStr,
            title: b.title || "Untitled",
            subtitle: b.summaries?.[0] || "",
            author: authorNames,
            coverUrl,
            url: readerUrl,
            price: generatePrice(idStr),
            originalPrice: generatePrice(idStr) + 4,
            rating: generateRating(idStr),
            reviewsCount: Math.floor(100 + (parseInt(idStr.slice(0, 4), 10) || 120) % 400),
            category: inferCategory(b.title, authorNames),
            description: b.summaries?.[0] || `Discover ${b.title || "this book"} by ${authorNames}.`,
            year: 2023,
            pages: 250 + (parseInt(idStr.slice(0, 3), 10) || 50) % 200,
          };
        });

        setBooks(transformed);
        setIsLiveApi(true);
      } else {
        throw new Error("Invalid API format");
      }
    } catch (error) {
      if (error?.name === "AbortError") return;
      console.warn("Gutendex API fetch failed, using fallback data:", error);
      setBooks(FALLBACK_BOOKS);
      setIsLiveApi(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => {
      fetchLiveBooks(controller.signal, searchItem);
    }, 350);

    return () => {
      controller.abort();
      clearTimeout(timer);
    };
  }, [searchItem]);

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

  // Reset page to 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchItem, selectedCategory, showWishlistOnly, sortBy]);

  // Paginated Subset
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = useMemo(() => {
    return filteredBooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredBooks, startIndex, itemsPerPage]);

  const clearAllFilters = () => {
    setSelectedCategory("All");
    setSortBy("featured");
    setCurrentPage(1);
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
          <div className="api-status-badge" title={isLiveApi ? "Connected to Gutendex API" : "Using cached fallback data"}>
            <Radio size={14} className={`status-pulse-icon ${isLiveApi ? "online" : "offline"}`} />
            <span>{isLiveApi ? "Gutendex Live" : "Offline Data"}</span>
            <button className="refresh-api-btn" onClick={() => fetchLiveBooks(null, searchItem)} title="Refresh API data">
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
          Showing <strong>{paginatedBooks.length}</strong> of <strong>{filteredBooks.length}</strong> {filteredBooks.length === 1 ? "book" : "books"}
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
            {paginatedBooks.length > 0 ? (
              paginatedBooks.map((book) => (
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

      {/* Pagination Bar */}
      {!loading && totalPages > 1 && (
        <div className="pagination-bar">
          <button
            className="pagination-btn"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((prev) => Math.max(1, prev - 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            aria-label="Previous Page"
          >
            <ChevronLeft size={18} />
            <span>Previous</span>
          </button>

          <div className="pagination-pages">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                className={`pagination-num-btn ${currentPage === pageNum ? "active" : ""}`}
                onClick={() => {
                  setCurrentPage(pageNum);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            className="pagination-btn"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((prev) => Math.min(totalPages, prev + 1));
              window.scrollTo({ top: 300, behavior: "smooth" });
            }}
            aria-label="Next Page"
          >
            <span>Next</span>
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </section>
  );
}

export default BookList;