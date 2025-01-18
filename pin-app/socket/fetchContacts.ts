import { wrapPromise } from '@/shared/utils/wrapPromise';

import {ContactObject} from '@/shared/types/contactObject';

const contactResourceCache = new Map();

export function fetchContact(socket: any, userId: string) {
  if (!contactResourceCache.has(userId)) {
    const contactsPromise = new Promise((resolve) => {
      socket.emit('getContacts', userId);

      socket.on('contactsList', (userContacts: ContactObject[]) => {
        resolve(
          userContacts.map((contact) => ({
            ...contact,
            isNotification:
                  contact?.lastMessage?.originUserId !== userId &&
                  (contact.lastMessage ? !contact?.lastMessage?.seen : false),
          })).sort((a, b) => {
            const dateA = a?.lastMessage?.date ? new Date(a.lastMessage.date).getTime() : 0;
            const dateB = b?.lastMessage?.date ? new Date(b.lastMessage.date).getTime() : 0;

            return dateB - dateA; 
          })
        );
      });
    });

    const resource = wrapPromise(contactsPromise);
    contactResourceCache.set(userId, resource); 
  }

  return contactResourceCache.get(userId); 
}
