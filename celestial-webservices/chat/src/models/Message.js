import mongoose from 'mongoose';

const Message = new mongoose.Schema({
  contactId: {type: mongoose.Schema.Types.ObjectId, ref: "Contact"},
  content: {type: String},
  type: {type: String, required: [true, "Type message is required!"]},
  file: {type: String},
  date: { type: Date, default: Date.now },
  ownerId: {type: mongoose.Schema.Types.ObjectId, required: [true, "UserId is required!"]}
},{ strictPopulate: false });

const message = mongoose.model('messages', Message);
 
export default message;