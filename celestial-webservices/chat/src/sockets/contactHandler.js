import ContactService from "../services/ContactService.js";

const messageHandlers = (socket, io) => {
    const contactService = new ContactService();
    socket.on('getContacts', async (userId) => {
        const contactsComplete = await contactService.getUsersContacts()
        const contacts = contactsComplete.filter(contact => contact._id !== userId)
        const destinationSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === userId);
        destinationSocket.emit(`contactsList${userId}`, contacts);
    });
};

export default messageHandlers;
