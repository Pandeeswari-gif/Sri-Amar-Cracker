import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Share2,
  Phone,
  ShieldCheck,
  Truck,
  Plus,
  Minus,
  Star,
  CheckCircle2,
  ArrowLeft,
  MessageCircle,
  Package
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { fetchProductById, fetchProductByNumber, postReview } from '../services/api';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  // Review submission state
  const [rating, setRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    const loadDetails = async () => {
      setLoading(true);
      try {
        let res;
        if (!isNaN(Number(id))) {
          res = await fetchProductByNumber(id);
        } else {
          res = await fetchProductById(id);
        }

        if (res && res.product) {
          setProduct(res.product);
          setReviews(res.reviews || []);
          setRelatedProducts(res.relatedProducts || []);
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-amber-300 font-bold">Loading Sri Amar Crackers Product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-stone-200">Product Not Found</h2>
        <p className="text-stone-400">The product you are looking for does not exist in the 2026 catalog.</p>
        <Link to="/shop" className="inline-block px-6 py-2.5 rounded-xl bg-amber-500 text-black font-bold">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.productNumber || product._id);
  const imageUrl = (product.images && product.images[0]) ||
    'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&auto=format&fit=crop&q=70';

  const handleAddToCart = () => {
    addToCart(product, quantity);
    showToast(`Added ${quantity} × ${product.name} to cart!`, 'success');
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Sri Amar Crackers — ${product.name}`,
          text: `Check out ${product.name} at 50% Special Offer from Sri Amar Crackers Sivakasi!`,
          url: window.location.href
        });
      } catch (e) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      showToast('Please log in to submit a review', 'error');
      navigate('/login');
      return;
    }
    if (!reviewComment.trim()) {
      showToast('Please write a review comment', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await postReview({
        productId: product._id,
        rating,
        comment: reviewComment
      });
      if (res.success) {
        showToast('Review submitted successfully! Thank you.', 'success');
        setReviews([res.review, ...reviews]);
        setReviewComment('');
      }
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to submit review', 'error');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Back to Shop Link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 hover:text-amber-300"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Main Product Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 bg-[#160824] border border-amber-500/20 rounded-3xl p-6 sm:p-10">
        
        {/* Left: Product Image */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#10041a] border border-amber-500/20">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-lg text-amber-300 font-extrabold text-sm border border-amber-500/30">
              #{product.productNumber}
            </div>
            {!product.isCall && !product.isNetNet && product.originalPrice && (
              <div className="absolute top-4 right-4 bg-red-600 text-white font-black text-xs px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
                50% SPECIAL OFFER
              </div>
            )}
          </div>
          <div className="text-[11px] text-stone-400 text-center italic">
            Authentic Sivakasi Manufacturing • Replaceable catalog slot
          </div>
        </div>

        {/* Right: Details & Buying Actions */}
        <div className="flex flex-col justify-between space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/30 uppercase">
                {product.category}
              </span>
              <span className="text-xs font-semibold text-stone-400">
                Pack: {product.packQuantity || product.packType || '1 Box'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-stone-100">
              {product.name}
            </h1>

            {/* Rating Stars */}
            <div className="flex items-center gap-2 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-stone-300 font-bold">4.9/5</span>
              <span className="text-stone-500">({reviews.length} Customer Reviews)</span>
            </div>

            {/* Price Box */}
            <div className="p-4 rounded-2xl bg-[#220d36] border border-amber-500/30 my-4">
              {product.isCall ? (
                <div>
                  <div className="text-2xl font-black text-amber-400">CALL FOR PRICE</div>
                  <p className="text-xs text-stone-300 mt-1">
                    Contact Sivakasi sales desk at 7094183836 for current market wholesale rates.
                  </p>
                </div>
              ) : product.isNetNet ? (
                <div>
                  <div className="text-2xl font-black text-amber-400">NET NET RATE</div>
                  <p className="text-xs text-stone-300 mt-1">
                    Special net factory pricing applied directly at checkout.
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-amber-400">
                      ₹{product.offerPrice}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-stone-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded bg-green-950 text-green-400 text-xs font-bold border border-green-800">
                      50% Special Offer
                    </span>
                  </div>
                  {product.originalPrice && (
                    <div className="text-xs text-green-400 font-semibold">
                      You save ₹{product.originalPrice - product.offerPrice} directly from Sivakasi factory!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-stone-300 leading-relaxed">
              {product.description || 'Authentic Sivakasi high-grade Diwali celebration cracker.'}
            </p>

            {/* In stock badge */}
            <div className="flex items-center gap-2 text-xs font-semibold text-green-400 pt-1">
              <CheckCircle2 className="w-4 h-4" />
              <span>Available in Stock • Direct Sivakasi Dispatch</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-4 border-t border-stone-800">
            {!product.isCall && (
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center bg-[#10051a] border border-amber-500/30 rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
                    aria-label="Decrease"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center font-extrabold text-amber-300 text-sm">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="w-8 h-8 rounded-lg bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center font-bold"
                    aria-label="Increase"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {product.isCall ? (
                <a
                  href="https://wa.me/917094183836?text=Hello%20Sri%20Amar%20Crackers%2C%20please%20quote%20price%20for%20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" /> Inquire Price: 7094183836
                </a>
              ) : (
                <>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 py-3.5 px-6 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/50"
                  >
                    Buy Now
                  </button>
                </>
              )}

              {/* Wishlist & Share */}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    toggleWishlist(product);
                    showToast(isFavorited ? 'Removed from wishlist' : 'Added to wishlist', 'info');
                  }}
                  className={`p-3.5 rounded-xl border transition-colors ${
                    isFavorited
                      ? 'bg-red-600 border-red-500 text-white'
                      : 'bg-[#10051a] border-amber-500/30 text-stone-300 hover:text-red-400'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-xl bg-[#10051a] border border-amber-500/30 text-stone-300 hover:text-amber-300 transition-colors"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick trust strip */}
            <div className="grid grid-cols-2 gap-3 pt-3 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>100% Genuine Sivakasi</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-amber-400" />
                <span>All India Safe Delivery</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Customer Reviews Section */}
      <section className="bg-[#160824] border border-amber-500/20 rounded-3xl p-6 sm:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-100">
              Verified Customer Reviews
            </h2>
            <p className="text-xs text-stone-400 mt-0.5">
              Real feedback from families who purchased Sri Amar Crackers
            </p>
          </div>
          <div className="text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/30">
            {reviews.length} Verified Submissions
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-xs text-stone-500 italic">
              No customer reviews submitted yet. Be the first to share your experience!
            </p>
          ) : (
            reviews.map((r, i) => (
              <div key={r._id || i} className="p-4 rounded-2xl bg-[#1f0d33] border border-stone-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-sm text-amber-300">{r.userName || 'Verified Buyer'}</div>
                  <div className="flex text-amber-400">
                    {[...Array(r.rating || 5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-stone-300">{r.comment}</p>
                <div className="text-[10px] text-stone-500">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'Verified Customer'}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Add Review Form */}
        <form onSubmit={handleReviewSubmit} className="pt-6 border-t border-stone-800 space-y-4 max-w-xl">
          <h3 className="text-sm font-bold text-stone-200 uppercase tracking-wider">
            Write a Review
          </h3>

          <div className="flex items-center gap-3">
            <span className="text-xs text-stone-400">Your Rating:</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((val) => (
                <button
                  type="button"
                  key={val}
                  onClick={() => setRating(val)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star className={`w-5 h-5 ${val <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-600'}`} />
                </button>
              ))}
            </div>
          </div>

          <textarea
            rows="3"
            placeholder="Share your experience with this cracker (packaging, sound, spark quality)..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
            className="w-full bg-[#10051a] text-sm text-stone-100 placeholder-stone-500 p-3 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={submittingReview}
            className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
          >
            {submittingReview ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      </section>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-stone-100">
            More in {product.category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map(p => (
              <ProductCard key={p.productNumber} product={p} />
            ))}
          </div>
        </section>
      )}

    </div>
  );
};

export default ProductDetailsPage;
