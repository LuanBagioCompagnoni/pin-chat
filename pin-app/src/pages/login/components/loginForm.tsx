import { useState } from 'react';
import AuthSwitcher from 'src/shared/components/auth/switcher';

import AuthFormInput from '@/shared/components/auth/input';
import LoadingLayout from '@/shared/components/auth/loadingLayout';
import GenericButton from '@/shared/components/buttons/auth';

import Form from '../../../shared/components/auth/form';

import { useAuth } from '@/context/AuthContext';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password)
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form handleSubmit={handleSubmit}>
      <h1 className="text-gray-50 font-extrabold text-5xl">Login</h1>

      <div className="w-[85%]">
        <AuthFormInput
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="w-[85%]">
        <AuthFormInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      <div className="w-full justify-center flex flex-col items-center">
        <GenericButton
          className="w-auto h-auto p-4 bg-gray-50 text-gray-600 hover:bg-purple-300"
          buttonName="Entrar"
          disabled={isLoading}
        />

        {isLoading && <LoadingLayout/>}
        <AuthSwitcher isLogin={true} />
      </div>
    </Form>
  )
  ;
}
