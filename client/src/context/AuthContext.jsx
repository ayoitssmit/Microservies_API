import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user session on mount
    const savedUserInfo = localStorage.getItem('userInfo');
    if (savedUserInfo) {
      setUser(JSON.parse(savedUserInfo));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.loginUser(email, password);
      // data contains _id, name, email, token
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (err) {
      console.error('Login error:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Login failed. Please try again.' 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const { data } = await api.registerUser(name, email, password);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setUser(data);
      return { success: true };
    } catch (err) {
      console.error('Registration error:', err.response?.data?.message || err.message);
      return { 
        success: false, 
        message: err.response?.data?.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('ecommerce_demo_userId'); // Clean up old demo key if it exists
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
