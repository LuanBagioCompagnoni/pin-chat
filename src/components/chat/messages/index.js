import React, { useEffect, useRef } from 'react';


export default function Messages({content = []}) {
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  });

  return (
    <ul ref={listRef} className="overflow-y-auto  w-full h-full p-4 flex flex-col space-y-2 text-gray-50 scrollbar-custom">
      {content.length === 0 ? (<div className=''>Não há</div>) : (
        content?.map((message) => (
          <li key={message.id} className={`relative flex flex-col w-full ${
            message.type === 'sent' ? 'self-start' : 'self-end'}`}>
            <div className={`rounded-3xl px-4 py-2 max-w-[70%] break-words shadow-md shadow-gray-700 ${
              message.type === 'sent' ? 'self-start bg-gray-500' : 'self-end bg-[#7e22ce]'}`}>{message.text}</div>
            <div className={`px-4 text-sm font-light ${
              message.type === 'sent' ? 'self-start ' : 'self-end'}`}>{content?.date?.toLocaleString()}</div>
          </li>
        )))}
    </ul>
  );
}
