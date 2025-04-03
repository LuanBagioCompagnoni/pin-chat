import {Suspense, useEffect, useState} from 'react';
import Welcome from 'src/pages/chat/components/welcome';

import ProtectedRoute from '@/shared/components/ProtectedRoute';

import ChatComponent from '@/pages/chat/components/chat/chatComponent';
import SideContactsColumn from '@/pages/chat/components/contactsBar/components/bar'
import ContactsBarSkeleton from '@/pages/chat/components/contactsBar/components/barSkeleton';
import ContactsBarWrapper from '@/pages/chat/components/contactsBar/components/barWrapper';
import LeftAside from '@/pages/chat/components/sidebar';

import { useNotification } from '@/hooks/notification';

import {ContactObject} from '@/shared/types/contactObject';
import {Message} from '@/shared/types/Message';
import { User } from '@/shared/types/User'

import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/services/socket';

function Home() {
  const [selectedContact, setSelectedContact] = useState(null);
  const [contactList, setContactList] = useState([]);
  const { emitNotification } = useNotification();
  const { user, token } = useAuth();
  const { socket } = useSocket(token);
  const [pageOption, setPageOption] = useState(null);

  const handleSetContacts = async (updatedContacts: ContactObject[]) => {
    setContactList(updatedContacts);
  };

  useEffect(() => {
    if (pageOption === 'home') {
      setSelectedContact(null);
    }
  }, [pageOption]);

  useEffect(()  => {
    if (socket) {
      const handleNewMessageNotification = (messageData: Message) => {
        const originContact = contactList.find((contact) => contact.contact._id === messageData.originUserId);
        if (messageData.destinationUserId === user._id) {
          emitNotification(`Nova mensagem de ${originContact.contact.name}: ${messageData.content}`);
        }
      }
      socket.on('newMessage:notification', handleNewMessageNotification);

      return () => {
        if (socket) {
          socket.off('newMessage:notification', handleNewMessageNotification);
        }
      };
    }
  }, [socket, contactList]);

  const handleSelectedContact = (contact: User) => {
    setSelectedContact(contact);
  };

  const renderContent = () => {
    switch (pageOption) {
    case 'home':
      return <Welcome className="order-2 xl:flex md:w-[55vw] xl:w-[96.5vw] md:flex" />;
    case 'contactsBar':
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
                setContacts={handleSetContacts}
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
