import React from 'react';
import { Sparkles, ShieldCheck, Truck, Percent, Award, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
          Sivakasi • The Crackers Capital of India
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          About Sri Amar Crackers
        </h1>
        <p className="text-base sm:text-lg text-amber-400 font-bold uppercase">
          QUALITY CRACKERS FOR A BRIGHTER TOMORROW
        </p>
      </div>

      {/* Main Story Content */}
      <div className="p-8 sm:p-10 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6 text-stone-300 text-sm sm:text-base leading-relaxed">
        <p>
          Welcome to <strong className="text-stone-100 font-bold">Sri Amar Crackers</strong>, located at Sivakasi Mainroad, Thayilpatti, Sivakasi. Sivakasi is globally renowned as the Crackers Capital of India, celebrated for its craftsmanship in producing traditional and innovative festival fireworks.
        </p>

        <p>
          Our mission is to bring genuine Sivakasi firecrackers directly to Indian households at wholesale rates. We believe every family deserves to celebrate Diwali, weddings, and auspicious milestones with utmost brightness, joy, and peace of mind.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
          <div className="p-5 rounded-2xl bg-[#12051d] border border-amber-500/20 space-y-2 text-center">
            <Percent className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-stone-100 text-sm">50% Special Offer</h3>
            <p className="text-xs text-stone-400">Authentic wholesale factory pricing direct to customers.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#12051d] border border-amber-500/20 space-y-2 text-center">
            <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-stone-100 text-sm">Quality & Safety</h3>
            <p className="text-xs text-stone-400">Tested fuses, high-grade composition and safe packaging.</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#12051d] border border-amber-500/20 space-y-2 text-center">
            <Truck className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="font-bold text-stone-100 text-sm">All India Delivery</h3>
            <p className="text-xs text-stone-400">Careful packing and transport to destinations across India.</p>
          </div>
        </div>

        <p>
          We preserve 117 authentic Sivakasi catalog cracker varieties along with 6 curated festival combo packs. Whether you are looking for soft child-friendly novelty fountains, glistening sparklers, high-altitude aerial multi-colour shots, or classic sound crackers, Sri Amar Crackers provides quality you can rely on.
        </p>

        <div className="pt-4 border-t border-stone-800 text-center font-bold text-amber-300 text-base">
          Let Happiness Sparkle Always! ✨
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-2">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm"
        >
          Explore All 117 Products
        </Link>
      </div>

    </div>
  );
};

export default AboutPage;
