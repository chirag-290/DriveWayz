const mongoose=require('mongoose');

function connectDB()
{
    mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true,useunifiedtopology:true})
        .catch(err =>{
        console.log(err);
    }).then(() =>{
        console.log("database connected");
    }).catch(err => console.log(err.message));

}
module.exports=connectDB;