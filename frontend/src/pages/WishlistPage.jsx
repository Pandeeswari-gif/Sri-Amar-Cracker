import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../components/Toast';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product) => {
    addToCart(product, 1);
    removeFromWishlist(product.productNumber || product._id);
    showToast(`Moved ${product.name} to cart!`, 'success');
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-red-600/10 text-red-400 border border-red-500/30 flex items-center justify-center mx-auto">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-100">
          Your Wishlist is Empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
          Save your favorite Diwali crackers here so you can easily review and order them before the festival!
        </p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm"
        >
          Explore Catalog <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-stone-800 pb-4">
        <h1 className="text-2xl sm:text-4xl font-black text-stone-100 flex items-center gap-3">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
          My Wishlist ({wishlist.length} Items)
        </h1>
        <p className="text-xs text-stone-400 mt-1">
          Saved Sivakasi crackers ready for your festival celebration.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((item) => {
          const imageUrl = (item.images && item.images[0]) ||
            'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=400&auto=format&fit=crop&q=60';

          return (
            <div
              key={item.productNumber || item._id}
              className="p-4 rounded-3xl bg-[#180a26] border border-amber-500/20 flex flex-col justify-between gap-4"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#10051a]">
                <img
                  src={imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 bg-black/80 px-2 py-0.5 rounded text-xs font-bold text-amber-300">
                  #{item.productNumber}
                </div>
                <button
                  onClick={() => removeFromWishlist(item.productNumber || item._id)}
                  className="absolute top-2 right-2 p-1.5 bg-black/80 text-stone-400 hover:text-red-400 rounded-full"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div>
                <div className="text-[11px] font-bold text-amber-400 uppercase line-clamp-1">
                  {item.category}
                </div>
                <Link
                  to={`/product/${item._id || item.productNumber}`}
                  className="text-sm font-bold text-stone-100 hover:text-amber-300 line-clamp-2"
                >
                  {item.name}
                </Link>
                <div className="text-xs text-stone-400 mt-1">
                  Pack: {item.packQuantity || item.packType || '1 Box'}
                </div>
              </div>

              <div className="pt-2 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <span className="text-lg font-black text-amber-400">
                    {item.isCall ? 'CALL' : (item.isNetNet ? 'NET NET' : `₹${item.offerPrice}`)}
                  </span>
                  {item.originalPrice && !item.isCall && !item.isNetNet && (
                    <span className="text-xs text-stone-500 line-through ml-2">
                      ₹{item.originalPrice}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleMoveToCart(item)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center gap-1"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Move to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WishlistPage;
