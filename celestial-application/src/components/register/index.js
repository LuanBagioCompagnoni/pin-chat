import { useState } from 'react';
import GenericButton from '@/components/basics/buttons/genericButton.js';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loading from '@/components/basics/loading/index.js';
import { useAuth } from '@/context/AuthContext.js';

export default function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const showSuccess = (message) => toast.success(message);
  const showError = (message) => toast.error(message);
  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      setIsLoading(true);
      await register(name, email, password);
      showSuccess('Seja bem-vindo!');
      setIsLoading(false);
      router.push('/chat');
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
        <h1 className="text-gray-50 font-extrabold text-5xl">Registro</h1>

        <div className="w-[85%]">
          <div className="flex items-center border-b border-white py-2">
            <input
              className="appearance-none placeholder-gray-50 bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="Nome"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}/>
          </div>
        </div>
        <div className="w-[85%]">
          <div className="flex items-center border-b border-white py-2">
            <input
              className="appearance-none placeholder-gray-50 bg-transparent border-none w-full text-gray-50 mr-3 py-1 px-2 leading-tight focus:outline-none"
              placeholder="E-mail"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>
        </div>
        <div className="w-[85%]">
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
        <GenericButton className='w-[50%] h-auto p-4 bg-gray-50 text-gray-600 hover:bg-purple-300'
          nameButton='Registrar'/>
        {isLoading && (
          <Loading/>
        )}
      </form>


    </div>
  );
}
