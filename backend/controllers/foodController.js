const foodModel = require("../models/foodModel");
const fs = require("fs");


// add food item function
const addFood = async (req, res) => {

    // Check for uploaded image
    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "No image uploaded"
        });
    }
    // Get the uploaded image filename
    let image_filename = `${req.file.filename}`;

    // Destructure the food item details from the request body
    let { name, description, price, category } = req.body;

    // Validate required fields
    if (!name || !description || !price || !category) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }
    // Create a new food item instance
    const food = new foodModel({
        name,
        description,
        price,
        category,
        image: image_filename
    });

    try {
        // Save the food item to the database
        await food.save();
        // Send a success response
        res.json({
            success: true,
            message: "Food Item Added"
        });
    } catch (error) {
        console.log(error);
        // Send an error response
        res.status(500).json({
            success: false,
            message: error.message || "Error while saving food item"
        });
    }
};

// Allfood list function
const listFood = async (req, res) => {

    try {
        const foods = await foodModel.find({});
        res.json({success:true, data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error});  
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, () => {});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:true, message: "Error"});
    }
}

module.exports = { addFood, listFood, removeFood };
