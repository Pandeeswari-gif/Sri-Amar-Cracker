import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { fetchWishlist, toggleWishlistApi } from '../services/api';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('sri_amar_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('sri_amar_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync with backend when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchWishlist().then(res => {
        if (res.success && res.wishlist) {
          setWishlist(res.wishlist);
        }
      }).catch(err => {
        // Fallback to local
      });
    }
  }, [isAuthenticated]);

  const toggleWishlist = async (product) => {
    const exists = wishlist.some(
      item => item.productNumber === product.productNumber || item._id === product._id
    );

    if (exists) {
      setWishlist(prev => prev.filter(
        item => item.productNumber !== product.productNumber && item._id !== product._id
      ));
    } else {
      setWishlist(prev => [...prev, product]);
    }

    if (isAuthenticated && product._id) {
      try {
        await toggleWishlistApi(product._id);
      } catch (e) {
        // Silent sync fail
      }
    }
  };

  const isInWishlist = (productNumberOrId) => {
    return wishlist.some(
      item => item.productNumber === productNumberOrId || item._id === productNumberOrId
    );
  };

  const removeFromWishlist = (productNumberOrId) => {
    setWishlist(prev => prev.filter(
      item => item.productNumber !== productNumberOrId && item._id !== productNumberOrId
    ));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
export default WishlistContext;
