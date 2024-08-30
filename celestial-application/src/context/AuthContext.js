// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'dotenv/config.js';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authApi = process.env.NEXT_PUBLIC_API_AUTH_URL;

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          setUser('teste');
          setLoading(false);
          return;

          const res = await fetch(`${authApi}api/verify-token`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (res.ok && data.valid) {
            setUser(data.user);
          } else {
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Failed to verify token', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const register = async (name, email, password) => {
    try {
      console.log(toString( JSON.stringify({name, email, password, admin: false})));
      const res = await fetch(`${authApi}auth/register`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password, admin: false})
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      }else {
        throw new Error(data);
      }
    }catch (error){
      throw new Error(error.message);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${authApi}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
      } else {
        throw new Error(data);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
