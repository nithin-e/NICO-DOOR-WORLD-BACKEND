const express=require('express')
const adminController=require('../controller/admin/LoginLogic')
const adminRoute=express.Router()


adminRoute.post('/adminLogin', adminController.adminLogin);
adminRoute.post('/addProduct', adminController.addProduct);
adminRoute.get('/productData', adminController.fectingProductData);




module.exports=adminRoute