import React, { useContext } from "react";
import { Routes,Route } from "react-router-dom";
import Userlogin from "./pages/UserLogin";
import Usersignup from "./pages/Usersignup";
import Captainlogin from "./pages/Captainlogin";
import Captainsignup from "./pages/Captainsignup";
import Start from "./pages/Start";
import { UserDatacontext } from "../context/Usercontext";
import Home from "./pages/home";
import Userlogout from "./pages/UserLogout";
import UserProtectwrapper from "./pages/UserProtectwrapper";
import CaptainHome from "./pages/CaptianHome"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import RedirectIfAuth from "./pages/RedirectIfAuth";
import { Navigate } from "react-router-dom";
import RedirectforAuthforCaptain from "./pages/RedirectforAuthforCaptain";
import RideHistory from "./pages/RideHistory";
import CaptainRideHistory from "./pages/CaptainRideHistory";
// import { UserDatacontext } from "../context/Usercontext";

// import { UserDatacontext } from "../context/Usercontext";



const App =() =>{

    const { user } = useContext(UserDatacontext);
    console.log("user in app",user);
    // const navigate = useNavigate();
    return (
        <div>
            <Routes>
                <Route path='/' element={<Start/>}/>
                <Route
  path="/login"
  element={
    <RedirectIfAuth>
      <Userlogin />
    </RedirectIfAuth>
  }
/>
                <Route path='/riding' element={<Riding/>}/>
                <Route path='/captain-riding' element={<CaptainRiding/>}/>
                <Route
  path="/signup"
  element={
    <RedirectIfAuth>
      <Usersignup />
    </RedirectIfAuth>
  }
/>
                <Route path='/captain-login' element={
                    <RedirectforAuthforCaptain>
                    <Captainlogin/>
                    </RedirectforAuthforCaptain>
                }/>
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
        <Route path='/ride-history/:userId' element={<RideHistory/>}/>
        <Route path='/captain-history/:captainId' element={<CaptainRideHistory/>}/>
            </Routes>
            
        </div>
    )
}
export default App;