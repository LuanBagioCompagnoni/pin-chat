import { useAuth } from '@/context/AuthContext';
import {toast} from 'react-toastify';
import Modal from '@/components/modal/index.js';
import React, {useState} from 'react';
import Profile from '@/components/basics/icons/profile.js';
import Bars from '@/components/basics/icons/bars.js';
import ContactList from '@/components/basics/icons/contactList.js';
import Exit from '@/components/basics/icons/exit.js';


function LateralBar({ className }) {
  const { logout } = useAuth();
  const showWarning = (message) => toast.warning(message);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const openUserModal = (index) => {
    setIsUserModalOpen(true);
  };

  const closeUserModal = () => {
    setIsUserModalOpen(false);
  };

  return (
    <nav className={`${className} h-screen bg-[#F8F8F8] grid grid-cols-1 grid-rows-2`}>
      <div className=" row-span-1 row-start-1 align-top space-y-4 py-4 relative">

        <a href="#" className=" flex items-center justify-center text-[#EF7D00] rounded hover:text-[#994712] mx-1 cursor-pointer">
          <Bars w={'35'} h={'35'}/>
        </a>

        <a className=" row-span-1 flex items-center justify-center text-[#EF7D00] hover:text-[#994712] rounded  cursor-pointer">
          <ContactList w={'35'} h={'35'} />
        </a>
      </div>

      <div className={'row-span-1 row-start-2  align-top space-y-4 py-4 relative'}>
        <a className='flex items-center justify-center text-[#EF7D00] hover:text-[#994712]  rounded  cursor-pointer relative'>
          <Profile w={'35'} h={'35'}/>
        </a>

        <a onClick={() => {
          logout();
          showWarning('Desconectado!');
        }} className="flex items-center justify-center text-[#EF7D00] rounded hover:text-[#994712] cursor-pointer">
          <Exit w={'35'} h={'35'}/>
        </a>
      </div>


      <Modal isVisible={isUserModalOpen} onClose={closeUserModal} zIndex={70} className={'w-screen h-screen'}>
        <Profile/>
      </Modal>
    </nav>
  );
}

export default LateralBar;
