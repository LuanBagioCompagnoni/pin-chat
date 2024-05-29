import AsideChats from '../components/aside/chats'
import LateralBar from '../components/aside/lateralBar'

export default function Home() {
  return (
    <section className='flex'>
      <LateralBar />
      <AsideChats />
   </section>
  );
}
