import React, { useContext } from "react";
import { Routes,Route } from "react-router-dom";
import Userlogin from "./pages/UserLogin";
import Usersignup from "./pages/Usersignup";
import Captainlogin from "./pages/captainlogin";
import Captainsignup from "./pages/captainsignup";
import Start from "./pages/Start";
import { UserDatacontext } from "../context/Usercontext";
import Home from "./pages/home";
import Userlogout from "./pages/UserLogout";
import UserProtectwrapper from "./pages/UserProtectwrapper";
import CaptainHome from "./pages/CaptianHome"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

// import { UserDatacontext } from "../context/Usercontext";



const App =() =>{
    return (
        <div>
            <Routes>
                <Route path='/' element={<Start/>}/>
                <Route path='/login' element={<Userlogin/>}/>
                <Route path='/signup' element={<Usersignup/>}/>
                <Route path='/captain-login' element={<Captainlogin/>}/>
                <Route path='/captain-signup' element={<Captainsignup/>}/>
                <Route path='/home' element={
                    <UserProtectwrapper>
                        <Home/>
                    </UserProtectwrapper>
                    
                }/>
                <Route path='/user/logout' element={
                <UserProtectwrapper>
                    <Userlogout/>
                </UserProtectwrapper>
                    }/>
                    <Route path='/captain-home' element={
                        <CaptainProtectWrapper>
                             <CaptainHome />
                        </CaptainProtectWrapper>
         
           

        } />
            </Routes>
        </div>
    )
}
export default App;