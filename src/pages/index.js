import AsideChats from '../components/leftAside/services';
import LeftAside from '../components/leftAside/lateralBar';
import Chat from '../components/chat';
import RightAside from '../components/rigthAside';

export default function Home() {
    return (
        <section className='flex w-screen h-screen'>
            
            <LeftAside />
            <AsideChats />
            <Chat />
            <RightAside />
        </section>
    );
}
