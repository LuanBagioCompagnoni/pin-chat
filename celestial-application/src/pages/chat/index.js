import AsideChats from '../../components/leftAside/contacts';
import LeftAside from '../../components/leftAside/lateralBar';
import ChatGroups from '../../components/chat/chatGroupComponents';
import {useEffect, useState} from 'react';
import Welcome from '@/components/welcome/index.js';
import ProtectedRoute from '@/components/ProtectedRoute.js';
import {useAuth} from '@/context/AuthContext.js';
import {useSocket} from '@/services/socket.js';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const {user} = useAuth();
  const {socket} = useSocket();

  useEffect(() => {
    if(socket){
      socket.emit('connectUser', user?._id);
    }
  }, [socket, user]);

  return (
    <section className='flex w-screen h-screen'>
      <LeftAside className='xl:w-[3.5vw] md:w-[5vw] sm:w-0 w-0 hidden md:block'/>
      <AsideChats className='border-none w-full sm:w-full sm:border-none md:w-[40vw] md:border-r xl:w-[30vw] 2xl:w-[22vw]'
        selectedContact={(contact) => {
          setSelectedContact(null);
          setSelectedContact(contact);
        }}
      />
      {selectedContact === null ? <Welcome className='hidden xl:w-full xl:flex sm:hidden' user={user}/> : <ChatGroups chatClassName='w-[50vw]' rigthAsideClassName='w-[24vw]' selectedContact={selectedContact} />}
    </section>
  );
}


export default ProtectedRoute(Home);
