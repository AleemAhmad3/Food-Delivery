/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { addToCart, removeFromCart, getCart, updateCartQuantity } from './Api.jsx';

const useCartStore = create((set) => ({
  cartItems: [],
  loading: false,
  error: null,

  // Fetch cart items
  fetchCart: async (token) => {
    set({ loading: true, error: null });
    try {
      const result = await getCart(token);
      if (result.success) {
        set({ cartItems: result.cart });
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: "Failed to fetch cart items." });
    } finally {
      set({ loading: false });
    }
  },

  // Add item to cart
  addToCart: async (token, item) => {
    set({ loading: true, error: null });
    try {
      const result = await addToCart(token, item._id);
      if (result.success) {
        return result;
      } else {
        set({ error: result.message });
        return { success: false, message: result.message };
      }
    } catch (error) {
      set({ error: "Failed to add item to cart." });
      return { success: false, message: "Failed to add item to cart." };
    } finally {
      set({ loading: false });
    }
  },

  // Remove item from cart
  removeFromCart: async (token, itemId) => {
    set({ loading: true, error: null });
    try {
      const result = await removeFromCart(token, itemId);
      if (result.success) {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item._id !== itemId)
        }));
        return result;
      } else {
        set({ error: result.message });
        return result;
      }
    } catch (error) {
      set({ error: "Failed to remove item from cart." });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  // Update item quantity
  updateQuantity: async (token, itemId, action) => {
    set({ loading: true, error: null });
    try {
      const result = await updateCartQuantity(token, itemId, action);
      if (result.success) {
        set((state) => ({
          cartItems: state.cartItems.map((item) => {
            if (item._id === itemId) {
              const newQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
              return { ...item, quantity: newQuantity > 0 ? newQuantity : 0 };
            }
            return item;
          }),
        }));
      } else {
        set({ error: result.message });
      }
    } catch (error) {
      set({ error: "Failed to update item quantity." });
    } finally {
      set({ loading: false });
    }
  },
  
  // Clear the cart
  clearCart: () => {
    set(() => ({
      cartItems: [],
    }));
  },
}));

export default useCartStore;
