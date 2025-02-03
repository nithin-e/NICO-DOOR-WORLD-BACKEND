
const productDb=require('../../model/productModel')
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary with your credentials


const adminCredential={
    email:'admin@gmail.com',
    password:'12345678'

 }
module.exports = {
    adminLogin: async (req, res) => {
        try {
            const { email, password } = req.body;
    
            if (email === adminCredential.email && password === adminCredential.password) {
                isAdminLoggedIn = true; 
                console.log('Admin login successful');
                res.status(200).json({
                    AdminLogin: true,
                    message: 'Login successfully completed'
                });
            } else {
                console.log('Incorrect email or password');
                res.status(401).json({
                    AdminLogin: false,
                    message: 'Incorrect email or password'
                });
            }
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
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
            images  // This will now be an array of Cloudinary URLs
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
            // console.log('check eda check',dataFected);
            
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
            const { productId } = req.body; 
        
            
            await productDb.findByIdAndDelete(productId);
        
            res.status(200).json({success:true, message: 'Product deleted successfully' });
          } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
          }
    }
};