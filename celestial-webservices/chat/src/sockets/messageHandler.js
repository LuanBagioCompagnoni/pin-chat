import MessageService from "../services/MessageService.js";
import ContactService from "../services/ContactService.js";

const messageHandlers = (socket, io) => {
    const messageService = new MessageService();
    const contactService = new ContactService();

    socket.on('sendMessage', async (messageData) => {
        await messageService.create(messageData);

        const destinationSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === messageData.destinationUserId);
        const originSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === messageData.originUserId);


        const allUsers = await contactService.getUsersContacts()
        const originUser = allUsers.find(user => user._id === messageData.originUserId);

        if (destinationSocket) {
            destinationSocket.emit('receiveMessage', messageData);
            destinationSocket.emit('notifyMessage', {messageData, originUser} );
        }
        if(originSocket) {
            originSocket.emit('receiveMessage', messageData);
        }
    });

    socket.on('getMessages', async (params) => {
        const messages = await messageService.listForChat(params.originUserId, params.destinationUserId);
        const requestedUserSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === params.originUserId);
        requestedUserSocket.emit(`listMessages`, messages);
    });
};

export default messageHandlers;
