const express = require("express");
const adminController = require("../controller/admin/LoginLogic");
const adminAuth = require("../middleWare/adminExisist"); 
const { verifyAdminToken } = require("../middleWare/verifyAdmin"); // ✅ Fixed import

const adminRoute = express.Router();

// admin controllers
adminRoute.post("/adminLogin", adminController.adminLogin);
adminRoute.post("/addProduct", verifyAdminToken, adminController.addProduct);
adminRoute.get("/productData",verifyAdminToken,adminController.fectingProductData);
adminRoute.post("/deletingProduct", verifyAdminToken, adminController.deletingProduct);
adminRoute.post("/logOut",verifyAdminToken, adminController.LOGOUT);

// user Controller
adminRoute.get("/userFecth", adminController.userSideFecting);

module.exports = adminRoute;