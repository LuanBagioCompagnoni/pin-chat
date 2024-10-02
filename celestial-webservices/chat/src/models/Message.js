import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  originUserId: {type: mongoose.Schema.Types.ObjectId},
  destinationUserId: {type: mongoose.Schema.Types.ObjectId},
  content: {type: String},
  type: {type: String, required: [true, "Type message is required!"]},
  file: {type: String},
  date: { type: Date, default: Date.now },
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;