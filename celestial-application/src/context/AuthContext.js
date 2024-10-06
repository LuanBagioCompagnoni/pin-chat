import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import 'dotenv/config.js';
import {useSocket} from '@/services/socket.js';
import {toast} from 'react-toastify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { socket, connected } = useSocket(token);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authApi = process.env.NEXT_PUBLIC_API_AUTH_URL;
  const showWarning = (message) => toast.warning(message);
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);


  useEffect(() => {
    const verifyToken = async () => {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        try {
          const res = await fetch(`${authApi}auth/verifyToken`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localToken}`
            }
          });
          const data = await res.json();
          if (res.ok) {
            setUser(data.user);
            setToken(localToken);
          } else {
            logout();
          }
        } catch (error) {
          showWarning('Erro ao validar sessão! Desconectando...');
          logout();
        }
      } else {
        logout();
      }
      setLoading(false);
    };

    verifyToken();
  }, [authApi]);

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
        setToken(data.token);
        showSuccess(`Seja bem-vindo ${data.user?.name.split(' ')[0]}!`);
        return true;
      } else {
        showError(data);
        return false;
      }
    } catch (error) {
      showError('Falha ao registrar-se!');
      return false;
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
        setToken(data.token);
        showSuccess(`Seja bem-vindo ${data.user?.name.split(' ')[0]}!`);
        return true;
      } else {
        showError(data);
        return false;
      }
    } catch (error) {
      showError('Falha ao realizar login!');
      return false;
    }
  };

  const logout = () => {
    if(connected) socket.disconnect();
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}