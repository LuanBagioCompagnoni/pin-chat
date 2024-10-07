export default function Contact({ contactObject, onSelect, isSelected, isNotification }) {
  const {contact, lastMessage} = contactObject;
  const date = lastMessage?.date ? `${new Date(lastMessage?.date).getHours()}:${new Date(lastMessage?.date).getMinutes()}` : '';

  const formatTime = (date) => {
    if(lastMessage?.date) {
      const d = new Date(date);
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  };

  return (
    <div
      className={` hover:bg-[#e8e8e8] w-[98%] items-center justify-center shadow-gray-400 shadow-sm rounded-2xl mb-2 cursor-pointer 
      ${isSelected ? 'bg-[#EDEDED]' : 'bg-[#F8F8F8]'}`
      }
      onClick={onSelect}
    >
      <div>
        <a className='w-full h-full py-2 relative flex'>
          <div>
            {contact?.online ?
              <div className={'rounded-full bg-[#66BD71] absolute left-4 top-2.5 w-3.5 h-3.5'}></div> : <div className={'rounded-full bg-[#E57370] absolute left-4 top-2.5 w-3.5 h-3.5'}></div>
            }
            <img className='rounded-full w-[60px] ml-4' src='https://cdn-icons-png.flaticon.com/512/4645/4645949.png' alt='UserImage'/>
          </div>
          <div className='content-center '>
            <h1 className="text-lg font-bold pl-4 text-[#2E2E2E]">{contact?.name.charAt(0).toUpperCase() + contact?.name.slice(1).toLowerCase()}</h1>
            <div className="flex">
              <div className="">
                <h2 className="text-xs font-medium text-[#2E2E2E] px-4 p-0.5 break-words ">
                  {lastMessage?.content?.slice(0, 35)}{lastMessage?.content?.length > 50 && '...'}
                </h2>
              </div>
              <h1 className="absolute right-2 top-2 text-sm font-medium text-[#2E2E2E]">{formatTime(lastMessage?.date)}</h1>
              <div className={`${isNotification ? ' rounded-full bg-[#EF7D00] animate-pulse absolute right-2 bottom-5 w-5 h-5' : 'hidden'}`}></div>
            </div>
          </div>
        </a>
      </div>

    </div>
  );
}
