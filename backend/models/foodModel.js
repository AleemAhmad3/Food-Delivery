const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
});

// Create the Food model
const Food = mongoose.model.Food || mongoose.model("Food", foodSchema);

// Export the model
module.exports = Food;
