// RedirectIfAuth.jsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserDatacontext } from "../../context/Usercontext";

const RedirectIfAuth = ({ children }) => {
  const { user } = useContext(UserDatacontext);

  // If user is already logged in, redirect to home
  const isLoggedIn = user && user.email;

  return isLoggedIn ? <Navigate to="/home" /> : children;
};

export default RedirectIfAuth;
