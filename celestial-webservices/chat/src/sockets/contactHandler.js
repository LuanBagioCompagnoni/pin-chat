import ContactService from "../services/ContactService.js";

const messageHandlers = (socket, io) => {
    const contactService = new ContactService();
    //criar eventos para buscar contatos do usuário, criar novos contatos usando e-mail
    socket.on('getContacts', (userId) => {
        const contacts = contactService.getContactByUserId(userId)
        io.emit(`contactsList${userId}`, contacts);
    });
};

export default messageHandlers;
