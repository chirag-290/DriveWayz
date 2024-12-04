const usermodel = require("../models/user.model");

module.exports.createuser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
    if(!firstname || !email || !password)
    {
        throw new Error("All feilds are required");
        
    }
    const user=await usermodel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    
    return user;

}
