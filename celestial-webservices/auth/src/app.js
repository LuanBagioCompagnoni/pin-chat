import express from 'express';
import handleError from './middlewares/errorHandler.js';
import handler404 from './middlewares/handler404.js';
import connectDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());

routes(app);

const connection = await connectDatabase();

app.use(handler404);

app.use(handleError);


connection.on('error', (error) =>{
  console.error('Connection error', error);
});

connection.once('open', () => {
  console.log('Connection with database successfully');
});

export default app;
