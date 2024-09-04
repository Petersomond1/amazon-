import React, { createContext, useContext,useEffect, useState } from "react";
import api from "../services/apiConfig";
const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await api.get('/auth/checkAuth');
      console.log("here is tshe response from teh authContext", response.data)
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      setUser(null);
      setError('Failed to authenticate');
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, []);


  return <AuthContext.Provider value={{user, loading , error, checkAuth}}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);



