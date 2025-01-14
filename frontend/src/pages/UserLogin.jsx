import React, { useState } from "react";
import { Link } from "react-router-dom";

const Userlogin = () => {
    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('')
    const [userData,setuserData]=useState({})

    const submithandler = (e) =>{
        e.preventDefault();
        setuserData({
            email:email,
            password:password

        })
        console.log(userData);
        setEmail('');
        setpassword('')

    }

    
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
      <form action="" onSubmit={(e) =>{
        submithandler(e)
      }}>
        <h3 className="text-lg font-medium mb-2">What's your email?</h3>
        <input
        value={email}
        onChange={(e) =>{
            setEmail(e.target.value)
        }}
          required
          className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "
          type="email"
          name=""
          id=""
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input  value={password} onChange={(e) =>{
            setpassword(e.target.value)
        }} className="bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base "   type="password" name="" id="" placeholder="password" />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">Login</button>

      </form>
        <p className="text-center">New here?<Link to="/signup" className="text-blue-600">Create new account</Link></p>
        </div>
        <div>
            <Link to="/captain-login" className="bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign in as captain</Link>
        </div>
       
    </div>
  );
};
export default Userlogin;
