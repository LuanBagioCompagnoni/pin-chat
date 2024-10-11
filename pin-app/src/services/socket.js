import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

let socket;

export const useSocket = (token) => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket && token) {
      socket = io(process.env.NEXT_PUBLIC_API_CHAT_URL, {
        query: {
          token,
        },
        transports: ['websocket', 'polling'],
      });

      socket.on('connect', () => {
        setConnected(true);
        console.log('Conectado ao socket.io');
      });

      socket.on('disconnect', () => {
        setConnected(false);
        console.log('Desconectado do socket.io');
      });

      return () => {
        socket.disconnect();
        socket = null;
      };
    }
  }, [token]);

  return { socket, connected };
};
