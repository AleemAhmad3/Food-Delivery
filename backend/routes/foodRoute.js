const express = require("express");
const {addFood, listFood, removeFood} = require("../controllers/foodController");
const multer = require("multer");

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => { // Change 'res' to 'file' here
        return cb(null, `${Date.now()}-${file.originalname}`); // Fix typo: 'orginalname' to 'originalname'
    }
});

const upload = multer({ storage: storage });

foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.post("/remove", removeFood);

module.exports = foodRouter; //  CommonJS export for consistency
