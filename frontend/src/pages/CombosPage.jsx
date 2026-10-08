import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Sparkles, Percent, ShoppingBag, Check, ShieldCheck, Truck, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

const COMBOS_DATA = [
  {
    productNumber: 118,
    name: '21 Item',
    itemsCount: 21,
    originalPrice: 310,
    offerPrice: 155,
    tag: 'Budget Starter',
    description: 'Perfect celebration starter assortment containing 21 essential festival items including sparklers, chakkars, flower pots and ground sound crackers.'
  },
  {
    productNumber: 119,
    name: '35 Item',
    itemsCount: 35,
    originalPrice: 460,
    offerPrice: 230,
    tag: 'Popular Choice',
    description: 'Generous 35 piece festival pack with diverse aerial and ground crackers for small families celebrating Diwali.'
  },
  {
    productNumber: 120,
    name: '45 Item',
    itemsCount: 45,
    originalPrice: 660,
    offerPrice: 330,
    tag: 'Festival Standard',
    description: 'Comprehensive 45 item celebration box packed with colourful fountains, whistling stars, deluxe sound crackers and bright sparklers.'
  },
  {
    productNumber: 121,
    name: '55 Item',
    itemsCount: 55,
    originalPrice: 910,
    offerPrice: 455,
    tag: 'Grand Hamper',
    description: 'Mega 55 piece assortment providing extensive variety for grand celebrations. Full evening of joy for elders and kids.'
  },
  {
    productNumber: 122,
    name: 'Family Combo Pack',
    itemsCount: 65,
    originalPrice: 3010,
    offerPrice: 1505,
    tag: 'Ultimate Family Pack',
    description: 'The supreme Family Combo Pack specifically assembled with a complete balance of dazzling night sky displays, ground spinners, safe sparklers and celebration garlands.'
  },
  {
    productNumber: 123,
    name: 'Kids Combo Pack',
    itemsCount: 80,
    originalPrice: 5010,
    offerPrice: 2505,
    tag: 'Special Kids Treasure',
    description: 'Deluxe Kids Special Combo filled with child-safe novelty fountains, cartoon crackers, magic snakes, electric friction sparks, colorful smoke and giant sparklers.'
  }
];

const CombosPage = () => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddCombo = (combo) => {
    addToCart({
      _id: `combo-${combo.productNumber}`,
      productNumber: combo.productNumber,
      name: combo.name,
      category: 'COMBO PACKS',
      packType: '1 Combo Box',
      packQuantity: `${combo.itemsCount} Items`,
      originalPrice: combo.originalPrice,
      offerPrice: combo.offerPrice,
      images: ['https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60'],
      isCombo: true
    }, 1);
    showToast(`Added ${combo.name} to cart!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-600/40 text-xs font-black uppercase tracking-wider">
          <Gift className="w-4 h-4" /> Official 2026 Catalog Combos
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-stone-100">
          Festival Combo Packs
        </h1>
        <p className="text-sm sm:text-base text-amber-300 font-semibold">
          Authentic 50% Special Offer • Direct Sivakasi Factory Packaging
        </p>
        <p className="text-xs sm:text-sm text-stone-400">
          Carefully selected assortment packs designed for families, kids, and festival celebrations. Each combo contains genuine Sivakasi quality crackers with verified safe fuses.
        </p>
      </div>

      {/* Combos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {COMBOS_DATA.map((combo) => {
          const savings = combo.originalPrice - combo.offerPrice;
          return (
            <div
              key={combo.productNumber}
              className="relative rounded-3xl bg-[#190a28] border border-amber-500/30 overflow-hidden flex flex-col justify-between hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-500/10 transition-all group"
            >
              {/* Card Header */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30">
                    #{combo.productNumber} • {combo.tag}
                  </span>
                  <span className="bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                    50% OFF
                  </span>
                </div>

                <div>
                  <h2 className="text-2xl font-black text-stone-100 group-hover:text-amber-300 transition-colors">
                    {combo.name}
                  </h2>
                  <div className="text-xs font-bold text-amber-400 mt-1">
                    Contains {combo.itemsCount} Celebration Items
                  </div>
                </div>

                <p className="text-xs text-stone-300 leading-relaxed">
                  {combo.description}
                </p>

                {/* Features list */}
                <div className="space-y-1.5 pt-2 border-t border-stone-800 text-xs text-stone-400">
                  <div className="flex items-center gap-2 text-stone-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Includes sparklers, chakkars, pots & sound crackers</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Heavy-duty moisture-proof festive box</span>
                  </div>
                  <div className="flex items-center gap-2 text-stone-300">
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Direct factory dispatch with All India Delivery</span>
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-6 bg-[#130620] border-t border-amber-500/20 space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl sm:text-3xl font-black text-amber-400">
                      ₹{combo.offerPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-stone-500 line-through ml-2">
                      ₹{combo.originalPrice.toLocaleString()}
                    </span>
                  </div>
                  <span className="text-xs font-bold text-green-400 bg-green-950/80 px-2 py-0.5 rounded border border-green-800">
                    Save ₹{savings.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAddCombo(combo)}
                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                  <Link
                    to={`/product/${combo.productNumber}`}
                    className="py-3 px-4 rounded-xl bg-[#240e3b] hover:bg-[#2e124c] text-amber-300 border border-amber-500/30 font-bold text-xs flex items-center justify-center transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Order Callout */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-[#1f0d33] to-red-950/60 border border-amber-500/30 text-center space-y-4">
        <h3 className="text-xl sm:text-2xl font-black text-amber-300">
          Want a Custom Marriage or Bulk Party Combo?
        </h3>
        <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
          We curate customized order packages for temple festivals, weddings, and institutional celebrations. Contact our Sivakasi office directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:7094183836"
            className="px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold text-xs flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> Call 7094183836
          </a>
          <a
            href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20I%20would%20like%20to%20order%20a%20custom%20combo"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded-xl bg-green-600 text-white font-bold text-xs flex items-center gap-2"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

    </div>
  );
};

export default CombosPage;
