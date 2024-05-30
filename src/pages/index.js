import AsideChats from '../components/aside/chats'
import LateralBar from '../components/aside/lateralBar'
import Chat from '../components/chat'

export default function Home() {
  return (
    <section className='flex'>
      <LateralBar />
      <AsideChats />
      <Chat />
   </section>
  );
}
