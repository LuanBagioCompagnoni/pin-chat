import { useAuth } from '@/context/AuthContext';
import {toast} from 'react-toastify';
import GenericInput from '@/components/basics/genericInput/index.js';
import Modal from '@/components/modal/index.js';
import React, {useState} from 'react';
import LineInput from '@/components/basics/auth/input/index.js';
import Profile from '@/components/profile/index.js';


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
    <nav className={`${className} h-screen bg-[#F8F8F8] flex flex-col`}>
      <ul className="h-full flex flex-col align-top space-y-4 py-4 relative">
        <li>
          <a href="#" className="flex items-center justify-center text-[#EF7D00] rounded hover:text-[#994712] mx-1 cursor-pointer">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16"></path>
            </svg>
          </a>
        </li>
        <li>
          <a className="flex items-center justify-center text-[#EF7D00] hover:text-[#994712] rounded  cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-lines-fill w-8 h-8" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/>
            </svg>
          </a>
        </li>
        <li onClick={openUserModal} className='absolute bottom-4 left-1/2 transform -translate-x-1/2 space-y-4'>
          <a className='flex items-center justify-center text-[#EF7D00] hover:text-[#994712] rounded  cursor-pointer '>
            <svg xmlns="http://www.w3.org/2000/svg" className='w-8 h-8' fill="currentColor" class="bi bi-person-circle"
              viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </a>
          <a onClick={() => {
            logout();
            showWarning('Desconectado!');
          }} className="flex text-[#EF7D00] rounded hover:text-[#994712] cursor-pointer">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"></path>
            </svg>
          </a>
        </li>
      </ul>
      <Modal isVisible={isUserModalOpen} onClose={closeUserModal} zIndex={70} className={'w-screen h-screen'}>
        <Profile />
      </Modal>
    </nav>
  );
}

export default LateralBar;
