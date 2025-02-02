
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

    addProduct:async(req,res)=>{
        try {
            
            console.log('chech the req body',req.body);
            

     const { name, brand, material,images, color, price,lockIncluded, stock, description,suitableFor } = req.body;
     
            

            

       
       const newProduct = {
        name,
        brand,
        suitableFor,
        material,
        lockIncluded,
        color,
        price,
        stock,
        description,
        images
      };

      const product = await productDb.create(newProduct);
            
      res.status(200).json({
        message: 'succesFully product Stored'
    });
        } catch (error) {
            console.log(error);
            
        }
    },

    fectingProductData:async(req,res)=>{
        try {
            
            const dataFected=await productDb.find()
            console.log('check eda check',dataFected);
            
            res.status(200).json({
                data:dataFected,
                message: 'succesFully product fected'
            });


        } catch (error) {
            console.log(error);
            
        }
    }
};