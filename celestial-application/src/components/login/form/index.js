import { useState } from 'react';
import GenericButton from '@/components/basics/buttons/genericButton.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loading from '@/components/basics/loading';
import { useAuth } from '@/context/AuthContext';

export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showSuccess = () => toast.success('Login bem-sucedido!');
  const showError = (message) => toast.error(`Erro ao realizar login:\n ${message}`);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      await login(email, password);
      showSuccess('Login bem-sucedido!');
      setIsLoading(false);
      router.push('/chat'); // Redirecionamento opcional, se já estiver sendo feito no contexto
    } catch (error) {
      showError(error.message);
      setIsLoading(false);
    }
  };
  return (
      //bg-gradient-to-tr from-purple-950 to-purple-500
    <div className="w-full h-full bg-[url('/background.jpg')] bg-cover bg-top items-center justify-center flex flex-col brightness-90">
      <form
        className="w-[50%] h-[70%] rounded-3xl bg-purple-500 flex flex-col items-center px-4 justify-center relative space-y-16 p-16 bg-opacity-25 backdrop-blur-2xl border-2 border-purple-300"
        onSubmit={handleSubmit}>
        <h1 className="text-gray-50 font-extrabold text-5xl">Login</h1>

        <div className="w-full">
          <div className="flex items-center border-b border-white py-2">
            <input
              className="appearance-none placeholder-gray-50 bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="E-mail"
              aria-label="Full name"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="w-full">
          <div className=" flex items-center border-b border-white py-2">
            <input
              placeholder='Senha'
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none placeholder-gray-50 bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
            />

          </div>
        </div>
        <GenericButton className='w-[50%] h-auto p-4 bg-gray-50 text-gray-600 hover:bg-purple-300' nameButton='Entrar'/>
        {isLoading && (
          <Loading/>
        )}
      </form>


    </div>
  );
}
