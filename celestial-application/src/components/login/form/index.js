import { useState } from 'react';
import GenericButton from "@/components/basics/buttons/genericButton.js";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import Loading from '@/components/basics/loading';
import { useAuth } from '@/context/AuthContext';

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showSuccess = () => toast.success(`Login bem-sucedido!`);
    const showError = (message) => toast.error(`Erro ao realizar login:\n ${message}`);
    const { login } = useAuth();
    const router = useRouter()

    const handleSubmit = async (event) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            await login(email, password);
            showSuccess('Login bem-sucedido!');
            setIsLoading(false);
            router.push('/chat'); // Redirecionamento opcional, se já estiver sendo feito no contexto
        } catch (error) {
            showError(error);
            setIsLoading(false);
        }
    };
    return (
        <div className="w-full h-full bg-[#292e3d] items-center justify-center flex flex-col">
            <form className="w-[30%] h-auto bg-[#464b5b] rounded-xl border border-gray-300 flex flex-col items-center px-4 justify-center relative space-y-16 p-16"
                  onSubmit={handleSubmit}>
                <h1 className="text-gray-50 font-extrabold text-5xl">Login</h1>
                <div className="w-full">
                    <input
                        placeholder='E-mail'
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-auto overflow-hidden break-words p-4 text-sm rounded-3xl bg-[#292e3d] placeholder-gray-400 text-white resize-none"
                    />
                </div>
                <div className="w-full">
                    <input
                        placeholder='Senha'
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-auto overflow-hidden break-words p-4 text-sm rounded-3xl bg-[#292e3d] placeholder-gray-400 text-white resize-none"
                    />
                </div>
                <GenericButton className='w-[50%] h-auto p-4' nameButton='Entrar' />
                {isLoading && (
                    <Loading />
                )}
            </form>
        </div>
    );
}
