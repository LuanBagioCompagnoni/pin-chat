import { wrapPromise } from '@/shared/utils/wrapPromise';

const contactResourceCache = new Map(); 

export function fetchContact(socket, userId) {
  if (!contactResourceCache.has(userId)) {
    const contactsPromise = new Promise((resolve) => {
      socket.emit('getContacts', userId);

      socket.on('contactsList', (userContacts) => {
        resolve(
          userContacts.map((contact) => ({
            ...contact,
            isNotification:
                  contact?.lastMessage?.originUserId !== userId &&
                  (contact.lastMessage ? !contact?.lastMessage?.seen : false),
          })).sort((a) => a.lastMessage?.date ? -1 : 1)
        );
      });
    });

    const resource = wrapPromise(contactsPromise);
    contactResourceCache.set(userId, resource); 
  }

  return contactResourceCache.get(userId); 
}
