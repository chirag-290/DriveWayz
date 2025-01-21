import React,{useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {

    console.log("hello");
    

    const token = localStorage.getItem('token');
    console.log("in logout",token);
    const navigate = useNavigate();
    useEffect(() => {
        console.log("Starting logout process");
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            })
            .catch((error) => {
                console.error("Logout failed:", error);
            });
    }, [token, navigate]);
    return (
        
        <div>UserLogout</div>
    )
}

export default UserLogout;