import ContactsBar from '@/components/leftAside/contacts/newContactsBar/contactsBar';

import { fetchContact } from '../../../../../socket/fetchContacts';

export default function ContactsBarWrapper({ socket, userId, ...props }) {
  const contactResource = fetchContact(socket, userId);
  const contacts = contactResource.read();

  return (
    <ContactsBar
      {...props}
      contactsList={contacts}
      userId={userId}
      socket={socket}
    />
  );
}
