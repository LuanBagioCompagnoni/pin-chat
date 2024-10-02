import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/context/AuthContext.js';
import { useSocket } from '@/services/socket.js';

export default function Messages({ contactId }) {
  const listRef = useRef(null);
  const { socket } = useSocket();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {

      socket.on('receiveMessage', (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      socket.on(`listMessages${user._id}${contactId}`, (messagesToChat) => {
        setMessages(messagesToChat);
      });

      return () => {
        socket.off('receiveMessage');
        socket.off(`listMessages${user._id}${contactId}`);
      };
    }
  }, [socket, user, contactId]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ul ref={listRef} className="overflow-y-auto w-full h-full p-4 flex flex-col space-y-2 text-gray-50 scrollbar-custom">
      {messages.length > 0 ? (
        messages.map((message) => (
          <li
            key={message.id}
            className={`relative flex flex-col rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-700 ${message.originUserId === user._id ? 'self-end bg-[#7e22ce]' : 'self-start bg-gray-500'}`}
          >
            <div>{message.content}</div>
            <div className={`text-xs font-light ${message.originUserId === user._id ? 'self-end' : 'self-start'}`}>
              {`${new Date(message?.date).getHours()}:${new Date(message?.date).getMinutes()}`}
            </div>
          </li>
        ))
      ) : (
        <div className="text-gray-800">Envie a primeira mensagem!</div>
      )}
    </ul>
  );
}
