import { useState } from 'react';
import GenericButton from "@/components/basics/buttons/genericButton.js";
import { toast } from 'react-toastify';
import LoginService from '@/services/auth';
const AuthService = new LoginService();

export default function Form() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const showSuccess = (message) => toast.success('Login bem-sucedido! ', message);
    const showError = (message) => toast.error('Erro ao realizar login! ', message);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await AuthService.login(email, password);
            console.log(response);
            showSuccess(response);
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            showError(error.message);
        } finally {
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
                    <div className="absolute inset-0 flex items-center justify-center bg-[#464b5b] bg-opacity-75">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                )}
            </form>
        </div>
    );
}
