import express from 'express';
import connectDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import { errorHandler } from 'ErrorHandler-Package';
import { handler404 } from 'ErrorHandler-Package';

const app = express();
routes(app);
const connection = await connectDatabase();

app.use(handler404);

app.use(errorHandler);

connection.on('error', (error) =>{
  console.error('Connection with chat database error', error);
});

connection.once('open', () => {
  console.log('Connection with chat database successfully');
});

export default app;