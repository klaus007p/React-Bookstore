# 📚 Lumina Books — Modern React E-Commerce Bookstore

**Lumina Books** is a modern, high-performance web application built with **React 19**, **Vite**, **Framer Motion**, and **TailwindCSS**. It features live REST API integration with [dbooks.org](https://www.dbooks.org/api/recent), a slide-out shopping cart drawer, wishlist favorites management, category filtering, price/rating sorting, quick-view modals, and smooth dark/light mode transitions.

---

## ✨ Features

- 🌐 **Live REST API Integration**: Dynamically loads real-time curated book data, high-resolution cover artwork, and author details from the [dbooks.org](https://www.dbooks.org/api/recent) API with offline fallback.
- 🛒 **Shopping Cart & Slide-Out Drawer**:
  - Live item counter badge in navigation header.
  - Quantity controls (+/-), item removal, and subtotal/tax calculations.
  - Interactive **Free Shipping Progress Bar** ($50 threshold).
  - Animated order placement and checkout confirmation flow.
- 💖 **Wishlist / Favorites System**:
  - Toggle favorites with heart icon buttons.
  - One-click "Favorites" filter pill to view saved books.
  - Persistent state saved to `localStorage`.
- 🔍 **Real-Time Search & Category Filters**:
  - Live multi-field search across titles, authors, and keywords.
  - Category Pills: *Technology, Science & Math, Business, General Literature, Favorites*.
  - Sort Dropdown: *Featured, Highest Rated, Price: Low to High, Price: High to Low, Title: A to Z*.
- 📖 **Quick View Modal**: Inspect book details, publication year, page count, stock status, ratings breakdown, and direct access to online E-Book source links.
- 🌙 **Glassmorphic Dark & Light Modes**:
  - Seamless theme context with system preference auto-detection.
  - Press `T` keyboard shortcut to toggle theme anytime (smartly ignores input typing).
- 🔔 **Toast Notifications**: Floating animated alerts for cart additions, wishlist updates, and removals.
- ⚡ **Loading Skeletons**: Smooth shimmer animation placeholders while fetching live network data.

---

## 🛠️ Tech Stack

- **Core Library**: [React 19](https://react.dev/)
- **Build Tool & Server**: [Vite 8](https://vitejs.dev/)
- **Styling**: Vanilla CSS3 Custom Properties + [TailwindCSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion 13](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Source**: [dbooks.org REST API](https://www.dbooks.org/api/recent)

---

## 📁 Project Structure

```text
React-Bookstore/
├── public/                  # Static assets & favicons
├── src/
│   ├── assets/              # SVGs and images
│   ├── components/
│   │   ├── BookCard.jsx         # Book item card with cover, rating, wishlist & cart actions
│   │   ├── BookList.jsx         # Live API fetcher, category pills, sorting & grid
│   │   ├── CartDrawer.jsx       # Slide-out cart drawer with checkout & shipping tracker
│   │   ├── QuickViewModal.jsx   # Modal popup for inspecting book details & e-book links
│   │   ├── SearchBar.jsx        # Glassmorphic search input with clear button
│   │   ├── ThemeToggle.jsx      # Sun/Moon light and dark mode switch
│   │   └── ToastNotification.jsx# Animated action toast alerts
│   ├── context/
│   │   ├── CartContext.jsx      # Global cart, wishlist, toast, and modal state
│   │   └── ThemeContext.jsx     # Dark/Light theme manager with keyboard shortcut
│   ├── App.css              # Main design system styles & component layouts
│   ├── App.jsx              # Application root layout, header, hero banner & footer
│   ├── index.css            # CSS variables, typography & dark theme tokens
│   └── main.jsx             # React DOM root entrypoint
├── index.html               # Preloaded Google Fonts (Outfit & Inter) and SEO tags
├── package.json             # Project dependencies and npm scripts
└── vite.config.js           # Vite build configuration
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/React-Bookstore.git
   cd React-Bookstore/React-Bookstore
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173` to explore Lumina Books.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|---|---|
| `T` | Toggle between Light and Dark Mode (ignored when typing in search input) |

---

## 🗺️ Future Roadmap & Planned Features

- 💳 **Payment Gateway Integration**: Integrate Stripe and Razorpay for live credit card and UPI checkout processing.
- 📄 **Pagination & Infinite Scroll**: Server-side pagination and lazy loading for large book catalogs.
- 👤 **User Authentication & Profiles**: User sign-in/registration (Google OAuth & Email), order history, and saved shipping addresses.
- 📦 **Real-Time Order Tracking**: Interactive shipment tracking status timeline for purchased books.
- ⭐ **Reader Reviews & Ratings**: Allow authenticated users to write reviews, upload photo feedback, and rate books.
- 🎚️ **Advanced Filtering**: Price range sliders, publication year filters, and multi-select tags.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
