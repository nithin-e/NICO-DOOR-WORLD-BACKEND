const jwt = require('jsonwebtoken');

const adminAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(token, "this token is from adminAuth were checking the token from autorization")

  if (!token) {
    console.log("No token in adminAuth")
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  console.log(process.env.JWT_SECRET, "token in adminAuth")
  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log('bro checkhere first',decoded) 
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token." });
  }
};

module.exports = adminAuth;
