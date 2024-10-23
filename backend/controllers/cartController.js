const userModel = require("../models/userModel");

// Add Items to User's Cart
const addToCart = async (req, res) => {
    try {
        const { itemid } = req.body; // Removed userid

        if (!itemid) {
            return res.status(400).json({ success: false, message: "Item ID is required" });
        }

        const userid = req.user.id; // Use the user ID from the request object

        let userData = await userModel.findById(userid);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const itemIndex = userData.cart.findIndex(item => item.productId.toString() === itemid);

        if (itemIndex > -1) {
            // Item already in cart, increment quantity
            userData.cart[itemIndex].quantity += 1;
        } else {
            // Item not in cart, add new item
            userData.cart.push({ productId: itemid, quantity: 1 });
        }

        await userData.save();

        res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};





// Remove Items from User's Cart
const removeFromCart = async (req, res) => {
    try {
        const { itemid } = req.body; // Assuming you're sending itemid in the body

        if (!itemid) {
            return res.status(400).json({ success: false, message: "Item ID is required" });
        }

        const userid = req.user.id;

        let userData = await userModel.findById(userid);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Find the index of the item to be removed
        const itemIndex = userData.cart.findIndex(item => item.productId.toString() === itemid);

        if (itemIndex > -1) {
            // Completely remove the item from the cart
            userData.cart.splice(itemIndex, 1);
            await userData.save(); // Save the updated user data
            return res.status(200).json({ success: true, message: "Item removed from cart", cart: userData.cart });
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error removing from cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
// Update item quantity in User's Cart
const updateQuantityCart = async (req, res) => {
    try {
        const { itemid, action } = req.body; // Changed to itemId

        if (!itemid || !action) {
            return res.status(400).json({ success: false, message: "Item ID and action are required" });
        }

        const userId = req.user.id; // Changed to userId for consistency
        let userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const itemIndex = userData.cart.findIndex(item => item.productId.toString() === itemid); // Changed to itemId

        if (itemIndex > -1) {
            if (action === 'increase') {
                // Increase quantity
                userData.cart[itemIndex].quantity += 1;
            } else if (action === 'decrease') {
                // Decrease quantity or remove item if quantity is 1
                if (userData.cart[itemIndex].quantity > 1) {
                    userData.cart[itemIndex].quantity -= 1;
                } else {
                    userData.cart.splice(itemIndex, 1); // Remove item from cart if quantity is 1
                }
            } else {
                return res.status(400).json({ success: false, message: "Invalid action" });
            }

            await userData.save(); // Save the updated user data
            return res.status(200).json({ success: true, message: "Cart updated successfully", cart: userData.cart });
        } else {
            return res.status(400).json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.error("Error updating cart:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};




// Get cart
const getCart = async (req, res) => {
    try {
        // Assuming you have a middleware that attaches user info to req.user
        const userid = req.user.id; // Use the user ID from the request object

        // Fetch user data by ID
        let userData = await userModel.findById(userid).populate("cart.productId");
        if (!userData) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, cart: userData.cart });
    } catch (error) {
        console.error("Error fetching cart data:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

module.exports = { addToCart, removeFromCart, updateQuantityCart, getCart };
