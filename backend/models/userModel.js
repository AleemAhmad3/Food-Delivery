const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Food" }, // Reference to FoodModel
        quantity: { type: Number, required: true }
    }],
});
// Create the User model
const User = mongoose.model("User", userSchema);

// Export the model
module.exports = User;
