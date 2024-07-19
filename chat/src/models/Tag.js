import mongoose from 'mongoose';
import services from './Service.js';

const Message = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  content: {type: String, required: [true, "Content is required!"]},
  color: {type: String, required: [true, "Color is required!"]}
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;