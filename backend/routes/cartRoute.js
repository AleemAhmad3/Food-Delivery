const express = require("express");
const { addToCart, removeFromCart, updateQuantityCart, getCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/auth");

const cartRouter = express.Router();

cartRouter.post("/add", authMiddleware, addToCart);
cartRouter.post("/remove", authMiddleware, removeFromCart);
cartRouter.post("/updatequantity", authMiddleware, updateQuantityCart);
cartRouter.post("/get", authMiddleware, getCart);

module.exports = cartRouter;
