import mongoose from 'mongoose';
import services from './Service.js';

const Message = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  content: {type: String},
  type: {type: String, required: [true, "Type message is required!"]},
  
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;