import mongoose from 'mongoose';

const Service = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  client: {type: String, required: [true, 'ClientName is required']},
  createDate: {type: Date, required: [true, 'CreateDate is required']},
  updateDate: {type: Date, required: [true, 'UpdateDate is required']},
  userId: {type: mongoose.Schema.Types.ObjectId, required: [true, 'UserId is required']},
  observations: {type: Array},
  
},{ strictPopulate: false });

const service = mongoose.model('services', Service);
 
export default service;