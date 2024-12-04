const captainmodel=require("../models/captain.model");
const captainservies=require("../services/captain.services");
const {validationResult}=require("express-validator");
const blacklistmodel=require("../models/blacklisttoken.model")


module.exports.registercaptain=async(req,res,next) =>{

    const errors=validationResult(req);
    if(!errors.isEmpty)
    {
        return res.status(400).json({
            errors:errors.array()

        })
    }
   

    const {fullname,email,password,vehicle}=req.body;

   
    

    const iscaptainalreadyexisit=await captainmodel.findOne({email});

    if(iscaptainalreadyexisit)
    {
        return res.status(400).json({
            message:"captain already exsist"
        })
    }

    const hashPassword=await captainmodel.hashPassword(password);
    console.log(fullname.firstname,fullname.lastname,email,password,vehicle.color,vehicle.plate,vehicle.capacity,vehicle.vehicleType);
    
    const captain=await captainservies.createCaptain({
        firstname:fullname.firstname,
        lastname:fullname.lastname,
        email,
        password:hashPassword,
        color:vehicle.color,
        plate:vehicle.plate,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType
    });
    



    const token=captain.generateAuthToken();

   return  res.status(200).json({
        token,
        captain
    })


}

module.exports.logincaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty)
    {
        return res.status(400).json({
            errors:errors.array()

        })
    }

    const {email,password}=req.body;

    if(!email || !password)
    {
        return res.status(401).json({
            message:"unaithorized access"
        })
    }

    const captain=await captainmodel.findOne({email}).select("+password");

    if(!captain)
    {
        return res.status(401).json({
            message:"invalid email or password"
        })
    }

    const isMatch=await captain.comparePassword(password);

    if(!isMatch)
    {
        return res.status(401).json({
            message:"invalid email or password"
        })

    }

    const token=await captain.generateAuthToken();

    res.cookie("token",token);

    return res.status(200).json({
        token,
        captain
    })

}

module.exports.getcaptainprofile=async(req,res,next) =>{
    res.status(200).json({captain:req.captain});
}

module.exports.captainlogout=async(req,res,next) =>{

     
    const token=req.cookies?.token || req.headers.authorization?.split(" ")[1];
    res.clearCookie('token');
   

    await blacklistmodel.create({token})

    res.status(200).json({
        message:"LogedOut succesfully"
    })


}