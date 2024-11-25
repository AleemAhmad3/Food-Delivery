import axios from 'axios';
import { toast } from 'react-toastify';
const API_URL = 'https://food-delivery-nnwo.onrender.com/api/cart';

export const addToCart = async (token, itemid, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}/add`, { itemid, quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Show success toast message
        toast.success('Item added to cart!', { position: toast.POSITION.BOTTOM_RIGHT });

        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);

        // Show error toast message
        toast.error('Failed to add item to cart!', { position: toast.POSITION.BOTTOM_RIGHT });

        return { success: false, message: "Failed to add to cart." }; 
    }
};

export const removeFromCart = async (token, itemid) => {
    try {
        const response = await axios.post(`${API_URL}/remove`, { itemid }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Show success toast message
        toast.success('Item removed from cart!', { position: toast.POSITION.BOTTOM_RIGHT });

        return response.data; 
    } catch (error) {
        console.error("Error removing from cart:", error);

        // Show error toast message
        toast.error('Failed to remove item from cart!', { position: toast.POSITION.BOTTOM_RIGHT });

        if (error.response) {
            return { success: false, message: error.response.data.message || "Failed to remove from cart." }; 
        }
        
        return { success: false, message: "Failed to remove from cart due to a network error." }; 
    }
};

// Get cart 
export const getCart = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/get`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error);

        // Show error toast message
        toast.error('Failed to fetch cart items!', { position: toast.POSITION.BOTTOM_RIGHT });

        return { success: false, message: "Failed to fetch cart items." };
    }
};

// Update item quantity in cart
export const updateCartQuantity = async (token, itemid, action) => {
    try {
        const response = await axios.post(`${API_URL}/updatequantity`, { itemid, action }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        // Show success toast message
        const actionText = action === "increase" ? 'increased' : 'decreased';
        toast.success(`Item quantity ${actionText}!`, { position: toast.POSITION.BOTTOM_RIGHT });

        return response.data; 
    } catch (error) {
        console.error("Error updating cart quantity:", error);

        // Show error toast message
        toast.error('Failed to update cart quantity!', { position: toast.POSITION.BOTTOM_RIGHT });

        throw error;
    }
};
