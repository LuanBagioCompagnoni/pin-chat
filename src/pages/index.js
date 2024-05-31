import AsideChats from '../components/leftAside/services'
import LeftAside from '../components/leftAside/lateralBar'
import Chat from '../components/chat'
import RigthAside from '../components/rigthAside'

export default function Home() {
  return (
    <section className='flex'>
      <LeftAside />
      <AsideChats />
      <Chat />
      <RigthAside />
   </section>
  );
}
