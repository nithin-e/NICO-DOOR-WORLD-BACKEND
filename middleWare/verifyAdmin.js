const jwt = require("jsonwebtoken"); 
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const verifyAdminToken = async (req, res, next) => {
    try {
        const token = req.cookies.admin_jwt;
        console.log(token,"in middleware")
        
        if (!token) {
            return res.status(401).json({ success:false, message: "No token found, authorization denied" });
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;

        next();
    } catch (error) {
        console.error("❌ Token verification failed:", error);
        res.status(401).json({ message: "Token is not valid" });
    }
};

// ✅ Correct CommonJS Export
module.exports = { verifyAdminToken };
