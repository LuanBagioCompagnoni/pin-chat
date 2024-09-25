import mongoose from 'mongoose';
import services from './Service.js';

const Message = new mongoose.Schema({
  serviceId: {type: mongoose.Schema.Types.ObjectId, ref: "Service"},
  content: {type: String},
  type: {type: String, required: [true, "Type message is required!"]},
  file: {type: String},
  date: { type: Date, default: Date.now },
  userId: {type: mongoose.Schema.Types.ObjectId, required: [true, "UserId is required!"]}
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;