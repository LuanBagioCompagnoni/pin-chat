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
          const res = await fetch(`${authApi}auth/verifyToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          });
          const data = await res.json();
          if (res.ok) {
            console.log('res ok', data);
            setUser(data.user);
          } else {
            console.log('res error', data);
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.log('catch');
          localStorage.removeItem('token');
        }
      } else {
        console.log('token vazio');
        setUser(null);
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const register = async (name, email, password) => {
    try {
      const res = await fetch(`${authApi}auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, admin: false })
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data.user;
      } else {
        throw new Error(data);
      }
    } catch (error) {
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
        return data.user;
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
