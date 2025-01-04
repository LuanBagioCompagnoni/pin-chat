import {useRouter} from 'next/router';

interface AuthSwitcherProps {
    isLogin: boolean;
}

export default function AuthSwitcher({ isLogin }: AuthSwitcherProps) {
  const router = useRouter();
    
  const title = isLogin ? 'Não tem uma conta?' : 'Já tem conta?';
  const action = isLogin ? 'Registre-se!' : 'Entre aqui!';
  const route = isLogin ? '/register' : '/login';

  return (
    <div className="flex flex-col text-center space-y-2 mt-5 ">
      <p className="text-[#fcfcfc]">{title}</p>
      <a className="text-blue-400 cursor-pointer hover:text-blue-600" onClick={() => router.push(route)}><u><b>{action}</b></u></a>
    </div>
  )
}