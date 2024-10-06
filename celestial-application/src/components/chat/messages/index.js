import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { useSocket } from '@/services/socket.js';
import { useNotification } from '@/hooks/notification.js';

export default function Messages({ selectedContact }) {
  const listRef = useRef(null);
  const { user, token } = useAuth();
  const { socket } = useSocket(token);
  const [ messages, setMessages ] = useState([]);
  const { emitNotification } = useNotification();

  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', (newMessage) => {
        const dUser = newMessage?.destinationUserId;
        const oUser = newMessage?.originUserId;
        if ((oUser === selectedContact._id && dUser === user._id) || (oUser === user._id && dUser === selectedContact._id)) {
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        }
      });

      socket.on('listMessages', (messagesToChat) => {
        setMessages(messagesToChat);
      });

      return () => {
        socket.off('receiveMessage');
        socket.off('listMessages');
      };
    }
  }, [socket, user, selectedContact, emitNotification]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul ref={listRef} className="overflow-y-auto w-full h-full p-4 flex flex-col space-y-2 text-gray-50 scrollbar-custom relative">
      {messages.length > 0 ? (
        user && messages.map((message) => (
          <li
            key={message.id}
            className={`relative flex flex-col rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-700 ${message?.originUserId === user?._id ? 'self-end bg-[#7e22ce]' : 'self-start bg-gray-500'}`}
          >
            <div>{message.content}</div>
            <div className={`text-xs font-light ${message.originUserId === user._id ? 'self-end' : 'self-start'}`}>
              {`${new Date(message?.date).getHours()}:${new Date(message?.date).getMinutes()}`}
            </div>
          </li>
        ))
      ) : (
        <div className="flex mt-10 justify-center h-full">
          <h1 className="text-gray-50">Envie a primeira mensagem!</h1>
        </div>
      )}
    </ul>
  );
}
