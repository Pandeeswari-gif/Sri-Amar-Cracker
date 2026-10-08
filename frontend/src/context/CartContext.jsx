import React, { createContext, useContext, useState, useEffect } from 'react';
import { validateCouponCode } from '../services/api';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_amar_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_amar_coupon');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem('sri_amar_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (appliedCoupon) {
      localStorage.setItem('sri_amar_coupon', JSON.stringify(appliedCoupon));
    } else {
      localStorage.removeItem('sri_amar_coupon');
    }
  }, [appliedCoupon]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        item => item.productNumber === product.productNumber || item._id === product._id
      );

      if (existingIndex > -1) {
        const newCart = [...prevCart];
        const newQty = newCart[existingIndex].quantity + quantity;
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newQty
        };
        return newCart;
      } else {
        return [
          ...prevCart,
          {
            _id: product._id || `temp-${product.productNumber}`,
            productNumber: product.productNumber,
            name: product.name,
            category: product.category,
            packType: product.packType,
            packQuantity: product.packQuantity,
            originalPrice: product.originalPrice,
            offerPrice: product.offerPrice,
            priceDisplay: product.priceDisplay,
            isCall: product.isCall,
            isNetNet: product.isNetNet,
            images: product.images,
            image: product.images && product.images[0] ? product.images[0] : '',
            quantity
          }
        ];
      }
    });
  };

  const removeFromCart = (productNumberOrId) => {
    setCart((prev) => prev.filter(item => item.productNumber !== productNumberOrId && item._id !== productNumberOrId));
  };

  const updateQuantity = (productNumberOrId, qty) => {
    if (qty <= 0) {
      removeFromCart(productNumberOrId);
      return;
    }
    setCart((prev) =>
      prev.map(item => {
        if (item.productNumber === productNumberOrId || item._id === productNumberOrId) {
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Calculations
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce((sum, item) => {
    if (item.isCall || item.isNetNet || item.offerPrice == null) return sum;
    return sum + (item.offerPrice * item.quantity);
  }, 0);

  // Free delivery threshold ₹3000
  const deliveryCharge = subtotal >= 3000 || subtotal === 0 ? 0 : 150;

  let discount = 0;
  if (appliedCoupon && subtotal > 0) {
    discount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    if (appliedCoupon.maxDiscount && discount > appliedCoupon.maxDiscount) {
      discount = appliedCoupon.maxDiscount;
    }
  }

  const total = Math.max(0, subtotal + deliveryCharge - discount);

  // Apply Coupon handler
  const applyCoupon = async (code) => {
    try {
      const res = await validateCouponCode(code, subtotal);
      if (res.success && res.coupon) {
        setAppliedCoupon(res.coupon);
        return { success: true, message: res.message };
      }
      throw new Error(res.message || 'Invalid coupon');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Could not apply coupon';
      throw new Error(msg);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  // WhatsApp Message Generator
  const generateWhatsAppMessage = (customerName = '', customerCity = '') => {
    const header = `🎆 *SRI AMAR CRACKERS — ONLINE ORDER* 🎆\nQuality Crackers For A Brighter Tomorrow\nSivakasi • 50% Special Offer\n--------------------------------\n`;
    
    let productLines = cart.map((item, idx) => {
      const priceText = item.isCall ? 'CALL FOR PRICE' : (item.isNetNet ? 'NET NET RATE' : `₹${item.offerPrice * item.quantity}`);
      return `${idx + 1}. *${item.name}* (${item.packQuantity || item.packType || '1 Box'})\n   Qty: ${item.quantity} | Rate: ${priceText}`;
    }).join('\n');

    let customerInfo = '';
    if (customerName || customerCity) {
      customerInfo = `\n--------------------------------\n*Customer Info:*\nName: ${customerName || 'Customer'}\nCity: ${customerCity || 'India'}\n`;
    }

    const summary = `\n--------------------------------\n*Subtotal:* ₹${subtotal}\n*Delivery Charge:* ₹${deliveryCharge} ${deliveryCharge === 0 ? '(FREE)' : ''}\n${discount > 0 ? `*Coupon Discount (${appliedCoupon?.code}):* -₹${discount}\n` : ''}*Estimated Total:* ₹${total}\n--------------------------------\nHello Sri Amar Crackers, please confirm availability and finalize my order! Let Happiness Sparkle Always! ✨`;

    return encodeURIComponent(header + productLines + customerInfo + summary);
  };

  const openWhatsAppOrder = (customerName = '', customerCity = '') => {
    const phone = '7094183836';
    const text = generateWhatsAppMessage(customerName, customerCity);
    const url = `https://wa.me/91${phone}?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        totalItems,
        subtotal,
        deliveryCharge,
        discount,
        total,
        appliedCoupon,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        generateWhatsAppMessage,
        openWhatsAppOrder
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export default CartContext;
