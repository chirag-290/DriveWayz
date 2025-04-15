import React, { createContext, useState, useEffect } from "react";

export const UserDatacontext = createContext();

const Usercontext = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  });

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    });
}

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserDatacontext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserDatacontext.Provider>
  );
};

export default Usercontext;
