import MessageService from "../services/MessageService.js";

const messageHandlers = (socket, io) => {
    const messageService = new MessageService();

    socket.on('sendMessage', async (messageData) => {
        await messageService.create(messageData);

        const destinationSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === messageData.destinationUserId);
        const originSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === messageData.originUserId);

        if (destinationSocket) {
            console.log("notificando mensagen ao destination")

            destinationSocket.emit('receiveMessage', messageData);
            destinationSocket.emit('notifyMessage', messageData);
        }
        if(originSocket) {
            originSocket.emit('updateContactList', messageData);
            originSocket.emit('receiveMessage', messageData);
            originSocket.emit('notifyMessage', messageData);
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
