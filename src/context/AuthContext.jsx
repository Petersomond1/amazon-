import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/apiConfig";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Check authentication (Runs on app load)
  const checkAuth = async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/authenticate");
      setUser(response.data.user);
      setError(null);
    } catch (error) {
      setUser(null);
      setError(error.message || "Failed to authenticate");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login function (Updates UI instantly)
  const login = async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      checkAuth()
      return response;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
  };

  // ✅ Logout function (Clears user state)
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null); // 🛑 CLEAR STATE IMMEDIATELY
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, checkAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


export const useAuthContext = () => useContext(AuthContext);

