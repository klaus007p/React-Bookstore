# 📚 Lumina Books — Modern React E-Commerce Bookstore

## 📚 Project Summary

**Lumina Books** is a modern, full-stack e-commerce web application for an online bookstore. It's a production-ready React application that demonstrates advanced frontend development practices, state management, real-time API integration, payment processing, and user authentication.

**Live Features:** Real-time book catalog with 1000+ books, shopping cart with checkout, wishlist management, user authentication, Razorpay payment integration, dark/light mode, and responsive design.

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

```
React-Bookstore/
├── src/
│   ├── components/                 # Reusable UI components
│   │   ├── BookCard.jsx           # Individual book item (card)
│   │   ├── BookList.jsx           # Grid of books with filtering/sorting
│   │   ├── CartDrawer.jsx         # Shopping cart drawer (slide-in)
│   │   ├── QuickViewModal.jsx     # Book details modal
│   │   ├── SearchBar.jsx          # Search input with clearing
│   │   ├── AuthModal.jsx          # Login/register modal
│   │   ├── PaymentModal.jsx       # Razorpay checkout modal
│   │   ├── ThemeToggle.jsx        # Dark/light mode button
│   │   └── ToastNotification.jsx  # Floating notifications
│   │
│   ├── context/                   # React Context providers
│   │   ├── CartContext.jsx        # Cart, wishlist, toast state
│   │   ├── AuthContext.jsx        # User authentication state
│   │   └── ThemeContext.jsx       # Dark/light theme state
│   │
│   ├── lib/
│   │   └── appwrite.js            # Appwrite client initialization
│   │
│   ├── App.jsx                    # Root layout component
│   ├── App.css                    # Main stylesheet (design system)
│   ├── index.css                  # Global styles + CSS variables
│   └── main.jsx                   # React entry point
│
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                 # Vite configuration
├── package.json                   # Dependencies
├── .env                           # Environment variables
├── .gitignore                     # Git ignore rules
├── .oxlintrc.json                # Linting rules
├── RAZORPAY_SETUP.md             # Backend integration guide
└── PROJECT_DOCUMENTATION.md       # This file
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
