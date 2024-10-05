import { Server as SocketIO } from 'socket.io';
import jwt from 'jsonwebtoken';
import messageHandlers from './sockets/messageHandler.js';
import contactHandlers from './sockets/contactHandler.js';
import ContactService from "./services/ContactService.js";

let io;

const initSocket = (server) => {
    const contactService = new ContactService();

    io = new SocketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.use((socket, next) => {
        const token = socket.handshake.query.token;

        if (!token) {
            return next(new Error('Token não fornecido'));
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return next(new Error('Token inválido'));
            }
            console.log(`Usuário ${decoded.user._id} conectado ao socket ${socket.id}`);
            io.emit('newUserStatusUpdate', {userId: decoded.user._id, online: true});
            socket.userId = decoded.user._id;
            socket.token = token;
            contactService.updateStatus(socket.userId, true, token);
            next();
        });
    });

    io.on('connect', (socket) => {

        messageHandlers(socket, io);
        contactHandlers(socket, io);

        socket.on('disconnect', () => {
            contactService.updateStatus(socket.userId, false, socket.token);
            io.emit('newUserStatusUpdate', {userId: socket.userId, online: false})
            console.log('Cliente desconectado:', socket.id);
        });
    });
};

export { initSocket, io };
