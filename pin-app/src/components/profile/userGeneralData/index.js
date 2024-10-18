import GenericInput from '@/components/basics/genericInput/index.js';
import GenericButton from '@/components/basics/buttons/genericButton.js';
import React, {useState} from 'react';
import {useAuth} from '@/context/AuthContext.js';
import LineInput from '@/components/basics/auth/input/index.js';

export default function GeneralData() {
  const {user} = useAuth();
  const [nameInputValue, setNameInputValue] = useState(user?.name);
  const [emailInputValue, setEmailInputValue] = useState(user?.email);

  const handleNameInputChange = (event) => {
    setNameInputValue(event.target.value);
  };

  const handleEmailInputChange = (event) => {
    setEmailInputValue(event.target.value);
  };
  return (
    <form
      className={'flex flex-col w-full p-5 rounded-xl space-y-10  items-center'}>
      <LineInput
        type="e-mail"
        placeholder="E-mail"
        value={nameInputValue}
        onChange={handleNameInputChange}
        className='border-b-2 border-[#dbdbdb] w-[90%] focus:border-amber-200'
        inputClassName='text-[#2e2e2e] placeholder-[#2e2e2e]'
      />
      <LineInput
        type="e-mail"
        placeholder="E-mail"
        value={emailInputValue}
        onChange={handleEmailInputChange}
        className='border-b-2 border-[#dbdbdb] w-[90%] focus:border-amber-200'
        inputClassName='text-[#2e2e2e] placeholder-[#2e2e2e]'
      />

      <GenericButton className={'w-[30%] h-10'} type={'submit'} nameButton='Salvar'/>
    </form>
  );
}