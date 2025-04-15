// RedirectIfAuth.jsx
import React, { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CaptainDataContext } from '../../context/CaptainContext';

const RedirectforAuthforCaptain = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isChecking, setIsChecking] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedCaptain = localStorage.getItem("captain");

    if (storedToken && storedCaptain) {
      try {
        const parsedCaptain = JSON.parse(storedCaptain);
        setCaptain(parsedCaptain);
        setShouldRedirect(true);
      } catch (err) {
        // Invalid JSON or error
        localStorage.removeItem("captain");
      }
    }

    setIsChecking(false);
  }, [setCaptain]);

  if (isChecking) return null; // Or show loading spinner if you prefer

  return shouldRedirect ? <Navigate to="/captain-home" replace /> : children;
};

export default RedirectforAuthforCaptain;
