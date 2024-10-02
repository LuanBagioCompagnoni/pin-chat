import AsideChats from '../../components/leftAside/contacts';
import LeftAside from '../../components/leftAside/lateralBar';
import ChatGroups from '../../components/chat/chatGroupComponents';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useState} from 'react';
import Welcome from '@/components/welcome/index.js';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [messagesToChat, setMessagesToChat] = useState([]);
  console.log('pageMessages', messagesToChat);
  return (
    <section className='flex w-screen h-screen'>
      <LeftAside />
      <AsideChats selectedContact={(contact) => {setSelectedContact(null); setSelectedContact(contact); }} initialMessages={(messages) => setMessagesToChat(messages)} />
      {selectedContact === null ? < Welcome /> :
        < ChatGroups selectedContact={selectedContact} messagesToChat={messagesToChat} />
      }
    </section>
  );
}

export default ProtectedRoute(Home);