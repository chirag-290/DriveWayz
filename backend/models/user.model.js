const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');


const userSchema=mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"first name must be 3 character long"]
        } ,
        lastname:{
            type:String,
            minlength:[3,"first name must be 3 character long"]
        } 
    },
    email:{
        type:String,
        required:true,
        unique:true,
        minlength:[3,'Email must be at least 3 characters long']
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:{
        type:String
    }
})

userSchema.methods.generateAuthtoken=function()
{
    const token=jwt.sign({_id:this._id},process.env.JWT_secret, { expiresIn: '24h' });
    return token;
}

userSchema.methods.comparepassword=async function(password) {
    return await bcrypt.compare(password,this.password);
    
}
userSchema.statics.hashpassword=async function(password){
    return await bcrypt.hash(password,10);
    
}

const userModel=mongoose.model('user',userSchema);

module.exports=userModel;