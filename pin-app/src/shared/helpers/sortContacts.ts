import {ContactObject} from '@/shared/types/contactObject';

export const sortContacts = (contacts: ContactObject[]): ContactObject[] => {
  return contacts.sort((a, b) => {
    const dateA = a?.lastMessage?.date ? new Date(a.lastMessage.date).getTime() : 0;
    const dateB = b?.lastMessage?.date ? new Date(b.lastMessage.date).getTime() : 0;
    return dateB - dateA;
  });
};
