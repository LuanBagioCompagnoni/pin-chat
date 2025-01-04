import { useState } from 'react';
import { useRouter } from 'next/router';

import AuthSwitcher from '@/shared/components/auth/authSwitcher/index';
import AuthFormInput from '@/shared/components/auth/input/index';
import GenericButton from '@/shared/components/genericButton';

import Loading from '@/components/basics/loading/index';
import Form from '@/components/form/index';

import { useAuth } from '@/context/AuthContext';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if(await register(name, email, password)){
        await router.push('/chat');
      }
    } catch{
    } finally {
      setIsLoading(false);
    }
  };

  const validatePasswords = (e) => {
    if (password && confirmPassword && password !== confirmPassword) {
      e.target.setCustomValidity('As senhas não coincidem.');
    } else {
      e.target.setCustomValidity('');
    }
  };

  return (
    <Form onSubmit={handleSubmit} >
      <h1 className="text-gray-50 font-extrabold text-5xl">Registro</h1>
      <div className="w-[85%]">
        <AuthFormInput
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-[85%]">
        <AuthFormInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-[85%] space-y-16 flex-col justify-center flex sm:flex-row sm:space-y-0 items-center sm:space-x-16">
        <AuthFormInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePasswords}
          className="w-full md:w-[50%]"
        />
        <AuthFormInput
          type="password"
          placeholder="Repita sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePasswords}
          className="w-full md:w-[50%]"
        />
      </div>
      <div className="w-full justify-center flex flex-col items-center">
        <GenericButton
          className="h-auto p-4 bg-gray-50 text-gray-600 hover:bg-purple-300"
          buttonName="Registrar"
          disabled={isLoading}
        />
        <AuthSwitcher isLogin={false} />
      </div>
      {isLoading && <Loading />}
    </Form>
  );
};

export default RegisterForm;
