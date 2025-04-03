import {useEffect, useState} from 'react';

import SearchInput from '@/components/basics/searchInput';

import {ContactObject} from '@/shared/types/contactObject';
import {Message} from '@/shared/types/Message'
import {User} from '@/shared/types/User'

import Item from './components/item'

import {sortContacts} from '@/shared/helpers/sortContacts';

interface ContactsBarProps {
  contactsList: ContactObject[],
  selectedContact: (contact: User) => void,
  updateContacts: (contact: ContactObject[]) => void,
  socket: any,
  userId: string,
}

export default function Index({contactsList, selectedContact, socket, userId, updateContacts }: Readonly<ContactsBarProps>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(contactsList);

  useEffect(() => {
    setContacts(contactsList);
  }, [contactsList]);

  const filteredContacts = searchTerm.length ? contacts.filter((contact) => contact.contact.name.toLowerCase().includes(searchTerm.toLowerCase())) : contacts;

  const updateContactsListOnNewMessage = (message: Message) => {
    setContacts((prevContacts) => {
      return sortContacts(prevContacts.map((contact) => {
        const newContact = {...contact}

        if (contact.contact._id === message.originUserId && !contact.isSelected) {
          newContact.isNotification = true;
        }

        if ([message.originUserId, message.destinationUserId].includes(contact.contact._id)) {
          newContact.lastMessage = message;
        }
        return newContact;
      }));
    });
  };

  useEffect(() => {
    if (socket && userId) {
      const handleNewMessageNotification = async (message: Message) => {
        await updateContactsListOnNewMessage(message);
      };

      const handleJoinedRoom = ({ room }) => {
        localStorage.setItem('currentRoom', room);
      };

      socket.on('newMessage:notification', handleNewMessageNotification);
      socket.on('joinedRoom', handleJoinedRoom);

      return () => {
        if (socket) {
          socket.off('newMessage:notification', handleNewMessageNotification);
          socket.off('joinedRoom', handleJoinedRoom);
        }
      };
    }
  }, [socket, userId]);


  const startChatWithContact = async (contact: User) => {
    const currentRoom = localStorage.getItem('currentRoom');

    if (currentRoom) {
      socket.emit('leaveChat', currentRoom);
      localStorage.removeItem('currentRoom');
    }

    socket.emit('startChat', {
      originUserId: userId,
      destinationUserId: contact._id,
    });
  };

  const onSelectContact = async (selectedContactObject: ContactObject) => {
    selectedContact(selectedContactObject?.contact);

    const updatedContacts = contacts.map((contact) => {
      const updatedContact = { ...contact };

      if (contact.contact._id === selectedContactObject.contact._id) {
        if (updatedContact?.lastMessage) updatedContact.lastMessage.seen = true;
        updatedContact.isNotification = false;
        updatedContact.isSelected = true;
      } else {
        updatedContact.isSelected = false;
      }

      return updatedContact;
    });

    setContacts(updatedContacts);
    updateContacts(updatedContacts);

    await startChatWithContact(selectedContactObject.contact);
  };

  return (
    <div>
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      <div className="grid grid-cols-1 w-full h-full overflow-y-auto scrollbar-custom justify-items-center content-start">
        {filteredContacts
          .map((contactObject) => (
            <Item
              key={contactObject?.contact?._id}
              contactObject={contactObject}
              onSelect={async () => await onSelectContact(contactObject)}
              isNotification={contactObject.isNotification}
            />
          ))}
        {contacts.filter((contact) =>
          contact.contact.name.toLowerCase().includes(searchTerm.toLowerCase())
        ).length === 0 && (
          <h1 className="text-gray-900 font-light mt-4">
                Não encontramos contatos com esse filtro... 🙁
          </h1>
        )}
      </div>
    </div>
  );
}
