import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ShoppingBag } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mx-auto">
        <Sparkles className="w-10 h-10 animate-sparkle" />
      </div>
      <div className="text-6xl font-black text-amber-400">404</div>
      <h1 className="text-2xl sm:text-3xl font-black text-stone-100">
        Page Not Found
      </h1>
      <p className="text-xs sm:text-sm text-stone-400 max-w-sm mx-auto">
        The page you are looking for doesn't exist or has moved. Return to the store to explore all 117 Sivakasi crackers!
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Link
          to="/"
          className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Go Home
        </Link>
        <Link
          to="/shop"
          className="px-6 py-3 rounded-xl bg-[#1e0e33] border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4" /> Browse Shop
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
