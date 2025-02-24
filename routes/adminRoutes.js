const express = require("express");
const adminController = require("../controller/admin/LoginLogic");
const adminAuth = require("../middleWare/adminExisist"); 
const { verifyAdmin } = require("../middleWare/verifyAdmin"); 

const adminRoute = express.Router();

// admin controllers
adminRoute.post("/adminLogin",adminController.adminLogin);
adminRoute.post("/addProduct", adminController.addProduct);
adminRoute.get("/productData",adminController.fectingProductData);
adminRoute.post("/deletingProduct", adminController.deletingProduct);
adminRoute.post("/logOut", adminController.LOGOUT);
adminRoute.get("/verifyAdmin", adminController.adminVerify);
adminRoute.get("/verify",verifyAdmin,adminController.verifyAdminAuth);




// user Controller
adminRoute.get("/userFecth", adminController.userSideFecting);

module.exports = adminRoute;