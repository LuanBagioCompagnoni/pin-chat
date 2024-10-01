import { io } from 'socket.io-client';
import { useEffect, useState } from 'react';

let socket;


//conexão e configuração com o socket do servidor de chat
export const useSocket = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!socket) {
      //cria a conexão com o socket usando a url encontrada no .env
      socket = io(process.env.NEXT_PUBLIC_API_CHAT_URL);
    }

    socket.on('connect', () => {
      //envia um evento "connect" ao servidor socket e gera a conexão com o servidor em tempo real
      setConnected(true);
      console.log('Conectado ao socket.io');
    });

    socket.on('disconnect', () => {
      //envia um evento "disconnect" para o servidor (quando um cliente se desconecta)
      setConnected(false);
      console.log('Desconectado do socket.io');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return { socket, connected };
};
