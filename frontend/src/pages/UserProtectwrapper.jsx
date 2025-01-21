import React,{useContext, useEffect} from "react";
import { UserDatacontext } from "../../context/Usercontext";
import {useNavigate} from "react-router-dom";


const UserProtectwrapper= ({children}) =>{
    const token=localStorage.getItem("token");
    // console.log(token);

    const navigate=useNavigate();

    useEffect(() =>{
        if(!token)
            {
                navigate("/login");
                
            }

    },[token])
    


    return (
        <>

         {children}

        
        </>
    )

}

export default UserProtectwrapper;
