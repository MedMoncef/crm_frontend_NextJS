import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const TOKEN_KEY = 'Altair123456';
interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  login: (username: string, password: string) => void;
  register: (
    first_name: string,
    last_name: string,
    username: string,
    email: string,
    password: string,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, settoken] = useState<string | null>(null);

  // Check authentication state after page refresh to get the token inside the useAuthContext
  const checkAuthState = () => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      settoken(storedToken);
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/login/',
        { username, password }
      );
      const { token } = response.data;
      settoken(token);
      setIsLoggedIn(true);
      localStorage.setItem('token', token);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, show error message, etc.
    }
  };

  const register = async (first_name: string, last_name: string, username: string, email: string, password: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/token/register/', {
        first_name,
        last_name,
        username,
        email,
        password,
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, show error message, etc.
    }
  };

  const logout = () => {
    settoken(null);
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};