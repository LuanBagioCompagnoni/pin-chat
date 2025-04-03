import Index from '@/pages/chat/components/contactsBar';

import { wrapPromise } from '@/shared/utils/wrapPromise';

import {ContactObject} from '@/shared/types/contactObject';

import { sortContacts } from '@/shared/helpers/sortContacts';

const contactResourceCache = new Map();

function fetchContact(socket, userId) {
  if (!contactResourceCache.has(userId)) {
    const contactsPromise = new Promise((resolve) => {
      socket.emit('getContacts', userId);

      const handleContactsList = (userContacts) => {
        resolve(
          sortContacts(
            userContacts.map((contact) => ({
              ...contact,
              isNotification:
                      contact?.lastMessage?.originUserId !== userId &&
                      (contact.lastMessage ? !contact?.lastMessage?.seen : false),
            }))
          )
        );
        socket.off('contactsList', handleContactsList);
      };

      socket.on('contactsList', handleContactsList);
    });

    const resource = wrapPromise(contactsPromise);
    contactResourceCache.set(userId, resource);
  }

  return contactResourceCache.get(userId);
}

export default function ContactsBarWrapper({ socket, userId, selectedContact, setContacts }) {
  const contactResource = fetchContact(socket, userId);
  const contacts = contactResource.read();

  const handleUpdateContacts = (updatedContacts: ContactObject[]) => {
    const resource = wrapPromise(Promise.resolve(updatedContacts));
    contactResourceCache.set(userId, resource);
    setContacts(updatedContacts);
  };

  return (
    <Index
      contactsList={contacts}
      userId={userId}
      socket={socket}
      selectedContact={selectedContact}
      updateContacts={handleUpdateContacts}
    />
  );
}
