// components/RegisterForm.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext.js';
import AuthInput from '@/components/basics/auth/input/index.js';
import GenericButton from '@/components/basics/buttons/genericButton.js';
import Loading from '@/components/basics/loading/index.js';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const user = await register(name, email, password);
      showSuccess(`Seja bem-vindo ${user.name.split(' ')[0]}!`);
      await router.push('/chat');
    } catch (error) {
      showError(error.message);
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
    <form
      className="w-[50%] h-[70%] rounded-3xl bg-purple-500 flex flex-col items-center px-4 justify-center relative md:space-y-8 space-y-16 p-16 bg-opacity-25 backdrop-blur-2xl border-2 border-purple-300"
      onSubmit={handleSubmit}
    >
      <h1 className="text-gray-50 font-extrabold text-5xl">Registro</h1>
      <div className="w-[85%]">
        <AuthInput
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-[85%]">
        <AuthInput
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-[85%] justify-center flex flex-row items-center space-x-16">
        <AuthInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={validatePasswords}
        />
        <AuthInput
          type="password"
          placeholder="Repita sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onBlur={validatePasswords}
        />
      </div>
      <div className="w-full h-full justify-center flex flex-col items-center">
        <GenericButton
          className="w-[50%] h-auto p-4 bg-gray-50 text-gray-600 hover:bg-purple-300"
          nameButton="Registrar"
          disabled={isLoading}
        />
        <div className="flex space-x-2 mt-5">
          <p>Já tem conta?</p>
          <a
            className="text-blue-400 cursor-pointer hover:text-blue-600"
            onClick={() => router.push('/login')}
          >
            <u><b>Entre aqui!</b></u>
          </a>
        </div>
      </div>
      {isLoading && <Loading />}
    </form>
  );
};

export default RegisterForm;
