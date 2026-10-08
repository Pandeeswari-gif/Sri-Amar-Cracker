import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Gift,
  ShieldCheck,
  Truck,
  Percent,
  Flame,
  ArrowRight,
  Phone,
  MessageCircle,
  Award,
  CheckCircle2,
  Package
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import DiwaliSparkleBanner from '../components/DiwaliSparkleBanner';
import { fetchProducts, fetchCategories } from '../services/api';
import { categoriesData } from '../data/categoriesData';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [combos, setCombos] = useState([]);
  const [categories, setCategories] = useState(categoriesData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        const prodRes = await fetchProducts({ limit: 125 });
        if (prodRes && prodRes.products) {
          const all = prodRes.products;
          setFeaturedProducts(all.filter(p => p.isFeatured && !p.isCombo).slice(0, 8));
          setBestSellers(all.filter(p => p.isBestSeller && !p.isCombo).slice(0, 8));
          setCombos(all.filter(p => p.isCombo).slice(0, 6));
        }
        const catRes = await fetchCategories();
        if (catRes) setCategories(catRes);
      } catch (err) {
        console.error('Home data load error:', err);
      } finally {
        setLoading(false);
      }
    };
    loadHomeData();
  }, []);

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#190a28] via-[#12071d] to-[#0c0511] pt-12 pb-20 border-b border-amber-500/20">
        {/* Decorative lighting background circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-red-600/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Traditional Tamil Invocations */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-tamil font-semibold text-amber-300/90">
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                ஸ்ரீகொத்தாளசுவாமி துணை
              </span>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                ஶ்ரீஅங்காளஈஸ்வரி துணை
              </span>
            </div>

            {/* Sivakasi Capital Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-red-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-black tracking-widest uppercase">
              <Sparkles className="w-4 h-4 text-amber-400 animate-sparkle" />
              SIVAKASI • THE CRACKERS CAPITAL OF INDIA
            </div>

            {/* Main Brand Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight uppercase">
              <span className="block text-stone-100">Sri Amar</span>
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Crackers
              </span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-2xl font-bold text-amber-200 tracking-wide uppercase">
              QUALITY CRACKERS FOR A BRIGHTER TOMORROW
            </p>

            {/* Highlighted Offer Pill */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <div className="px-5 py-2 rounded-xl bg-red-600 text-white font-black text-sm sm:text-base tracking-wide shadow-lg shadow-red-950/60 flex items-center gap-2 animate-bounce">
                <Percent className="w-5 h-5" />
                50% SPECIAL OFFER
              </div>
              <div className="px-5 py-2 rounded-xl bg-stone-900 border border-amber-500/40 text-amber-300 font-bold text-sm sm:text-base flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-400" />
                ALL INDIA DELIVERY
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                to="/shop"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-base shadow-xl shadow-amber-950/50 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
              >
                <ShoppingBag className="w-5 h-5" />
                SHOP NOW
              </Link>
              <Link
                to="/combos"
                className="px-8 py-4 rounded-xl bg-[#220f38] hover:bg-[#2c1348] text-amber-300 border border-amber-500/40 font-black text-base shadow-lg transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <Gift className="w-5 h-5 text-amber-400" />
                VIEW OFFERS & COMBOS
              </Link>
            </div>

            {/* Direct WhatsApp Pill */}
            <div className="pt-2 text-xs sm:text-sm text-stone-400 flex items-center justify-center gap-2">
              <span>Need help ordering?</span>
              <a
                href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20I%20would%20like%20to%20order"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-bold flex items-center gap-1 underline"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp us at 7094183836
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Trust Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-[#160924] border border-amber-500/20 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-100">Direct From Sivakasi</div>
              <div className="text-xs text-stone-400">100% Genuine Quality</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#160924] border border-amber-500/20 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">
              <Percent className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-100">50% Special Offer</div>
              <div className="text-xs text-stone-400">Authentic Factory Rates</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#160924] border border-amber-500/20 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-100">All India Delivery</div>
              <div className="text-xs text-stone-400">Safe Festival Shipping</div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-[#160924] border border-amber-500/20 flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-green-500/20 text-green-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-sm text-stone-100">Safe & Reliable</div>
              <div className="text-xs text-stone-400">Tested Quality Fuses</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 50% Special Offer Banner */}
      <DiwaliSparkleBanner />

      {/* 4. Product Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-stone-800 pb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100">
              Shop by Category
            </h2>
            <p className="text-xs sm:text-sm text-amber-400/90 font-medium">
              Explore all 19 official product categories direct from the 2026 catalog
            </p>
          </div>
          <Link
            to="/categories"
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
          >
            View all 19 categories <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              to={`/shop?category=${encodeURIComponent(cat.slug)}`}
              className="group p-4 rounded-2xl bg-[#190a28] border border-amber-500/20 hover:border-amber-400/50 hover:bg-[#230e38] transition-all flex flex-col justify-between text-center hover:scale-[1.02]"
            >
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors mb-3">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-stone-100 group-hover:text-amber-300 line-clamp-2">
                  {cat.name}
                </h3>
                {cat.count !== undefined && (
                  <span className="text-[11px] text-stone-400 font-medium">
                    {cat.count} items
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Best Seller Crackers (Catalog 117 Highlights) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-2 border-b border-stone-800 pb-3">
          <div>
            <div className="inline-block px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-1">
              Top Customer Choices
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-stone-100">
              Best Selling Festival Crackers
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 group"
          >
            Explore all 117 products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.productNumber} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Dedicated Combo Packs Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#2b0f3e] via-[#1c082b] to-[#12041d] border border-amber-500/40 p-6 sm:p-10 shadow-2xl space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-amber-500/20 pb-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-black uppercase tracking-wider">
                Special Diwali Assortments
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-amber-300">
                Official 50% Combo Packs
              </h2>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Balanced celebration boxes packed with sound crackers, sparklers, ground chakkars, pots and fancy items for families and kids.
              </p>
            </div>
            <Link
              to="/combos"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm tracking-wide shrink-0 transition-transform hover:scale-105"
            >
              View All 6 Combos →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {combos.map((combo) => (
              <div
                key={combo.productNumber}
                className="p-5 rounded-2xl bg-[#160826] border border-amber-500/30 flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-400 font-bold mb-1">
                    <span>#{combo.productNumber}</span>
                    <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[11px] font-black">
                      50% OFF
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-100">{combo.name}</h3>
                  <p className="text-xs text-stone-400 mt-1 line-clamp-2">{combo.description}</p>
                </div>
                <div className="flex items-baseline justify-between pt-3 border-t border-stone-800">
                  <div>
                    <span className="text-xl font-black text-amber-400">₹{combo.offerPrice}</span>
                    <span className="text-xs text-stone-500 line-through ml-2">₹{combo.originalPrice}</span>
                  </div>
                  <Link
                    to={`/product/${combo.productNumber}`}
                    className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Sivakasi Heritage & Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#170a24] to-[#12051e] border border-amber-500/20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Sivakasi Mainroad, Thayilpatti, Sivakasi - 626126
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-stone-100">
            Celebrate This Diwali with Authentic Sivakasi Crackers
          </h2>
          <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto">
            Direct dispatch from Sivakasi factory. Save 50% on every order. Call or WhatsApp our store team for custom festival assortments.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="tel:7094183836"
              className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Call: 7094183836
            </a>
            <a
              href="https://wa.me/917094183836"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Order
            </a>
          </div>
          <div className="text-amber-400 font-bold text-sm sm:text-base pt-2">
            Let Happiness Sparkle Always! ✨
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
