const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization; // Get the Authorization header
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Not Authorized, Login Again" });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
    
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: tokenDecode.id }; // Add the user ID to the request object
        next();  // Call next() to proceed to the controller
    } catch (error) {
        console.log("Auth error:", error);
        // Check for specific JWT errors to provide clearer feedback
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Session expired, please log in again." });
        }
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = authMiddleware;
