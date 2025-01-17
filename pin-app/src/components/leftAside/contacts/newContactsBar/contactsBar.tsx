import {useState} from 'react';

import SearchInput from '@/components/basics/searchInput';
import ContactsContainer from '@/components/leftAside/contacts/newContactsBar/contactsContainer';

import {Message} from '@/shared/types/Message'
import {User} from '@/shared/types/User'

import ContactItem from '../contact'

interface contactObject {
    contact: User;
    lastMessage: Message;
    isNotification: boolean;
}

interface ContactsBarProps {
    contactsList: contactObject[],
    selectedContact: (contact: User) => void,
    socket: any,
    userId: string,
    contactList?: any
}

export default function ContactsBar({
  contactsList,
  selectedContact,
  socket,
  userId,
  contactList
}: ContactsBarProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeContact, setActiveContact] = useState(null);
  const [contacts] = useState(contactsList);

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
    socket.on('joinedRoom', ({room}) => {
      localStorage.setItem('currentRoom', room);
    })
  }

  const onSelectContact = async (selectedContactObject: contactObject) => {
    selectedContactObject.isNotification = false;
    setActiveContact(selectedContactObject?.contact);
    selectedContact(selectedContactObject?.contact);

    const currentContactIndex = contacts.indexOf(selectedContactObject)
    if (currentContactIndex !== -1) {
      contacts[currentContactIndex].lastMessage.seen = true;
      contacts[currentContactIndex].isNotification = false;
    }

    await startChatWithContact(selectedContactObject.contact);
  }

  return (
    <div>
      <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <ContactsContainer>
        {
          contactsList.map((contactObject) => (
            <ContactItem
              key={contactObject?.contact?._id}
              contactObject={contactObject}
              onSelect={() => onSelectContact(contactObject)}
              isSelected={activeContact?._id === contactObject?.contact?._id}
              isNotification={contactObject.isNotification}
            />
          ))
        }
      </ContactsContainer>
    </div>

  )
}