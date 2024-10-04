import Contact from './contact';
import SearchInput from '../../basics/searchInput';
import { useEffect, useState } from 'react';
import { useSocket } from '@/services/socket.js';
import { useAuth } from '@/context/AuthContext.js';

function AsideChats({ selectedContact, className, contactList }) {
  const { socket } = useSocket();
  const { user, loading } = useAuth();
  const [contacts, setContacts] = useState([]);
  const [activeContact, setActiveContact] = useState(null);

  useEffect(() => {
    if (socket && user && !loading) {
      socket.emit('getContacts', user._id);
      socket.on(`contactsList${user._id}`, (userContacts) => {
        contactList = userContacts;
        setContacts(userContacts);
      });

      return () => {
        socket.off(`contactsList${user._id}`);
      };
    }
  }, [socket, user, loading, contactList]);

  const onSelectContact = (contact) => {
    setActiveContact(contact);
    selectedContact(contact);
    socket.emit('getMessages', {originUserId: user._id, destinationUserId: contact._id});
  };

  return (
    <aside className={`${className} h-screen bg-[#373d4c] flex flex-col`}>
      <SearchInput />
      <div className='grid grid-cols-1 overflow-y-auto scrollbar-custom justify-center content-center'>
        {contacts[0] ? contacts.map(contact => (
          <Contact
            key={contact.id}
            contact={contact}
            onSelect={() => onSelectContact(contact)}
            isSelected={activeContact === contact}
          />
        )) : <h1 className='text-center'>Não há contatos!</h1>}
      </div>
    </aside>
  );
}

export default AsideChats;
