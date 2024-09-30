import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
  ownerId: {type: mongoose.Schema.Types.ObjectId, required: [true, 'ownerId is required']},
  contactDestinationId: {type: mongoose.Schema.Types.ObjectId, required: [true, 'contactDestinationId is required']},
  contactName: {type: String, required: [true, 'DestinationName is required']},
  createDate: {type: Date, required: [true, 'CreateDate is required']},
  updateDate: {type: Date, required: [true, 'UpdateDate is required']},
},{ strictPopulate: false });

const contact = mongoose.model('contact', Contact);
 
export default contact;