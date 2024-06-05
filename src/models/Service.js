import mongoose from 'mongoose';
import users from './User.js';
import departaments from './Department.js';
import tags from './Tag.js';

const Service = new mongoose.Schema({
  id: {type: mongoose.Schema.Types.ObjectId},
  client: {type: String, required: [true, 'ClientName is required']},
  createDate: {type: Date, required: [true, 'CreateDate is required']},
  updateDate: {type: Date, required: [true, 'UpdateDate is required']},
  tags: {type: mongoose.Schema.Types.ObjectId, ref: tags},
  department: {type: mongoose.Schema.Types.ObjectId, ref: departaments, required: [true, 'Department is required']},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: users, required: [true, 'UserId is required']}
},{ strictPopulate: false });

const service = mongoose.model('services', Service);
 
export default service;