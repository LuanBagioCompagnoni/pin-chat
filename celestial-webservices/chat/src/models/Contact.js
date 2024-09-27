import mongoose from 'mongoose';

const Contact = new mongoose.Schema({
  ownerId: {type: mongoose.Schema.Types.ObjectId, required: [true, 'ClientName is required']},
  ownerName: {type: String, required: [true, 'OwnerName is required']},
  destinationId: {type: mongoose.Schema.Types.ObjectId, required: [true, 'ClientName is required']},
  destinationName: {type: String, required: [true, 'DestinationName is required']},
  createDate: {type: Date, required: [true, 'CreateDate is required']},
  updateDate: {type: Date, required: [true, 'UpdateDate is required']},
},{ strictPopulate: false });

const contact = mongoose.model('contact', Contact);
 
export default contact;