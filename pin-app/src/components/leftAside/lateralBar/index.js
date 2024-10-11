import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Modal from '@/components/modal/index.js';
import React, { useState } from 'react';
import Person from '@/components/basics/icons/person.js';
import Bars from '@/components/basics/icons/bars.js';
import ContactList from '@/components/basics/icons/contactList.js';
import Exit from '@/components/basics/icons/exit.js';
import Profile from '@/components/profile/index.js';

function LateralBar({ className }) {
  const { logout } = useAuth();
  const showWarning = (message) => toast.warning(message);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [activeIcon, setActiveIcon] = useState(null); // Estado para o ícone ativo

  const openUserModal = () => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  const handleIconClick = (index) => {
    setActiveIcon(index); // Atualiza o ícone ativo
  };

  return (
      <nav className={`${className} h-screen bg-[#F8F8F8] flex flex-col justify-between`}>
        <div className="space-y-2 py-4 relative h-[50%]">
          <div
              className={`group w-full h-12 flex flex-row items-center justify-center relative ${activeIcon === 1 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
              onClick={() => handleIconClick(1)}
          >
            <a href="#"
               className="flex items-center justify-center rounded hover:text-[#8957C3] w-full h-12 mx-1 cursor-pointer">
              <Bars w={'35'} h={'35'} />
            </a>
            <div className={`absolute top-0 right-0 h-full w-1 bg-transparent rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] ${activeIcon === 1 ? 'bg-[#8957C3]' : ''}`}></div>
          </div>

          <div
              className={`group w-full h-12 flex flex-row items-center justify-center relative ${activeIcon === 2 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
              onClick={() => handleIconClick(2)}
          >
            <a className="flex items-center justify-center hover:text-[#8957C3] w-full h-12 rounded cursor-pointer">
              <ContactList w={'35'} h={'35'} />
            </a>
            <div className={`absolute top-0 right-0 h-full w-1 bg-transparent rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] ${activeIcon === 2 ? 'bg-[#8957C3]' : ''}`}></div>
          </div>
        </div>

        <div className="content-end space-y-2 py-4 relative h-[50%] w-full">
          <div
              className={`group w-full h-12 flex flex-row items-center justify-center relative ${activeIcon === 3 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
              onClick={() => handleIconClick(3)}
          >
            <a className="flex items-center justify-center hover:text-[#8957C3] w-full h-12 cursor-pointer relative">
              <Person w={'35'} h={'35'} />
            </a>
            <div className={`absolute top-0 right-0 h-full w-1 bg-transparent rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] ${activeIcon === 3 ? 'bg-[#8957C3]' : ''}`}></div>
          </div>

          <div
              className={`group w-full h-12 flex flex-row items-center justify-center relative ${activeIcon === 4 ? 'text-[#8957C3]' : 'text-[#EF7D00]'}`}
              onClick={() => {
                logout();
                showWarning('Desconectado!');
                handleIconClick(4);
              }}
          >
            <a className="flex items-center justify-center rounded hover:text-[#8957C3] cursor-pointer">
              <Exit w={'35'} h={'35'} />
            </a>
            <div className='absolute top-0 right-0 h-full w-1 bg-transparent rounded-full transition-all duration-300 ease-in-out group-hover:bg-[#8957C3] '></div>
          </div>
        </div>

        <Modal isVisible={isUserModalOpen} onClose={closeUserModal} zIndex={70} className="w-screen h-screen">
          <Profile />
        </Modal>
      </nav>
  );
}

export default LateralBar;
