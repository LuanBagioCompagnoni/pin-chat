import AsideChats from '../../components/leftAside/contacts';
import LeftAside from '../../components/leftAside/lateralBar';
import Chat from '../../components/chat';
import RightAside from '../../components/rigthAside';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useState} from 'react';
import Welcome from '@/components/welcome/index.js';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [isUser, setIsUser] = useState('');
  return (
    <section className='flex w-screen h-screen'>
      <LeftAside onSelectOptionUsersOrContacts={setIsUser} />
      <AsideChats isUser={isUser} onSelectContact={setSelectedContact} />
      {isUser === '' ? < Welcome /> :
        <div><Chat selectedContact={selectedContact} /> <RightAside /></div>
      }
    </section>
  );
}

export default ProtectedRoute(Home);