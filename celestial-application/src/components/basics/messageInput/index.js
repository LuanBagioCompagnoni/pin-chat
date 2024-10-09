import { useEffect, useRef } from 'react';

export default function MessageInput({ onChange, onSubmit, value, selectedContact }) {

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedContact]);

  return (
    <form className="m-2 relative flex items-center" onSubmit={onSubmit}>
      <a href="#" className="text-gray-50 rounded hover:text-gray-500 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-500">
          <path d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
        </svg>
      </a>
      <div className="relative flex-grow ml-2">
        <input
          ref={inputRef}
          type="text"
          id="message"
          className="w-full py-2 ps-4 h-auto pe-[12%] break-words text-sm rounded-3xl bg-[#FCFCFC] border-2 border-gray-300 placeholder-[#2E2E2E] text-[#2E2E2E] focus:border-[#6c2db4] focus:border-2 focus:outline-none"
          placeholder="Digite uma mensagem..."
          onChange={onChange}
          value={value}
          required
        />
        <button
          type="submit"
          className="text-white absolute right-4 top-1/2 transform -translate-y-1/2 bg-[#6C2DB4] hover:bg-[#7e22ce] focus:ring-2 focus:outline-none font-medium rounded-3xl text-sm px-3 py-1"
        >
                    Enviar
        </button>
      </div>
    </form>
  );
}
