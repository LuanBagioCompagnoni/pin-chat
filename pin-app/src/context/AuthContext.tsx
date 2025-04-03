import { createContext, useContext, useEffect, useState } from 'react';
import {toast} from 'react-toastify';
import { useRouter } from 'next/router';

import 'dotenv/config';

import {useSocket} from '@/services/socket';

interface AuthContextType {
  user: any;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const { socket, connected } = useSocket(token);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const authApi = process.env.NEXT_PUBLIC_API_AUTH_URL;
  const showWarning = (message: string) => toast.warning(message);
  const showSuccess = (message: string) => toast.success(message);
  const showError = (message: string) => toast.error(message);


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

    verifyToken().then();
  }, [authApi]);

  const register = async (name: string, email: string, password: string) => {
    try {
      console.log('chegou no authcontext para registrar')
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
        router.push('/chat').then()
      } else {
        showError(data);
      }
    } catch (error) {
      showError('Falha ao registrar-se!');
    }
  };

  const login = async (email: string, password: string) => {
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
        router.push('/chat').then()
      } else {
        showError(data);
      }
    } catch (error) {
      showError('Falha ao realizar login!');
    }
  };

  const logout = () => {
    if(connected) socket.disconnect();
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    router.push('/login').then();
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
