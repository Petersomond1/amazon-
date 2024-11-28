import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/apiConfig"; // Assuming this is your axios setup or replace with fetch setup

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/authenticate");
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to authenticate');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication on mount
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const useAuthContext = () => useContext(AuthContext);
