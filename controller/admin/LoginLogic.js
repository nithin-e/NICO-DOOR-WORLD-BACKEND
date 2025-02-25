const generateToken = require("../../generateTocken/JWTfunction");
const productDb=require ('../../model/productModel')
const jwt = require("jsonwebtoken");



const adminCredential={
    email:'admin@gmail.com',
    password:'12345678'

 }
module.exports = {

   adminLogin : async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === adminCredential.email && password === adminCredential.password) {

          const token =  generateToken(email); 


          
        
            // Set HTTP-Only Cookie
            res.cookie("admin_jwt", token, {
              httpOnly: true,          // Prevent JavaScript access
              secure: true,           // Required for SameSite=None and HTTPS
              sameSite: 'None',       // Allow cross-site requests
              maxAge: 7 * 24 * 60 * 60 * 1000,  // 7 days
              path: "/"              // Keep this to allow access across your local app
            });

            console.log('Admin login successful');
            return res.status(200).json({ message: 'Login successfully completed' });
        } else {
            console.log('Incorrect email or password');
            return res.status(401).json({ message: 'Incorrect email or password' });
        }
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
},

    addProduct: async (req, res) => {
        try {
         

          const { name, brand, material, color, price, lockIncluded, stock, description, suitableFor, images } = req.body;
      
          // Validate required fields
          if (!images || images.length === 0) {
            return res.status(400).json({ message: 'Images are required' });
          }
      
          const newProduct = {
            name,
            brand,
            material,
            color,
            price,
            lockIncluded,
            stock,
            description,
            suitableFor,
            images  
          };
      
          const product = await productDb.create(newProduct);
      
          res.status(200).json({
            message: 'Product successfully stored',
            product
          });
      
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Internal server error. Try again later.' });
        }
      },
      



    fectingProductData:async(req,res)=>{
        try {


      
            const dataFected=await productDb.find()
                // console.log('check eda check',dataFected)
              

            res.status(200).json({
                data:dataFected,
                message: 'succesFully product fected'
            });


        } catch (error) {
            console.log(error);
            
        }
    },

    deletingProduct:async(req,res)=>{
        try {
          console.log(req.admin,"checking if req.admin is there in delete controller")
          
            const { productId } = req.body; 
        
            
            await productDb.findByIdAndDelete(productId);
        
            res.status(200).json({success:true, message: 'Product deleted successfully' });
            return
          } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
          }
    },

    userSideFecting:async(req,res)=>{
      try {


        const dataFected=await productDb.find()
        
          
        res.status(200).json({
            data:dataFected,
            message: 'succesFully product fected'
        });


    } catch (error) {
        console.log(error);
        
    }
    },


    LOGOUT: async (req, res) => {
      try {
          console.log('✅ Logging out admin...');
          
          res.clearCookie("admin_jwt", {
            httpOnly: true,    
            secure: true,     
            sameSite: 'None',
          });
  
          return res.status(200).json({ success: true, message: 'Logged out successfully' });
      } catch (error) {
          console.log("❌ Logout Error:", error);
          res.status(500).json({ success: false, message: "Logout failed" });
          return
      }
  },
  
  adminVerify: async (req, res) => {
    try {
        console.log("Cookies received:", req.cookies); // ✅ Check if cookie is received
  
        const token = req.cookies.admin_jwt;
        if (!token) {
            console.log("No token found in cookies!");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // ✅ Debug JWT payload

        if (!decoded.role) {
            console.log("Missing role in token:", decoded);
            return res.status(400).json({ message: "Invalid Token Structure" });
        }

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden" });
        }

        res.status(200).json({ message: "Authenticated" });
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(401).json({ message: "Invalid Token" });
    }
},

verifyAdminAuth:(req,res)=>{
  try {
    
    res.json({ message: "Authenticated", admin: req.admin });
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ message: "Server error" });
  }
}


};