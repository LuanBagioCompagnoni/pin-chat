import React, { useEffect, useRef } from 'react';

export default function Messages({ content = [] }) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [content]); // Add content as a dependency to useEffect

  return (
    <ul ref={listRef} className="overflow-y-auto w-full h-full p-4 flex flex-col space-y-2 text-gray-50 scrollbar-custom">
      {content.length === 0 ? (
        <div className=''>Não há</div>
      ) : (
        content.map((message) => (
          <li key={message.id} className={`relative flex flex-col rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-700 ${
            message.type === 'sent' ? 'self-start bg-gray-500' : 'self-end bg-[#7e22ce]'}`}>
            <div>{message.text}</div>
            <div className={`text-xs font-light ${
              message.type === 'sent' ? 'self-start' : 'self-end'}`}>{`${message?.date?.getHours()}:${message?.date?.getMinutes()}`}</div>
          </li>
        ))
      )}
    </ul>
  );
}