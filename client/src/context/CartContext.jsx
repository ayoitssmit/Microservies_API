import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as api from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const userId = user ? user._id : null;
  
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Clear cart when user logs out
  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      setCartTotal(0);
      setCartCount(0);
    }
  }, [userId]);

  // Fetch cart whenever userId is set
  const refreshCart = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const { data } = await api.fetchCart(userId);
      setCartItems(data.items || []);
      const total = (data.items || []).reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
      );
      setCartTotal(total);
      setCartCount((data.items || []).reduce((sum, item) => sum + item.quantity, 0));
    } catch (err) {
      console.error('Failed to fetch cart', err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const addItem = async (productId, quantity = 1) => {
    if (!userId) {
       // Ideally we'd alert the user to login here
       console.warn('User must be logged in to add items to cart.');
       return false;
    }
    setLoading(true);
    try {
      await api.addToCart(userId, productId, quantity);
      await refreshCart();
      return true;
    } catch (err) {
      console.error('Failed to add to cart', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!userId) return;
    setLoading(true);
    try {
      await api.removeFromCart(userId, productId);
      await refreshCart();
    } catch (err) {
      console.error('Failed to remove from cart', err);
    } finally {
      setLoading(false);
    }
  };

  const placeOrder = async () => {
    if (!userId || cartItems.length === 0) return null;
    setLoading(true);
    try {
      const items = cartItems.map((item) => ({
        productId: item.product._id,
        quantity: item.quantity,
      }));
      const { data: order } = await api.createOrder(userId, items);
      // Clear cart locally
      setCartItems([]);
      setCartTotal(0);
      setCartCount(0);
      return order;
    } catch (err) {
      console.error('Failed to place order', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        userId,
        cartItems,
        cartTotal,
        cartCount,
        loading,
        addItem,
        removeItem,
        placeOrder,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
