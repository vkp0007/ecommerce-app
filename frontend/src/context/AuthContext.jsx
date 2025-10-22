import { createContext, useState, useEffect, useContext } from 'react';
import axios from '../utils/axiosInstance';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // Login user
  const login = async (email, password) => {
    const { data } = await axios.post('/users/login', { email, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Register user
  const register = async (name, email, password) => {
    const { data } = await axios.post('/users/register', { name, email, password });
    setUser(data);
    localStorage.setItem('user', JSON.stringify(data));
  };

  // Logout user
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
