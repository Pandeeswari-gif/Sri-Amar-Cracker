import React from 'react';
import { Sparkles, ShieldCheck, Truck, Percent, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

const DiwaliSparkleBanner = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-red-950 via-[#2a0e3a] to-red-950 border-y border-amber-500/30 py-8 px-4 sm:px-6 my-8">
      {/* Background festive glow circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Offer Text */}
        <div className="text-center md:text-left space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider">
            <Percent className="w-3.5 h-3.5" /> Sivakasi Factory Direct Wholesale Rates
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500">
            50% SPECIAL FESTIVE OFFER
          </h2>
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-amber-200/90 uppercase flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span>BEST QUALITY</span>
            <span className="text-amber-500">•</span>
            <span>BEST PRICE</span>
            <span className="text-amber-500">•</span>
            <span>SAFE & RELIABLE</span>
            <span className="text-amber-500">•</span>
            <span>ALL INDIA DELIVERY</span>
          </p>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-stone-950 font-black text-sm tracking-wide shadow-lg shadow-amber-950/50 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            SHOP 117 CRACKERS
          </Link>
          <Link
            to="/combos"
            className="px-5 py-3 rounded-xl bg-stone-900/80 hover:bg-stone-800 text-amber-300 border border-amber-500/40 font-bold text-sm tracking-wide transition-all flex items-center gap-2"
          >
            <Gift className="w-4 h-4" />
            VIEW COMBO PACKS
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DiwaliSparkleBanner;
