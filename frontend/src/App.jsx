import React, { useContext } from "react";
import { Routes,Route } from "react-router-dom";
import Userlogin from "./pages/UserLogin";
import Usersignup from "./pages/Usersignup";
import Captainlogin from "./pages/captainlogin";
import Captainsignup from "./pages/captainsignup";
import Home from "./pages/home";
import { UserDatacontext } from "../context/Usercontext";
// import { UserDatacontext } from "../context/Usercontext";



const App =() =>{
  
    return (
       
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Userlogin/>}/>
                <Route path='/signup' element={<Usersignup/>}/>
                <Route path='/captain-login' element={<Captainlogin/>}/>
                <Route path='/captain-signup' element={<Captainsignup/>}/>
            </Routes>
        </div>
    )
}
export default App;