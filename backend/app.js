const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const express=require('express');
const app=express();
const connectDB=require("./db/db")
const useroutes=require("./Routes/user.routes")
const cookieparser=require("cookie-parser");
const captainroutes=require("./Routes/captain.routes")
const mapsroutes=require("./Routes/maps.routes")
const rideroutes=require("./Routes/ride.routes");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieparser());


app.use(cors());
connectDB();


app.get('/',(req,res) =>{
    console.log("hello");
    res.send("hello world");
})
app.use("/users",useroutes);
app.use("/captains",captainroutes)
app.use("/maps",mapsroutes)
app.use('/rides',rideroutes);
module.exports=app;