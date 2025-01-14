import React, { useState } from "react";
import { Link } from "react-router-dom";

const Usersignup =() =>{
    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('')
    const [firstname,setfirstname]=useState('');
    const [lastname,setlastname]=useState('');
    const [userData,setUserData]=useState({});

    const submithandler = (e) =>{
        e.preventDefault();

        setUserData({
            fullName:{
                "firstname":firstname,
                "lastname":lastname
            },
            email:email,
            password:password
        })
        console.log(userData);

        setEmail('');
        setfirstname('');
        setlastname('');
        setpassword('');

    }


    return (
        <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        <img className="w-16 mb-10" src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="logo" />
      <form action="" onSubmit={(e) =>{
        submithandler(e)
      }}>
      <h3 className="text-lg font-medium mb-2">What's your Name</h3>
      <div className="flex gap-4 mb-6">
      <input
      value={firstname}
      onChange={(e) =>{
       setfirstname(e.target.value)
      }}
       
       required
       className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-sm"
       type="text"
       name=""
       id=""
       placeholder="First name"
     />
      <input
      value={lastname}
      onChange={(e) =>{
       setlastname(e.target.value)
      }}
       
       
       required
       className="bg-[#eeeeee] w-1/2  rounded px-4 py-2 border  text-lg placeholder:text-sm"
       type="text"
       name=""
       id=""
       placeholder="Last name"
     />

      </div>
        <h3 className="text-lg font-medium mb-2">What's your email?</h3>
        <input
          value={email}
          onChange={(e) =>{
           setEmail(e.target.value)
          }}
       
          required
          className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-sm"
          type="email"
          name=""
          id=""
          placeholder="email@example.com"
        />
        <h3 className="text-lg font-medium mb-2">Enter Password</h3>
        <input   value={password}
      onChange={(e) =>{
       setpassword(e.target.value)
      }}  className="bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base "   type="password" name="" id="" placeholder="password" />
        <button className="bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base ">Register</button>

      </form>
        <p className="text-center">Already have an account?<Link to="/Login" className="text-blue-600">Login Here</Link></p>
        </div>
        <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
        Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
       
    </div>
    )
}
export default Usersignup;