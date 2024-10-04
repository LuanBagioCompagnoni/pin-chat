export default function Contact({ contact, onSelect, isSelected }) {
  return (
    <div
      className={` hover:bg-purple-800 w-full flex flex-col items-center justify-center shadow-gray-800 shadow-md rounded-2xl mb-2 cursor-pointer
      ${isSelected ? 'bg-[#581c87]' : ''}`
      }
      onClick={onSelect}
    >
      <a className='w-full h-full py-2'>
        <h1 className="text-lg font-bold mx-1 text-gray-50">{contact.name}</h1>
        <div className="flex">
          <div className="bg-black rounded-3xl mx-1">
            <h2 className="text-xs font-light text-gray-50 px-2 p-0.5">Departamento</h2>
          </div>
          <div className="bg-orange-300 rounded-3xl">
            <h2 className="text-xs font-light text-gray-50 px-2 p-0.5">Etiqueta</h2>
          </div>
        </div>
      </a>
    </div>
  );
}
