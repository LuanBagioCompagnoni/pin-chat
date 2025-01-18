import MessageService from "../services/MessageService.js";

const messageHandlers = (socket, io) => {
    const messageService = new MessageService();

    socket.on('sendMessage', async ({messageData, room}) => {
        await messageService.create(messageData);

        const destinationSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === messageData.destinationUserId);
        const originSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === messageData.originUserId);

        io.to(room).emit('newMessage', messageData);
        destinationSocket.emit('newMessage:notification', messageData);
        originSocket.emit('newMessage:notification', messageData);
    });

    socket.on('getMessages', async (params) => {
        const messages = await messageService.listForChat(params.originUserId, params.destinationUserId);
        const requestedUserSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === params.originUserId);
        requestedUserSocket.emit(`listMessages`, messages);
    });

    socket.on('seenMessages', async (params) => {
        await messageService.seenMessages(params.originUserId, params.destinationUserId);

        const destinationSocket = Array.from(io.sockets.sockets.values())
            .find(s => s.userId === params.destinationUserId);
        if(destinationSocket) {
            destinationSocket.emit('seenMessages', params.originUserId);
        }

    })
};

export default messageHandlers;
