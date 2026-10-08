import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronDown,
  LogOut,
  PackageCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { searchProductsInstant } from '../services/api';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  const { totalItems } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setAccountMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Handle instant search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      try {
        const results = await searchProductsInstant(searchQuery);
        setSearchResults(results || []);
      } catch (e) {
        setSearchResults([]);
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Click outside search results to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All (117)', path: '/shop' },
    { name: 'Categories', path: '/categories' },
    { name: 'Combos', path: '/combos', badge: '50% OFF' },
    { name: 'Track Order', path: '/track' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-gradient-to-r from-red-900 via-amber-900 to-red-900 text-amber-200 text-xs sm:text-sm py-1.5 px-4 font-medium border-b border-amber-500/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-500 text-red-950 font-black px-2 py-0.5 rounded text-[11px] tracking-wide uppercase">
              50% SPECIAL OFFER
            </span>
            <span className="hidden sm:inline">🎆 Direct from Sivakasi — The Crackers Capital of India</span>
            <span className="sm:hidden">🎆 All India Delivery</span>
          </div>
          <div className="flex items-center gap-4 text-xs shrink-0">
            <a
              href="tel:7094183836"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>7094183836</span>
            </a>
            <a
              href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20I%20have%20an%20enquiry%20regarding%20Diwali%20crackers"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1 text-green-400 hover:text-green-300"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Quick Order</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#12071d]/95 backdrop-blur-md border-b border-amber-500/20 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-2 sm:gap-4">
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-amber-400 hover:bg-stone-800/60 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Brand Logo */}
            <Link to="/" className="flex flex-col group py-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-6 h-6 text-amber-400 animate-sparkle" />
                <span className="text-xl sm:text-2xl font-black tracking-wider bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent group-hover:brightness-110 transition-all uppercase">
                  Sri Amar Crackers
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold text-amber-200/80 tracking-widest pl-7">
                <span>SIVAKASI</span>
                <span>•</span>
                <span className="text-amber-400 font-bold">50% SPECIAL OFFER</span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'text-amber-400 bg-amber-500/10'
                        : 'text-stone-300 hover:text-amber-300 hover:bg-stone-800/40'
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-extrabold bg-red-600 text-white rounded-full">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Search Bar (Desktop) */}
            <div className="hidden md:block relative flex-1 max-w-xs xl:max-w-sm" ref={searchRef}>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search 117 crackers (e.g. Lakshmi, 1000 wala)..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setSearchOpen(true);
                  }}
                  onFocus={() => setSearchOpen(true)}
                  className="w-full bg-[#1b0b2b] text-sm text-stone-100 placeholder-stone-400 pl-9 pr-4 py-2 rounded-full border border-amber-500/30 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
                <Search className="w-4 h-4 text-amber-400 absolute left-3 top-3" />
              </form>

              {/* Instant Search Results Dropdown */}
              {searchOpen && searchResults.length > 0 && (
                <div className="absolute left-0 right-0 mt-2 bg-[#1b0b2b] border border-amber-500/40 rounded-xl shadow-2xl overflow-hidden z-50 max-h-96 overflow-y-auto">
                  <div className="p-2 border-b border-stone-800 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Quick Results ({searchResults.length})
                  </div>
                  {searchResults.map((item) => (
                    <Link
                      key={item.productNumber}
                      to={`/product/${item._id || item.productNumber}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 p-3 hover:bg-amber-500/10 border-b border-stone-800/50 transition-colors"
                    >
                      <span className="w-7 h-7 flex items-center justify-center text-xs font-bold rounded-full bg-amber-500/20 text-amber-300 shrink-0">
                        #{item.productNumber}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-stone-100 truncate">{item.name}</div>
                        <div className="text-xs text-stone-400">{item.category}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-sm font-bold text-amber-400">
                          {item.isCall ? 'CALL' : (item.isNetNet ? 'NET NET' : `₹${item.offerPrice}`)}
                        </div>
                        {item.originalPrice && !item.isCall && !item.isNetNet && (
                          <div className="text-[11px] text-stone-500 line-through">₹{item.originalPrice}</div>
                        )}
                      </div>
                    </Link>
                  ))}
                  <div className="p-2 bg-stone-900/60 text-center">
                    <button
                      onClick={handleSearchSubmit}
                      className="text-xs text-amber-400 hover:underline font-semibold"
                    >
                      View all results for "{searchQuery}" →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Wishlist, Cart, Account */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Mobile Search Icon trigger */}
              <button
                onClick={() => navigate('/shop')}
                className="md:hidden p-2 text-stone-300 hover:text-amber-400"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="relative p-2 text-stone-300 hover:text-red-400 transition-colors rounded-lg hover:bg-stone-800/40"
                title="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative flex items-center gap-2 p-2 px-2.5 bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/40 hover:border-amber-400 text-amber-300 rounded-xl transition-all"
                title="Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-bold">Cart</span>
                <span className="bg-amber-500 text-stone-950 text-xs font-extrabold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </Link>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  className="flex items-center gap-1.5 p-2 text-stone-300 hover:text-amber-300 rounded-lg hover:bg-stone-800/40 transition-colors"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3.5 h-3.5 hidden sm:block" />
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#1e0e33] border border-amber-500/30 rounded-xl shadow-2xl py-2 z-50 divide-y divide-stone-800">
                    <div className="px-4 py-2">
                      <div className="text-xs text-stone-400">Signed in as</div>
                      <div className="text-sm font-semibold text-amber-300 truncate">
                        {isAuthenticated ? user?.name : 'Guest Customer'}
                      </div>
                      {isAdmin && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded">
                          Store Admin
                        </span>
                      )}
                    </div>

                    <div className="py-1">
                      {isAuthenticated ? (
                        <>
                          <Link
                            to="/account"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-200 hover:bg-amber-500/10 hover:text-amber-300"
                          >
                            <User className="w-4 h-4 text-amber-400" />
                            My Profile
                          </Link>
                          <Link
                            to="/account/orders"
                            className="flex items-center gap-2 px-4 py-2 text-sm text-stone-200 hover:bg-amber-500/10 hover:text-amber-300"
                          >
                            <PackageCheck className="w-4 h-4 text-amber-400" />
                            My Orders
                          </Link>
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center gap-2 px-4 py-2 text-sm text-amber-400 hover:bg-amber-500/10 font-medium"
                            >
                              <ShieldCheck className="w-4 h-4 text-amber-400" />
                              Admin Dashboard
                            </Link>
                          )}
                        </>
                      ) : (
                        <>
                          <Link
                            to="/login"
                            className="block px-4 py-2 text-sm text-amber-300 font-semibold hover:bg-amber-500/10"
                          >
                            Customer Login
                          </Link>
                          <Link
                            to="/register"
                            className="block px-4 py-2 text-sm text-stone-300 hover:bg-amber-500/10"
                          >
                            Create Account
                          </Link>
                          <Link
                            to="/admin/login"
                            className="flex items-center gap-2 px-4 py-2 text-xs text-stone-400 hover:bg-amber-500/10 hover:text-amber-300"
                          >
                            <ShieldCheck className="w-3.5 h-3.5" />
                            Admin Access
                          </Link>
                        </>
                      )}
                    </div>

                    {isAuthenticated && (
                      <div className="py-1">
                        <button
                          onClick={logout}
                          className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-950/40"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#150724] border-b border-amber-500/30 px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative mb-3">
              <input
                type="text"
                placeholder="Search crackers by name or number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1f0d33] text-sm text-stone-100 placeholder-stone-400 pl-9 pr-4 py-2.5 rounded-xl border border-amber-500/30 focus:border-amber-400 focus:outline-none"
              />
              <Search className="w-4 h-4 text-amber-400 absolute left-3 top-3.5" />
            </form>

            <div className="grid grid-cols-2 gap-2 pb-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`p-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                    location.pathname === link.path
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-stone-900/40 text-stone-200 hover:bg-stone-800'
                  }`}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            <div className="pt-2 border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
              <a
                href="tel:7094183836"
                className="flex items-center gap-1.5 text-amber-300 font-bold"
              >
                <Phone className="w-4 h-4" /> 7094183836
              </a>
              <a
                href="https://wa.me/917094183836"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-green-400 font-bold"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Order
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
