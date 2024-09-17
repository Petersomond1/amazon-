import React from 'react';
import { useState, useEffect } from 'react';
import api from '../services/apiConfig';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get('/verify');
        setUser(response.data.decoded);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  return { user, loading };
};

export default useAuth;
