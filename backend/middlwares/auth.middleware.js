const usermodel=require("../models/user.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const blacklistedtoken=require("../models/blacklisttoken.model");
const captainmodel =require("../models/captain.model")

module.exports.authuser= async(req,res,next) =>{
    const token=req.cookies?.token || req.headers.authorization?.split(" ")[1];
      if(!token)
        {
            return res.status(401).json({
                message:"unautorizad"
            })
        }
        
    
    const isblacklisted=await blacklistedtoken.findOne({token:token})
   
    
    if(isblacklisted)
        {
            return res.status(401).json({message:"unathorizaed"});
        }
        
        try {
            const decode=await jwt.verify(token,process.env.JWT_secret);
            console.log(decode);
            
            const user=await usermodel.findById(decode._id);
            
            req.user=user;
        return next();
    } catch (error) {
        return res.status(401).json({
            message:"unathorizaed"
        })
        
    }

  
}


module.exports.authcaptain=async(req,res,next) =>{
    const token=req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token)
      {
          return res.status(401).json({
              message:"unautorizad"
          })
      }
      
  
  const isblacklisted=await blacklistedtoken.findOne({token:token})
 
  
  if(isblacklisted)
      {
          return res.status(401).json({message:"unathorizaed"});
      }
      
      try {
          const decode=await jwt.verify(token,process.env.JWT_secret);
          
          const captain=await captainmodel.findById(decode._id);
          req.captain=captain;
      return next();
  } catch (error) {
      return res.status(401).json({
          message:"unathorizaed"
      })
      
  }

}