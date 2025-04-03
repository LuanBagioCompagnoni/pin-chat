import {Suspense, useEffect, useState} from 'react';

import ContactsBarSkeleton from '@/components/leftAside/contacts/newContactsBar/contactsBarSkeleton';
import ContactsBarWrapper from '@/components/leftAside/contacts/newContactsBar/contacsBarWrapper';
import Profile from '@/components/profile';
import ProtectedRoute from '@/components/ProtectedRoute';
import Welcome from '@/components/welcome';

import { useNotification } from '@/hooks/notification';

import ChatComponent from '../../components/chat/chatComponent';
import LeftAside from '../../components/leftAside/lateralBar';

import SideContactsColumn from '@/components/leftAside/contacts/newContactsBar/contactsSideColumn'

import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/services/socket.ts';

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
      return <Welcome className="order-2 xl:flex md:w-[55vw] xl:w-[96.5vw] md:flex" />;
    case 'contacts':
      return (
        <div className="flex">
          <SideContactsColumn className={`order-first md:w-[40vw] xl:w-[30vw] 2xl:w-[22vw] h-[93vh] sm:h-screen ${
            selectedContact ? 'hidden md:flex w-full' : 'flex w-full'
          }`}>
            <Suspense fallback={<ContactsBarSkeleton/>}>
              <ContactsBarWrapper
                socket={socket}
                userId={user._id}
                selectedContact={handleSelectedContact}
                newMessageNotification={newMessageNotification}
              />
            </Suspense>
          </SideContactsColumn>
          
          {selectedContact === null ? (
            <Welcome className="order-3 xl:flex md:w-[55vw] xl:w-[74.5vw] md:flex hidden" />
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
      return <Welcome className="order-2 xl:flex md:w-[55vw] xl:w-[96.5vw] md:flex hidden" />;
    }
  };

  return (
    <section className="flex w-screen h-screen sm:flex-row flex-col " key={Math.random()}>
      <LeftAside className={`${selectedContact ? 'hidden w-0 h-0 xl:w-[3.5vw] md:w-[5vw] md:block order-last sm:order-first flex-row md:h-screen md:flex-col' : 'xl:w-[3.5vw] md:w-[5vw] md:block order-last sm:order-first h-[7vh] w-full flex-row md:h-screen md:flex-col flex'}`} selectOption={setPageOption} />
      {renderContent()}
    </section>
  );
}

export default ProtectedRoute(Home);
