const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.admin_jwt;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    req.admin = decoded;
    console.log('next okke set ahhnu');
     // Storing decoded admin data in req.admin
    next();
  });
};

module.exports = {verifyAdmin}
