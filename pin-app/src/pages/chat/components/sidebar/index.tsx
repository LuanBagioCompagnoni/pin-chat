import React, { useState } from 'react';
import { toast } from 'react-toastify';

import ContactList from '@/components/basics/icons/contactList';
import Exit from '@/components/basics/icons/exit';
import Home from '@/components/basics/icons/home';
import Person from '@/components/basics/icons/person';

import { useAuth } from '@/context/AuthContext';

function LateralBar({ className, selectOption }) {
  const { logout } = useAuth();
  const showWarning = (message) => toast.warning(message);
  const [activeIcon, setActiveIcon] = useState(null);

  const handleIconClick = (index) => {
    setActiveIcon(index);
    switch (index) {
    case 1:
      selectOption('home');
      break;
    case 2:
      selectOption('contactsBar');
      break;
    case 3:
      selectOption('profile');
    }
  };

  return (
    <nav className={`${className} bg-[#F8F8F8] sm:h-screen flex sm:flex-col sm:justify-between fixed bottom-0 sm:static w-full sm:w-auto`}>
      <div className="space-x-2 flex flex-row sm:flex-col sm:space-y-2 sm:space-x-0 sm:py-4 relative sm:h-[50%] w-[50%] sm:w-full">
        <div
          className={`group h-full w-12 sm:w-full sm:h-12 flex flex-row items-center justify-center relative ${activeIcon === 1 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
          onClick={() => handleIconClick(1)}
        >
          <a href="#"
            className="flex items-center justify-center rounded hover:text-[#8957C3] w-full h-12 mx-1 cursor-pointer">
            <Home w="35" h="35" />
          </a>
          <div className={`absolute top-0 sm:right-0 w-full h-1 sm:h-full sm:w-1  rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] ${activeIcon === 1 ? 'bg-[#8957C3]' : 'bg-transparent'}`}></div>
        </div>

        <div
          className={`group h-full w-12 sm:w-full sm:h-12 flex flex-row items-center justify-center relative ${activeIcon === 2 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
          onClick={() => handleIconClick(2)}
        >
          <a className="flex items-center justify-center hover:text-[#8957C3] w-full h-12 rounded cursor-pointer">
            <ContactList w="35" h="35" />
          </a>
          <div className={`absolute top-0 sm:right-0 w-full h-1 sm:h-full sm:w-1 rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] ${activeIcon === 2 ? 'bg-[#8957C3]' : 'bg-transparent'}`}></div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col justify-end sm:content-end space-x-2 sm:space-x-0 sm:space-y-2 sm:py-4 relative sm:h-[50%] w-[50%] sm:w-full">
        <div
          className={`group h-full w-12 sm:w-full sm:h-12 flex flex-row items-center justify-center relative ${activeIcon === 3 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
          onClick={() => handleIconClick(3)}
        >
          <a className="flex items-center justify-center hover:text-[#8957C3] sm:w-full  h-12 cursor-pointer relative">
            <Person w="35" h="35" />
          </a>
          <div className={`absolute top-0 sm:right-0 w-full h-1 sm:h-full sm:w-1 rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] ${activeIcon === 3 ? 'bg-[#8957C3]' : 'bg-transparent'}`}></div>
        </div>

        <div
          className={`group h-full w-12 sm:w-full sm:h-12 flex flex-row items-center justify-center relative ${activeIcon === 4 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
          onClick={() => {
            logout();
            showWarning('Desconectado!');
            handleIconClick(4);
          }}
        >
          <a className="flex items-center justify-center rounded hover:text-[#8957C3] cursor-pointer">
            <Exit w="35" h="35" />
          </a>
          <div className="absolute top-0 sm:right-0 w-full h-1 sm:h-full sm:w-1 bg-transparent rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] "></div>
        </div>
      </div>
    </nav>
  );
}

export default LateralBar;
