const orderModel = require("../models/orderModel");
const userModel = require("../models/userModel");
const Stripe = require("stripe");

const stripeSecretKey = process.env.STRIPE_SECRET_KEY 
    
const stripe = new Stripe(stripeSecretKey);

// Placing user order from frontend
const placeOrder = async (req, res) => {

    const frontendUrl = "https://food-delivery-frontend-6tpo.onrender.com"; // Changed to camelCase for consistency
    try {
        // Create a new order using the user ID from the authenticated request
        const newOrder = new orderModel({
            userid: req.user.id, // Use the user ID from the authenticated user
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        });

        // Save the order to the database
        await newOrder.save();

        // Clear the user's cart after placing the order
        await userModel.findByIdAndUpdate(req.user.id, { cartData: {} }); // Use req.user.id for the current user

        // Prepare line items for Stripe
        const lineItems = req.body.items.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.productId.name, // Use the name from the productId
                        description: item.productId.description, // Ensure to include description if needed
                    },
                    unit_amount: item.price * 100, // Convert to cents
                },
                quantity: item.quantity,
            };
        });

        // Add delivery charges to line items
        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 2 * 100, // Assuming delivery charge is $2
            },
            quantity: 1,
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: lineItems,
            mode: "payment",
            success_url: `${frontendUrl}/verify?success=true&orderid=${newOrder._id}`,
            cancel_url: `${frontendUrl}/verify?success=false&orderid=${newOrder._id}`,
        });

        // Respond with success and the session URL
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error);
        res.json({ success: false, message: error.message });
    }
};

const verifyOrder = async (req, res) => {
    const { orderid, success } = req.body;

    // Validate input
    if (!orderid) {
        return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    try {
        if (success === "true") {
            // Update the order to mark it as paid
            await orderModel.findByIdAndUpdate(orderid, { payment: true });
            return res.status(200).json({ success: true, message: "Paid" });
        } else {
            // Delete the order if not paid
            await orderModel.findByIdAndDelete(orderid);
            return res.status(200).json({ success: false, message: "Not Paid" });
        }
    } catch (error) {
        console.error("Error verifying order:", error);
        return res.status(500).json({ success: false, message: "Error processing the order" });
    }
};

//userorders for frontend
const userOrders = async (req, res) => {
    try {
        // Ensure that the user ID is obtained from req.user, assuming you're using authentication middleware
        const userId = req.user.id; // Assuming req.user is set by authentication middleware (like a JWT)

        // Fetch orders from the database using the authenticated user's ID
        const orders = await orderModel.find({ userid: userId });

        // Send the orders back in the response
        res.json({ success: true, data: orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.json({ success: false, message: "Error" });
    }
};
// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
        
    }
};

// api for updating order status
const updateStatus = async (req, res) => {
    try {
       await orderModel.findByIdAndUpdate(req.body.orderid,{status:req.body.status});
       res.json({success:true, message:"Status Updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }

};



module.exports = { placeOrder, verifyOrder, userOrders, listOrders, updateStatus };
