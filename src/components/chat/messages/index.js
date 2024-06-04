import React, { useEffect, useRef } from 'react';


export default function Messages() {
  const listRef = useRef(null);
  const messages = [
    { id: 1, text: 'Olá, tudo bem?', type: 'sent' },
    { id: 2, text: 'Sim, e você?', type: 'received' },
    { id: 3, text: 'Estou bem também!', type: 'sent' },
  ];

  useEffect(() => {
    if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }
});

  return (
    <ul ref={listRef} className="overflow-y-auto  w-full h-full p-4 flex flex-col space-y-2 text-gray-50 scrollbar-custom">
      {messages.map((message) => (
        <li
          key={message.id}
          className={`rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-700 ${
            message.type === 'sent' ? 'self-start bg-gray-500' : 'self-end bg-[#7e22ce]'
          }`}
        >
          {message.text}
        </li>
      ))}
    </ul>
  );
}
