const express=require("express");
const router=express.Router();
const {body} =require("express-validator")
const usercontroller=require("../controllers/user.controller")
const authmiidleware=require("../middlwares/auth.middleware");


router.post("/register",[
    body('email').isEmail().withMessage("invalid Email"),
    body('fullname.firstname').isLength({min:3}).withMessage("firstname at leat 3 charher long"),
    body('password').isLength({min:'6'}).withMessage("password must be at least 6 character long ")
],usercontroller.registeruser)

router.post("/login",[
    body('email').isEmail().withMessage("invalid Email"),
    body('password').isLength({min:'6'}).withMessage("password must be at least 6 character long ")
], usercontroller.login)

router.get("/profile",authmiidleware.authuser,usercontroller.getprofile);
router.get("/logout",authmiidleware.authuser,usercontroller.logout);

















module.exports=router;