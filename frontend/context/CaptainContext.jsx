import { createContext, useState, useContext, useEffect } from 'react';


export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        const storedCaptain = localStorage.getItem('captain');
        if (storedCaptain) {
          setCaptain(JSON.parse(storedCaptain));
        }
      }, []);

      const updateCaptain = (captainData) => {
        setCaptain(captainData);
        localStorage.setItem('captain', JSON.stringify(captainData)); // optional sync
      };

    const value = {
        captain,
        setCaptain,
        isLoading,  
        setIsLoading,
        error,
        setError,
        updateCaptain
    };


    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;