import ContactsBar from '@/components/leftAside/contacts/newContactsBar/contactsBar';

import { fetchContact } from '../../../../../socket/fetchContacts';

export default function ContactsBarWrapper({ socket, userId, selectedContact}) {
  const contactResource = fetchContact(socket, userId);
  const contacts = contactResource.read();

  return (
    <ContactsBar
      contactsList={contacts}
      userId={userId}
      socket={socket}
      selectedContact={selectedContact}
    />
  );
}
