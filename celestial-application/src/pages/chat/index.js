import AsideChats from '../../components/leftAside/contacts';
import LeftAside from '../../components/leftAside/lateralBar';
import ChatGroups from '../../components/chat/chatGroupComponents';
import {useEffect, useState} from 'react';
import Welcome from '@/components/welcome/index.js';
import ProtectedRoute from '@/components/ProtectedRoute.js';
import {useAuth} from '@/context/AuthContext.js';
import {useSocket} from '@/services/socket.js';
import {useNotification} from '@/hooks/notification.js';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactList, setContactList] = useState([]);
  const {emitNotification} = useNotification();
  const {user} = useAuth();
  const {socket} = useSocket();

  useEffect(() => {
    if (socket && user) {
      socket.emit('connectUser', user._id);
      console.log(contactList);
      if(contactList.length === 0 ){
        socket.emit('getContacts', user._id);
        socket.on(`contactsList${user._id}`, (userContacts) => {
          setContactList(userContacts);
        });
      }
      socket.on('notifyMessage', (notification) => {
        console.log(notification);
        const {messageData, originUser} = notification;
        if (notification.messageData.destinationUserId === user._id) {
          emitNotification(`Nova mensagem de ${originUser.name}: ${messageData.content}`);
        }

      });
    }




  }, [socket, user, emitNotification, contactList]);

  const handleSelectedContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleContactList = (contacts) => {
    setContactList(contacts);
  };

  return (
    <section className="flex w-screen h-screen">
      <LeftAside className="xl:w-[3.5vw] md:w-[5vw] w-0 hidden md:block" />
      <AsideChats
        className={`${selectedContact ? 'hidden w-[100vw] md:flex md:w-[40vw] xl:w-[30vw] 2xl:w-[22vw]' : 'flex w-[100vw] md:w-[40vw] xl:w-[30vw] 2xl:w-[22vw]'}`}
        selectedContact={handleSelectedContact}
        contactList={handleContactList}
      />
      {selectedContact === null ? (
        <Welcome className="xl:flex md:w-[55vw] xl:w-[74.5vw] md:flex hidden" user={user} />
      ) : (
        <ChatGroups
          chatClassName="w-[100vw] md:w-[55vw] xl:w-[40.5vw] 2xl:w-[50.5vw]"
          rigthAsideClassName="xl:w-[26vw] 2xl:w-[24vw] xl:flex hidden"
          selectedContact={selectedContact}
        />
      )}
    </section>
  );
}

export default ProtectedRoute(Home);
