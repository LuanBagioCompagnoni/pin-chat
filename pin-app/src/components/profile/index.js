import GenericInput from '@/components/basics/genericInput/index.js';
import React, {useState} from 'react';
import {useAuth} from '@/context/AuthContext.js';
import GenericButton from '@/components/basics/buttons/genericButton.js';

export default function Profile(){
  const {user} = useAuth();
  const [nameInputValue, setNameInputValue] = useState(user.name);
  const [emailInputValue, setEmailInputValue] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const handleNameInputChange = (event) => {
    setNameInputValue(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setEmailInputValue(event.target.value);
  };


  const validatePasswords = (e) => {
    if (password && confirmPassword && password !== confirmPassword) {
      e.target.setCustomValidity('As senhas não coincidem.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePasswords) {
      return;
    }
  };

  return (
    <div className={'h-[93vh] w-[100vw] sm:w-[96.5vw] sm:h-screen flex flex-col items-center justify-start relative border-2 border-[#E8E8E8] gap-5 overflow-y-auto scrollbar-custom bg-[#f8f8f8]'}>

      <h1 className='text-[#2e2e2e] font-bold text-center text-2xl w-full  p-4 '>Meu perfil</h1>

      <div
        className='flex flex-col justify-center items-center w-auto h-[25%] mt-5 rounded-full relative cursor-pointer'>
        <img
          className='rounded-full h-full w-full opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-25'
          src='https://suporte.ixcsoft.com.br/atendente/services/download/thumb/65fde58731fc11e41b6b12bf?signature=e5561e3b6a2cbd37b4f330861d2c71c2f93e513b00fb3e9a31eb1f7da86e55ab'
          alt='UserImage'
        />
        <div
          className='absolute inset-0 flex justify-center items-center bg-[#8957c3] rounded-full bg-opacity-40 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 z-10'>
          <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
            className='text-[#EF7D00]' viewBox="0 0 16 16">
            <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
            <path
              d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
          </svg>
        </div>
      </div>

      <div
        className='flex flex-col justify-center items-center w-[80%] space-y-5  p-6 rounded-xl'>

        <form
          className={'flex flex-col w-full border-2 border-[#8957c3] p-5 rounded-xl space-y-5 shadow-gray-300 shadow-md drop-shadow items-center'}>
          <h1 className={'text-[#2e2e2e] w-full font-medium'}>Dados pessoais:</h1>
          <div className={'flex flex-col items-center sm:flex-row w-full space-y-5 sm:space-y-0 sm:space-x-10'}>

            <GenericInput value={nameInputValue} onChange={handleNameInputChange} labelClasName={''}
              className='w-[90%] text-[#2e2e2e] '
              inputClassName='rounded-xl' label='Nome'/>
            <GenericInput value={emailInputValue} onChange={handleEmailInputChange} labelClasName={''}
              className='w-[90%] text-[#2e2e2e]'
              inputClassName='rounded-xl' label='E-mail'/>
          </div>

          <GenericButton className={'w-[30%] h-10'} type={'submit'} nameButton='Salvar'/>
        </form>
        <form onSubmit={handleSubmit}
          className={'flex flex-col w-full border-2 border-[#8957c3] p-5 rounded-xl space-y-5 shadow-gray-300 shadow-md drop-shadow items-center'}>
          <h1 className={'text-[#2e2e2e] w-full font-medium'}>Senha:</h1>
          <div className={'flex flex-col items-center sm:flex-row w-full space-y-5 sm:space-y-0 sm:space-x-10'}>
            <GenericInput
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={validatePasswords}
              className='w-[90%] text-[#2e2e2e]'
              inputClassName='rounded-xl'
              label='Senha'
            />
            <GenericInput
              type={'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={validatePasswords}
              className='w-[90%] text-[#2e2e2e]'
              inputClassName='rounded-xl'
              label='Confirmação de senha'
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <GenericButton className={'w-[30%] h-10'} type={'submit'} nameButton='Salvar'/>
        </form>
      </div>
    </div>
  );
}