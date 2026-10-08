# 🎆 SRI AMAR CRACKERS — Full-Stack E-Commerce Platform

> **QUALITY CRACKERS FOR A BRIGHTER TOMORROW**  
> **SIVAKASI • THE CRACKERS CAPITAL OF INDIA**  
> **50% SPECIAL OFFER • ALL INDIA DELIVERY**

A complete, professional, modern, mobile-first, production-ready e-commerce platform built for **Sri Amar Crackers**, Sivakasi, Tamil Nadu.

---

## 🌟 Brand Identity & Invocations
- **Traditional Invocations:**
  - ஸ்ரீகொத்தாளசுவாமி துணை
  - ஶ்ரீஅங்காளஈஸ்வரி துணை
- **Contact Phone:** 7094183836
- **Contact Email:** amargobi64@gmail.com
- **Factory & Office Address:** Sivakasi Mainroad, Thayilpatti, Sivakasi - 626126, Tamil Nadu, India
- **Closing Message:** *Let Happiness Sparkle Always!*

---

## 🎯 Authoritative Catalog Specifications
- **117 Catalog Products** faithfully preserved from the 2026 catalog across **19 distinct categories**.
- **6 Special Festival Combo Packs** (21 Item, 35 Item, 45 Item, 55 Item, Family Combo Pack ₹1,505, Kids Combo Pack ₹2,505).
- Accurate preservation of **CALL FOR PRICE** (15 SHOT RIDER, 25 SHOT RIDER) and **NET NET RATE** (21, 31, 41, 51, 50 Items Gift Boxes).
- Verified calculation rules: 50% discount rate accurately calculated from manufacturer base price.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, React Router v6, Axios, Lucide Icons, Canvas Confetti |
| **Backend** | Node.js, Express.js, REST API, JWT Authentication, bcryptjs, Helmet, CORS, Rate Limiting |
| **Database** | MongoDB, Mongoose (MongoDB Atlas & Local Ready with auto-fallback) |
| **Deployment** | Vercel (Frontend SPA), Render/Railway (Backend API), MongoDB Atlas (Cloud DB) |

---

## 📂 Project Structure

```
sri-amar-crackers/
├── frontend/
│   ├── src/
│   │   ├── components/       # Navbar, Footer, ProductCard, DiwaliSparkleBanner, OrderTimeline, Toast
│   │   ├── pages/            # Home, Shop, ProductDetails, Combos, Categories, Cart, Checkout, etc.
│   │   │   └── admin/        # AdminDashboard, AdminProducts, AdminOrders, AdminLogin
│   │   ├── context/          # AuthContext, CartContext, WishlistContext
│   │   ├── services/         # Axios API layer with offline fallback
│   │   ├── data/             # 117 Catalog products & 19 Categories
│   │   ├── App.jsx           # Master route configuration
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Festive Diwali styling & custom scrollbar
│   ├── index.html            # SEO & JSON-LD structured data
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── vercel.json           # SPA rewrites & security headers
│   └── package.json
├── backend/
│   ├── config/               # Resilient MongoDB connection
│   ├── controllers/          # Auth, Product, Category, Order, Review, Coupon, Wishlist, Admin
│   ├── models/               # Mongoose Schemas (User, Product, Order, Category, Review, Coupon)
│   ├── routes/               # Modular Express REST API routes
│   ├── middleware/           # JWT protect and Admin role authorization
│   ├── scripts/              # Automated seed.js and verify.js scripts
│   ├── data/                 # Authoritative 2026 catalog data
│   ├── server.js             # Express application server
│   └── package.json
├── deployment/               # Vercel, Render and Atlas deployment guides
├── .gitignore
└── README.md
```

---

## ⚡ Quick Start & Local Setup

### 1. Prerequisites
- **Node.js** v18+
- **npm** v9+
- Local **MongoDB** instance or **MongoDB Atlas** connection string

### 2. Backend Setup & Seeding
```bash
# Navigate to backend
cd backend

# Install dependencies (already installed)
npm install

# Seed the database with all 117 products, categories, admin and coupons
npm run seed

# Run automated verification test suite
npm run verify

# Start development server (Port 5000)
npm start
```

### 3. Frontend Setup
```bash
# Navigate to frontend in a new terminal
cd frontend

# Install dependencies (already installed)
npm install

# Start Vite dev server (Port 5173)
npm run dev
```

Visit `http://localhost:5173` in your browser!

---

## 🔑 Default Accounts (For Testing & Evaluation)

| Role | Email / Username | Password |
|---|---|---|
| **Store Admin** | `admin@sriamar.com` | `AmarCrackers@2026` |
| **Customer** | `customer@sriamar.com` | `CustomerPass@123` |

---

## 🧪 Automated Verification Suite
Run the automated test suite anytime to verify product counts, prices, categories, and business parameters:
```bash
cd backend
npm run verify
```
**Test Results:**
- ✅ 19/19 Product Categories matched.
- ✅ 117/117 Catalog Products (Numbers 1 to 117 with zero gaps).
- ✅ 6/6 Section 28 Combo Packs verified.
- ✅ CALL FOR PRICE items preserved without invented pricing.
- ✅ NET NET RATE gift boxes preserved without invented pricing.
- ✅ Spot-checked 8 sample products against PDF catalog.
- ✅ Business contact details (7094183836, amargobi64@gmail.com, Sivakasi) verified.

---

## 💳 Payment & Ordering Workflows
1. **Cash on Delivery (COD):** Fully functional out of the box with zero setup needed.
2. **WhatsApp Order:** Converts customer cart into a formatted, pre-filled WhatsApp message sent directly to `+91 7094183836`.
3. **Razorpay Architecture:** Configured via `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. If credentials are not set, COD remains default without crashing.

---

## 🚀 Public Deployment Guide

### A. MongoDB Atlas
1. Follow instructions in [deployment/mongodb-atlas-guide.md](file:///deployment/mongodb-atlas-guide.md).
2. Set your `MONGODB_URI` environment variable.
3. Run `npm run seed` to populate your cloud database.

### B. Backend (Render / Railway)
1. Push repository to GitHub.
2. Create Web Service on Render / Railway pointing to `backend`.
3. Set environment variables:
   - `PORT`: `5000` (or leave default for auto-assigned)
   - `MONGODB_URI`: your Atlas connection URI
   - `JWT_SECRET`: your secret key
   - `CLIENT_URL`: `https://your-frontend.vercel.app`
   - `ADMIN_EMAIL`: `admin@sriamar.com`
   - `ADMIN_PASSWORD`: `AmarCrackers@2026`

### C. Frontend (Vercel)
1. Import repository in [Vercel](https://vercel.com).
2. Root directory: `frontend`.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Environment Variables:
   - `VITE_API_URL`: `https://your-backend.onrender.com/api`
   - `VITE_WHATSAPP_NUMBER`: `7094183836`
6. `vercel.json` already contains SPA rewriting to prevent 404s on page refresh.

---

## 🛡️ Production Security Checklist
- [x] Passwords securely hashed with `bcryptjs` salt rounds.
- [x] JWT token authorization with expiration.
- [x] Role-based middleware for admin endpoints.
- [x] Input sanitization against MongoDB injection.
- [x] HTTP headers secured via `helmet`.
- [x] API rate limiting enabled via `express-rate-limit`.
- [x] Secrets isolated in `.env` (never exposed in frontend build).
- [x] Responsive layout tested for zero horizontal scroll on mobile.

---

*Let Happiness Sparkle Always!* ✨
