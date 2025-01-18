import {useEffect, useState} from 'react';

import SearchInput from '@/components/basics/searchInput';
import ContactsContainer from '@/components/leftAside/contacts/newContactsBar/contactsContainer';

import {ContactObject} from '@/shared/types/contactObject';
import {Message} from '@/shared/types/Message'
import {User} from '@/shared/types/User'

import ContactItem from '../contact'

interface ContactsBarProps {
    contactsList: ContactObject[],
    selectedContact: (contact: User) => void,
    socket: any,
    userId: string,
}

export default function ContactsBar({contactsList, selectedContact, socket, userId }: ContactsBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [contacts, setContacts] = useState(contactsList);

  const filteredContacts = searchTerm.length ? contacts.filter((contact) => contact.contact.name.toLowerCase().includes(searchTerm.toLowerCase())) : contacts;

  const updateContactsListOnNewMessage = (message: Message) => {
    console.log(message)
    setContacts((prevContacts) => {
      return prevContacts.map((contact) => {

        if (contact.contact._id === message.originUserId && !contact.isSelected) {
          return {...contact, isNotification: true};
        }

        if(contact.contact._id === message.originUserId) {
          return { ...contact, lastMessage: message}
        }

        return contact;
      }).sort((a, b) => {
        const dateA = a?.lastMessage?.date ? new Date(a.lastMessage.date).getTime() : 0;
        const dateB = b?.lastMessage?.date ? new Date(b.lastMessage.date).getTime() : 0;

        return dateB - dateA;
      })
    })
  }

  useEffect(() => {
    if (socket && userId) {
      socket.on('newMessage:notification', (message: Message) => {
        updateContactsListOnNewMessage(message);
      })

      socket.on('joinedRoom', ({room}) => {
        localStorage.setItem('currentRoom', room);
      })
    }
    return () => {
      if (socket) {
        socket?.off('joinedRoom');
        socket?.off('newMessage:notification');
      }
    };
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
    })
  }

  const onSelectContact = async (selectedContactObject: ContactObject) => {
    selectedContact(selectedContactObject?.contact);

    const currentContactIndex = filteredContacts.indexOf(selectedContactObject)

    if (currentContactIndex !== -1) {
      filteredContacts.forEach((contact) => contact.isSelected = false);
      filteredContacts[currentContactIndex].lastMessage.seen = true;
      filteredContacts[currentContactIndex].isNotification = false;
      filteredContacts[currentContactIndex].isSelected = true;
    }

    await startChatWithContact(selectedContactObject.contact);
  }

  return (
    <div>
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <ContactsContainer>
        {
          filteredContacts.length ? filteredContacts.map((contactObject) => (
            <ContactItem
              key={contactObject?.contact?._id}
              contactObject={contactObject}
              onSelect={async () => await onSelectContact(contactObject)}
              isNotification={contactObject.isNotification}
            />
          )) : (<h1 className="text-gray-900 font-light mt-4">Não encontramos contatos com esse filtro... 🙁</h1>)
        }
      </ContactsContainer>
    </div>

  )
}