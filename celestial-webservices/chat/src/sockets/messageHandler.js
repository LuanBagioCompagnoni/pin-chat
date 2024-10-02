import MessageService from "../services/MessageService.js";

const messageHandlers = (socket, io) => {
    const messageService = new MessageService();
    //criar eventos para enviar mensagens, usuário digitando, mensagem enviada / recebida
    socket.on('sendMessage', async (messageData) => {
        const createdMessage = await messageService.create(messageData);
        io.emit('newMessage', messageData);
    });

    socket.on('getMessages', async (params) => {
        const messages = await messageService.listForChat(params.originUserId, params.destinationUserId)
        console.log(messages, params)
        socket.emit(`listMessages${params.originUserId}${params.destinationUserId}`, messages);
    })
};

export default messageHandlers;
