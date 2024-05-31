import AsideChats from '../components/leftAside/services';
import LeftAside from '../components/leftAside/lateralBar';
import Chat from '../components/chat';
import RightAside from '../components/rigthAside'; // Certifique-se de que o caminho está correto

export default function Home() {
    return (
        <section className='flex'>
            <LeftAside />
            <AsideChats />
            <Chat />
            <RightAside />
        </section>
    );
}
