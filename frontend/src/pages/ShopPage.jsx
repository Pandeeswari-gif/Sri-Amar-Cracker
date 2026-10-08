import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  PackageX
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProducts, fetchCategories } from '../services/api';
import { categoriesData } from '../data/categoriesData';

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(categoriesData);
  const [loading, setLoading] = useState(true);
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  // Filters state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState('number-asc');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [onlyCombos, setOnlyCombos] = useState(searchParams.get('combo') === 'true');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Sync state if URL query params change
  useEffect(() => {
    const qSearch = searchParams.get('search');
    const qCat = searchParams.get('category');
    if (qSearch !== null) setSearch(qSearch);
    if (qCat !== null) setSelectedCategory(qCat);
  }, [searchParams]);

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const params = {
          search: search.trim() || undefined,
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          sort: sortBy,
          maxPrice: maxPrice < 10000 ? maxPrice : undefined,
          isCombo: onlyCombos ? 'true' : undefined,
          page: currentPage,
          limit: 30
        };

        const res = await fetchProducts(params);
        if (res && res.products) {
          setProducts(res.products);
          setTotalPages(res.totalPages || 1);
          setTotalCount(res.total || res.products.length);
        }
      } catch (err) {
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [search, selectedCategory, sortBy, maxPrice, onlyCombos, currentPage]);

  // Reset filters
  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSortBy('number-asc');
    setMaxPrice(10000);
    setOnlyCombos(false);
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#200d33] via-[#160824] to-[#200d33] border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Sivakasi 2026 Authoritative Catalog
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-100">
            Sri Amar Crackers Store
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 mt-1">
            Browse all 117 authentic Sivakasi cracker varieties + 6 festival combo packs. Genuine 50% Special Offer.
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
            Active Catalog Items
          </div>
          <div className="text-3xl font-black text-amber-300">
            {totalCount} <span className="text-base text-stone-400 font-normal">Products</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Mobile Filter Toggle Button */}
        <div className="lg:hidden flex items-center justify-between gap-3">
          <button
            onClick={() => setShowFiltersMobile(!showFiltersMobile)}
            className="flex-1 py-2.5 px-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-sm flex items-center justify-center gap-2"
          >
            <SlidersHorizontal className="w-4 h-4" />
            {showFiltersMobile ? 'Hide Filters' : 'Show Filters & Categories'}
          </button>
          <button
            onClick={resetFilters}
            className="p-2.5 rounded-xl bg-stone-900 border border-stone-800 text-stone-400 hover:text-white"
            title="Reset Filters"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Filters Sidebar */}
        <div className={`space-y-6 lg:block ${showFiltersMobile ? 'block' : 'hidden'}`}>
          <div className="p-5 rounded-2xl bg-[#170a24] border border-amber-500/20 space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="font-bold text-sm text-stone-200 flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400" /> Filters & Sort
              </span>
              <button
                onClick={resetFilters}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {/* Search Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Search Product
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. Lakshmi, Kuruvi, 1000 wala..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full bg-[#10051a] text-sm text-stone-100 placeholder-stone-500 pl-9 pr-3 py-2 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                />
                <Search className="w-4 h-4 text-stone-500 absolute left-3 top-2.5" />
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-[#10051a] text-sm text-stone-200 p-2.5 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
              >
                <option value="number-asc">Catalog Order (#1 to #117)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Product Name (A - Z)</option>
                <option value="name-desc">Product Name (Z - A)</option>
              </select>
            </div>

            {/* Price Filter Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-stone-400 uppercase tracking-wider">Max Price</span>
                <span className="font-bold text-amber-400">
                  {maxPrice < 10000 ? `Up to ₹${maxPrice}` : 'All Prices'}
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="10000"
                step="50"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-500">
                <span>₹30</span>
                <span>₹5,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* Special Combos Checkbox */}
            <div className="pt-2 border-t border-stone-800">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-stone-300">
                <input
                  type="checkbox"
                  checked={onlyCombos}
                  onChange={(e) => {
                    setOnlyCombos(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 rounded text-amber-500 accent-amber-500"
                />
                <span>Show Only Combo Packs (6 Items)</span>
              </label>
            </div>

            {/* Categories List */}
            <div className="space-y-2 pt-2 border-t border-stone-800">
              <label className="text-xs font-semibold text-stone-400 uppercase tracking-wider">
                Categories (19)
              </label>
              <div className="max-h-80 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setCurrentPage(1);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === 'All'
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'text-stone-300 hover:bg-stone-800/40'
                  }`}
                >
                  <span>All Categories</span>
                  <span className="text-[10px] text-stone-500">117</span>
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat.name || selectedCategory === cat.slug
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-stone-300 hover:bg-stone-800/40'
                    }`}
                  >
                    <span className="truncate pr-2">{cat.name}</span>
                    {cat.count !== undefined && (
                      <span className="text-[10px] text-stone-500 shrink-0">{cat.count}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Product Cards Grid & Empty State */}
        <div className="lg:col-span-3 space-y-6">
          
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-72 rounded-2xl bg-[#160824] animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-[#160824] border border-amber-500/20 space-y-4">
              <PackageX className="w-12 h-12 text-amber-400/60 mx-auto" />
              <h3 className="text-lg font-bold text-stone-200">
                No products found. Try another search.
              </h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                We couldn't find any cracker matching your criteria. Try adjusting your filters or search keywords.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.productNumber} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-stone-800">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-2 rounded-xl bg-[#170a24] border border-stone-800 disabled:opacity-40 text-stone-300 hover:text-amber-300"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-stone-300">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-xl bg-[#170a24] border border-stone-800 disabled:opacity-40 text-stone-300 hover:text-amber-300"
                    aria-label="Next page"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}

        </div>

      </div>

    </div>
  );
};

export default ShopPage;
