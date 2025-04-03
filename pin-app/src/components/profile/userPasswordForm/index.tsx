import {useState} from 'react';

import GenericButton from '@/shared/components/genericButton';
import GenericInput from '@/components/basics/genericInput';

export default function PasswordForm(){
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

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
    <form onSubmit={handleSubmit}
      className="flex flex-col w-full  p-5 rounded-xl space-y-5 shadow-gray-300 items-center">
      <h1 className="text-[#2e2e2e] w-full font-medium">Senha:</h1>
      <div className="flex flex-col items-center sm:flex-row w-full space-y-5 sm:space-y-0 sm:space-x-10">
        <GenericInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePasswords}
          className="w-[90%] text-[#2e2e2e]"
          inputClassName="rounded-xl"
          label="Senha"
        />
        <GenericInput
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePasswords}
          className="w-[90%] text-[#2e2e2e]"
          inputClassName="rounded-xl"
          label="Confirmação de senha"
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <GenericButton className="w-[30%] h-10" type="submit" nameButton="Salvar"/>
    </form>
  );
}