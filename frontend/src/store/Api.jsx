import axios from 'axios';

const API_URL = 'https://food-delivery-nnwo.onrender.com/api/cart';

export const addToCart = async (token, itemid, quantity = 1) => {
    console.log('addToCart triggered for item:', itemid);
    try {
        const response = await axios.post(`${API_URL}/add`, { itemid, quantity }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error);
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
        return response.data; 
    } catch (error) {
        console.error("Error removing from cart:", error);
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
        return response.data; 
    } catch (error) {
        console.error("Error updating cart quantity:", error);
        throw error;
    }
};
