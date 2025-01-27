


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
            
            console.log('hey da',req.body)
            
            
        } catch (error) {
            
        }
    }
};