export default function Contact({ contactObject, onSelect, isSelected,isNotification }) {
  const {contact, lastMessage} = contactObject;

  return (
    <div
      className={` hover:bg-purple-800 w-[98%] items-center justify-center shadow-gray-800 shadow-md rounded-2xl mb-2 cursor-pointer
      ${isSelected ? 'bg-[#581c87]' : 'bg-gray-700'}${isNotification ? 'border-2s rounded-2xl border-purple-900 animate-pulse' : ''}`
      }
      onClick={onSelect}
    >
      <div>
        <a className='w-full h-full py-2 relative flex'>
          <div>
            <h2 className="text-md font-extralight text-gray-50 px-2 absolute left-1 top-1">{contact?.online ? '🟢' : '🔴'}</h2>
            <img className='rounded-full w-[60px] ml-4' src='https://cdn-icons-png.flaticon.com/512/4645/4645949.png'/>
          </div>
          <div className='content-center'>
            <h1 className="text-lg font-bold pl-4 text-gray-50">{contact?.name.charAt(0).toUpperCase() + contact?.name.slice(1).toLowerCase()}</h1>
            <div className="flex">
              <div className="">
                <h2 className="text-xs font-light text-gray-50 px-4 p-0.5">{lastMessage?.content}</h2>
              </div>
              <h1 className="absolute right-2 top-2 text-sm font-extralight">{lastMessage ? (`${new Date(lastMessage?.date).getHours()}:${new Date(lastMessage?.date).getMinutes()}`) : ('')}</h1>
            </div>
          </div>
        </a>
      </div>

    </div>
  );
}
