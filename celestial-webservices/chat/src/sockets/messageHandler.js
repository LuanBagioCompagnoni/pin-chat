const messageHandlers = (socket, io) => {
    //criar eventos para enviar mensagens, usuário digitando, mensagem enviada / recebida
    socket.on('sendMessage', (messageData) => {
        //recebe o conteudo da mensagem e o destinatário (contato destino)
        console.log(messageData);
        io.emit('newMessage', messageData);
    });
};

export default messageHandlers;
