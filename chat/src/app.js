import express from 'express';
import connectDatabase from '../config/dbConnect.js';
import routes from './routes/index.js';
import handleError from './middlewares/errorHandler.js';
import handler404 from './middlewares/handler404.js';

const app = express();
routes(app);
const connection = await connectDatabase();

app.use(handler404);

app.use(handleError);

connection.on('error', (error) =>{
  console.error('Connection error', error);
});

connection.once('open', () => {
  console.log('Connection with database sucefully');
});

export default app;