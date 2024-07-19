import mongoose from 'mongoose';
import services from './Service.js';
import users from './Client.js'

const Message = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  serviceId: {type: mongoose.Schema.Types.ObjectId, ref: services},
  content: {type: String},
  type: {type: String, required: [true, "Type message is required!"]},
  file: {type: String},
  date: {type: Date},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: users, required: [true, "UserId is required!"]}
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;