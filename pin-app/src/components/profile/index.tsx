import React, {useState} from 'react';

import GenericButton from '@/shared/components/genericButton';
import GeneralData from '@/components/profile/userGeneralData';
import UserImage from '@/components/profile/userGeneralData/userImage';

import {useAuth} from '@/context/AuthContext';

export default function Profile(){
  const {user} = useAuth();

  return (
    <div
      className="h-[93vh] w-[100vw] sm:w-[96.5vw] sm:h-screen flex flex-col items-center justify-start relative border-l-2 border-[#E8E8E8] gap-5 overflow-y-auto scrollbar-custom bg-[#f8f8f8]">

      <div className="relative z-10 w-full items-center justify-start">
        <div className="bg-[#f8f8f8] w-full flex items-center relative">
          <h1 className="text-[#EF7D00] font-extralight text-start text-3xl p-4 ">Meu perfil</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
            class="bi bi-caret-right-fill text-[#EF7D00]" viewBox="0 0 16 16">
            <path
              d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
          <h1 className="text-[#EF7D00] font-normal text-start text-3xl p-4 ">{user.name}</h1>
        </div>
      </div>

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-start px-6 pb-6 space-x-6">


        <div
          className="flex flex-row items-start justify-center relative rounded-sm border-2 border-dashed border-[#ff924b] h-full w-full bg-[#f8f8f8] ">
          <div className="w-full h-auto flex flex-row border-dashed border-[#ff924b] border-b-2 p-10 m-10 mt-0">
            <div className="flex flex-col items-center justify-center w-[30%] h-auto">
              <h1 className="font-medium text-xl text-center justify-center w-full text-gray-700">Informações principais</h1>
              <GenericButton className="w-auto h-10 bg-transparent text-gray-700 rounded-xl hover:bg-[#e2e2e2]" type="submit" nameButton="Redefinir senha"/>
            </div>
            <div className="flex flex-row items-center justify-center w-[70%] h-[50%] border-dashed border-[#ff924b] border-l-2 p-10">
              < UserImage/>
              < GeneralData/>
            </div>
          </div>
        </div>

        {/*<div*/}
        {/*    className='flex flex-col justify-center items-center w-[80%] space-y-5  rounded-xl bg-[#f8f8f8] border-2 border-[#8957c3] shadow-md drop-shadow'>*/}
        {/*    < PasswordForm/>*/}

        {/*</div>*/}
      </div>
    </div>
  );
}