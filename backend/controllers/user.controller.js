const usermodel = require("../models/user.model");
const userservies = require("../services/user.service");
const { validationResult } = require("express-validator");
const blacklistmodel=require("../models/blacklisttoken.model");

module.exports.registeruser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { fullname,email,password } = req.body;

  const alreadyexisituser=await usermodel.findOne({email});
  if(alreadyexisituser)
  {
    return res.status(400).json({
      message:"user already exsist"
    })
  }

  const hashpassword = await usermodel.hashpassword(password);
  const user = await userservies.createuser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashpassword,
  });

  const token = user.generateAuthtoken();

  res.status(200).json({
    message: "success",
    token,
    user,
  });
};

module.exports.login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const { email, password } = req.body;

  const user = await usermodel.findOne({ email }).select("+password");

  if(!user)
  {
    return res.status(401).json({message:"invalid email or password"});
  }

  const ismatch=user.comparepassword(password);

  if(!ismatch)
  {
    return res.status(401).json({message:"invalid email or password"});

  }

  const token=user.generateAuthtoken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
//   res.cookie("token",token);
  return res.status(200).json({
    token,
    user
  })


};

module.exports.getprofile=async(req,res,next) =>{
    return res.status(200).json(req.user);
}

module.exports.logout= async(req,res,next) =>{
   
    
    const token=req.cookies?.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie('token');
   

    await blacklistmodel.create({token})

    res.status(200).json({
        message:"LogedOut"
    })

}




