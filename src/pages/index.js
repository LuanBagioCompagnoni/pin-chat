import AsideChats from '../components/leftAside/services';
import LeftAside from '../components/leftAside/lateralBar';
import Chat from '../components/chat';
import RightAside from '../components/rigthAside';
import Login from './login';

export default function Home() {
    return (
        <section className='flex w-screen h-screen'>
            <Login />
            
        </section>
    );
}
/*
<LeftAside />
            <AsideChats />
            <Chat />
            <RightAside /> */