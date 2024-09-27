import Message from '../models/Message.js';
import ServiceResponse from "../models/ServiceResponse.js";

export default class MessageService {
    static async list(serviceId){
        const messages = await Message.find({serviceId: serviceId});
        return new ServiceResponse(200, messages);
    }
}