// import React,{useContext, useEffect} from "react";
// import { UserDatacontext } from "../../context/Usercontext";
// import {useNavigate} from "react-router-dom";


// const UserProtectwrapper= ({children}) =>{
//     const token=localStorage.getItem("token");
//     // console.log(token);

//     const navigate=useNavigate();

//     useEffect(() =>{
//         if(!token)
//             {
//                 navigate("/login");
                
//             }

//     },[token])
    


//     return (
//         <>

//          {children}

        
//         </>
//     )

// }

// export default UserProtectwrapper;


import React, { useContext, useEffect, useState } from 'react'
import { UserDatacontext } from '../../context/Usercontext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = useContext(UserDatacontext)
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
    
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => {
            if (response.status === 200) {
                setUser(response.data);
                setIsLoading(false);
            }
        })
        .catch(err => {
            console.log(err);
            localStorage.removeItem('token');
            setUser(null);
            navigate('/login');
        });
    }, [token]);
    
    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    return (
        <>
            {children}
        </>
    )
}

export default UserProtectWrapper