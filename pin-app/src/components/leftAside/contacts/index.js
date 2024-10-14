import Contact from './contact';
import SearchInput from '../../basics/searchInput';
import { useEffect, useState } from 'react';
import { useSocket } from '@/services/socket.js';
import { useAuth } from '@/context/AuthContext.js';
import Loading from '@/components/basics/loading/index.js';
import LoadingIcon from '@/components/basics/loading/loadingIcon.js';

function AsideChats({ selectedContact, className, contactList, newMessageNotification }) {
  const { user, token, loading } = useAuth();
  const { socket } = useSocket(token);
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [lastLocalNewMessageNotification, setLastLocalNewMessageNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o termo de busca

  useEffect(() => {
    if (socket && user && newMessageNotification !== lastLocalNewMessageNotification) {
      const { originContact, messageData } = newMessageNotification;

      setContacts(prevContacts => {
        const mappedNewMessageContacts = prevContacts.map(contact => {
          if (contact?.contact?._id === originContact.contact._id) {
            let isNotification = false;

            if (activeContact?._id !== originContact.contact._id) {
              isNotification = !messageData.seen;
            }
            return { ...contact, isNotification, lastMessage: messageData };
          }
          return contact;
        });

        return mappedNewMessageContacts.sort((a, b) => {
          const dateA = a.lastMessage?.date ? new Date(a.lastMessage.date) : 0;
          const dateB = b.lastMessage?.date ? new Date(b.lastMessage.date) : 0;
          return dateB - dateA;
        });
      });
      setLastLocalNewMessageNotification(newMessageNotification);
    }
  }, [newMessageNotification, activeContact, socket, user]);

  useEffect(() => {
    if (socket && user && !loading) {
      socket.on('confirmInviteMessage', (messageData) => {
        if (messageData.destinationUserId === user._id || messageData.originUserId === user._id) {
          setContacts(prevContacts => {
            const mappedNewMessageContacts = prevContacts.map(contact => {
              if (contact?.contact?._id === messageData.destinationUserId) {
                return { ...contact, lastMessage: messageData };
              }
              return contact;
            });
            return mappedNewMessageContacts.sort((a, b) => {
              const dateA = a.lastMessage?.date ? new Date(a.lastMessage.date) : 0;
              const dateB = b.lastMessage?.date ? new Date(b.lastMessage.date) : 0;
              return dateB - dateA;
            });
          });
        }
      });

      socket.on('newUserStatusUpdate', (updateStatus) => {
        if (updateStatus.userId !== user._id) {
          let contactFound = false;
          setContacts(prevContacts => {
            return prevContacts.map(contact => {
              if (contact?.contact?._id === updateStatus.userId) {
                contactFound = true;
                return {
                  ...contact,
                  contact: {
                    ...contact.contact,
                    online: updateStatus.online,
                  },
                };
              }
              return contact;
            });
          });
          if (!contactFound) {
            socket.emit('getContacts', user._id);
          }
        }
      });

      socket.emit('getContacts', user._id);
      socket.on('contactsList', (userContacts) => {
        const ordenedContacts = userContacts.sort((a, b) => {
          const dateA = a.lastMessage?.date ? new Date(a.lastMessage.date) : 0;
          const dateB = b.lastMessage?.date ? new Date(b.lastMessage.date) : 0;
          return dateB - dateA;
        });
        contactList(ordenedContacts);
        setContacts(ordenedContacts.map(contact => ({
          ...contact,
          isNotification: contact?.lastMessage?.originUserId !== user._id && (contact.lastMessage ? !contact?.lastMessage?.seen : false),
        })));
      });

      return () => {
        socket.off('newUserOnline');
        socket.off('notifyMessage');
        socket.off('contactsList');
        socket.off('updateContactList');
      };
    }
  }, [socket, user, loading]);

  const onSelectContact = async (contactObject) => {
    contactObject.isNotification = false;
    await setActiveContact(contactObject?.contact);
    await selectedContact(contactObject?.contact);

    await setContacts(prevContacts => {
      return prevContacts.map(contact => {
        if (contact?.contact?._id === contactObject?.contact?._id) {
          return { ...contact, lastMessage: {
            ...contact.lastMessage,
            seen: true,
          }, isNotification: false };
        }
        newMessageNotification = contact;
        return contact;
      });
    });

    socket.emit('getMessages', {
      originUserId: user._id,
      destinationUserId: contactObject?.contact._id,
    });
    if (!contactObject?.lastMessage?.seen && contactObject?.lastMessage?.originUserId !== user._id) {
      socket.emit('seenMessages', {
        originUserId: user._id,
        destinationUserId: contactObject?.contact._id,
      });
    }
  };

  const filteredContacts = contacts.filter(contactObject =>
    contactObject.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`${className} flex-col h-screen bg-[#FCFCFC] border-2 border-[#E8E8E8]`}>
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="grid grid-cols-1 w-full h-full overflow-y-auto scrollbar-custom justify-items-center content-start">
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contactObject => (
            <Contact
              key={contactObject?.contact?.id}
              contactObject={contactObject}
              onSelect={async () => await onSelectContact(contactObject)}
              isSelected={activeContact?._id === contactObject?.contact?._id}
              isNotification={contactObject.isNotification}
            />
          ))
        ) : (
          contacts.length < 0 ? <LoadingIcon /> : <h1 className='text-gray-900 font-light mt-4'>Não encontramos contatos com esse filtro... 🙁</h1>
        )}
      </div>
    </aside>
  );
}

export default AsideChats;
