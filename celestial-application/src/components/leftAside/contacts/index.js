import Contact from './contact';
import SearchInput from '../../basics/searchInput';
import {useEffect, useState} from 'react';
import {useSocket} from '@/services/socket.js';
import {useAuth} from '@/context/AuthContext.js';

function AsideChats({ selectedContact, className, contactList, contactNotification }) {
  const { user, token, loading } = useAuth();
  const { socket } = useSocket(token);
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {

    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        console.log(contact?.contact?._id, contactNotification);

        if (contact?.contact?._id === contactNotification) {

          return {...contact, isNotification: true};
        }
        return contact;
      });
    });
  }, [contactNotification]);


  useEffect(() => {

    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        console.log(contact?.contact?._id, contactNotification);

        if (contact?.contact?._id === contactNotification) {

          return {...contact, isNotification: true};
        }
        return contact;
      });
    });

    if (socket && user && !loading) {

      socket.on('updateContactList', (messageData) => {
        if (messageData.destinationUserId === user._id || messageData.originUserId === user._id) {
          setContacts(prevContacts => {
            return prevContacts.map(contact => {
              if (contact?.contact?._id === messageData.destinationUserId) {
                return {...contact, lastMessage: messageData};
              }
              return contact;
            }).sort((a, b) => new Date(b.lastMessage?.date) - new Date(a.lastMessage?.date));
          });
        }
      });

      socket.on('newUserStatusUpdate', (updateStatus) => {
        if (updateStatus.userId !== user._id) {

          setContacts(prevContacts => {
            return prevContacts.map(contact => {
              if (contact?.contact?._id === updateStatus.userId) {
                return {...contact,
                  contact: {
                    ...contact.contact,
                    online: updateStatus.online
                  }};
              }
              return contact;
            });
          });
        }
      });
      socket.emit('getContacts', user._id);

      socket.on('contactsList', (userContacts) => {
        const ordenedContacts = userContacts.sort((a, b) => new Date(b.lastMessage?.date) - new Date(a.lastMessage?.date));
        setContacts(ordenedContacts);
        contactList(ordenedContacts);
      });

      return () => {
        socket.off('newUserOnline');
        socket.off('notifyMessage');
        socket.off('contactsList');
      };
    }
  }, [socket, user, loading]);




  const onSelectContact = (contact) => {
    setActiveContact(contact);
    selectedContact(contact);
    socket.emit('getMessages', {originUserId: user._id, destinationUserId: contact?._id});
  };

  return (
    <aside className={`${className} flex-col h-screen bg-[#373d4c] `}>
      <SearchInput />
      <div className='grid grid-cols-1 w-full h-full overflow-y-auto scrollbar-custom justify-items-center content-start'>
        {contacts.length > 0 ? contacts.map(contactObject => (
          <Contact
            key={contactObject?.contact?.id}
            contactObject={contactObject}
            onSelect={() => onSelectContact(contactObject?.contact)}
            isSelected={activeContact?._id === contactObject?.contact?._id}
            isNotification={contactObject.isNotification}
          />
        )) : <h1 className='text-center'>Não há contatos!</h1>}

      </div>
    </aside>
  );
}


export default AsideChats;
