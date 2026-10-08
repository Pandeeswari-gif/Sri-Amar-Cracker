import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  Sparkles,
  Ticket,
  Truck,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const CartPage = () => {
  const {
    cart,
    totalItems,
    subtotal,
    deliveryCharge,
    discount,
    total,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    openWhatsAppOrder
  } = useCart();

  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [couponInput, setCouponInput] = useState('');
  const [applyingCoupon, setApplyingCoupon] = useState(false);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;

    setApplyingCoupon(true);
    try {
      const res = await applyCoupon(couponInput.trim());
      showToast(res.message || 'Coupon applied!', 'success');
      setCouponInput('');
    } catch (err) {
      showToast(err.message || 'Failed to apply coupon', 'error');
    } finally {
      setApplyingCoupon(false);
    }
  };

  const handleWhatsAppCheckout = () => {
    openWhatsAppOrder(user?.name, user?.addresses?.[0]?.city);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/30">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-stone-100">
          Your Shopping Cart is Empty
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 max-w-md mx-auto">
          Explore our authentic Sivakasi catalog of 117 crackers with 50% special offer prices and add your favorites to celebrate Diwali!
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/shop"
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center gap-2"
          >
            Browse 117 Crackers
          </Link>
          <Link
            to="/combos"
            className="px-6 py-3 rounded-xl bg-[#1e0e33] border border-amber-500/40 text-amber-300 font-bold text-sm"
          >
            View 50% Combos
          </Link>
        </div>
      </div>
    );
  }

  const freeDeliveryThreshold = 3000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const freeDeliveryPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-black text-stone-100 flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-amber-400" />
            Shopping Cart ({totalItems} Items)
          </h1>
          <p className="text-xs text-stone-400 mt-1">
            All India Delivery • Sivakasi Factory Direct 50% Special Offer
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5"
        >
          <Trash2 className="w-4 h-4" /> Clear Entire Cart
        </button>
      </div>

      {/* Free Delivery Meter */}
      <div className="p-4 rounded-2xl bg-[#180a26] border border-amber-500/30 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="flex items-center gap-2 text-stone-200">
            <Truck className="w-4 h-4 text-amber-400" />
            {remainingForFreeDelivery === 0 ? (
              <span className="text-green-400">🎉 Congratulations! You unlocked FREE Pan-India Delivery!</span>
            ) : (
              <span>Add ₹{remainingForFreeDelivery} more to unlock FREE Delivery!</span>
            )}
          </span>
          <span className="text-amber-400">{freeDeliveryPercent}%</span>
        </div>
        <div className="w-full h-2 bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-amber-500 to-green-500 transition-all duration-500 rounded-full"
            style={{ width: `${freeDeliveryPercent}%` }}
          />
        </div>
      </div>

      {/* Cart Grid: Items (Left) & Order Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const isPriced = !item.isCall && !item.isNetNet && item.offerPrice != null;
            const lineTotal = isPriced ? item.offerPrice * item.quantity : 0;
            const imageUrl = item.image || (item.images && item.images[0]) ||
              'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=200&auto=format&fit=crop&q=60';

            return (
              <div
                key={item.productNumber}
                className="p-4 sm:p-5 rounded-2xl bg-[#180a26] border border-amber-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={imageUrl}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-amber-500/20 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="text-[11px] font-bold text-amber-400 uppercase">
                      #{item.productNumber} • {item.category}
                    </div>
                    <Link
                      to={`/product/${item._id || item.productNumber}`}
                      className="text-sm sm:text-base font-bold text-stone-100 hover:text-amber-300 transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    <div className="text-xs text-stone-400">
                      Pack: {item.packQuantity || item.packType || '1 Box'}
                    </div>
                    <div className="text-xs font-semibold text-amber-300 sm:hidden">
                      {item.isCall ? 'CALL FOR PRICE' : (item.isNetNet ? 'NET NET RATE' : `₹${item.offerPrice} / unit`)}
                    </div>
                  </div>
                </div>

                {/* Controls and Price */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-stone-800">
                  {/* Quantity Counter */}
                  <div className="flex items-center bg-[#10051a] border border-amber-500/30 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(item.productNumber, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center font-bold"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-black text-amber-300">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productNumber, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-amber-500 hover:bg-amber-400 text-black flex items-center justify-center font-bold"
                      aria-label="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[80px]">
                    <div className="text-base font-black text-amber-400">
                      {item.isCall ? 'CALL' : (item.isNetNet ? 'NET NET' : `₹${lineTotal}`)}
                    </div>
                    {item.originalPrice && isPriced && (
                      <div className="text-[11px] text-stone-500 line-through">
                        ₹{item.originalPrice * item.quantity}
                      </div>
                    )}
                  </div>

                  {/* Delete Item */}
                  <button
                    onClick={() => removeFromCart(item.productNumber)}
                    className="p-2 text-stone-500 hover:text-red-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Order Summary Sidebar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#180a26] border border-amber-500/30 space-y-6">
            <h2 className="text-lg font-black text-stone-100 uppercase tracking-wider pb-3 border-b border-stone-800">
              Order Summary
            </h2>

            {/* Calculations */}
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between text-stone-300">
                <span>Subtotal ({totalItems} items):</span>
                <span className="font-bold text-stone-100">₹{subtotal}</span>
              </div>

              <div className="flex justify-between text-stone-300">
                <span>All India Delivery:</span>
                <span className="font-bold">
                  {deliveryCharge === 0 ? (
                    <span className="text-green-400">FREE</span>
                  ) : (
                    `₹${deliveryCharge}`
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>Coupon Discount ({appliedCoupon?.code}):</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}

              <div className="pt-3 border-t border-stone-800 flex justify-between items-baseline text-base sm:text-lg font-black">
                <span className="text-stone-100">Estimated Total:</span>
                <span className="text-2xl font-black text-amber-400">₹{total}</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <div className="pt-2 border-t border-stone-800 space-y-2">
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-green-950/60 border border-green-800 text-xs">
                  <div className="flex items-center gap-2 text-green-300 font-bold">
                    <Ticket className="w-4 h-4" />
                    <span>Applied: {appliedCoupon.code} ({appliedCoupon.discountPercentage}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-400 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon (e.g. DIWALI50)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-[#10051a] text-xs text-stone-100 uppercase placeholder-stone-500 px-3 py-2.5 rounded-xl border border-stone-800 focus:border-amber-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={applyingCoupon}
                    className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Checkout Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-950/50"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>

              {/* WhatsApp Quick Order Button */}
              <button
                onClick={handleWhatsAppCheckout}
                className="w-full py-3.5 px-6 rounded-xl bg-green-600 hover:bg-green-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-950/40"
              >
                <MessageCircle className="w-4 h-4" /> Order via WhatsApp (7094183836)
              </button>
            </div>

            <div className="text-[11px] text-stone-400 text-center space-y-1">
              <div>🔒 Safe Sivakasi Packing • Moisture Proof Protection</div>
              <div>Cash on Delivery (COD) & WhatsApp Orders Supported</div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default CartPage;
