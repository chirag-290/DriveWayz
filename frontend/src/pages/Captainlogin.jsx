import React, { useState,useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../../context/CaptainContext";
import axios from "axios";


const Captainlogin =() =>{
    const [email,setEmail]=useState('')
    const [password,setpassword]=useState('')

    const navigate=useNavigate();

    const { captain, setCaptain } = useContext(CaptainDataContext)

    const submithandler = async(e) =>{
        e.preventDefault();
        const captain = {
          email: email,
          password
        }
    
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captain)
    
        if (response.status === 200) {
          const data = response.data
    
          setCaptain(data.captain)
          localStorage.setItem('token', data.token)
          navigate('/captain-home')
    
        }
        setEmail('');
        setpassword('')

    }
    return (
        <div className="p-7 h-screen flex flex-col justify-between">
        <div>
        {/* <img className="w-20 mb-3" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="logo" /> */}
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
        <p className="text-center">Join a fleet?<Link to="/captain-signup" className="text-blue-600">Register as a Captain</Link></p>
        </div>
        <div>
            <Link to="/login" className="bg-[#d5622d] flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2  w-full text-lg placeholder:text-base">Sign in as User</Link>
        </div>
       
    </div>
    )
}
export default Captainlogin;