import React from 'react';

import {Message} from '@/shared/types/Message';
import {User} from '@/shared/types/User';

interface ContactItemProps {
  contactObject: {
    contact: User,
    lastMessage: Message
    isSelected?: boolean
  };
  onSelect: (contactObject: User) => void;
  isNotification: boolean;
}

export default function Item({ contactObject, onSelect, isNotification }: ContactItemProps) {
  const {contact, lastMessage} = contactObject;

  const formatTime = (date) => {
    if(lastMessage?.date) {
      const d = new Date(date);
      const hours = d.getHours().toString().padStart(2, '0');
      const minutes = d.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  };

  const formatName = () => {
    const name = `${contact.name.slice(0, 20)}${contact.name.length > 20 ? '...' : ''}`;

    const prepositions = ['de', 'da', 'do', 'das', 'dos'];
    const nameParts = name.split(' ');
    const formatedName = nameParts.map(part => {
      if (prepositions.includes(part.toLowerCase())) {
        return part.toLowerCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });
    return formatedName.join(' ');
  };

  return (
    <div
      className={` hover:bg-[#e8e8e8] w-[98%] h-16 items-center justify-center shadow-gray-400 shadow-sm rounded-2xl mb-2 cursor-pointer 
      ${contactObject.isSelected ? 'bg-[#EDEDED]' : 'bg-[#F8F8F8]'}`
      }
      onClick={(e) => {
        e.preventDefault();
        onSelect(contact);
      }}
    >
      <div>
        <a className="w-full h-full py-2 relative flex">
          <div>
            {contact?.online ?
              <div className="rounded-full bg-[#66BD71] absolute left-4 top-2.5 w-3.5 h-3.5"></div> : <div className="rounded-full bg-[#E57370] absolute left-4 top-2.5 w-3.5 h-3.5"></div>
            }
            <img className="rounded-full w-[50px] ml-4" src="https://cdn-icons-png.flaticon.com/512/4645/4645949.png" alt="UserImage"/>
          </div>
          <div className="content-center ">
            <h1 className="text-lg font-bold pl-4 text-[#2E2E2E]">{formatName()}</h1>
            <div className="flex">
              <div className="">
                <h2 className="text-xs font-medium text-[#8f8f8f] px-4 p-0.5 break-words ">
                  {lastMessage?.content?.slice(0, 35)}{lastMessage?.content?.length > 35 && '...'}
                </h2>
              </div>
              <h1 className="absolute right-2  bottom-3 text-xs font-medium text-[#8f8f8f]">{formatTime(lastMessage?.date)}</h1>
              <div className={`${isNotification ? ' rounded-full bg-[#EF7D00] animate-pulse absolute top-2 right-2  w-3.5 h-3.5' : 'hidden'}`}></div>
            </div>
          </div>
        </a>
      </div>

    </div>
  );
}
