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
      socket.emit('connectUser', user._id);
    }
  }, [socket, user]);

  return (
    <section className='flex w-screen h-screen'>
      <LeftAside />
      <AsideChats
        selectedContact={(contact) => {
          setSelectedContact(null);
          setSelectedContact(contact);
        }}
      />
      {selectedContact === null ? <Welcome /> : <ChatGroups selectedContact={selectedContact} />}
    </section>
  );
}


export default ProtectedRoute(Home);
