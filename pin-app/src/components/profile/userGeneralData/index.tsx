import React, {useState} from 'react';

import authFormInput from '@/shared/components/auth/input/index';

import GenericButton from '@/shared/components/genericButton';
import GenericInput from '@/components/basics/genericInput';

import {useAuth} from '@/context/AuthContext';

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
      className="flex flex-col w-full p-5 rounded-xl space-y-10  items-center">
      <authFormInput
        type="e-mail"
        placeholder="E-mail"
        value={nameInputValue}
        onChange={handleNameInputChange}
        className="border-b-2 border-[#dbdbdb] w-[90%] focus:border-amber-200"
        inputClassName="text-[#2e2e2e] placeholder-[#2e2e2e]"
      />
      <authFormInput
        type="e-mail"
        placeholder="E-mail"
        value={emailInputValue}
        onChange={handleEmailInputChange}
        className="border-b-2 border-[#dbdbdb] w-[90%] focus:border-amber-200"
        inputClassName="text-[#2e2e2e] placeholder-[#2e2e2e]"
      />

      <GenericButton className="w-[30%] h-10" type="submit" nameButton="Salvar"/>
    </form>
  );
}