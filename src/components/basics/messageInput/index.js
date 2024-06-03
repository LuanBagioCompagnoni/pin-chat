import { darkPurple, lightPurple } from '@/styles/colors';

export default function SearchInput() {
  return (
    <form className="m-2 relative flex items-center">
      <a href="#" className="text-gray-50 rounded hover:text-gray-500 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
          <path d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
        </svg>
      </a>
      <div className="relative flex-grow ml-2">
        <input
          type="text"
          id="search"
          className="block w-full py-2 px-4 text-sm rounded-3xl bg-[#292e3d] placeholder-gray-400 text-white"
          placeholder="Digite a mensagem..."
          required
        />
        <button type="submit" className={`text-white absolute right-4 bottom-1 bg-[${darkPurple}] hover:bg-[${lightPurple}] focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-3 py-1`}>
                    Enviar
        </button>
      </div>
    </form>
  );
}
