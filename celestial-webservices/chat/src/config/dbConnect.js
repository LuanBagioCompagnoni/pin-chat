import mongoose from 'mongoose';

async function connectDatabase(){
  mongoose.connect(`${process.env.DB_CONNECTION_STRING}/chat`);
  return mongoose.connection;
}

export default connectDatabase;