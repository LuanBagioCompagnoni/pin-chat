import { useState } from 'react';
import GenericButton from '@/components/basics/buttons/genericButton.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loading from '@/components/basics/loading/index.js';
import { useAuth } from '@/context/AuthContext.js';
import LineInput from '@/components/basics/auth/input/index.js';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      if(await login(email, password)){
        await router.push('/chat');
      }
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="w-[85%] h-[95%] sm:h-[85%] sm:w-[75%] md:h-[75%] md:w-[65%] rounded-3xl bg-purple-500 flex flex-col items-center px-4 justify-center relative space-y-16 p-16 bg-opacity-25 backdrop-blur-2xl border-2 border-purple-300"
      onSubmit={handleSubmit}
    >
      <h1 className="text-gray-50 font-extrabold text-5xl">Login</h1>

      <div className="w-[85%]">
        <LineInput
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="w-[85%]">
        <LineInput
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className='w-full justify-center flex flex-col items-center'>
        <GenericButton
          className='w-[70%] h-auto p-4 bg-gray-50 text-gray-600 hover:bg-purple-300'
          nameButton='Entrar'
          disabled={isLoading}
        />

        {isLoading && <Loading/>}
        <div className='flex flex-col text-center space-x-2 mt-5 '>
          <p className={'text-[#fcfcfc]'}>Não tem uma conta?</p>
          <a className='text-blue-400 cursor-pointer hover:text-blue-600' onClick={() => router.push('/register')}><u><b>Registre-se!</b></u></a>
        </div>
      </div>
    </form>
  );
}
