import express from 'express';
import connectDatabase from './config/dbConnect.js';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(cors());

routes(app);

const connection = await connectDatabase();

connection.on('error', (error) =>{
  console.error('Connection error', error);
});

connection.once('open', () => {
  console.log('Connection with database successfully');
});

export default app;
