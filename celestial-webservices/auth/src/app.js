import express from 'express';
import { errorHandler } from 'ErrorHandler-Package';
import { handler404 } from 'ErrorHandler-Package';
import connectDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());

routes(app);

const connection = await connectDatabase();

app.use(handler404);

app.use(errorHandler);


connection.on('error', (error) =>{
  console.error('Connection with auth database error', error);
});

connection.once('open', () => {
  console.log('Connection with auth database successfully');
});

export default app;
