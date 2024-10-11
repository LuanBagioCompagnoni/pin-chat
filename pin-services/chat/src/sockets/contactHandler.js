import ContactService from "../services/ContactService.js";
import MessageService from "../services/MessageService.js";


const messageHandlers = (socket, io) => {
    const messageService = new MessageService();
    const contactService = new ContactService();
    socket.on('getContacts', async (userId) => {
        const destinationSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === userId);
        const contactsComplete = await contactService.getUsersContacts(destinationSocket.token)
        const contacts = contactsComplete.filter(contact => contact._id !== userId)

        let contactsWithLastMessage = [];
        for (const contact of contacts) {
            const lastMessage = await messageService.getLastMessageByContact(userId, contact._id)
            contactsWithLastMessage.push({contact, lastMessage});
        }

        destinationSocket.emit(`contactsList`, contactsWithLastMessage);
    });
};

export default messageHandlers;
