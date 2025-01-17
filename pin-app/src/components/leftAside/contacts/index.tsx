import { useEffect, useState } from 'react';

import LoadingIcon from '@/components/basics/loading/loadingIcon';

import SearchInput from '../../basics/searchInput';

import ContactItem from './contact';

import { useAuth } from '@/context/AuthContext';
import { useSocket } from '@/services/socket.ts';

function AsideChats({selectedContact, className, contactList, newMessageNotification, contactsArray}) {
  const {user, token, loading} = useAuth();
  const {socket} = useSocket(token);
  const [contacts, setContacts] = useState(contactsArray);
  const [activeContact, setActiveContact] = useState(null);
  const [lastLocalNewMessageNotification, setLastLocalNewMessageNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (socket && user && newMessageNotification !== lastLocalNewMessageNotification) {
      const {originContact, messageData} = newMessageNotification;

      setContacts(prevContacts => {
        const mappedNewMessageContacts = prevContacts.map(contact => {
          if (contact?.contact?._id === originContact.contact._id) {
            let isNotification = false;

            if (activeContact?._id !== originContact.contact._id) {
              isNotification = !messageData.seen;
            }
            return {...contact, isNotification, lastMessage: messageData};
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
      socket.on('newMessage', (messageData) => {
        if (messageData.destinationUserId === user._id || messageData.originUserId === user._id) {
          setContacts(prevContacts => {
            const mappedNewMessageContacts = prevContacts.map(contact => {
              if (contact?.contact?._id === messageData.destinationUserId) {
                return {...contact, lastMessage: messageData};
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
        socket.off('newMessage');
        socket.off('contactsList');
        socket.off('updateContactList');
      };
    }
  }, [socket, user, loading]);

  const onSelectContact = async (contactObject) => {
    contactObject.isNotification = false;
    setActiveContact(contactObject?.contact);
    await selectedContact(contactObject?.contact);

    setContacts(prevContacts => {
      return prevContacts.map(contact => {
        if (contact?.contact?._id === contactObject?.contact?._id) {
          return {
            ...contact, lastMessage: {
              ...contact.lastMessage,
              seen: true,
            }, isNotification: false
          };
        }
        newMessageNotification = contact;
        return contact;
      });
    });

    const currentRoom = localStorage.getItem('currentRoom');
    if (currentRoom) {
      socket.emit('leaveChat', currentRoom);
      localStorage.removeItem('currentRoom');
    }

    socket.emit('startChat', {
      originUserId: user._id,
      destinationUserId: contactObject?.contact._id,
    });
    socket.on('joinedRoom', ({room}) => {
      localStorage.setItem('currentRoom', room);
    });
  };

  const filteredContacts = contacts.filter(contactObject =>
    contactObject.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className={`${className} flex-col h-screen bg-[#FCFCFC] border-2 border-[#E8E8E8]`}>
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <div 
        className="grid grid-cols-1 w-full h-full overflow-y-auto scrollbar-custom justify-items-center content-start">
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contactObject => (
            <ContactItem
              key={contactObject?.contact?.id}
              contactObject={contactObject}
              onSelect={async () => await onSelectContact(contactObject)}
              isSelected={activeContact?._id === contactObject?.contact?._id}
              isNotification={contactObject.isNotification}
            />
          ))
        ) : (
          contacts.length < 0 ? <LoadingIcon/> :
            <h1 className="text-gray-900 font-light mt-4">Não encontramos contatos com esse filtro... 🙁</h1>
        )}
      </div>
    </aside>
  );
}

export default AsideChats;
