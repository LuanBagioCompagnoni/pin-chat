import 'dotenv/config';
import connectDatabase from './src/config/dbConnect.js';
import * as http from 'node:http';
import {initSocket} from "./src/socket.js";

const PORT = 8000;

const server = http.createServer();
initSocket(server)

server.listen(PORT, () => {
  console.log(`Chat server listening at: http://localhost:${PORT}`);
});


//----Banco de dados----//
const connection = await connectDatabase();
connection.on('error', (error) =>{console.error('Connection with chat database error', error);});
connection.once('open', () => {console.log('Connection with chat database successfully');});
//--------------------//