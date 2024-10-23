const userModel = require("../models/userModel");
const jwt       = require("jsonwebtoken");
const bcrypt    = require("bcrypt");
const validator = require("validator");

//loginUser Function
const loginUser = async (req, res) => {
    let{email, password} = req.body;
    try {
        const user = await userModel.findOne({email}); 
        //checking if the user exists or not
        if(!user){
            return res.json({success:false, message: "User Doesn't Exists"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.json({success:false, message:"Invalid Credentials"});
        }
        const token = createToken(user._id);
        res.json({success:true, token,});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
        
    }

};


// CreateToken Function with expiration
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' }); // Token will expire in 24 hour
};


//RegisterUser Function
const registerUser = async (req, res) => {

    let {name, password, email} = req.body;
    try {
        // checking if the user already exists
        const exists = await userModel.findOne({email});
        if(exists){
            return res.json({success:false, message:"You already registered an account with this email"});
        };
        // validating email format and strong password
        if(!validator.isEmail(email)){
           return res.json({success:false, message:"Please enter a valid email"});
        };
        if(password.length<8){
            return res.json({success:false, message: "Password must be at least 8 characters"});
        };
        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // creating new user
        const newUser = new userModel({
            name,
            email,
            password:hashedPassword,
           
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
        
    }
};

module.exports = {loginUser, registerUser};