import { useEffect, useState } from 'react';

import Profile from '@/components/profile/index.js';
import ProtectedRoute from '@/components/ProtectedRoute.js';
import Welcome from '@/components/welcome/index.js';

import { useNotification } from '@/hooks/notification.js';

import ChatComponent from '../../components/chat/chatComponent';
import AsideChats from '../../components/leftAside/contacts';
import LeftAside from '../../components/leftAside/lateralBar';

import { useAuth } from '@/context/AuthContext.js';
import { useSocket } from '@/services/socket.js';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactList, setContactList] = useState([]);
  const { emitNotification } = useNotification();
  const { user, token } = useAuth();
  const { socket } = useSocket(token);
  const [newMessageNotification, setNewMessageNotification] = useState(null);
  const [pageOption, setPageOption] = useState(null);

  useEffect(() => {
    if (pageOption === 'home') {
      setSelectedContact(null);
    }
  }, [pageOption]);

  useEffect(() => {
    if (socket && user) {
      if (contactList.length === 0) {
        socket.on('contactsList', (userContacts) => {
          setContactList(userContacts);
        });
      }

      socket.on('newMessage', (messageData) => {
        const originContact = contactList.find((contact) => contact.contact._id === messageData.originUserId);
        if (messageData.destinationUserId === user._id) {
          setNewMessageNotification({ originContact, messageData });
          emitNotification(`Nova mensagem de ${originContact.contact.name}: ${messageData.content}`);
        }
      });
    }

    return () => {
      socket?.off('newMessage');
    };
  }, [socket, user, emitNotification, contactList]);

  const handleSelectedContact = (contact) => {
    setSelectedContact(contact);
  };

  const handleContactList = (contacts) => {
    setContactList(contacts);
  };

  const renderContent = () => {
    switch (pageOption) {
    case 'home':
      return <Welcome className="order-2 xl:flex md:w-[55vw] xl:w-[96.5vw] md:flex" user={user} />;
    case 'contacts':
      return (
        <div className="flex">
          <AsideChats
            className={`order-first md:w-[40vw] xl:w-[30vw] 2xl:w-[22vw] h-[93vh] sm:h-screen ${selectedContact ? 'hidden md:flex w-full' : 'flex w-full'}`}
            selectedContact={handleSelectedContact}
            contactList={handleContactList}
            newMessageNotification={newMessageNotification}
            clearSelectedContact={() => setSelectedContact(null)}
          />
          {selectedContact === null ? (
            <Welcome className="order-3 xl:flex md:w-[55vw] xl:w-[74.5vw] md:flex hidden" user={user} />
          ) : (
            <ChatComponent
              className="order-last w-screen md:w-[55vw] xl:w-[74.5vw] 2xl:w-[74.5vw]"
              selectedContact={selectedContact}
              clearContact={() => setSelectedContact(null)}
            />
          )}
        </div>
      );
    case 'profile':
      return < Profile />;
    default:
      return <Welcome className="order-2 xl:flex md:w-[55vw] xl:w-[96.5vw] md:flex hidden" user={user} />;
    }
  };

  return (
    <section className="flex w-screen h-screen sm:flex-row flex-col ">
      <LeftAside className={`${selectedContact ? 'hidden w-0 h-0 xl:w-[3.5vw] md:w-[5vw] md:block order-last sm:order-first flex-row md:h-screen md:flex-col' : 'xl:w-[3.5vw] md:w-[5vw] md:block order-last sm:order-first h-[7vh] w-full flex-row md:h-screen md:flex-col flex'}`} selectOption={setPageOption} />
      {renderContent()}
    </section>
  );
}

export default ProtectedRoute(Home);
