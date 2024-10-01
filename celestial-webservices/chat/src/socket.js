import {Server as SocketIO} from 'socket.io';
import messageHandlers from './sockets/messageHandler.js';
import contactHandlers from './sockets/contactHandler.js';

let io;

const initSocket = (server) => {
    io = new SocketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connect', (socket) => {
        console.log('Novo cliente conectado:', socket.id);

        messageHandlers(socket, io);
        contactHandlers(socket, io);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado:', socket.id);
        });
    });
};

export { initSocket, io };
