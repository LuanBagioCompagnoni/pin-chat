// frontend/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulando uma chamada de API para verificar o token
      fetch('http://localhost:3001/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.valid) {
          setUser(data.user);
        } else {
          localStorage.removeItem('token');
        }
        setLoading(false);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
        const res = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        console.log(res.status)

        const data = await res.json();
        if (res.ok) {
            localStorage.setItem('token', data.token);
            setUser(data.user);
        router.push('/chat'); // Redireciona para a página de chat após login bem-sucedido
        } else {
            throw new Error(data.error);
        }
    } catch (error) {
        throw new Error(error);
    }
    
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    router.push('/login'); // Redireciona para a página de login após logout
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
