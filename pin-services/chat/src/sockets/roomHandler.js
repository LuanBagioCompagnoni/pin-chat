import MessageService from "../services/MessageService.js";

function generateRoom(originUserId, destinationUserId) {
    return [originUserId, destinationUserId].sort().join('_');
}

const roomHandler = (socket, io) => {
    const messageService = new MessageService();

    socket.on('startChat', async ({originUserId, destinationUserId}) => {
        const room = generateRoom(originUserId, destinationUserId);

        socket.join(room);

        const messages = await messageService.listForChat(originUserId, destinationUserId);

        await messageService.seenMessages(originUserId, destinationUserId);

        io.to(room).emit('seenMessages', originUserId);

        io.to(room).emit('joinedRoom', {room, messages})
    })

    socket.on('leaveChat', async (room) => {
        console.log('saindo do chat', room)
        socket.leave(room);
    })
};

export default roomHandler;
