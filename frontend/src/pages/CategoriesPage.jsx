import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';
import { categoriesData } from '../data/categoriesData';

const CategoriesPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-black uppercase tracking-wider">
          Complete Sivakasi Range
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          All 19 Cracker Categories
        </h1>
        <p className="text-sm text-stone-400">
          From traditional sound crackers to spectacular multi-colour aerial cakes and special gift boxes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoriesData.map((cat) => (
          <Link
            key={cat.slug}
            to={`/shop?category=${encodeURIComponent(cat.slug)}`}
            className="p-6 rounded-3xl bg-[#180a28] border border-amber-500/20 hover:border-amber-400/50 hover:bg-[#200e33] transition-all group flex flex-col justify-between gap-4"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-black transition-colors">
                <Flame className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-stone-100 group-hover:text-amber-300 transition-colors">
                {cat.name}
              </h2>
              <p className="text-xs text-stone-400 leading-relaxed">
                {cat.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-800/80 flex items-center justify-between text-xs font-bold text-amber-400">
              <span>View Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

    </div>
  );
};

export default CategoriesPage;
