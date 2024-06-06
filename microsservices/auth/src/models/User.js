import mongoose from 'mongoose';
import services from '../../../chat/src/models/Service.js';

const Message = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  name: {type: String, required: [true, "Name is required!"]},
  email: {type: String, required: [true, "Email is required!"]},
  password: {type: String, required: [true, "Password is required!"]},
  
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;