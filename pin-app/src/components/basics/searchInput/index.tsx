interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SearchInput({value, onChange}: SearchInputProps) {
  return (
    <form className="m-2">
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">
                Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-[#EF7D00]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-2 pl-10 text-sm rounded-3xl bg-[#FCFCFC] placeholder-[#2E2E2E] text-[#2E2E2E] border-gray-400 border-2 focus:border-[#6c2db4] focus:border-2 focus:outline-none"
          placeholder="Buscar"
          value={value}
          onChange={onChange}
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 top-1/2 transform -translate-y-1/2 bg-[#6C2DB4] hover:bg-[#7e22ce] focus:ring-4 focus:outline-none font-medium rounded-3xl text-sm px-3 py-1"
        >
                    Buscar
        </button>
      </div>
    </form>
  );
}
